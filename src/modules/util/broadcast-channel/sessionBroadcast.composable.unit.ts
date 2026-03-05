import { useSessionBroadcast } from "./sessionBroadcast.composable";
import { SessionState } from "./types";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { flushPromises } from "@vue/test-utils";
import { type Ref, ref } from "vue";

const broadcastDataRef: Ref<string | undefined> = ref(undefined);
const broadcastPostMock = vi.fn();
const broadcastCloseMock = vi.fn();
const broadcastIsClosedRef = ref(false);

vi.mock("@vueuse/core", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return {
		...actual,
		useBroadcastChannel: () => ({
			data: broadcastDataRef,
			post: broadcastPostMock,
			error: ref(null),
			isSupported: ref(true),
			isClosed: broadcastIsClosedRef,
			close: broadcastCloseMock,
			channel: ref({
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				postMessage: vi.fn(),
			}),
		}),
	};
});

describe("useSessionBroadcast", () => {
	beforeEach(() => {
		vi.unstubAllGlobals();
		broadcastDataRef.value = undefined;
		broadcastIsClosedRef.value = false;
		// Reset shared isJwtExpired state
		const { setJwtExpired } = useSessionBroadcast();
		setJwtExpired(false);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("minimal usage (no options)", () => {
		const setup = () => useSessionBroadcast();

		it("should send logout message", () => {
			const { sendLogout } = setup();

			sendLogout();

			expect(broadcastPostMock).toHaveBeenCalledWith("logout");
		});

		it("should close the broadcast channel", () => {
			const { close } = setup();

			close();

			expect(broadcastCloseMock).toHaveBeenCalled();
		});

		it("should not close if already closed", () => {
			broadcastIsClosedRef.value = true;
			const { close } = setup();

			close();

			expect(broadcastCloseMock).not.toHaveBeenCalled();
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

				expect(broadcastPostMock).toHaveBeenCalledWith("started:500");
			});

			it("should handle null values", () => {
				const { sendStateAndTime } = setup();

				sendStateAndTime(null, null);

				expect(broadcastPostMock).toHaveBeenCalledWith(":0");
			});
		});

		describe("when receiving a 'logout' message", () => {
			it("should call setState with Expired and redirect to /logout", async () => {
				const locationAssignMock = vi.fn();
				vi.stubGlobal("location", { assign: locationAssignMock });
				const { setState } = setup();

				broadcastDataRef.value = "logout";
				await flushPromises();

				expect(setState).toHaveBeenCalledWith(SessionState.Expired);
				expect(locationAssignMock).toHaveBeenCalledWith("/logout");
			});
		});

		describe("when receiving a state sync message", () => {
			it("should update timer and state from the message", async () => {
				const { setState, setTime } = setup();

				broadcastDataRef.value = "extended:7200";
				await flushPromises();

				expect(setState).toHaveBeenCalledWith(SessionState.Extended);
				expect(setTime).toHaveBeenCalledWith(7200);
			});

			it("should ignore invalid time values in the message", async () => {
				const { setTime } = setup();

				broadcastDataRef.value = "started:invalid";
				await flushPromises();

				expect(setTime).not.toHaveBeenCalled();
			});

			it("should ignore unknown state values but still update time", async () => {
				const { setState, setTime } = setup();

				broadcastDataRef.value = "unknownState:500";
				await flushPromises();

				expect(setTime).toHaveBeenCalledWith(500);
				expect(setState).not.toHaveBeenCalled();
			});
		});
	});

	describe("with onLogoutReceived callback", () => {
		it("should call onLogoutReceived instead of setState when logout received", async () => {
			const onLogoutReceived = vi.fn();
			const setState = vi.fn();

			useSessionBroadcast({ setState, onLogoutReceived });

			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(onLogoutReceived).toHaveBeenCalledOnce();
			expect(setState).not.toHaveBeenCalled();
		});
	});

	describe("onLogoutEvent", () => {
		it("should register and call handler when logout message is received", async () => {
			const handler = vi.fn();
			const { onLogoutEvent } = useSessionBroadcast();

			onLogoutEvent(handler);
			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(handler).toHaveBeenCalledOnce();
		});

		it("should call multiple registered handlers", async () => {
			const handler1 = vi.fn();
			const handler2 = vi.fn();
			const { onLogoutEvent } = useSessionBroadcast();

			onLogoutEvent(handler1);
			onLogoutEvent(handler2);
			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(handler1).toHaveBeenCalledOnce();
			expect(handler2).toHaveBeenCalledOnce();
		});

		it("should call onLogoutEvent handlers and onLogoutReceived option together", async () => {
			const eventHandler = vi.fn();
			const optionHandler = vi.fn();

			const { onLogoutEvent } = useSessionBroadcast({ onLogoutReceived: optionHandler });

			onLogoutEvent(eventHandler);
			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(eventHandler).toHaveBeenCalledOnce();
			expect(optionHandler).toHaveBeenCalledOnce();
		});
	});

	describe("isJwtExpired", () => {
		it("should be false initially", () => {
			const { isJwtExpired } = useSessionBroadcast();

			expect(isJwtExpired.value).toBe(false);
		});

		it("should be set to true when logout message is received", async () => {
			const { isJwtExpired } = useSessionBroadcast();

			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(isJwtExpired.value).toBe(true);
		});

		it("should not change for non-logout messages", async () => {
			const { isJwtExpired } = useSessionBroadcast();

			broadcastDataRef.value = "started:100";
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
