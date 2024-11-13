import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { LanguageType, MeSystemResponse } from "@/serverApi/v3";
import { VBtn } from "vuetify/lib/components/index.mjs";
import UserMenu from "./UserMenu.vue";

jest.mock("@data-system");

describe("@ui-layout/UserMenu", () => {
	const setupWrapper = (
		isExternalFeatureEnabled = false,
		mockedSystem?: MeSystemResponse
	) => {
		const authModule = createModuleMocks(AuthModule, {
			getLocale: "de",
			logout: jest.fn(),
			externalLogout: jest.fn(),
			get loginSystem(): MeSystemResponse | undefined {
				return mockedSystem;
			},
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getAvailableLanguages: [LanguageType.De, LanguageType.En],
			getEnv: envsFactory.build({
				FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: isExternalFeatureEnabled,
			}),
		});

		const wrapper = mount(UserMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
			props: {
				user: {
					id: "123",
					firstName: "Arthur",
					lastName: "Dent",
				},
				roleNames: ["administrator"],
			},
		});

		return { wrapper, authModule };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render with correct user initials", async () => {
		const { wrapper } = setupWrapper();

		const initials = wrapper.findComponent("[data-testid=user-menu-btn]");
		expect(initials.text()).toMatch("AD");
	});

	it("should render correct active user name with role", async () => {
		const { wrapper } = setupWrapper();

		const menuBtn = wrapper.findComponent({ name: "VBtn" });
		await menuBtn.trigger("click");

		const userName = wrapper.findComponent("[data-testid=active-user]");
		expect(userName.html()).toMatch(
			"Arthur Dent (common.roleName.administrator)"
		);
	});

	it("should trigger logout function on logout item click", async () => {
		const { wrapper, authModule } = setupWrapper();

		const menuBtn = wrapper.findComponent({ name: "VBtn" });
		await menuBtn.trigger("click");
		const logoutBtn = wrapper.findComponent("[data-testid=logout]");

		expect(logoutBtn.exists()).toBe(true);
		await logoutBtn.trigger("click");

		expect(authModule.logout).toHaveBeenCalled();
	});

	describe("external logout", () => {
		describe("when feature flag is enabled and end session endpoint is available for the system", () => {
			const setup = () => {
				const mockedSystem: MeSystemResponse = {
					id: "testId",
					name: "Test System",
					hasEndSessionEndpoint: true,
				};

				const { wrapper, authModule } = setupWrapper(true, mockedSystem);

				return { wrapper, authModule, mockedSystem };
			};

			it("should show the external logout button", async () => {
				const { wrapper, mockedSystem } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const externalLogoutBtn = wrapper.findComponent(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(true);
				expect(externalLogoutBtn.text()).toEqual(
					`common.labels.logout Bildungscloud & ${mockedSystem.name}`
				);
			});

			it("should trigger external logout function on logout item click", async () => {
				const { wrapper, authModule } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const externalLogoutBtn = wrapper.findComponent(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(true);
				await externalLogoutBtn.trigger("click");

				expect(authModule.externalLogout).toHaveBeenCalled();
			});

			it("should show the correct text for the logout button", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const logoutBtn = wrapper.findComponent("[data-testid=logout]");

				expect(logoutBtn.exists()).toBe(true);
				expect(logoutBtn.text()).toEqual(`common.labels.logout Bildungscloud`);
			});
		});

		describe("when feature flag is disabled", () => {
			const setup = () => {
				const mockedSystem: MeSystemResponse = {
					id: "testId",
					name: "Test System",
					hasEndSessionEndpoint: true,
				};

				const { wrapper } = setupWrapper(false, mockedSystem);

				return { wrapper };
			};

			it("should not show the external logout button", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const externalLogoutBtn = wrapper.findComponent(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(false);
			});

			it("should show the correct text for the logout button", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const logoutBtn = wrapper.findComponent("[data-testid=logout]");

				expect(logoutBtn.exists()).toBe(true);
				expect(logoutBtn.text()).toEqual("common.labels.logout");
			});
		});

		describe("when end session endpoint is not available for the systeme", () => {
			const setup = () => {
				const mockedSystem: MeSystemResponse = {
					id: "testId",
					name: "Test System",
					hasEndSessionEndpoint: false,
				};

				const { wrapper } = setupWrapper(true, mockedSystem);

				return { wrapper };
			};

			it("should not show the external logout button", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const externalLogoutBtn = wrapper.findComponent(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(false);
			});

			it("should show the correct text for the logout button", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				const logoutBtn = wrapper.findComponent("[data-testid=logout]");

				expect(logoutBtn.exists()).toBe(true);
				expect(logoutBtn.text()).toEqual("common.labels.logout");
			});
		});
	});
});
