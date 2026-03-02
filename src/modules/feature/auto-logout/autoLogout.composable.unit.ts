import { RoleName } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createTestAppStoreWithRole, createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useAppStore, useNotificationStore } from "@data-app";
import { SessionStatus, useAutoLogout } from "@feature-auto-logout";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";

vi.mock("@/utils/api", () => ({
	$axios: {
		get: vi.fn(),
		post: vi.fn(),
	},
}));

vi.useFakeTimers();
vi.spyOn(globalThis, "setInterval");
vi.spyOn(globalThis, "clearInterval");
vi.spyOn(globalThis, "setTimeout");
vi.spyOn(globalThis, "clearTimeout");

type AutologoutTimers = {
	remainingTimeInSeconds?: number;
	jwtTtl?: number;
	showWarningTime?: number;
};

describe("useAutoLogout", () => {
	beforeEach(() => {
		vi.clearAllTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
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
				plugins: [createTestingI18n()],
			},
		});

		return {
			...composable,
			axiosMock,
		};
	};

	const setupAndCreateSession = (options?: AutologoutTimers) => {
		const { remainingTimeInSeconds = 49 } = options || {};
		const composable = setup(options);
		composable.createSession();
		composable.remainingTimeInSeconds.value = remainingTimeInSeconds;
		return composable;
	};

	const createResponse = (ttl: number) => ({
		data: {
			ttl,
		},
	});

	describe("initial state", () => {
		it("should have the correct default values", () => {
			const { showDialog, errorOnExtend, sessionStatus, remainingTimeInSeconds } = setup({});

			expect(showDialog.value).toBe(false);
			expect(errorOnExtend.value).toBe(false);
			expect(sessionStatus.value).toBe(null);
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
					plugins: [createTestingI18n()],
				},
			});

			createSession();

			// DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60 = 7200
			expect(remainingTimeInSeconds.value).toBe(7200);
		});
	});

	describe("remainingTimeInMinutes", () => {
		it.each([
			[10, 1],
			[50, 1],
			[125, 3],
			[180, 3],
		])("should return the correct value for %i seconds", (seconds, expectedMinutes) => {
			const options = { remainingTimeInSeconds: seconds, showWarningTime: 60000, jwtTtl: seconds };
			const { remainingTimeInMinutes } = setupAndCreateSession(options);

			expect(remainingTimeInMinutes.value).toBe(expectedMinutes);
		});
	});

	describe("when session was created", () => {
		it("should not show the dialog", () => {
			const { showDialog } = setupAndCreateSession();

			expect(showDialog.value).toBe(false);
		});

		describe("when the timer is below the warning time", () => {
			it("should change session status to 'aboutToExpire'", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { sessionStatus } = setupAndCreateSession(options);

				vi.advanceTimersByTime(40000);
				await nextTick();

				expect(sessionStatus.value).toBe(SessionStatus.AboutToExpire);
			});

			it("should show the dialog", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { showDialog } = setupAndCreateSession(options);

				vi.advanceTimersByTime(60000);
				await nextTick();

				expect(showDialog.value).toBe(true);
			});

			it("should request and update actual remaining time", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { remainingTimeInSeconds, axiosMock } = setupAndCreateSession(options);
				axiosMock.get.mockResolvedValueOnce(createResponse(options.jwtTtl));

				vi.advanceTimersByTime(1000);
				await flushPromises();

				expect(remainingTimeInSeconds.value).toBe(100);
			});

			it("should show the dialog after fetching remaining time", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { showDialog, axiosMock } = setupAndCreateSession(options);
				axiosMock.get.mockResolvedValueOnce(createResponse(options.jwtTtl));

				vi.advanceTimersByTime(1000);
				await flushPromises();

				expect(showDialog.value).toBe(true);
			});
		});

		describe("sessionStatus", () => {
			it("should be 'Started' by default", () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
				const { sessionStatus } = setupAndCreateSession(options);

				expect(sessionStatus.value).toBe(SessionStatus.Started);
			});

			describe("when the remaining time reaches zero", () => {
				it("should be 'Expired'", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
					const { sessionStatus } = setupAndCreateSession(options);

					vi.advanceTimersByTime(10 * 1000);
					await flushPromises();

					expect(sessionStatus.value).toBe(SessionStatus.Expired);
				});
			});
		});

		describe("when extendSession() is called", () => {
			describe("when the underlying request is successful", () => {
				it("should set sessionStatus to 'Extended'", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
					const { sessionStatus, extendSession, axiosMock, remainingTimeInSeconds } = setupAndCreateSession(options);

					const newJwtTtl = 200;
					axiosMock.get.mockResolvedValue(createResponse(newJwtTtl));
					axiosMock.post.mockResolvedValue(createResponse(newJwtTtl));

					await extendSession();
					await flushPromises();

					expect(sessionStatus.value).toBe(SessionStatus.Extended);
					expect(remainingTimeInSeconds.value).toBe(newJwtTtl);
				});
			});

			describe("when the underlying request fails", () => {
				it("should set sessionStatus to 'Error'", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
					const { sessionStatus, extendSession, axiosMock } = setupAndCreateSession(options);
					axiosMock.post.mockRejectedValue(new Error("Network error"));

					extendSession();
					await flushPromises();

					expect(sessionStatus.value).toBe(SessionStatus.Error);
				});

				it("should set errorOnExtend to true", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
					const { errorOnExtend, extendSession, axiosMock } = setupAndCreateSession(options);
					axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

					extendSession();
					vi.advanceTimersByTime(20000);
					await flushPromises();

					expect(errorOnExtend.value).toBe(true);
				});

				it("should show error notification", async () => {
					const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
					const { extendSession, axiosMock } = setupAndCreateSession(options);
					axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

					await extendSession();

					expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
				});
			});
		});

		describe("when extendSession() is called and session is already expired", () => {
			it("should call logout", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 1 };
				const { extendSession, sessionStatus, axiosMock } = setupAndCreateSession(options);
				axiosMock.post.mockResolvedValue(createResponse(100));

				// Let the timer expire
				vi.advanceTimersByTime(2000);
				await flushPromises();

				expect(sessionStatus.value).toBe(SessionStatus.Expired);

				await extendSession();

				expect(useAppStore().logout).toHaveBeenCalled();
			});

			it("should not make API call", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 1 };
				const { extendSession, sessionStatus, axiosMock } = setupAndCreateSession(options);
				axiosMock.post.mockResolvedValue(createResponse(100));

				// Let the timer expire
				vi.advanceTimersByTime(2000);
				await flushPromises();

				expect(sessionStatus.value).toBe(SessionStatus.Expired);
				axiosMock.post.mockClear();

				await extendSession();

				expect(axiosMock.post).not.toHaveBeenCalled();
			});
		});

		describe("when updateRemainingTime() retries on error", () => {
			it("should retry up to MAX_RETRIES times with exponential backoff", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { axiosMock, sessionStatus } = setupAndCreateSession(options);

				// All GET requests fail
				axiosMock.get.mockRejectedValue(new Error("Network error"));

				// Trigger updateRemainingTime by crossing warning threshold
				vi.advanceTimersByTime(1000);
				await flushPromises();

				// First retry after 1s (2^0 * 1000ms)
				vi.advanceTimersByTime(1000);
				await flushPromises();

				// Second retry after 2s (2^1 * 1000ms)
				vi.advanceTimersByTime(2000);
				await flushPromises();

				// Third retry after 4s (2^2 * 1000ms)
				vi.advanceTimersByTime(4000);
				await flushPromises();

				// After MAX_RETRIES (3), should be in error state
				expect(axiosMock.get).toHaveBeenCalledTimes(4); // Initial + 3 retries
				expect(sessionStatus.value).toBe(SessionStatus.Error);
			});
		});

		describe("when updateRemainingTime() receives undefined ttl", () => {
			it("should not update remainingTimeInSeconds", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 49 };
				const { axiosMock, remainingTimeInSeconds } = setupAndCreateSession(options);

				// Response without ttl
				axiosMock.get.mockResolvedValueOnce({ data: {} });

				vi.advanceTimersByTime(1000);
				await flushPromises();

				// remainingTimeInSeconds should have decremented by timer, not been updated by response
				expect(remainingTimeInSeconds.value).toBe(48);
			});
		});

		describe("when session expires", () => {
			it("should show error notification", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 2 };
				setupAndCreateSession(options);

				vi.advanceTimersByTime(3000);
				await flushPromises();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", autoClose: false })
				);
			});

			it("should show the dialog", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 2 };
				const { showDialog } = setupAndCreateSession(options);

				vi.advanceTimersByTime(3000);
				await flushPromises();

				expect(showDialog.value).toBe(true);
			});
		});

		describe("when session is extended successfully", () => {
			it("should show success notification", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
				const { extendSession, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
			});

			it("should reset errorOnExtend", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
				const { extendSession, errorOnExtend, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();

				expect(errorOnExtend.value).toBe(false);
			});

			it("should hide the dialog", async () => {
				const options = { jwtTtl: 100, showWarningTime: 50, remainingTimeInSeconds: 10 };
				const { extendSession, showDialog, axiosMock } = setupAndCreateSession(options);

				axiosMock.get.mockResolvedValue(createResponse(200));
				axiosMock.post.mockResolvedValue(createResponse(200));

				await extendSession();

				expect(showDialog.value).toBe(false);
			});
		});
	});
});
