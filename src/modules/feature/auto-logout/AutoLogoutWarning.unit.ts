import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { ConfigResponse } from "@/serverApi/v3";
import { useAutoLogout } from "./autoLogout.composable";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { computed, ref } from "vue";
import { createMock } from "@golevelup/ts-jest";
import { Router, useRouter } from "vue-router";
import BaseModal from "@/components/base/BaseModal.vue";
import { SessionStatus } from "./types";

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
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockedUseAutoLogout = jest.mocked(useAutoLogout);
	const router = createMock<Router>({
		currentRoute: ref({ path: "/" }),
	});
	const useRouterMock = <jest.Mock>useRouter;
	useRouterMock.mockReturnValue(router);

	const defaultVars = {
		showDialog: ref(true),
		errorOnExtend: ref(false),
		isTTLUpdated: ref(false),
		remainingTimeInMinutes: computed(() => 0),
		remainingTimeInSeconds: 0,
		showWarningOnRemainingSeconds: 0,
		sessionStatus: ref<SessionStatus | null>(null),
		createSession: jest.fn(),
		extendSession: jest.fn(),
	};

	const setup = (options?: {
		envs?: Partial<ConfigResponse>;
		autoLogoutVariables?: Partial<typeof defaultVars>;
	}) => {
		options = {
			envs: { JWT_SHOW_TIMEOUT_WARNING_SECONDS: 30, JWT_TIMEOUT_SECONDS: 60 },
			autoLogoutVariables: { ...defaultVars },
			...options,
		};
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { ...options.envs } as ConfigResponse,
		});

		mockedUseAutoLogout.mockReturnValue({
			...defaultVars,
			...options.autoLogoutVariables,
		});

		const wrapper = mount(AutoLogoutWarning, {
			attachTo: document.body,
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				components: {
					"base-modal": BaseModal,
				},
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
		});
		return { wrapper, useAutoLogout: mockedUseAutoLogout() };
	};

	it("should render the component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should call the createSession method on load", () => {
		setup();
		const mockedCreateSession = mockedUseAutoLogout().createSession;
		expect(mockedCreateSession).toHaveBeenCalled();
	});

	describe("showDialog", () => {
		describe("when showDialog is set true", () => {
			it("should show the dialog", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						showDialog: ref(true),
					},
				});

				const dialog = wrapper.findComponent(BaseModal);

				expect(dialog.props("active")).toBe(true);
			});
		});

		describe("when showDialog is set false", () => {
			it("should not show the dialog", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						showDialog: ref(false),
					},
				});

				const dialog = wrapper.findComponent(BaseModal);
				expect(dialog.props("active")).toBe(false);
			});
		});
	});

	describe("confirm button", () => {
		describe("when sessionStatus is 'ended'", () => {
			it("should set the correct title", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				expect(button.exists()).toBe(true);
				expect(button.text()).toContain(
					"feature-autoLogout.button.confirm.returnToLogin"
				);
			});

			it("should call router.push when clicked", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				await button.trigger("click");

				expect(router.push).toHaveBeenCalledWith("/login");
			});
		});

		describe("when sessionStatus is 'continued'", () => {
			it("should set the correct title", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});
				const button = wrapper.findComponent({ name: "v-btn" });

				expect(button.exists()).toBe(true);
				expect(button.text()).toContain("feature-autoLogout.button.confirm");
			});

			it("should call the extendSession method when clicked", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				await button.trigger("click");

				expect(mockedUseAutoLogout().extendSession).toHaveBeenCalled();
			});
		});
	});
});
