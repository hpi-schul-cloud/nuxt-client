import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import {
	boardResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardStore, useSocketConnection, useCardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";

vi.mock("vue-i18n");
(useI18n as vi.Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("socket.io-client");
const mockSocketIOClient = vi.mocked(socketModule);

vi.mock("@util-board/BoardNotifier.composable");
const mockUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock("../boardActions/boardSocketApi.composable");
vi.mock("../boardActions/boardRestApi.composable");

vi.mock("@vueuse/shared", () => {
	return {
		...vi.requireActual("@vueuse/shared"),
		useTimeoutFn: vi.fn().mockImplementation((cb: () => void) => {
			cb();
			return {
				isPending: { value: false },
			};
		}),
	};
});

vi.mock("vue-router");
const useRouterMock = <vi.Mock>useRouter;

const startMock = vi.fn();
const stopMock = vi.fn();
const initializeTimeout = (isPending = false) => {
	const { useTimeoutFn } = vi.requireMock("@vueuse/shared");
	useTimeoutFn.mockImplementation((cb: () => void) => {
		cb();
		return {
			isPending: { value: isPending },
			start: startMock,
			stop: stopMock,
		};
	});
};

const dispatchMock = vi.fn();

describe("socket.ts", () => {
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: vi.Mock };
	let mockBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	// We need to set following lines in the outmost describe level since the socket event handlers that set and use these
	// values are created only once when the module is loaded and initially used.
	let socketHandlers: Record<string, () => void> | undefined = undefined;
	let boardStore: ReturnType<typeof useBoardStore>;
	let cardStore: ReturnType<typeof useCardStore>;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			BOARD_COLLABORATION_URI: "mockedUri",
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);

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

		mockBoardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockUseBoardNotifier.mockReturnValue(mockBoardNotifierCalls);

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
		const listener = (mockSocket.on as vi.Mock).mock.calls.find(
			([event]) => event === eventName
		);
		return listener?.[1];
	};

	function getEventCallbacks() {
		socketHandlers = socketHandlers ?? {
			connect: getEventCallback("connect"),
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
		return { eventCallbacks, emitOnSocket, emitWithAck, disconnectSocket };
	};

	describe("connect event", () => {
		it("should showSuccess when socket is connected", () => {
			const { eventCallbacks } = setup();
			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(mockBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
				"common.notification.connection.restored"
			);
		});

		describe("when the client connects for the first time", () => {
			it("should not show 'connection restored' notification", () => {
				const { eventCallbacks } = setup({ isInitialConnection: true });
				eventCallbacks.connect();

				expect(mockBoardNotifierCalls.showSuccess).not.toHaveBeenCalled();
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

				expect(mockBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
					"common.notification.connection.restored"
				);
			});
		});

		it("should not show connection restored notification and call 'timeout.stop'", () => {
			const { eventCallbacks } = setup({
				doInitializeTimeout: true,
			});

			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(stopMock).toHaveBeenCalled();
			expect(mockBoardNotifierCalls.showSuccess).not.toHaveBeenCalledWith(
				"common.notification.connection.restored"
			);
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

			expect(mockBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"error.4500"
			);
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
