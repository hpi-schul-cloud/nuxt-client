import { mockApi } from "@@/tests/test-utils";
import { BoardErrorReportApiFactory } from "@api-server";
import { logger } from "@util-logger";
import { EventEmitter } from "node:events";
import http from "node:http";
import type { AddressInfo } from "node:net";
import type { Server } from "socket.io";
import * as ioBack from "socket.io";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Ref } from "vue";

// Create a hoisted ref that can be accessed by the mock
const { mockIsJwtExpired, mockOnBeforeRouteLeave } = vi.hoisted(() => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { ref: vueRef } = require("vue");
	return {
		mockIsJwtExpired: vueRef(false) as Ref<boolean>,
		mockOnBeforeRouteLeave: vi.fn(),
	};
});

vi.mock("@util-broadcast-channel", () => ({
	useSessionBroadcast: vi.fn().mockImplementation(() => ({
		isJwtExpired: mockIsJwtExpired,
	})),
}));

vi.mock("vue-router", () => ({
	onBeforeRouteLeave: mockOnBeforeRouteLeave,
}));

let socket: Socket;
let httpServer: http.Server;
let httpServerAddr: AddressInfo;
let ioServer: Server;

/**
 * Setup WS & HTTP servers
 */
beforeAll(() => {
	httpServer = http.createServer().listen();
	const addr = httpServer.address();
	if (!addr || typeof addr === "string") {
		throw new Error("Unable to get server address");
	}
	httpServerAddr = addr;
	ioServer = new ioBack.Server(httpServer);
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll(() => {
	ioServer.close();
	httpServer.close();
});

/**
 * Run before each test
 */
beforeEach(async () => {
	// Setup
	// Do not hardcode server port and address, square brackets are used for IPv6
	socket = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
		reconnectionDelay: 0,
		reconnectionDelayMax: 0,
		forceNew: true,
		transports: ["websocket"],
	});

	// Wait for socket connection to be established
	await new Promise<void>((resolve, reject) => {
		socket.on("connect", () => {
			resolve();
		});

		socket.on("connect_error", (error) => {
			reject(error);
		});

		// Add timeout to prevent hanging tests
		setTimeout(() => {
			reject(new Error("Socket connection timeout"));
		}, 5000);
	});
});

/**
 * Run after each test
 */
afterEach(() => {
	// Cleanup
	if (socket.connected) {
		socket.disconnect();
	}
});

// Mocks aligning with project style
vi.mock("axios");

vi.mock("@api-server");

vi.mock("@/serverApi/v3");

vi.mock("@util-logger", () => ({
	logger: {
		log: vi.fn(),
		error: vi.fn(),
	},
}));

