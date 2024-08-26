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
import { isInitialConnection } from "./socket";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("socket.io-client");
const mockSocketIOClient = jest.mocked(socketModule);

jest.mock("@util-board/BoardNotifier.composable");
const mockUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("../boardActions/boardSocketApi.composable");
jest.mock("../boardActions/boardRestApi.composable");

jest.mock("@vueuse/shared", () => {
	return {
		...jest.requireActual("@vueuse/shared"),
		useTimeoutFn: jest.fn().mockImplementation((cb) => {
			cb();
			return {
				isPending: { value: false },
				start: jest.fn(),
				stop: jest.fn(),
			};
		}),
	};
});

describe("socket.ts", () => {
	let dispatchMock: jest.Mock;
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: jest.Mock };
	let mockBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let socketHandlers: Record<string, () => void> | undefined = undefined;
	let boardStore: ReturnType<typeof useBoardStore>;
	let cardStore: ReturnType<typeof useCardStore>;

	const startMock = jest.fn();
	const stopMock = jest.fn();
	const initializeTimeout = (isPending = false) => {
		const { useTimeoutFn } = jest.requireMock("@vueuse/shared");
		useTimeoutFn.mockImplementation((cb: any) => {
			cb();
			return {
				isPending: { value: isPending },
				start: startMock,
				stop: stopMock,
			};
		});
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			BOARD_COLLABORATION_URI: "mockedUri",
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);

		timeoutResponseMock = { emitWithAck: jest.fn() };
		mockSocket = {
			connected: false,
			on: jest.fn(),
			emit: jest.fn(),
			connect: jest.fn(),
			disconnect: jest.fn(),
			onAny: jest.fn(),
			timeout: jest.fn().mockReturnValue(timeoutResponseMock),
		};
		mockSocketIOClient.io.mockReturnValue(mockSocket as socketModule.Socket);

		mockBoardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockUseBoardNotifier.mockReturnValue(mockBoardNotifierCalls);
	});

	jest.useFakeTimers();

	beforeEach(() => {
		dispatchMock = jest.fn();
		mockSocket.connected = true;
		initializeTimeout();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getEventCallback = (eventName: string) => {
		const listener = (mockSocket.on as jest.Mock).mock.calls.find(
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

	describe("connect event", () => {
		it("should showSuccess when socket is connected", () => {
			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.disconnect();
			jest.clearAllMocks();

			eventCallbacks.connect();

			expect(mockBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
				"common.notification.connection.restored"
			);
		});

		it("should not show connection restored notification when 'isInitialConnection' is true", () => {
			getOrInitialiseBoardStore();
			isInitialConnection.value = true;
			jest.clearAllMocks();
			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.connect();

			expect(mockBoardNotifierCalls.showSuccess).not.toHaveBeenCalled();
			expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
		});

		it("should show connection restored notification when 'isInitialConnection' is false", () => {
			getOrInitialiseBoardStore();
			isInitialConnection.value = false;
			jest.clearAllMocks();
			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.connect();

			expect(mockBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
				"common.notification.connection.restored"
			);
		});

		it("should not show connection restored notification and should call 'timeout.stop'", () => {
			initializeTimeout(true);

			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.disconnect();
			jest.clearAllMocks();

			eventCallbacks.connect();

			expect(stopMock).toHaveBeenCalled();
			expect(mockBoardNotifierCalls.showSuccess).not.toHaveBeenCalledWith(
				"common.notification.connection.restored"
			);
		});

		describe("when board exists", () => {
			beforeEach(() => {
				getOrInitialiseBoardStore().boardStore.board =
					boardResponseFactory.build();
			});

			afterEach(() => {
				getOrInitialiseBoardStore().boardStore.board = undefined;
			});

			it("should reloadBoard when socket is connected", () => {
				useSocketConnection(dispatchMock);

				const eventCallbacks = getEventCallbacks();

				eventCallbacks.disconnect();
				jest.clearAllMocks();

				eventCallbacks.connect();

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});
		});

		it("should not reloadBoard when socket is connected and board not exists", () => {
			getOrInitialiseBoardStore();
			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.disconnect();
			jest.clearAllMocks();

			eventCallbacks.connect();

			expect(boardStore.reloadBoard).not.toHaveBeenCalled();
		});
	});

	describe("disconnect event", () => {
		it("should showFailure when socket is disconnected", () => {
			useSocketConnection(dispatchMock);

			const eventCallbacks = getEventCallbacks();

			eventCallbacks.disconnect();

			expect(mockBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"error.4500"
			);
		});
	});

	describe("emitOnSocket", () => {
		it("should call emit", () => {
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.emit).toHaveBeenCalledWith("deleteCard", {});
		});

		it("should not call connect if connected already", () => {
			mockSocket.connected = true;
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.connect).not.toHaveBeenCalled();
		});

		it("should call connect if not connected yet", () => {
			mockSocket.connected = false;
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.connect).toHaveBeenCalled();
		});
	});

	describe("emitWithAck", () => {
		it("should call emitWithAck", () => {
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.timeout).toHaveBeenCalledWith(30000);
			expect(timeoutResponseMock.emitWithAck).toHaveBeenCalledWith(
				"deleteCard",
				{}
			);
		});

		it("should not call connect if connected already", () => {
			mockSocket.connected = true;
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.connect).not.toHaveBeenCalled();
		});

		it("should call connect if not connected yet", () => {
			mockSocket.connected = false;
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.connect).toHaveBeenCalled();
		});
	});

	describe("disconnectSocket", () => {
		it("should call disconnect", () => {
			const { disconnectSocket } = useSocketConnection(dispatchMock);

			disconnectSocket();

			expect(mockSocket.disconnect).toHaveBeenCalled();
		});

		it("should call stop if timeout is pending", () => {
			initializeTimeout(true);
			useSocketConnection(dispatchMock);
			const eventCallbacks = getEventCallbacks();
			eventCallbacks.disconnect();
			jest.clearAllMocks();

			eventCallbacks.connect();
			const { disconnectSocket } = useSocketConnection(dispatchMock);
			disconnectSocket();

			expect(stopMock).toHaveBeenCalled();
		});
	});
});
