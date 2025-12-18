import { resetSocketStateForTesting } from "./socket";
import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { boardResponseFactory, expectNotification, mockApiResponse, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useNotificationStore } from "@data-app";
import { useBoardStore, useCardStore, useSocketConnection } from "@data-board";
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
vi.mock("@/serverApi/v3/api");

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

type Fn = (...args: unknown[]) => unknown;

describe("socket.ts", () => {
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: Mock };
	// We need to set following lines in the outmost describe level since the socket event handlers that set and use these
	// values are created only once when the module is loaded and initially used.
	let namedSocketHandlers: Record<string, Fn>;
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
		resetSocketStateForTesting();
	});

	const getEventCallbacks = (eventName: string): Fn[] => {
		const listeners = (mockSocket.on as Mock).mock.calls
			.filter(([event]) => event === eventName)
			.map(([_, callback]) => callback);
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

	const setup = async (
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
		const socket = await getConnectedSocket();

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
		it("should showSuccess when socket is connected", () => async () => {
			const { eventCallbacks } = await setup();
			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expectNotification("success");
		});

		describe("when the client connects for the first time", () => {
			it("should not show 'connection restored' notification", async () => {
				const { eventCallbacks } = await setup();
				eventCallbacks.connect();

				expect(useNotificationStore().notify).not.toHaveBeenCalled();
				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
				expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
			});
		});

		describe("when the client reconnects", () => {
			it("should show 'connection restored' notification", async () => {
				const { eventCallbacks } = await setup();

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
			boardErrorReportApi.boardErrorReportControllerReportError.mockResolvedValue(mockApiResponse({ data: {} }));
			const { eventCallbacks } = await setup({
				doInitializeTimeout: true,
			});

			const mockError = { type: "connect_error", message: "Connection failed" };
			eventCallbacks.connect_error(mockError);
			eventCallbacks.connect();

			expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalled();
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
			it("should report board error and show failure notification for every 5th retry", async () => {
				const { eventCallbacks } = await setup();

				const mockError = {
					type: "connect_error",
					message: "Connection failed",
				};
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
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
				const { eventCallbacks, disconnectSocket } = await setup({
					doInitializeTimeout: true,
				});

				eventCallbacks.connect();
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
		it("should call all dispatchers on incoming event", async () => {
			const { triggerServerEvent, getConnectedSocket, connected } = await setup();

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
				const { eventCallbacks, socket, getConnectedSocket } = await setup();

				await getConnectedSocket();
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
			it("should increment retry count", async () => {
				const { eventCallbacks } = await setup();

				const mockError = { type: "test_error", message: "Test error message" };
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenCalledWith(
					expect.objectContaining({
						retryCount: 4,
					})
				);
				// for (let i = 0; i <= 5; i++) {
				// 	eventCallbacks.connect_error(mockError);
				// 	expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenLastCalledWith(
				// 		expect.objectContaining({
				// 			retryCount: i,
				// 		})
				// 	);
				// }
			});

			describe("when url does not contain board id", () => {
				it("should report board error with correct parameters and boardId:unknown", async () => {
					const { eventCallbacks } = await setup({ url: "http://test.com/boards/noid" });

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
				it("should report board error with correct parameters and extracted boardId", async () => {
					const { eventCallbacks } = await setup({ url: "http://localhost:4000/boards/69121555fd38bab102439ff8" });

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
			it("should reset retry count", async () => {
				const { eventCallbacks } = await setup();

				const mockError = { type: "test_error", message: "Test error message" };
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect_error(mockError);
				eventCallbacks.connect();

				expect(boardErrorReportApi.boardErrorReportControllerReportError).toHaveBeenLastCalledWith(
					expect.objectContaining({
						type: "connect after retry",
						retryCount: 2,
					})
				);
			});
		});
	});
});
