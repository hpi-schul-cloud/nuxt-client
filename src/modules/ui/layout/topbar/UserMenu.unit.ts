import { createTestEnvStore } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { System, useSystemApi } from "@data-system";
import { useOAuthApi } from "@data-oauth";
import { DeepMocked, createMock } from "@golevelup/ts-vitest";
import { LanguageType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VBtn, VListItem } from "vuetify/lib/components/index";
import UserMenu from "./UserMenu.vue";

vi.mock("@data-system");
vi.mock("@data-oauth");

describe("@ui-layout/UserMenu", () => {
	let useSystemApiMock: DeepMocked<ReturnType<typeof useSystemApi>>;
	let useOAuthApiMock: DeepMocked<ReturnType<typeof useOAuthApi>>;

	const setupWrapper = (
		isExternalFeatureEnabled = false,
		mockedSystem?: System,
		mockedTokenExpiration?: Date
	) => {
		const authModule = createModuleMocks(AuthModule, {
			getLocale: "de",
			logout: vi.fn(),
			externalLogout: vi.fn(),
			get loginSystem(): string | undefined {
				return mockedSystem?.id;
			},
		});

		createTestEnvStore({
			FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: isExternalFeatureEnabled,
			I18N__AVAILABLE_LANGUAGES: [LanguageType.De, LanguageType.En],
		});

		useSystemApiMock = createMock<ReturnType<typeof useSystemApi>>();
		useOAuthApiMock = createMock<ReturnType<typeof useOAuthApi>>();

		vi.mocked(useSystemApi).mockReturnValue(useSystemApiMock);
		vi.mocked(useOAuthApi).mockReturnValue(useOAuthApiMock);

		useSystemApiMock.getSystem.mockResolvedValue(mockedSystem);
		useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(
			mockedTokenExpiration
		);

		const wrapper = mount(UserMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
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
		vi.clearAllMocks();
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
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
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
					`common.labels.logout Bildungscloud & ${mockedSystem.displayName}`
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
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
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

		describe("when end session endpoint is not available for the system", () => {
			const setup = () => {
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
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

		describe("when the oauth session token is valid", () => {
			const setup = () => {
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
					hasEndSessionEndpoint: true,
				};
				const mockedTokenExpiration = new Date(Date.now() + 3 * 3600 * 1000);

				const { wrapper } = setupWrapper(
					true,
					mockedSystem,
					mockedTokenExpiration
				);

				return { wrapper };
			};

			it("should not disable the option to do an external logout", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				await nextTick();

				const externalLogoutBtn = wrapper.findComponent<typeof VListItem>(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(true);
				expect(externalLogoutBtn.props().disabled).toBe(false);
			});
		});

		describe("when the oauth session token is expired", () => {
			const setup = () => {
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
					hasEndSessionEndpoint: true,
				};
				const mockedTokenExpiration = new Date(Date.now() - 3 * 3600 * 1000);

				const { wrapper } = setupWrapper(
					true,
					mockedSystem,
					mockedTokenExpiration
				);

				return { wrapper };
			};

			it("should disable the option to do an external logout", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				await nextTick();

				const externalLogoutBtn = wrapper.findComponent<typeof VListItem>(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(true);
				expect(externalLogoutBtn.props().disabled).toBe(true);
			});
		});

		describe("when the oauth session token could not be found", () => {
			const setup = () => {
				const mockedSystem: System = {
					id: "testId",
					displayName: "Test System",
					hasEndSessionEndpoint: true,
				};

				const { wrapper } = setupWrapper(true, mockedSystem);

				return { wrapper };
			};

			it("should disable the option to do an external logout", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				await nextTick();

				const externalLogoutBtn = wrapper.findComponent<typeof VListItem>(
					"[data-testid=external-logout]"
				);

				expect(externalLogoutBtn.exists()).toBe(true);
				expect(externalLogoutBtn.props().disabled).toBe(true);
			});
		});
	});
});
