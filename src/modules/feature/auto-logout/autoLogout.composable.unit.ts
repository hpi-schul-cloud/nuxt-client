import { RoleName } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createTestAppStoreWithRole, createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
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
		const { remainingTimeInSeconds = 100, showWarningTime = 30, jwtTtl = 60 } = options || {};

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

		composable.remainingTimeInSeconds.value = remainingTimeInSeconds;

		composable.createSession();

		return {
			...composable,
			axiosMock,
		};
	};

	const createResponse = (ttl: number) => ({
		data: {
			ttl,
		},
	});

	describe("when composable is started", () => {
		it("should not show the dialog", () => {
			const { showDialog } = setup();

			expect(showDialog.value).toBe(false);
		});
	});

	describe("when the timer is above the warning time", () => {
		it("should set 'showDialog' to false", async () => {
			const { showDialog } = setup();

			showDialog.value = true;
			vi.advanceTimersByTime(2000);
			await flushPromises();

			expect(showDialog.value).toBe(false);
		});
	});

	describe("when the timer is below the warning time", () => {
		it("should set 'showDialog' true", async () => {
			const options = { remainingTimeInSeconds: 100, showWarningTime: 30, jwtTtl: 60 };
			const { showDialog } = setup(options);

			const timeToAdvance = (options.jwtTtl - options.showWarningTime + 10) * 1000;
			vi.advanceTimersByTime(timeToAdvance);
			await nextTick();

			expect(showDialog.value).toBe(true);
		});

		it("should request and update actual remaining time", async () => {
			const options = { remainingTimeInSeconds: 100, showWarningTime: 30, jwtTtl: 200 };
			const { remainingTimeInSeconds, axiosMock } = setup(options);
			axiosMock.get.mockResolvedValueOnce(createResponse(options.jwtTtl));

			const timeToAdvance = (options.jwtTtl - options.showWarningTime + 10) * 1000;
			vi.advanceTimersByTime(timeToAdvance);
			await flushPromises();

			expect(remainingTimeInSeconds.value).toBe(200);
		});
	});

	describe("errorOnExtend", () => {
		it("should be false by default", () => {
			const { errorOnExtend } = setup();

			expect(errorOnExtend.value).toBe(false);
		});

		it("should be true when an error occurs", async () => {
			const options = { remainingTimeInSeconds: 120, showWarningTime: 60, jwtTtl: 240 };
			const { errorOnExtend, extendSession, axiosMock } = setup(options);
			axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

			extendSession();
			vi.advanceTimersByTime(20000);
			await flushPromises();

			expect(errorOnExtend.value).toBe(true);
		});
	});

	describe("remainingTimeInMinutes", () => {
		it("should return the correct value", () => {
			const options = { remainingTimeInSeconds: 120, showWarningTime: 60000, jwtTtl: 120 };
			const { remainingTimeInMinutes } = setup(options);

			expect(remainingTimeInMinutes.value).toBe(2);
		});
	});

	describe("sessionStatus", () => {
		it("should be null by default", () => {
			const { sessionStatus } = setup();

			expect(sessionStatus.value).toBe(null);
		});

		it("should be 'Ended' when the session ends", async () => {
			const options = { remainingTimeInSeconds: 10, showWarningTime: 30, jwtTtl: 120 };
			const { sessionStatus } = setup();
			vi.advanceTimersByTime(options.jwtTtl * 1000);
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Ended);
		});

		it("should be 'Error' when an error occurs", async () => {
			const options = { remainingTimeInSeconds: 10, showWarningTime: 30, jwtTtl: 120 };
			const { sessionStatus, extendSession, axiosMock } = setup(options);
			axiosMock.post.mockRejectedValue(new Error("Network error"));

			extendSession();
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Error);
		});

		it.only("should be 'Continued' when the session is extended", async () => {
			const options = { remainingTimeInSeconds: 10, showWarningTime: 30, jwtTtl: 120 };
			const { sessionStatus, extendSession, axiosMock } = setup(options);
			axiosMock.get.mockResolvedValue(createResponse(options.jwtTtl));
			axiosMock.post.mockResolvedValue(createResponse(options.jwtTtl));

			await extendSession();
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Continued);
		});
	});
});
