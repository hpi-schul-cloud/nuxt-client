import { resetSocketStateForTesting } from "./socket";
import {
	boardResponseFactory,
	expectNotification,
	mockApi,
	mockApiResponse,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { BoardErrorReportApiFactory } from "@api-server";
import { useNotificationStore } from "@data-app";
import { useBoardStore, useCardStore, useSocketConnection } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { Mock, Mocked } from "vitest";
import { useI18n } from "vue-i18n";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
vi.mock("axios");

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("socket.io-client");
const mockSocketIOClient = vi.mocked(socketModule);

vi.mock("../boardActions/boardSocketApi.composable");
vi.mock("../boardActions/boardRestApi.composable");
vi.mock("@api-server/api");

vi.mock("@vueuse/shared", () => ({
	useTimeoutFn: vi.fn().mockImplementation((cb: () => void) => {
		cb();
		return {
			isPending: { value: false },
		};
	}),
}));

const startMock = vi.fn();
const stopMock = vi.fn();
let isPending = false;

vi.mock("@vueuse/shared", () => ({
	useTimeoutFn: vi.fn().mockImplementation((cb: () => void) => {
		cb();
		return {
			isPending: { value: isPending },
			start: startMock,
			stop: stopMock,
		};
	}),
}));

const initializeTimeout = (pending = false) => {
	isPending = pending;
};

const dispatchMock = vi.fn();

type Fn = (...args: unknown[]) => unknown;

describe("socket.ts", () => {
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: Mock };
	// We need to set following lines in the outmost describe level since the socket event handlers that set and use these
	// values are created only once when the module is loaded and initially used.
	let namedSocketHandlers: Record<string, Fn>;
	let boardStore: ReturnType<typeof useBoardStore>;
	let cardStore: ReturnType<typeof useCardStore>;
	let boardErrorReportApi: Mocked<ReturnType<typeof BoardErrorReportApiFactory>>;

	beforeAll(() => {
		timeoutResponseMock = { emitWithAck: vi.fn() };
		mockSocket = {
			connected: false,
			on: vi.fn(),
			emit: vi.fn(),
			connect: vi.fn(),
			disconnect: vi.fn(),
			onAny: vi.fn(),
			timeout: vi.fn().mockReturnValue(timeoutResponseMock),
			io: {
				on: vi.fn(),
				engine: {
					transport: { name: "polling" },
					on: vi.fn(),
				},
			} as unknown as socketModule.Manager,
		};
		mockSocketIOClient.io.mockReturnValue(mockSocket as socketModule.Socket);

		boardErrorReportApi = mockApi<serverApi.BoardErrorReportApi>();
		vi.spyOn(serverApi, "BoardErrorReportApiFactory").mockReturnValue(boardErrorReportApi);

		injectRouterMock(createRouterMock());
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		mountComposable(() => {
			useBoardStore();
			useCardStore();
		});
		mockSocket.connected = true;
	});

	afterEach(() => {
		vi.clearAllMocks();
		resetSocketStateForTesting();
	});

	const getEventCallbacks = (eventName: string): Fn[] => {
		const listeners = (mockSocket.on as Mock).mock.calls
			.filter(([event]) => event === eventName)
			.map(([, callback]) => callback);
		return listeners;
	};

	function getAllEventCallbacks() {
		namedSocketHandlers = namedSocketHandlers ?? {
			connect: () => getEventCallbacks("connect").forEach((cb) => cb()),
			connect_error: (error: Error & { data?: unknown }) =>
				getEventCallbacks("connect_error").forEach((cb) => cb(error)),
			disconnect: () => getEventCallbacks("disconnect").forEach((cb) => cb()),
		};
		return namedSocketHandlers;
	}

	const getOrInitialiseBoardStore = () => {
		boardStore = boardStore ?? mockedPiniaStoreTyping(useBoardStore);
		cardStore = cardStore ?? mockedPiniaStoreTyping(useCardStore);
		return { boardStore, cardStore };
	};

	const setup = (
		options: {
			doInitializeTimeout?: boolean;
			url?: string;
		} = {}
	) => {
		const { doInitializeTimeout } = {
			doInitializeTimeout: false,
			...options,
		};
		getOrInitialiseBoardStore().boardStore.board = boardResponseFactory.build();

		const { emitOnSocket, emitWithAck, disconnectSocket, getConnectedSocket, connected } =
			useSocketConnection(dispatchMock);
		const socket = getConnectedSocket();

		const eventCallbacks = getAllEventCallbacks();

		if (options.doInitializeTimeout !== undefined) {
			initializeTimeout(doInitializeTimeout);
		}

		const triggerServerEvent = (event: string, payload?: unknown) => {
			const calls = (mockSocket.onAny as Mock).mock.calls;
			const listeners = calls.length > 0 ? calls[0] : [];
			for (const listener of listeners) {
				listener(event, payload);
			}
		};

		if (options.url) {
			global.window.location = {
				href: options.url,
			} as unknown as string & Location;
		}

		return {
			socket,
			connected,
			eventCallbacks,
			emitOnSocket,
			emitWithAck,
			disconnectSocket,
			getConnectedSocket,
			triggerServerEvent,
		};
	};

	describe("connect event", () => {
		it("should showSuccess when socket is connected", () => {
			const { eventCallbacks } = setup();
			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expectNotification("success");
		});

		describe("when the client connects for the first time", () => {
			it("should not show 'connection restored' notification", () => {
				const { eventCallbacks } = setup();
				eventCallbacks.connect();

				expect(useNotificationStore().notify).not.toHaveBeenCalled();
				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
				expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
			});
		});

		describe("when the client reconnects", () => {
			it("should show 'connection restored' notification", () => {
				const { eventCallbacks } = setup();

				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expectNotification("success");
			});
		});

		it("should not show connection restored notification and call 'timeout.stop'", () => {
			const { eventCallbacks } = setup({
				doInitializeTimeout: true,
			});

			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(stopMock).toHaveBeenCalled();
			expect(useNotificationStore().notify).not.toHaveBeenCalledWith({
				status: "success",
			});
		});

		it("should report successful connection restoration after retry", () => {
			boardErrorReportApi.boardErrorReportControllerReportError.mockResolvedValue(mockApiResponse({ data: undefined }));
			const { eventCallbacks } = setup({
				doInitializeTimeout: true,
			});

			const mockError = { type: "connect_error", message: "Connection failed" };
			eventCallbacks.connect_error(mockError);
			eventCallbacks.connect();

			expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalled();
		});

		describe("when board doesn't exist", () => {
			it("should not call reloadBoard", () => {
				const { eventCallbacks } = setup();

				getOrInitialiseBoardStore().boardStore.board = undefined;
				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			});
		});
	});

	describe("disconnect event", () => {
		it("should showFailure when socket is disconnected", () => {
			const { eventCallbacks } = setup();
			eventCallbacks.disconnect();
			expectNotification("error");
		});

		// TODO: remove this info: connect_error reporting moved to socket-error-handler tests

		describe("emitOnSocket", () => {
			it("should call emit", () => {
				const { emitOnSocket } = setup();

				emitOnSocket("deleteCard", {});
				expect(mockSocket.emit).toHaveBeenCalledWith("deleteCard", {});
			});

			it("should not call connect if connected already", () => {
				mockSocket.connected = true;
				const { emitOnSocket } = setup();

				emitOnSocket("deleteCard", {});

				expect(mockSocket.connect).not.toHaveBeenCalled();
			});

			it("should call connect if not connected yet", () => {
				mockSocket.connected = false;
				const { emitOnSocket } = setup();

				emitOnSocket("deleteCard", {});

				expect(mockSocket.connect).toHaveBeenCalled();
			});
		});

		describe("emitWithAck", () => {
			it("should call emitWithAck", () => {
				const { emitWithAck } = setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.timeout).toHaveBeenCalledWith(30000);
				expect(timeoutResponseMock.emitWithAck).toHaveBeenCalledWith("deleteCard", {});
			});

			it("should not call connect if connected already", () => {
				mockSocket.connected = true;
				const { emitWithAck } = setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.connect).not.toHaveBeenCalled();
			});

			it("should call connect if not connected yet", () => {
				mockSocket.connected = false;
				const { emitWithAck } = setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.connect).toHaveBeenCalled();
			});
		});

		describe("disconnectSocket", () => {
			it("should do nothing if socket is not connected", () => {
				mockSocket.connected = false;
				const { disconnectSocket } = setup({ doInitializeTimeout: true });

				disconnectSocket();

				expect(mockSocket.disconnect).not.toHaveBeenCalled();
			});

			it("should call disconnect", () => {
				const { eventCallbacks, disconnectSocket } = setup({
					doInitializeTimeout: true,
				});

				eventCallbacks.connect();
				disconnectSocket();

				expect(mockSocket.disconnect).toHaveBeenCalled();
			});

			it("should call stop if timeout is pending", () => {
				const { eventCallbacks, disconnectSocket } = setup({
					doInitializeTimeout: true,
				});

				eventCallbacks.disconnect();
				eventCallbacks.connect();
				disconnectSocket();

				expect(stopMock).toHaveBeenCalled();
			});
		});
	});

	describe("when adding multiple handlers", () => {
		it("should call all dispatchers on incoming event", async () => {
			const { triggerServerEvent, getConnectedSocket, connected } = setup();

			await getConnectedSocket();
			const anotherDispatchMock = vi.fn();
			useSocketConnection(anotherDispatchMock);
			expect(connected.value).toBe(true);

			const eventName = "cardUpdated";
			const payload = { id: "123", title: "Neu" };
			triggerServerEvent(eventName, payload);

			expect(anotherDispatchMock).toHaveBeenCalledWith({ type: eventName, payload });
			expect(dispatchMock).toHaveBeenCalledWith({ type: eventName, payload });
		});
	});

	describe("when connect_error happens", () => {
		describe("when session ID became unknown", () => {
			const getSessionIdUnknownError = () => ({
				type: "connect_error",
				message: "Session ID unknown",
				data: {
					code: 1,
					message: "Session ID unknown",
					status: 400,
				},
			});

			it("should notify error, report board error and disconnect socket", async () => {
				const { eventCallbacks, socket, getConnectedSocket } = setup();

				await getConnectedSocket();
				const mockError = getSessionIdUnknownError();
				eventCallbacks.connect_error(mockError);

				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
					expect.objectContaining({
						type: "session_id_unknown",
						message: "Session ID unknown - automatically reset connection.",
					})
				);
				expect(socket?.disconnect).toHaveBeenCalled();
			});

			describe("when reporting the board error fails", () => {
				it("should not throw error", () => {
					vi.spyOn(logger, "error").mockImplementation(vi.fn());
					const { eventCallbacks } = setup();
					boardErrorReportApi.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));

					const mockError = getSessionIdUnknownError();
					expect(() => eventCallbacks.connect_error(mockError)).not.toThrow();
				});

				it("should call logger.error", async () => {
					const { eventCallbacks } = setup();

					logger.error = vi.fn();
					boardErrorReportApi.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));

					const mockError = getSessionIdUnknownError();
					await eventCallbacks.connect_error(mockError);

					expect(logger.error).toHaveBeenCalledWith(
						"Failed to report error - will retry in 5 seconds",
						expect.any(Error)
					);
				});
			});
		});

		describe("when error is general connection error", () => {
			describe("when less than three connection attempts have failed", () => {
				it("should not report the error (usual hiccups on websocket connection)", () => {
					const { eventCallbacks } = setup();

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).not.toHaveBeenCalled();
				});
			});

			describe("when three connection attempts have failed", () => {
				it("should report the error with the right retryCount", () => {
					const { eventCallbacks } = setup();

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenLastCalledWith(
						expect.objectContaining({
							retryCount: 2,
						})
					);
				});
			});

			describe("when url does not contain board id", () => {
				it("should report board error with correct parameters and boardId:unknown", () => {
					const { eventCallbacks } = setup({ url: "http://test.com/boards/noid" });

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
						expect.objectContaining({
							boardId: "unknown",
							type: "connect_error",
							message: "Test error message",
							retryCount: 4,
						})
					);
				});
			});

			describe("when url contains board id", () => {
				it("should report board error with correct parameters and extracted boardId", () => {
					const { eventCallbacks } = setup({ url: "http://localhost:4000/boards/69121555fd38bab102439ff8" });

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
						expect.objectContaining({
							boardId: "69121555fd38bab102439ff8",
							type: "connect_error",
							message: "Test error message",
							retryCount: 4,
						})
					);
				});
			});
		});

		describe("when connection is re-established", () => {
			it("should reset retry count", () => {
				const { eventCallbacks } = setup();

				const mockError = { type: "test_error", message: "Test error message" };
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect();

				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenLastCalledWith(
					expect.objectContaining({
						type: "connect_after_retry",
						retryCount: 2,
					})
				);
			});
		});
	});
});
