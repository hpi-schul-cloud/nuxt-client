import * as serverApi from "@/serverApi/v3/api";
import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import {
	boardResponseFactory,
	expectNotification,
	mockApiResponse,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { useBoardStore, useSocketConnection, useCardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";
import { useNotificationStore } from "@data-app";
vi.mock("axios");

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("socket.io-client");
const mockSocketIOClient = vi.mocked(socketModule);

vi.mock("../boardActions/boardSocketApi.composable");
vi.mock("../boardActions/boardRestApi.composable");

vi.mock("@vueuse/shared", () => {
	return {
		useTimeoutFn: vi.fn().mockImplementation((cb: () => void) => {
			cb();
			return {
				isPending: { value: false },
			};
		}),
	};
});

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
	let socketHandlers: Record<string, (arg?: unknown) => void> | undefined =
		undefined;
	let boardStore: ReturnType<typeof useBoardStore>;
	let cardStore: ReturnType<typeof useCardStore>;
	let boardErrorReportApi: DeepMocked<
		ReturnType<typeof BoardErrorReportApiFactory>
	>;

	beforeAll(() => {
		setActivePinia(createTestingPinia());

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
		vi.spyOn(serverApi, "BoardErrorReportApiFactory").mockReturnValue(
			boardErrorReportApi
		);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	beforeEach(() => {
		mockSocket.connected = true;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const getEventCallback = (eventName: string) => {
		const listener = (mockSocket.on as Mock).mock.calls.find(
			([event]) => event === eventName
		);
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

	const setup = (
		options: {
			isInitialConnection?: boolean;
			doInitializeTimeout?: boolean;
		} = {}
	) => {
		const { isInitialConnection, doInitializeTimeout } = {
			isInitialConnection: true,
			doInitializeTimeout: false,
			...options,
		};
		getOrInitialiseBoardStore().boardStore.board = boardResponseFactory.build();

		useSocketConnection(dispatchMock, { isInitialConnection });

		const eventCallbacks = getEventCallbacks();
		const { emitOnSocket, emitWithAck, disconnectSocket } =
			useSocketConnection(dispatchMock);

		if (options.doInitializeTimeout !== undefined) {
			initializeTimeout(doInitializeTimeout);
		}

		return {
			eventCallbacks,
			emitOnSocket,
			emitWithAck,
			disconnectSocket,
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
				const { eventCallbacks } = setup({ isInitialConnection: true });
				eventCallbacks.connect();

				expect(useNotificationStore().notify).not.toHaveBeenCalled();
				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
				expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
			});
		});

		describe("when the client reconnects", () => {
			it("should show 'connection restored' notification", () => {
				const { eventCallbacks } = setup({
					isInitialConnection: false,
				});

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
			const { eventCallbacks } = setup({
				doInitializeTimeout: true,
			});
			boardErrorReportApi.boardErrorReportControllerReportError.mockResolvedValue(
				mockApiResponse({ data: {} })
			);

			const mockError = { type: "connect_error", message: "Connection failed" };
			eventCallbacks.connect_error(mockError);
			eventCallbacks.connect();

			expect(
				boardErrorReportApi.boardErrorReportControllerReportError
			).toHaveBeenCalled();
		});

		describe("when board exists", () => {
			it("should call reloadBoard", () => {
				const { eventCallbacks } = setup({
					doInitializeTimeout: false,
				});
				eventCallbacks.disconnect();
				eventCallbacks.connect();

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});
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

		describe("connect_error event", () => {
			it("should report board error and show failure notification", () => {
				const { eventCallbacks } = setup();

				const mockError = {
					type: "connect_error",
					message: "Connection failed",
				};
				eventCallbacks.connect_error(mockError);
				nextTick();

				expect(
					boardErrorReportApi.boardErrorReportControllerReportError
				).toHaveBeenCalledWith(expect.objectContaining(mockError));
			});

			it("should show error after 20 retries", () => {
				const { eventCallbacks } = setup();

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
				expect(timeoutResponseMock.emitWithAck).toHaveBeenCalledWith(
					"deleteCard",
					{}
				);
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
			it("should call disconnect", () => {
				const { disconnectSocket } = setup();

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
});
