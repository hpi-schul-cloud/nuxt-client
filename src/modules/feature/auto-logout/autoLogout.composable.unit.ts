import EnvConfigModule from "@/store/env-config";
import { SessionStatus, useAutoLogout } from "./autoLogout.composable";
import setupStores from "@@/tests/test-utils/setupStores";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import { envConfigModule } from "@/store";
import { envsFactory, mountComposable } from "@@/tests/test-utils";
// import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { nextTick, ref } from "vue";
// import { $axios } from "@/utils/api";

jest.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: jest.fn().mockImplementation((key) => key),
	}),
}));

const jwtTimerResponse = {
	ttl: 60,
	shouldRejected: false,
	showTimeoutValue: 30,
	timeout: 60,
};

const mockEndpointResponse = () => {
	if (jwtTimerResponse.shouldRejected) {
		return Promise.reject(new Error("Endpoint not mocked"));
	}
	return Promise.resolve({
		data: {
			ttl: jwtTimerResponse.ttl,
		},
	});
};

const envs = envsFactory.build({
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: jwtTimerResponse.showTimeoutValue,
	JWT_TIMEOUT_SECONDS: jwtTimerResponse.timeout,
});

jest.mock("@/utils/api", () => ({
	$axios: {
		get: jest.fn((url: string) => {
			if (url === "/v1/accounts/jwtTimer") {
				return mockEndpointResponse();
			}
		}),
		post: jest.fn((url: string) => {
			if (url === "/v1/accounts/jwtTimer") {
				return mockEndpointResponse();
			}
		}),
	},
}));

jest.useFakeTimers();
jest.spyOn(global, "setInterval");
jest.spyOn(global, "clearInterval");
jest.spyOn(global, "setTimeout");
jest.spyOn(global, "clearTimeout");

describe("useAutoLogout", () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});
	setupStores({
		envConfigModule: EnvConfigModule,
		notifierModule: NotifierModule,
		authModule: AuthModule,
	});

	envConfigModule.setEnvs(envs);

	const setup = (options?: { remainingTimeInSeconds?: number }) => {
		const composable = mountComposable(() => useAutoLogout(), {
			global: {
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
		});

		composable.remainingTimeInSeconds = ref(
			options?.remainingTimeInSeconds ?? 0
		);
		composable.createSession();

		return {
			...composable,
		};
	};

	it("should return default values", () => {
		const { showDialog, errorOnExtend, remainingTimeInMinutes } = setup();

		expect(showDialog.value).toBe(false);
		expect(errorOnExtend.value).toBe(false);
		expect(remainingTimeInMinutes.value).toBe(1);
	});

	describe("checkTTL", () => {
		beforeEach(() => {
			jwtTimerResponse.ttl = 60;
			jwtTimerResponse.shouldRejected = false;
			jwtTimerResponse.showTimeoutValue = 30;
			jwtTimerResponse.timeout = 60;
			jest.clearAllMocks();
			jest.clearAllTimers();
		});

		describe("when the timer is below the warning time", () => {
			it("should set the variables", async () => {
				jwtTimerResponse.ttl = jwtTimerResponse.showTimeoutValue - 10;
				jwtTimerResponse.shouldRejected = false;

				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue + 10) *
					1000;

				const { showDialog, sessionStatus, isTTLUpdated } = setup();

				jest.advanceTimersByTime(timeToAdvance);
				await nextTick();

				expect(showDialog.value).toBe(true);
				expect(sessionStatus.value).toBe(null);
				expect(isTTLUpdated.value).toBe(false);
			});
		});

		describe("when the timer is above the warning time", () => {
			it("should set the variables", async () => {
				jwtTimerResponse.ttl = jwtTimerResponse.showTimeoutValue + 10;
				jwtTimerResponse.shouldRejected = false;

				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue - 10) *
					1000;

				const { showDialog, sessionStatus, isTTLUpdated } = setup();

				jest.advanceTimersByTime(timeToAdvance);
				await nextTick();

				expect(showDialog.value).toBe(false);
				expect(sessionStatus.value).toBe(null);
				expect(isTTLUpdated.value).toBe(false);
			});
		});
		describe("when ttlCount is above the remainingTimeInSeconds", () => {
			it("should set the variables", async () => {
				jwtTimerResponse.ttl = 100;
				jwtTimerResponse.shouldRejected = false;
				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue + 10) *
					1000;
				const { showDialog, sessionStatus, isTTLUpdated } = setup();
				jest.advanceTimersByTime(timeToAdvance);
				await nextTick();
				expect(showDialog.value).toBe(false);
				expect(sessionStatus.value).toBe(null);
				expect(isTTLUpdated.value).toBe(true);
			});
		});

		describe("when endpoint fails", () => {
			it("should set the variables", async () => {
				jwtTimerResponse.ttl = jwtTimerResponse.showTimeoutValue + 10;
				jwtTimerResponse.shouldRejected = true;
				const timeToAdvance =
					(jwtTimerResponse.timeout - jwtTimerResponse.showTimeoutValue + 10) *
					1000;

				const { showDialog, sessionStatus, isTTLUpdated } = setup();

				jest.advanceTimersByTime(timeToAdvance);
				await nextTick();

				expect(showDialog.value).toBe(false);
				expect(sessionStatus.value).toBe(SessionStatus.Error);
				expect(isTTLUpdated.value).toBe(false);
			});
		});
	});

	describe("createSession", () => {
		it("should set the variables", () => {
			const { showDialog, sessionStatus, isTTLUpdated, createSession } =
				setup();

			createSession();

			expect(showDialog.value).toBe(false);
			expect(sessionStatus.value).toBe(null);
			expect(isTTLUpdated.value).toBe(false);
		});
	});
});
