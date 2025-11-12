import { __resetSocketStateForTesting, useSocketConnection } from "./socket";
import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { boardResponseFactory, expectNotification, mockApiResponse, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useNotificationStore } from "@data-app";
import { useBoardStore, useCardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";
vi.mock("axios");

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("socket.io-client");
const mockSocketIOClient = vi.mocked(socketModule);

vi.mock("../boardActions/boardSocketApi.composable");
vi.mock("../boardActions/boardRestApi.composable");

vi.mock("@vueuse/shared", () => ({
	useTimeoutFn: vi.fn().mockImplementation((cb: () => void) => {
		cb();
		return {
			isPending: { value: false },
		};
	}),
}));

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

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

describe("socket.ts", () => {
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: Mock };
	// We need to set following lines in the outmost describe level since the socket event handlers that set and use these
	// values are created only once when the module is loaded and initially used.
	let socketHandlers: Record<string, (arg?: unknown) => void> | undefined = undefined;
	let boardStore: ReturnType<typeof useBoardStore>;
	let cardStore: ReturnType<typeof useCardStore>;
	let boardErrorReportApi: DeepMocked<ReturnType<typeof BoardErrorReportApiFactory>>;

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
		};
		mockSocketIOClient.io.mockReturnValue(mockSocket as socketModule.Socket);

		boardErrorReportApi = createMock<serverApi.BoardErrorReportApi>();
		vi.spyOn(serverApi, "BoardErrorReportApiFactory").mockReturnValue(boardErrorReportApi);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		mockSocket.connected = true;
	});

	afterEach(() => {
		vi.clearAllMocks();
		// Reset the global socket state to ensure test isolation
		__resetSocketStateForTesting();
	});

	const getEventCallback = (eventName: string) => {
		const listener = (mockSocket.on as Mock).mock.calls.find(([event]) => event === eventName);
		return listener?.[1];
	};

	function getEventCallbacks() {
		socketHandlers = socketHandlers ?? {
			connect: getEventCallback("connect"),
			connect_error: getEventCallback("connect_error"),
			disconnect: getEventCallback("disconnect"),
		};
		return socketHandlers;
	}

	const getOrInitialiseBoardStore = () => {
		boardStore = boardStore ?? mockedPiniaStoreTyping(useBoardStore);
		cardStore = cardStore ?? mockedPiniaStoreTyping(useCardStore);
		return { boardStore, cardStore };
	};

	const setup = async (
		options: {
			isInitialConnection?: boolean;
			doInitializeTimeout?: boolean;
			url?: string;
		} = {}
	) => {
		const { isInitialConnection, doInitializeTimeout } = {
			isInitialConnection: true,
			doInitializeTimeout: false,
			...options,
		};
		getOrInitialiseBoardStore().boardStore.board = boardResponseFactory.build();

		useSocketConnection(dispatchMock, { isInitialConnection });
		const { emitOnSocket, emitWithAck, disconnectSocket, getConnectedSocket } = useSocketConnection(dispatchMock);
		const socket = await getConnectedSocket();

		const eventCallbacks = getEventCallbacks();

		if (options.doInitializeTimeout !== undefined) {
			initializeTimeout(doInitializeTimeout);
		}

		const triggerServerEvent = (event: string, payload?: unknown) => {
			const calls = (mockSocket.onAny as Mock).mock.calls;
			const listener = calls.length > 0 ? calls[0][0] : vi.fn();
			listener(event, payload);
		};

		if (options.url) {
			global.window.location = {
				href: options.url,
			} as unknown as string & Location;
		}

		return {
			socket,
			eventCallbacks,
			emitOnSocket,
			emitWithAck,
			disconnectSocket,
			triggerServerEvent,
		};
	};

	describe("connect event", () => {
		it("should showSuccess when socket is connected", () => async () => {
			const { eventCallbacks } = await setup();
			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expectNotification("success");
		});

		describe("when the client connects for the first time", () => {
			it("should not show 'connection restored' notification", async () => {
				const { eventCallbacks } = await setup({ isInitialConnection: true });
				eventCallbacks.connect();

				expect(useNotificationStore().notify).not.toHaveBeenCalled();
				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
				expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
			});
		});

		describe("when the client reconnects", () => {
			it("should show 'connection restored' notification", async () => {
				const { eventCallbacks } = await setup({
					isInitialConnection: false,
				});

				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expectNotification("success");
			});
		});

		it("should not show connection restored notification and call 'timeout.stop'", async () => {
			const { eventCallbacks } = await setup({
				doInitializeTimeout: true,
			});

			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(stopMock).toHaveBeenCalled();
			expect(useNotificationStore().notify).not.toHaveBeenCalledWith({
				status: "success",
			});
		});

		it("should report successful connection restoration after retry", async () => {
			const { eventCallbacks } = await setup({
				doInitializeTimeout: true,
			});
			boardErrorReportApi.boardErrorReportControllerReportError.mockResolvedValue(mockApiResponse({ data: {} }));

			const mockError = { type: "connect_error", message: "Connection failed" };
			eventCallbacks.connect_error(mockError);
			eventCallbacks.connect();

			expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalled();
		});

		describe("when board exists", () => {
			it("should call reloadBoard", async () => {
				const { eventCallbacks } = await setup({
					doInitializeTimeout: false,
				});
				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});
		});

		describe("when board doesn't exist", () => {
			it("should not call reloadBoard", async () => {
				const { eventCallbacks } = await setup();

				getOrInitialiseBoardStore().boardStore.board = undefined;
				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			});
		});
	});

	describe("disconnect event", () => {
		it("should showFailure when socket is disconnected", async () => {
			const { eventCallbacks } = await setup();
			eventCallbacks.disconnect();
			expectNotification("error");
		});

		describe("connect_error event", () => {
			it("should report board error and show failure notification", async () => {
				const { eventCallbacks } = await setup();

				const mockError = {
					type: "connect_error",
					message: "Connection failed",
				};
				eventCallbacks.connect_error(mockError);
				nextTick();

				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
					expect.objectContaining(mockError)
				);
			});

			it("should show error after 20 retries", async () => {
				const { eventCallbacks } = await setup();

				const mockError = {
					type: "connect_error",
					message: "Connection failed",
				};
				for (let i = 0; i < 22; i++) {
					eventCallbacks.connect_error(mockError);
				}

				expectNotification("error");
			});
		});

		describe("emitOnSocket", () => {
			it("should call emit", async () => {
				const { emitOnSocket } = await setup();

				emitOnSocket("deleteCard", {});
				expect(mockSocket.emit).toHaveBeenCalledWith("deleteCard", {});
			});

			it("should not call connect if connected already", async () => {
				mockSocket.connected = true;
				const { emitOnSocket } = await setup();

				emitOnSocket("deleteCard", {});

				expect(mockSocket.connect).not.toHaveBeenCalled();
			});

			it("should call connect if not connected yet", async () => {
				mockSocket.connected = false;
				const { emitOnSocket } = await setup();

				emitOnSocket("deleteCard", {});

				expect(mockSocket.connect).toHaveBeenCalled();
			});
		});

		describe("emitWithAck", () => {
			it("should call emitWithAck", async () => {
				const { emitWithAck } = await setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.timeout).toHaveBeenCalledWith(30000);
				expect(timeoutResponseMock.emitWithAck).toHaveBeenCalledWith("deleteCard", {});
			});

			it("should not call connect if connected already", async () => {
				mockSocket.connected = true;
				const { emitWithAck } = await setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.connect).not.toHaveBeenCalled();
			});

			it("should call connect if not connected yet", async () => {
				mockSocket.connected = false;
				const { emitWithAck } = await setup();

				emitWithAck("deleteCard", {});

				expect(mockSocket.connect).toHaveBeenCalled();
			});
		});

		describe("disconnectSocket", () => {
			it("should do nothing if socket is not connected", async () => {
				mockSocket.connected = false;
				const { disconnectSocket } = await setup({ doInitializeTimeout: true });

				disconnectSocket();

				expect(mockSocket.disconnect).not.toHaveBeenCalled();
			});

			it("should call disconnect", async () => {
				const { disconnectSocket } = await setup();

				disconnectSocket();

				expect(mockSocket.disconnect).toHaveBeenCalled();
			});

			it("should call stop if timeout is pending", async () => {
				const { eventCallbacks, disconnectSocket } = await setup({
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
		it("should call all handlers on incoming event", async () => {
			const { triggerServerEvent } = await setup();

			const anotherDispatchMock = vi.fn();
			useSocketConnection(anotherDispatchMock);

			const eventName = "cardUpdated";
			const payload = { id: "123", title: "Neu" };
			triggerServerEvent(eventName, payload);

			expect(dispatchMock).toHaveBeenCalledWith({ type: eventName, payload });
			expect(anotherDispatchMock).toHaveBeenCalledWith({ type: eventName, payload });
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
				const { eventCallbacks, socket } = await setup();

				const mockError = getSessionIdUnknownError();
				eventCallbacks.connect_error(mockError);

				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
					expect.objectContaining({
						type: "session_id_unknown",
						message: "Session ID unknown - automatically reset connection.",
					})
				);
				expect(socket.disconnect).toHaveBeenCalled();
			});

			describe("when reporting the board error fails", () => {
				it("should not throw error", async () => {
					const { eventCallbacks } = await setup();
					boardErrorReportApi.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));

					const mockError = getSessionIdUnknownError();
					expect(() => eventCallbacks.connect_error(mockError)).not.toThrow();
				});

				it("should call logger.error", async () => {
					const { eventCallbacks } = await setup();

					logger.error = vi.fn();
					boardErrorReportApi.boardErrorReportControllerReportError.mockRejectedValueOnce(new Error("Network error"));

					const mockError = getSessionIdUnknownError();
					await eventCallbacks.connect_error(mockError);

					expect(logger.error).toHaveBeenCalledWith("Failed to report error", expect.any(Error));
				});
			});
		});

		describe("when error is general connection error", () => {
			describe("when url does not contain board id", () => {
				it("should report board error with correct parameters and boardId:unknown", async () => {
					const { eventCallbacks } = await setup({ url: "http://test.com/boards/noid" });

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
						expect.objectContaining({
							boardId: "unknown",
							type: "connect_error",
							message: "Test error message",
							retryCount: 0,
						})
					);
				});
			});

			describe("when url contains board id", () => {
				it("should report board error with correct parameters and extracted boardId", async () => {
					const { eventCallbacks } = await setup({ url: "http://localhost:4000/boards/69121555fd38bab102439ff8" });

					const mockError = { type: "test_error", message: "Test error message" };
					eventCallbacks.connect_error(mockError);

					expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
						expect.objectContaining({
							boardId: "69121555fd38bab102439ff8",
							type: "connect_error",
							message: "Test error message",
							retryCount: 0,
						})
					);
				});
			});
		});
	});
});
