import { useCountdownTimer } from "./countdownTimer.composable";
import { useSessionBroadcast } from "./sessionBroadcast.composable";
import { SessionState } from "./types";
import { mountComposable } from "@@/tests/test-utils";
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
		vi.clearAllMocks();
		broadcastDataRef.value = undefined;
		broadcastIsClosedRef.value = false;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { initialState?: SessionState | null; initialTime?: number }) => {
		const { initialState = null, initialTime = 100 } = options ?? {};

		const sessionState = ref<SessionState | null>(initialState);
		const setState = vi.fn((state: SessionState) => {
			sessionState.value = state;
		});

		const remainingTimeInSecondsRef = ref(initialTime);
		const countdownTimer = {
			remainingTimeInSeconds: remainingTimeInSecondsRef,
			remainingTimeInMinutes: ref(Math.ceil(initialTime / 60)),
			setTime: vi.fn((seconds: number) => {
				remainingTimeInSecondsRef.value = seconds;
			}),
			startInterval: vi.fn(),
			stopInterval: vi.fn(),
		} as unknown as ReturnType<typeof useCountdownTimer>;

		const composable = mountComposable(() => useSessionBroadcast(sessionState, setState, countdownTimer));

		return {
			...composable,
			sessionState,
			setState,
			countdownTimer,
			remainingTimeInSecondsRef,
		};
	};

	describe("sendState", () => {
		it("should broadcast current state and time", () => {
			const { sendState } = setup({
				initialState: SessionState.Started,
				initialTime: 500,
			});

			sendState();

			expect(broadcastPostMock).toHaveBeenCalledWith("started:500");
		});

		it("should broadcast empty state when sessionState is null", () => {
			const { sendState } = setup({ initialState: null, initialTime: 100 });

			sendState();

			expect(broadcastPostMock).toHaveBeenCalledWith(":100");
		});

		it("should broadcast 0 when remainingTimeInSeconds is 0", () => {
			const { sendState } = setup({
				initialState: SessionState.Expired,
				initialTime: 0,
			});

			sendState();

			expect(broadcastPostMock).toHaveBeenCalledWith("expired:0");
		});
	});

	describe("when receiving a 'logout' message from another tab", () => {
		it("should call setState with Expired", async () => {
			const { setState } = setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(setState).toHaveBeenCalledWith(SessionState.Expired);
		});

		it("should redirect to /logout", async () => {
			const locationAssignMock = vi.fn();
			vi.stubGlobal("location", { assign: locationAssignMock });
			setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "logout";
			await flushPromises();

			expect(locationAssignMock).toHaveBeenCalledWith("/logout");
		});
	});

	describe("when receiving a state sync message from another tab", () => {
		it("should update timer from the message", async () => {
			const { countdownTimer } = setup({ initialState: SessionState.Started, initialTime: 100 });

			broadcastDataRef.value = "started:500";
			await flushPromises();

			expect(countdownTimer.setTime).toHaveBeenCalledWith(500);
		});

		it("should call setState with the state from the message", async () => {
			const { setState } = setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "aboutToExpire:30";
			await flushPromises();

			expect(setState).toHaveBeenCalledWith(SessionState.AboutToExpire);
		});

		it("should handle Extended state from another tab", async () => {
			const { setState, countdownTimer } = setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "extended:7200";
			await flushPromises();

			expect(setState).toHaveBeenCalledWith(SessionState.Extended);
			expect(countdownTimer.setTime).toHaveBeenCalledWith(7200);
		});

		it("should handle Expired state from another tab", async () => {
			const { setState, countdownTimer } = setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "expired:0";
			await flushPromises();

			expect(setState).toHaveBeenCalledWith(SessionState.Expired);
			expect(countdownTimer.setTime).toHaveBeenCalledWith(0);
		});

		it("should handle Error state from another tab", async () => {
			const { setState } = setup({ initialState: SessionState.Started });

			broadcastDataRef.value = "error:50";
			await flushPromises();

			expect(setState).toHaveBeenCalledWith(SessionState.Error);
		});

		it("should ignore invalid time values in the message", async () => {
			const { countdownTimer } = setup({ initialState: SessionState.Started, initialTime: 100 });

			broadcastDataRef.value = "started:invalid";
			await flushPromises();

			expect(countdownTimer.setTime).not.toHaveBeenCalled();
		});

		it("should ignore messages without colon separator", async () => {
			const { setState, countdownTimer } = setup({
				initialState: SessionState.Started,
				initialTime: 100,
			});

			broadcastDataRef.value = "someinvalidmessage";
			await flushPromises();

			// setState should not be called for invalid messages
			expect(setState).not.toHaveBeenCalled();
			expect(countdownTimer.setTime).not.toHaveBeenCalled();
		});

		it("should ignore unknown state values in the message", async () => {
			const { setState, countdownTimer } = setup({
				initialState: SessionState.Started,
				initialTime: 100,
			});

			broadcastDataRef.value = "unknownState:500";
			await flushPromises();

			// Time should be updated but state should not be called with invalid state
			expect(countdownTimer.setTime).toHaveBeenCalledWith(500);
			expect(setState).not.toHaveBeenCalled();
		});
	});
});
