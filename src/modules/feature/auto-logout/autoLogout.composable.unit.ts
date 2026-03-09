import { useAutoLogout } from "./autoLogout.composable";
import { RoleName } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import {
	createTestAppStoreWithRole,
	createTestEnvStore,
	mountComposable,
	setupBroadcastChannelMock,
} from "@@/tests/test-utils";
import { useAppStore, useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { SessionState } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock("@/utils/api", () => ({
	$axios: {
		get: vi.fn(),
		post: vi.fn(),
	},
}));
globalThis.fetch = vi.fn();

const { broadcastChannelMock } = setupBroadcastChannelMock();

vi.useFakeTimers();
vi.spyOn(globalThis, "setInterval");
vi.spyOn(globalThis, "clearInterval");
vi.spyOn(globalThis, "setTimeout");
vi.spyOn(globalThis, "clearTimeout");

type AutologoutTimers = {
	jwtTtl?: number;
	showWarningTime?: number;
};

const advanceTimersBySeconds = async (seconds: number) => {
	vi.advanceTimersByTime(seconds * 1000);
	await flushPromises();
};

describe("useAutoLogout", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.unstubAllGlobals();
	});

	const setup = (options: AutologoutTimers = {}) => {
		const { jwtTtl = 100, showWarningTime = 50 } = options || {};

		const axiosMock = vi.mocked($axios, true);
		setActivePinia(createTestingPinia());

		createTestEnvStore({
			JWT_SHOW_TIMEOUT_WARNING_SECONDS: showWarningTime,
			JWT_TIMEOUT_SECONDS: jwtTtl,
		});
		createTestAppStoreWithRole(RoleName.Teacher);

		const composable = mountComposable(useAutoLogout, {
			global: {
				plugins: [],
			},
		});

		return {
			...composable,
			axiosMock,
		};
	};

	const setupAndCreateSession = (options?: AutologoutTimers) => {
		const composable = setup(options);
		composable.createSession();
		return composable;
	};

	const createResponse = (ttl: number) => ({
		data: {
			ttl,
		},
	});

	describe("initial state", () => {
		it("should have the correct default values", () => {
			const { showDialog, sessionState, remainingTimeInSeconds } = setup({});

			expect(showDialog.value).toBe(false);
			expect(sessionState.value).toBe(null);
			expect(remainingTimeInSeconds.value).toBe(0);
		});

		it("should use default timeout values when env config is not set", () => {
			setActivePinia(createTestingPinia());

			createTestEnvStore({
				JWT_SHOW_TIMEOUT_WARNING_SECONDS: 0,
				JWT_TIMEOUT_SECONDS: 0,
			});
			createTestAppStoreWithRole(RoleName.Teacher);

			const { createSession, remainingTimeInSeconds } = mountComposable(useAutoLogout, {
				global: {
					plugins: [],
				},
			});

			createSession();

			// DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60 = 7200
			expect(remainingTimeInSeconds.value).toBe(7200);
		});
	});

	describe("when session was created", () => {
		it("should not show the dialog", () => {
			const { showDialog } = setupAndCreateSession();

			expect(showDialog.value).toBe(false);
		});

		it("should set sessionState to 'Started'", () => {
			const options = { jwtTtl: 100, showWarningTime: 50 };
			const { sessionState } = setupAndCreateSession(options);

			expect(sessionState.value).toBe(SessionState.Started);
		});

		describe("when the timer is below the warning time", () => {
			it("should change session state to 'aboutToExpire'", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { sessionState } = setupAndCreateSession(options);

				// After 1 second, remaining time is 50 which equals warning threshold
				await advanceTimersBySeconds(2);

				expect(sessionState.value).toBe(SessionState.AboutToExpire);
			});

			it("should show the dialog", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { showDialog } = setupAndCreateSession(options);

				await advanceTimersBySeconds(2);

				expect(showDialog.value).toBe(true);
			});

			it("should request and update actual remaining time", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { remainingTimeInSeconds, axiosMock } = setupAndCreateSession(options);
				axiosMock.get.mockResolvedValueOnce(createResponse(100));

				// Cross warning threshold to trigger updateRemainingTime
				await advanceTimersBySeconds(2);
				await flushPromises();

				expect(remainingTimeInSeconds.value).toBe(100);
			});

			it("should show the dialog after fetching remaining time", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { showDialog, axiosMock } = setupAndCreateSession(options);
				axiosMock.get.mockResolvedValueOnce(createResponse(100));

				await advanceTimersBySeconds(2);
				await flushPromises();

				expect(showDialog.value).toBe(true);
			});
		});

		describe("when the remaining time reaches zero", () => {
			it("should set sessionState to 'Expired'", async () => {
				const options = { jwtTtl: 10, showWarningTime: 5 };
				const { sessionState } = setupAndCreateSession(options);

				await advanceTimersBySeconds(10);

				expect(sessionState.value).toBe(SessionState.Expired);
			});
		});

		describe("when extendSession() is called", () => {
			describe("when the underlying request is successful", () => {
				it("should set sessionState to 'Extended'", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50 };
					const { sessionState, extendSession, axiosMock, remainingTimeInSeconds } = setupAndCreateSession(options);

					const newJwtTtl = 200;
					axiosMock.get.mockResolvedValue(createResponse(newJwtTtl));
					axiosMock.post.mockResolvedValue(createResponse(newJwtTtl));

					await extendSession();
					await flushPromises();

					expect(sessionState.value).toBe(SessionState.Extended);
					expect(remainingTimeInSeconds.value).toBe(newJwtTtl);
				});
			});

			describe("when the underlying request fails", () => {
				it("should set sessionState to 'Error'", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50 };
					const { sessionState, extendSession, axiosMock } = setupAndCreateSession(options);
					axiosMock.post.mockRejectedValue(new Error("Network error"));

					await extendSession();
					await flushPromises();

					expect(sessionState.value).toBe(SessionState.Error);
				});

				it("should show error notification", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50 };
					const { extendSession, axiosMock } = setupAndCreateSession(options);
					axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

					await extendSession();

					expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
				});
			});
		});

		describe("when extendSession() is called and session is already expired", () => {
			it("should not make API call", async () => {
				const options = { jwtTtl: 2, showWarningTime: 1 };
				const { extendSession, sessionState, axiosMock } = setupAndCreateSession(options);
				axiosMock.post.mockResolvedValue(createResponse(100));

				// Let the timer expire
				await advanceTimersBySeconds(3);

				expect(sessionState.value).toBe(SessionState.Expired);
				axiosMock.post.mockClear();

				await extendSession();

				expect(axiosMock.post).not.toHaveBeenCalled();
			});
		});

		describe("when extendSession() is called and session is already in error state", () => {
			it("should not make API call", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { extendSession, sessionState, axiosMock } = setupAndCreateSession(options);

				// First fail the extend to get into error state
				axiosMock.post.mockRejectedValueOnce(new Error("Network error"));
				await extendSession();

				expect(sessionState.value).toBe(SessionState.Error);
				axiosMock.post.mockClear();

				// Try to extend again while in error state
				await extendSession();

				expect(axiosMock.post).not.toHaveBeenCalled();
			});
		});

		describe("when the same state is set twice", () => {
			it("should not broadcast duplicate state for Started", async () => {
				const { createSession } = setup();

				createSession();
				await flushPromises();
				const callCountAfterFirst = broadcastChannelMock.postMessage.mock.calls.length;

				// Call createSession again - should not broadcast since already in Started state
				createSession();
				await flushPromises();

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledTimes(callCountAfterFirst);
			});
		});

		describe("when updateRemainingTime() retries on error", () => {
			it("should retry up to MAX_RETRIES times with exponential backoff", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { axiosMock, sessionState } = setupAndCreateSession(options);
				vi.spyOn(logger, "error").mockImplementation(vi.fn()); // suppress error logs of mocked network errors

				// All GET requests fail
				axiosMock.get.mockRejectedValue({});

				// Clear initial calls
				axiosMock.get.mockClear();

				// Trigger updateRemainingTime by crossing warning threshold (51 -> 50)
				await advanceTimersBySeconds(2);

				// Wait for initial call
				await flushPromises();
				expect(axiosMock.get).toHaveBeenCalledTimes(1);

				// Clear and wait for retries with proper timing
				axiosMock.get.mockClear();

				// First retry after 1s (2^0 * 1000ms)
				await advanceTimersBySeconds(1);
				await flushPromises();
				expect(axiosMock.get).toHaveBeenCalledTimes(1);

				// Second retry after 2s (2^1 * 1000ms)
				axiosMock.get.mockClear();
				await advanceTimersBySeconds(2);
				await flushPromises();
				expect(axiosMock.get).toHaveBeenCalledTimes(1);

				// Third retry after 4s (2^2 * 1000ms)
				axiosMock.get.mockClear();
				await advanceTimersBySeconds(4);
				await flushPromises();
				expect(axiosMock.get).toHaveBeenCalledTimes(1);

				// After MAX_RETRIES (3), should be in error state
				expect(sessionState.value).toBe(SessionState.Error);
			});
		});

		describe("when updateRemainingTime() receives undefined ttl", () => {
			it("should not update remainingTimeInSeconds", async () => {
				const options = { jwtTtl: 51, showWarningTime: 50 };
				const { axiosMock, remainingTimeInSeconds } = setupAndCreateSession(options);

				// Response without ttl
				axiosMock.get.mockResolvedValueOnce({ data: {} });

				// Cross warning threshold to trigger updateRemainingTime
				await advanceTimersBySeconds(2);

				// remainingTimeInSeconds should have decremented by timer, not been updated by response
				expect(remainingTimeInSeconds.value).toBe(49);
			});
		});

		describe("when session expires", () => {
			it("should show error notification", async () => {
				const options = { jwtTtl: 3, showWarningTime: 2 };
				setupAndCreateSession(options);

				await advanceTimersBySeconds(4);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", autoClose: false })
				);
			});

			it("should show the dialog", async () => {
				const options = { jwtTtl: 3, showWarningTime: 2 };
				const { showDialog } = setupAndCreateSession(options);

				await advanceTimersBySeconds(4);

				expect(showDialog.value).toBe(true);
			});

			it("should call logout on app store", async () => {
				const options = { jwtTtl: 3, showWarningTime: 2 };
				const { sessionState, axiosMock } = setupAndCreateSession(options);
				const appStore = useAppStore();
				vi.spyOn(appStore, "logout");
				axiosMock.get.mockResolvedValue(createResponse(200));

				await advanceTimersBySeconds(4);

				expect(sessionState.value).toBe(SessionState.Expired);
				expect(globalThis.fetch).toHaveBeenCalledWith("/logout");
			});
		});

		describe("when session is extended successfully", () => {
			it("should show success notification", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50 };
				const { extendSession, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
			});

			it("should hide the dialog", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50 };
				const { extendSession, showDialog, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();

				expect(showDialog.value).toBe(false);
			});
		});
	});

	describe("BroadcastChannel communication", () => {
		describe("when state changes", () => {
			it("should broadcast state when session is created", async () => {
				const { createSession } = setup();

				createSession();
				await flushPromises();

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith(expect.stringContaining("started:"));
			});

			it("should broadcast state when session is extended", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50 };
				const { extendSession, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();
				await flushPromises();

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith(expect.stringContaining("extended:"));
			});

			it("should broadcast state when session expires", async () => {
				const options = { jwtTtl: 2, showWarningTime: 1 };
				setupAndCreateSession(options);

				await advanceTimersBySeconds(3);

				expect(broadcastChannelMock.postMessage).toHaveBeenCalledWith(expect.stringContaining("expired:"));
			});
		});
	});
});
