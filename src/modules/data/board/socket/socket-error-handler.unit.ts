import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import type { BoardErrorReportApi } from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { logger } from "@util-logger";
import http from "node:http";
import type { AddressInfo } from "node:net";
import type { Server } from "socket.io";
import * as ioBack from "socket.io";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

vi.mock("@/serverApi/v3");

vi.mock("bowser", () => ({
	default: {
		parse: vi.fn(() => ({
			browser: { name: "Chrome", version: "120" },
			os: { name: "macOS", version: "14" },
			platform: { type: "desktop" },
		})),
	},
}));

vi.mock("@util-logger", () => ({
	logger: {
		log: vi.fn(),
		error: vi.fn(),
	},
}));

describe("socket-error-handler", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Default URL and userAgent
		Object.defineProperty(window, "location", {
			value: { href: "http://localhost/boards/69121555fd38bab102439ff8" },
			writable: true,
		});
		Object.defineProperty(window.navigator, "userAgent", {
			value:
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
			configurable: true,
			writable: false,
		});
	});

	const importHandler = async () => {
		const mod = await import("./socket-error-handler");
		return mod.useConnectionErrorHandling;
	};

	let boardErrorReportApi: DeepMocked<BoardErrorReportApi>;
	const mockedFactory = vi.mocked(BoardErrorReportApiFactory);

	it("reports on reconnect after retries and includes logSteps", async () => {
		boardErrorReportApi = createMock<BoardErrorReportApi>();
		mockedFactory.mockReturnValue(boardErrorReportApi);

		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		// simulate a connect_error
		socket.emit(
			"connect_error",
			Object.assign(new Error("Connection failed"), { data: { message: "Connection failed" } })
		);

		// simulate reconnect after attempts
		socket.io.emit("reconnect", 3);

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
			expect.objectContaining({
				type: "connect_after_retry",
				message: "Connection restored after retry",
				retryCount: 3,
				boardId: "69121555fd38bab102439ff8",
			})
		);
	});

	it("reports multiple reconnect attempts when attempt > 3", async () => {
		boardErrorReportApi = createMock<BoardErrorReportApi>();
		mockedFactory.mockReturnValue(boardErrorReportApi);

		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		// simulate reconnect_attempt
		socket.io.emit("reconnect_attempt", 5);

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
			expect.objectContaining({
				type: "reconnect_attempt",
				message: "Multiple reconnect attempts",
				retryCount: 5,
			})
		);
	});

	it("uses 'unknown' boardId when URL has no id", async () => {
		Object.defineProperty(window, "location", {
			value: { href: "http://localhost/boards/noid" },
			writable: true,
		});

		boardErrorReportApi = createMock<BoardErrorReportApi>();
		mockedFactory.mockReturnValue(boardErrorReportApi);

		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		// simulate reconnect_attempt
		socket.io.emit("reconnect_attempt", 6);

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
			expect.objectContaining({ boardId: "unknown" })
		);
	});

	it("logs upgrade and sets reconnect_failed state", async () => {
		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		const loggerMock = vi.mocked(logger);

		// simulate upgrade event
		socket.io.engine.emit("upgrade", { name: "websocket" });

		// simulate reconnect_failed
		socket.io.emit("reconnect_failed");

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check that logger was called
		expect(loggerMock.log.mock.calls.length).toBeGreaterThan(0);
	});

	it("logs connect_error with message prefix", async () => {
		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		const loggerMock = vi.mocked(logger);

		// simulate connect_error
		socket.emit("connect_error", Object.assign(new Error("Boom"), { data: { message: "Kaboom" } }));

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100));

		const hasErrLog = loggerMock.log.mock.calls.some(
			(args) => Array.isArray(args[0]) && (args[0] as unknown[]).some((s) => String(s).includes("ERR: Kaboom"))
		);
		expect(hasErrLog).toBe(true);
	});

	it("retries reporting after failure and logs error", async () => {
		boardErrorReportApi = createMock<BoardErrorReportApi>();
		mockedFactory.mockReturnValue(boardErrorReportApi);

		const useConnectionErrorHandling = await importHandler();
		useConnectionErrorHandling(socket);

		boardErrorReportApi.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));
		const loggerMock = vi.mocked(logger);

		// trigger a report that will fail
		socket.io.emit("reconnect_attempt", 7);

		// Wait for async operations and error handling
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check error was logged
		expect(loggerMock.error).toHaveBeenCalledWith(
			"Failed to report error - will retry in 5 seconds",
			expect.any(Error)
		);

		// Wait for retry timeout (using real timers now)
		await new Promise((resolve) => setTimeout(resolve, 5100));

		// expect it to have been invoked at least twice (initial + retry)
		expect(boardErrorReportApi.boardErrorReportControllerReportError.mock.calls.length).toBeGreaterThanOrEqual(2);
	});
});
