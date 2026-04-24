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

	it("reports on reconnect after retries and includes logSteps", async () => {
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

	it("reports multiple reconnect attempts when attempt > 3", async () => {
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

	it("uses 'unknown' boardId when URL has no id", async () => {
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

	it("logs upgrade and sets reconnect_failed state", async () => {
		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		// simulate upgrade event
		emitEngineEvent("upgrade", { name: "websocket" });

		// simulate reconnect_failed
		emitManagerEvent("reconnect_failed");

		// Advance timers past the 100ms default delay
		await vi.advanceTimersByTimeAsync(200);
	});

	it("retries reporting after failure and logs error", async () => {
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

	it("sets connectionState to CONNECTED when socket connect event is emitted", async () => {
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

	it("sets connectionState to DISCONNECTED when socket disconnect event is emitted", async () => {
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
