import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { ConfigResponse } from "@/serverApi/v3";
import { SessionStatus, useAutoLogout } from "./autoLogout.composable";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { computed, ref } from "vue";
import { createMock } from "@golevelup/ts-jest";
import { Router, useRouter } from "vue-router";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

jest.mock("./autoLogout.composable", () => ({
	useAutoLogout: jest.fn(),
}));

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));

describe("AutoLogoutWarning", () => {
	const mockedUseAutoLogout = jest.mocked(useAutoLogout);
	const router = createMock<Router>({
		currentRoute: ref({ path: "/" }),
	});
	const useRouterMock = <jest.Mock>useRouter;
	useRouterMock.mockReturnValue(router);

	const setup = (options?: { envs?: Partial<ConfigResponse> }) => {
		options = {
			envs: { JWT_SHOW_TIMEOUT_WARNING_SECONDS: 30, JWT_TIMEOUT_SECONDS: 60 },
		};
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { ...options.envs } as ConfigResponse,
		});

		mockedUseAutoLogout.mockReturnValue({
			showDialog: ref(false),
			errorOnExtend: ref(false),
			remainingTimeInMinutes: computed(() => 0),
			remainingTimeInSeconds: ref(0),
			showWarningOnRemainingSeconds: ref(0),
			sessionStatus: ref("null" as unknown as SessionStatus),
			createSession: jest.fn(),
			extendSession: jest.fn(),
		});

		const wrapper = mount(AutoLogoutWarning, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
		});
		return { wrapper };
	};

	it("should render the component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});
});
