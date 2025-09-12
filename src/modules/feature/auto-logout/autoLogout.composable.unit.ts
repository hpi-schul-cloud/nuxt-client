import { SessionStatus, useAutoLogout } from "@feature-auto-logout";
import setupStores from "@@/tests/test-utils/setupStores";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import { createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { nextTick } from "vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { flushPromises } from "@vue/test-utils";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
	}),
}));

const jwtTimerResponse = {
	ttl: 60,
	rejected: false,
	showTimeoutValue: 30,
	timeout: 60,
};

const mockEndpointResponse = () => {
	if (jwtTimerResponse.rejected) {
		return Promise.reject(new Error("Endpoint not mocked"));
	}
	return Promise.resolve({
		data: {
			ttl: jwtTimerResponse.ttl,
		},
	});
};

vi.mock("@/utils/api", () => ({
	$axios: {
		get: vi.fn((url: string) => {
			if (url === "/v1/accounts/jwtTimer") {
				return mockEndpointResponse();
			}
		}),
		post: vi.fn((url: string) => {
			if (url === "/v1/accounts/jwtTimer") {
				return mockEndpointResponse();
			}
		}),
	},
}));

vi.useFakeTimers();
vi.spyOn(global, "setInterval");
vi.spyOn(global, "clearInterval");
vi.spyOn(global, "setTimeout");
vi.spyOn(global, "clearTimeout");

describe("useAutoLogout", () => {
	beforeEach(() => {
		jwtTimerResponse.ttl = 60;
		jwtTimerResponse.showTimeoutValue = 30;
		jwtTimerResponse.timeout = 60;
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	setupStores({
		notifierModule: NotifierModule,
		authModule: AuthModule,
	});

	createTestEnvStore({
		JWT_SHOW_TIMEOUT_WARNING_SECONDS: jwtTimerResponse.showTimeoutValue,
		JWT_TIMEOUT_SECONDS: jwtTimerResponse.timeout,
	});
	const notifierModuleMock = createModuleMocks(NotifierModule);

	const setup = (options?: { remainingTimeInSeconds?: number }) => {
		const composable = mountComposable(() => useAutoLogout(), {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
			},
		});

		composable.remainingTimeInSeconds = options?.remainingTimeInSeconds ?? 0;

		composable.createSession();

		return {
			...composable,
		};
	};

	describe("showDialog", () => {
		it("should be false by default", () => {
			const { showDialog } = setup();

			expect(showDialog.value).toBe(false);
		});

		describe("when the timer is below the warning time", () => {
			it("should set 'showDialog' true", async () => {
				jwtTimerResponse.ttl = jwtTimerResponse.showTimeoutValue - 10;
				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue + 10) *
					1000;
				const { showDialog } = setup();

				vi.advanceTimersByTime(timeToAdvance);
				await nextTick();

				expect(showDialog.value).toBe(true);
			});
		});

		describe("isTTLUpdated", () => {
			it("should be false by default", () => {
				const { isTTLUpdated } = setup();

				expect(isTTLUpdated.value).toBe(false);
			});

			it("should be true when the session is extended", async () => {
				jwtTimerResponse.ttl = 100;
				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue + 10) *
					1000;
				const { isTTLUpdated } = setup();
				vi.advanceTimersByTime(timeToAdvance);
				await nextTick();

				expect(isTTLUpdated.value).toBe(true);
			});
		});

		describe("when the timer is above the warning time", () => {
			it("should set 'showDialog' to false", async () => {
				jwtTimerResponse.ttl = jwtTimerResponse.showTimeoutValue + 10;
				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue - 10) *
					1000;
				const { showDialog } = setup();

				vi.advanceTimersByTime(timeToAdvance);
				await flushPromises();

				expect(showDialog.value).toBe(false);
			});
		});
	});

	describe("errorOnExtend", () => {
		it("should be false by default", () => {
			const { errorOnExtend } = setup();

			expect(errorOnExtend.value).toBe(false);
		});

		it("should be true when an error occurs", async () => {
			jwtTimerResponse.rejected = true;
			const { errorOnExtend, extendSession } = setup();
			extendSession();
			await flushPromises();

			expect(errorOnExtend.value).toBe(true);
		});
	});

	describe("remainingTimeInMinutes", () => {
		it("should return the correct value", () => {
			jwtTimerResponse.ttl = 120;
			createTestEnvStore({
				JWT_SHOW_TIMEOUT_WARNING_SECONDS: jwtTimerResponse.showTimeoutValue,
				JWT_TIMEOUT_SECONDS: jwtTimerResponse.ttl,
			});
			const { remainingTimeInMinutes } = setup();

			expect(remainingTimeInMinutes.value).toBe(2);
		});
	});

	describe("sessionStatus", () => {
		it("should be null by default", () => {
			const { sessionStatus } = setup();

			expect(sessionStatus.value).toBe(null);
		});

		it("should be 'Ended' when the session ends", async () => {
			jwtTimerResponse.ttl = 120;
			createTestEnvStore({
				JWT_SHOW_TIMEOUT_WARNING_SECONDS: jwtTimerResponse.showTimeoutValue,
				JWT_TIMEOUT_SECONDS: jwtTimerResponse.ttl,
			});
			const { sessionStatus } = setup();
			vi.advanceTimersByTime(jwtTimerResponse.ttl * 1000);
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Ended);
		});

		it("should be 'Error' when an error occurs", async () => {
			jwtTimerResponse.rejected = true;
			const { sessionStatus, extendSession } = setup();
			extendSession();
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Error);
		});

		it("should be 'Continued' when the session is extended", async () => {
			jwtTimerResponse.ttl = 120;
			jwtTimerResponse.rejected = false;

			const { sessionStatus, extendSession } = setup();
			extendSession();
			await flushPromises();

			expect(sessionStatus.value).toBe(SessionStatus.Continued);
		});
	});
});
