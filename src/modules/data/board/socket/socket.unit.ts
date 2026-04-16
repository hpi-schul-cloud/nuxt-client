import { resetSocketStateForTesting } from "./socket";
import { boardResponseFactory, expectNotification, mockedPiniaStoreTyping, mountComposable } from "@@/tests/test-utils";
import { useNotificationStore } from "@data-app";
import { useBoardStore, useCardStore, useSocketConnection } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { Mock } from "vitest";
import { useI18n } from "vue-i18n";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
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
			Object.defineProperty(globalThis, "location", {
				value: { href: options.url },
				writable: true,
			});
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
		it("should call all dispatchers on incoming event", () => {
			const { triggerServerEvent, getConnectedSocket, connected } = setup();

			getConnectedSocket();
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

	describe("connect event with board and cards", () => {
		it("should not call fetchCardRequest when cards is null", () => {
			const { eventCallbacks } = setup();

			const { boardStore, cardStore } = getOrInitialiseBoardStore();
			boardStore.board = boardResponseFactory.build();
			cardStore.cards = null as never;

			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
		});

		it("should not call reloadBoard when board is undefined", () => {
			const { eventCallbacks } = setup();

			const { boardStore, cardStore } = getOrInitialiseBoardStore();
			boardStore.board = undefined;
			cardStore.cards = { "card-1": {} as never };

			eventCallbacks.disconnect();
			eventCallbacks.connect();

			expect(boardStore.reloadBoard).not.toHaveBeenCalled();
		});
	});

	describe("connected ref", () => {
		it("should return connected state", () => {
			mockSocket.connected = true;
			const { connected, getConnectedSocket } = setup();

			getConnectedSocket();

			expect(connected.value).toBe(true);
		});

		it("should return false when socket is not connected", () => {
			mockSocket.connected = false;
			const { connected, getConnectedSocket } = setup();

			getConnectedSocket();

			expect(connected.value).toBe(false);
		});
	});
});