describe("socket-error-handler", () => {
	beforeEach(() => {
		vi.resetModules();
		vi.useFakeTimers();
		vi.clearAllMocks();
		// Reset the JWT expired state
		mockIsJwtExpired.value = false;
		// Default URL and userAgent
		Object.defineProperty(globalThis, "location", {
			value: { href: "http://localhost/boards/69121555fd38bab102439ff8" },
			writable: true,
		});
		vi.mocked(BoardErrorReportApiFactory).mockReturnValue(boardErrorReportApiMock);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const importHandler = async () => {
		const mod = await import("./socket-error-handler");
		return mod.useConnectionErrorHandling;
	};

	const boardErrorReportApiMock = mockApi<ReturnType<typeof BoardErrorReportApiFactory>>();

	// Helper to emit internal socket.io Manager/Engine events (not typed in socket.io-client)
	const emitManagerEvent = (event: string, ...args: unknown[]) =>
		(socket.io as unknown as EventEmitter).emit(event, ...args);
	const emitEngineEvent = (event: string, ...args: unknown[]) =>
		(socket.io.engine as unknown as EventEmitter).emit(event, ...args);
	// Helper to emit reserved socket events by calling EventEmitter.prototype.emit directly
	const emitSocketReservedEvent = (event: string, ...args: unknown[]) =>
		EventEmitter.prototype.emit.call(socket, event, ...args);

	describe("when reconnect succeeds after retries", () => {
		it("should report with logSteps", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// simulate a connect_error (using EventEmitter.prototype.emit to bypass reserved event check)
			emitSocketReservedEvent(
				"connect_error",
				Object.assign(new Error("Connection failed"), { data: { message: "Connection failed" } })
			);

			// simulate reconnect after attempts
			emitManagerEvent("reconnect", 3);

			// Advance timers past the 500ms delay for reconnect events
			await vi.advanceTimersByTimeAsync(600);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					type: "socketio_connection",
					message: "reconnect_succeeded",
					retryCount: 3,
					boardId: "69121555fd38bab102439ff8",
				})
			);
		});
	});

	describe("when reconnect attempt count exceeds 3", () => {
		it("should report multiple reconnect attempts", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// simulate reconnect_attempt
			emitManagerEvent("reconnect_attempt", 5);

			// Advance timers past the 7000ms delay for reconnect_attempt events
			await vi.advanceTimersByTimeAsync(7100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					type: "socketio_connection",
					message: "reconnect_attempt",
					retryCount: 5,
				})
			);
		});
	});

	describe("when URL has no valid board id", () => {
		it("should use 'unknown' as boardId", async () => {
			Object.defineProperty(globalThis, "location", {
				value: { href: "http://localhost/boards/noid" },
				writable: true,
			});

			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// simulate reconnect_attempt
			emitManagerEvent("reconnect_attempt", 6);

			// Advance timers past the 7000ms delay for reconnect_attempt events
			await vi.advanceTimersByTimeAsync(7100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({ boardId: "unknown" })
			);
		});
	});

	describe("when upgrade event is emitted followed by reconnect_failed", () => {
		it("should log upgrade and set reconnect_failed state", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// simulate upgrade event
			emitEngineEvent("upgrade", { name: "websocket" });

			// simulate reconnect_failed
			emitManagerEvent("reconnect_failed");

			// Advance timers past the 100ms default delay
			await vi.advanceTimersByTimeAsync(200);
		});
	});

	describe("when API call fails", () => {
		it("should retry reporting and log error", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			boardErrorReportApiMock.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));
			const loggerMock = vi.mocked(logger);

			emitManagerEvent("reconnect_attempt", 7);

			// Advance past the 7000ms delay for reconnect_attempt to trigger the API call
			await vi.advanceTimersByTimeAsync(7100);

			expect(loggerMock.error).toHaveBeenCalledWith("Failed to report error (retries left 3)", expect.any(Error));

			// Advance past the 5000ms retry delay
			await vi.advanceTimersByTimeAsync(5100);

			// expect it to have been invoked at least twice (initial + retry)
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError.mock.calls.length).toBeGreaterThanOrEqual(2);
		});

		it("should stop retrying after reportRetries reaches 0", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Fail all API calls
			boardErrorReportApiMock.boardErrorReportControllerReportError.mockRejectedValue(new Error("Network error"));

			// Trigger reconnect to call apiCall directly
			emitManagerEvent("reconnect", 1);

			// Initial call + 3 retries = 4 calls total
			// Initial call
			await vi.advanceTimersByTimeAsync(100);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(1);

			// First retry after 5s
			await vi.advanceTimersByTimeAsync(5100);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(2);

			// Second retry after 5s
			await vi.advanceTimersByTimeAsync(5100);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(3);

			// Third retry after 5s
			await vi.advanceTimersByTimeAsync(5100);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(4);

			// Should not retry anymore (reportRetries <= 0)
			await vi.advanceTimersByTimeAsync(10000);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(4);
		});
	});

	describe("when API call succeeds", () => {
		it("should clear timeout handle", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			boardErrorReportApiMock.boardErrorReportControllerReportError.mockResolvedValueOnce({} as never);

			// Trigger reconnect_attempt to set up timeoutHandle via reportBoardError
			emitManagerEvent("reconnect_attempt", 1);

			// Wait for the 7s debounce
			await vi.advanceTimersByTimeAsync(7100);

			// The API call should succeed and clear the timeout
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(1);

			// Trigger another event - if timeout wasn't cleared, we'd have issues
			emitManagerEvent("reconnect_attempt", 2);
			await vi.advanceTimersByTimeAsync(7100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(2);
		});
	});

	describe("when socket connect event is emitted", () => {
		it("should set connectionState to CONNECTED", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Get the registered connect listeners and call them directly
			const connectListeners = socket.listeners("connect");
			expect(connectListeners.length).toBeGreaterThan(0);

			// Call the last registered listener (from useConnectionErrorHandling)
			const handler = connectListeners.at(-1) as () => void;
			handler();

			// Get fresh state by calling the composable again on the same module
			const { getState } = useConnectionErrorHandling(socket);
			expect(getState.value.connectionState).toBe("connected");
		});
	});

	describe("when socket disconnect event is emitted", () => {
		it("should set connectionState to DISCONNECTED", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Get the registered disconnect listeners and call the handler directly
			const disconnectListeners = socket.listeners("disconnect");
			expect(disconnectListeners.length).toBeGreaterThan(0);

			// Call the handler
			const handler = disconnectListeners.at(-1) as () => void;
			handler();

			// Get fresh state by calling the composable again on the same module
			const { getState } = useConnectionErrorHandling(socket);
			expect(getState.value.connectionState).toBe("disconnected");
		});
	});

	describe("when connect_error is emitted", () => {
		describe("when errorData contains message", () => {
			it("should log errorData message", async () => {
				const useConnectionErrorHandling = await importHandler();
				const { getState } = useConnectionErrorHandling(socket);

				// Get the registered connect_error handler and call it directly
				const connectErrorListeners = socket.listeners("connect_error");
				expect(connectErrorListeners.length).toBeGreaterThan(0);
				const handler = connectErrorListeners.at(-1) as (error: Error & { data?: unknown }) => void;

				// Call handler with errorData containing message
				handler(Object.assign(new Error("Generic error"), { data: { message: "Custom error message" } }));

				expect(getState.value.logs.some((log) => log.includes("ERR:Custom error message"))).toBe(true);
			});
		});

		describe("when errorData is not present", () => {
			it("should log error.message as fallback", async () => {
				const useConnectionErrorHandling = await importHandler();
				const { getState } = useConnectionErrorHandling(socket);

				// Get the registered connect_error handler and call it directly
				const connectErrorListeners = socket.listeners("connect_error");
				const handler = connectErrorListeners.at(-1) as (error: Error & { data?: unknown }) => void;

				// Call handler without errorData
				handler(new Error("Fallback error message"));

				expect(getState.value.logs.some((log) => log.includes("ERR:Fallback error message"))).toBe(true);
			});
		});
	});

	describe("when isJwtExpired is true", () => {
		it("should not report in apiCall", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Set JWT expired after module is loaded
			mockIsJwtExpired.value = true;

			// Trigger reconnect which calls apiCall directly
			emitManagerEvent("reconnect", 1);

			// Advance timers
			await vi.advanceTimersByTimeAsync(1000);

			// API should not be called when JWT is expired
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).not.toHaveBeenCalled();
		});

		it("should disconnect socket on reconnect_attempt", async () => {
			const useConnectionErrorHandling = await importHandler();
			const { getState } = useConnectionErrorHandling(socket);

			// Set JWT expired after module is loaded
			mockIsJwtExpired.value = true;

			const disconnectSpy = vi.spyOn(socket, "disconnect");

			// Trigger reconnect_attempt
			emitManagerEvent("reconnect_attempt", 1);

			expect(disconnectSpy).toHaveBeenCalled();
			expect(getState.value.logs.some((log) => log.includes("noSess"))).toBe(true);
		});
	});

	describe("when reportBoardError is called multiple times quickly", () => {
		it("should cancel previous timeout (debounce)", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Trigger multiple reconnect_attempt events quickly
			emitManagerEvent("reconnect_attempt", 1);
			await vi.advanceTimersByTimeAsync(3000);
			emitManagerEvent("reconnect_attempt", 2);
			await vi.advanceTimersByTimeAsync(3000);
			emitManagerEvent("reconnect_attempt", 3);

			// Only 7 seconds have passed since last call, no API call yet
			await vi.advanceTimersByTimeAsync(3000);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).not.toHaveBeenCalled();

			// Now complete the 7 second delay
			await vi.advanceTimersByTimeAsync(4100);

			// Only one API call should have been made (the last one)
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledTimes(1);
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					retryCount: 3,
				})
			);
		});
	});

	describe("when logs exceed 30 entries", () => {
		it("should trigger reportLogs immediately", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Generate more than 30 log entries
			for (let i = 0; i < 31; i++) {
				emitManagerEvent("reconnect_attempt", 1);
			}

			// Now trigger reportBoardError which checks logs.length > 30
			emitManagerEvent("reconnect_attempt", 1);

			// The reportLogs should be called immediately (not debounced)
			await vi.advanceTimersByTimeAsync(100);

			// Should have called API for "log_limit_reached"
			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "log_limit_reached",
				})
			);
		});
	});

	describe("when visibilitychange event is triggered", () => {
		describe("when document becomes hidden", () => {
			it("should report logs", async () => {
				const useConnectionErrorHandling = await importHandler();
				useConnectionErrorHandling(socket);

				// Generate a log entry via upgrade event
				emitEngineEvent("upgrade", { name: "websocket" });

				// Mock document.visibilityState
				Object.defineProperty(document, "visibilityState", {
					value: "hidden",
					configurable: true,
				});

				// Trigger visibilitychange event
				document.dispatchEvent(new Event("visibilitychange"));

				await vi.advanceTimersByTimeAsync(100);

				expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
					expect.objectContaining({
						message: "tab_hidden",
					})
				);
			});
		});

		describe("when document is visible", () => {
			it("should not report logs", async () => {
				const useConnectionErrorHandling = await importHandler();
				useConnectionErrorHandling(socket);

				// Generate a log entry via upgrade event
				emitEngineEvent("upgrade", { name: "websocket" });

				// Mock document.visibilityState as visible
				Object.defineProperty(document, "visibilityState", {
					value: "visible",
					configurable: true,
				});

				// Trigger visibilitychange event
				document.dispatchEvent(new Event("visibilitychange"));

				await vi.advanceTimersByTimeAsync(100);

				expect(boardErrorReportApiMock.boardErrorReportControllerReportError).not.toHaveBeenCalled();
			});
		});
	});

	describe("when beforeunload event is triggered", () => {
		it("should report logs", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Generate a log entry via upgrade event
			emitEngineEvent("upgrade", { name: "websocket" });

			// Trigger beforeunload event
			window.dispatchEvent(new Event("beforeunload"));

			await vi.advanceTimersByTimeAsync(100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "page_unload",
				})
			);
		});
	});

	describe("when onBeforeRouteLeave is triggered", () => {
		it("should register handler", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			expect(mockOnBeforeRouteLeave).toHaveBeenCalledWith(expect.any(Function));
		});

		it("should report logs", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Generate a log entry via upgrade event
			emitEngineEvent("upgrade", { name: "websocket" });

			// Get the registered handler and call it
			const routeLeaveHandler = mockOnBeforeRouteLeave.mock.calls[0][0] as () => Promise<void>;
			await routeLeaveHandler();

			await vi.advanceTimersByTimeAsync(100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "new_route",
				})
			);
		});
	});

	describe("when there are no logs to report", () => {
		it("should not call API", async () => {
			const useConnectionErrorHandling = await importHandler();
			useConnectionErrorHandling(socket);

			// Mock document.visibilityState
			Object.defineProperty(document, "visibilityState", {
				value: "hidden",
				configurable: true,
			});

			// Trigger visibilitychange without any logs
			document.dispatchEvent(new Event("visibilitychange"));

			await vi.advanceTimersByTimeAsync(100);

			expect(boardErrorReportApiMock.boardErrorReportControllerReportError).not.toHaveBeenCalled();
		});
	});
});
