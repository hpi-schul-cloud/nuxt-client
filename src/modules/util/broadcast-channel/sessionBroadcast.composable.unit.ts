import { useSessionBroadcast } from "./sessionBroadcast.composable";
import { SessionState } from "./types";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { setupBroadcastChannelMock } from "@@/tests/test-utils";
import { flushPromises } from "@vue/test-utils";
import { Mocked } from "vitest";

let messageHandler: ((event: MessageEvent) => void) | null = null;
let broadcastChannelMock: Mocked<BroadcastChannel>;

const simulateIncomingMessage = (data: string) => {
	if (messageHandler) {
		messageHandler({ data } as MessageEvent);
	}
};

describe("useSessionBroadcast", () => {
	beforeEach(() => {
		// Set up BroadcastChannel mock with custom addEventListener implementation
		broadcastChannelMock = setupBroadcastChannelMock({
			addEventListener: vi.fn().mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
				if (type === "message" && typeof listener === "function") {
					messageHandler = listener as (event: MessageEvent) => void;
				}
			}),
		}).broadcastChannelMock;

		messageHandler = null;
		// Reset shared isJwtExpired state
		const { setJwtExpired, close } = useSessionBroadcast();
		setJwtExpired(false);
		close();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.unstubAllGlobals();
	});

	describe("minimal usage (no options)", () => {
		const setup = () => useSessionBroadcast();

		it("should send logout message", () => {
			const { sendLogout } = setup();

			sendLogout();

			expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith("logout");
		});

		it("should close the broadcast channel", () => {
			const { sendLogout, close } = setup();
			// Trigger channel creation first
			sendLogout();

			close();

			expect(broadcastChannelMock.close).toHaveBeenCalled();
		});

		it("should not fail close if channel was never created", () => {
			const { close } = setup();

			close();

			expect(broadcastChannelMock.close).not.toHaveBeenCalled();
		});
	});

	describe("with state sync options", () => {
		const setup = () => {
			const setState = vi.fn();
			const setTime = vi.fn();

			const composable = useSessionBroadcast({ setState, setTime });

			return { ...composable, setState, setTime };
		};

		describe("sendStateAndTime", () => {
			it("should broadcast state and time in correct format", () => {
				const { sendStateAndTime } = setup();

				sendStateAndTime(SessionState.Started, 500);

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith("started:500");
			});

			it("should handle null values", () => {
				const { sendStateAndTime } = setup();

				sendStateAndTime(null, null);

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith(":0");
			});
		});

		describe("when receiving a 'logout' message", () => {
			it("should call setState with Expired and redirect to /logout", async () => {
				const locationAssignMock = vi.fn();
				vi.stubGlobal("location", { assign: locationAssignMock });
				const { setState, sendStateAndTime } = setup();
				// Trigger channel creation with message handler
				sendStateAndTime(SessionState.Started, 100);

				simulateIncomingMessage("logout");
				await flushPromises();

				expect(setState).toHaveBeenCalledWith(SessionState.Expired);
				expect(locationAssignMock).toHaveBeenCalledWith("/logout");
			});
		});

		describe("when receiving a state sync message", () => {
			it("should update timer and state from the message", async () => {
				const { setState, setTime, sendStateAndTime } = setup();

				sendStateAndTime(SessionState.Started, 100);

				simulateIncomingMessage("extended:7200");
				await flushPromises();

				expect(setState).toHaveBeenCalledWith(SessionState.Extended);
				expect(setTime).toHaveBeenCalledWith(7200);
			});

			it("should ignore invalid time values in the message", async () => {
				const { setTime, sendStateAndTime } = setup();

				sendStateAndTime(SessionState.Started, 100);

				simulateIncomingMessage("started:invalid");
				await flushPromises();

				expect(setTime).not.toHaveBeenCalled();
			});

			it("should ignore unknown state values but still update time", async () => {
				const { setState, setTime, sendStateAndTime } = setup();

				sendStateAndTime(SessionState.Started, 100);

				simulateIncomingMessage("unknownState:500");
				await flushPromises();

				expect(setTime).toHaveBeenCalledWith(500);
				expect(setState).not.toHaveBeenCalled();
			});
		});
	});

	describe("onLogoutReceived callback", () => {
		describe("when receiving a 'logout' message", () => {
			it("should call onLogoutReceived instead of setState ", async () => {
				const onLogoutReceived = vi.fn();
				const setState = vi.fn();

				const { sendStateAndTime } = useSessionBroadcast({ setState, onLogoutReceived });

				sendStateAndTime(SessionState.Started, 100);

				simulateIncomingMessage("logout");
				await flushPromises();

				expect(onLogoutReceived).toHaveBeenCalledOnce();
				expect(setState).not.toHaveBeenCalled();
			});
		});
	});

	describe("onLogoutEvent", () => {
		describe("when receiving a 'logout' message", () => {
			it("should register and call handler", async () => {
				const handler = vi.fn();
				const { onLogoutEvent, sendLogout } = useSessionBroadcast();

				sendLogout();

				onLogoutEvent(handler);
				simulateIncomingMessage("logout");
				await flushPromises();

				expect(handler).toHaveBeenCalledOnce();
			});

			it("should call multiple registered handlers", async () => {
				const handler1 = vi.fn();
				const handler2 = vi.fn();
				const { onLogoutEvent, sendLogout } = useSessionBroadcast();

				sendLogout();

				onLogoutEvent(handler1);
				onLogoutEvent(handler2);
				simulateIncomingMessage("logout");
				await flushPromises();

				expect(handler1).toHaveBeenCalledOnce();
				expect(handler2).toHaveBeenCalledOnce();
			});

			it("should call onLogoutEvent handlers and onLogoutReceived option together", async () => {
				const eventHandler = vi.fn();
				const optionHandler = vi.fn();

				const { onLogoutEvent, sendLogout } = useSessionBroadcast({ onLogoutReceived: optionHandler });

				sendLogout();

				onLogoutEvent(eventHandler);
				simulateIncomingMessage("logout");
				await flushPromises();

				expect(eventHandler).toHaveBeenCalledOnce();
				expect(optionHandler).toHaveBeenCalledOnce();
			});
		});
	});

	describe("isJwtExpired", () => {
		it("should be false initially", () => {
			const { isJwtExpired } = useSessionBroadcast();

			expect(isJwtExpired.value).toBe(false);
		});

		it("should be set to true when logout message is received", async () => {
			const { isJwtExpired, sendLogout } = useSessionBroadcast();

			sendLogout();

			simulateIncomingMessage("logout");
			await flushPromises();

			expect(isJwtExpired.value).toBe(true);
		});

		it("should not change for non-logout messages", async () => {
			const { isJwtExpired, sendLogout } = useSessionBroadcast();

			sendLogout();

			simulateIncomingMessage("started:100");
			await flushPromises();

			expect(isJwtExpired.value).toBe(false);
		});
	});

	describe("setJwtExpired", () => {
		it("should set isJwtExpired to true by default", () => {
			const { isJwtExpired, setJwtExpired } = useSessionBroadcast();

			setJwtExpired();

			expect(isJwtExpired.value).toBe(true);
		});

		it("should set isJwtExpired to the provided value", () => {
			const { isJwtExpired, setJwtExpired } = useSessionBroadcast();

			setJwtExpired(true);
			expect(isJwtExpired.value).toBe(true);

			setJwtExpired(false);
			expect(isJwtExpired.value).toBe(false);
		});
	});

	describe("handleUnauthorizedError", () => {
		beforeEach(() => {
			const { setJwtExpired } = useSessionBroadcast();
			setJwtExpired(false);
		});

		it("should not set jwt expired for non-axios errors", async () => {
			const { handleUnauthorizedError, isJwtExpired } = useSessionBroadcast();

			await handleUnauthorizedError(new Error("regular error"));

			expect(isJwtExpired.value).toBe(false);
		});

		it("should not set jwt expired for non-401 axios errors", async () => {
			const { handleUnauthorizedError, isJwtExpired } = useSessionBroadcast();
			const { AxiosError } = await import("axios");
			const axiosError = new AxiosError("error", "500", undefined, undefined, {
				status: HttpStatusCode.InternalServerError,
			} as never);

			await handleUnauthorizedError(axiosError);

			expect(isJwtExpired.value).toBe(false);
		});

		it("should not set jwt expired when ttl is greater than 0", async () => {
			const { handleUnauthorizedError, isJwtExpired } = useSessionBroadcast();
			const { AxiosError, default: axios } = await import("axios");
			const axiosError = new AxiosError("error", "401", undefined, undefined, {
				status: HttpStatusCode.Unauthorized,
			} as never);

			const mockAxiosInstance = {
				defaults: { baseURL: "" },
				get: vi.fn().mockResolvedValue({ data: { ttl: 100 } }),
			};
			vi.spyOn(axios, "create").mockReturnValue(mockAxiosInstance as never);

			await handleUnauthorizedError(axiosError);

			expect(isJwtExpired.value).toBe(false);
		});

		it("should set jwt expired when ttl is 0", async () => {
			const { handleUnauthorizedError, isJwtExpired } = useSessionBroadcast();
			const { AxiosError, default: axios } = await import("axios");
			const axiosError = new AxiosError("error", "401", undefined, undefined, {
				status: HttpStatusCode.Unauthorized,
			} as never);

			const mockAxiosInstance = {
				defaults: { baseURL: "" },
				get: vi.fn().mockResolvedValue({ data: { ttl: 0 } }),
			};
			vi.spyOn(axios, "create").mockReturnValue(mockAxiosInstance as never);

			await handleUnauthorizedError(axiosError);

			expect(isJwtExpired.value).toBe(true);
		});

		it("should set jwt expired when jwt timer request fails", async () => {
			const { handleUnauthorizedError, isJwtExpired } = useSessionBroadcast();
			const { AxiosError, default: axios } = await import("axios");
			const axiosError = new AxiosError("error", "401", undefined, undefined, {
				status: HttpStatusCode.Unauthorized,
			} as never);

			const mockAxiosInstance = {
				defaults: { baseURL: "" },
				get: vi.fn().mockRejectedValue(new Error("Network error")),
			};
			vi.spyOn(axios, "create").mockReturnValue(mockAxiosInstance as never);

			await handleUnauthorizedError(axiosError);

			expect(isJwtExpired.value).toBe(true);
		});
	});
});
