import { SchulcloudTheme } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	THEME_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { VApp } from "vuetify/lib/components/index";
import LoggedInLayout from "./LoggedIn.layout.vue";
import { Topbar, Sidebar } from "@ui-layout";
import { createTestingPinia } from "@pinia/testing";
import { SkipLink } from "@ui-skip-link";
import StatusAlertsModule from "@/store/status-alerts";

vi.mock("vue-router", () => ({
	useRoute: () => ({ path: "rooms/courses-list" }),
}));

const setup = () => {
	const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
		getStatusAlerts: [],
	});
	const authModule = createModuleMocks(AuthModule, {
		getUserPermissions: [],
	});

	const envConfigModule = createModuleMocks(EnvConfigModule, {
		getEnv: envsFactory.build(),
		getTheme: SchulcloudTheme.Brb,
	});

	const filePathsModule = createModuleMocks(FilePathsModule, {
		getSpecificFiles: {
			accessibilityStatement: "statement",
			privacy: "",
			termsOfUse: "",
			analogConsent: "",
		},
	});

	const wrapper = mount(VApp, {
		slots: {
			default: h(LoggedInLayout),
		},
		global: {
			plugins: [
				createTestingVuetify(),
				createTestingI18n(),
				createTestingPinia(),
			],
			provide: {
				[AUTH_MODULE_KEY.valueOf()]: authModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
				[THEME_KEY.valueOf()]: {
					name: SchulcloudTheme.N21,
				},
				[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
			},
			stubs: {
				"application-error-wrapper": { template: "<div></div>" },
				snackbar: { template: "<div></div>" },
				"router-view": { template: "<div></div>" },
				"loading-state-dialog": { template: "<div></div>" },
				"keep-alive": { template: "<div></div>" },
				autoLogoutWarning: { template: "<div></div>" },
			},
		},
	});

	return {
		wrapper,
	};
};

const defineWindowWidth = (width = 1564) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

const mockGetLocalStorage = vi.fn();
const mockSetLocalStorage = vi.fn();
Object.defineProperty(window, "localStorage", {
	value: {
		getItem: mockGetLocalStorage,
		setItem: mockSetLocalStorage,
	},
});

describe("LoggedIn.layout.vue", () => {
	beforeEach(() => {
		defineWindowWidth();
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should render correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.findComponent({ name: "VMain" }).exists()).toBe(true);
	});

	describe("SkipLink", () => {
		it("should render link to main content", () => {
			const { wrapper } = setup();

			const skipLink = wrapper.findComponent(SkipLink);
			expect(skipLink.exists()).toBe(true);

			expect(skipLink.find("a[href='#main-content']").exists()).toBe(true);
		});
	});

	describe("Sidebar", () => {
		it("should render sidebar", () => {
			const { wrapper } = setup();

			const sidebar = wrapper.findComponent(Sidebar);
			expect(sidebar.exists()).toBe(true);
		});

		describe("when using a large screen", () => {
			it("should show expanded sidebar", () => {
				const { wrapper } = setup();

				const sidebar = wrapper.getComponent(Sidebar);
				const nav = sidebar.get("nav");

				expect(nav.classes()).toContain("v-navigation-drawer--active");
			});
		});

		describe("when using a small screen", () => {
			it("should hide sidebar", () => {
				defineWindowWidth(564);

				const { wrapper } = setup();
				const sidebar = wrapper.getComponent(Sidebar);
				const nav = sidebar.get("nav");

				expect(nav.classes()).not.toContain("v-navigation-drawer--active");
			});
		});

		describe("when sidebar is expanded", () => {
			describe("and sidebar toggle button is clicked", () => {
				it("should collapse sidebar", async () => {
					const { wrapper } = setup();

					const sidebar = wrapper.getComponent(Sidebar);
					const sidebarToggle = wrapper.getComponent(
						"[data-testid='sidebar-toggle-close']"
					);
					await sidebarToggle.trigger("click");
					const nav = sidebar.get("nav");

					expect(nav.classes()).not.toContain("v-navigation-drawer--active");
				});
			});
		});
	});

	describe("Topbar", () => {
		it("should render topbar", () => {
			const { wrapper } = setup();

			const topbar = wrapper.findComponent(Topbar);
			expect(topbar.exists()).toBe(true);
		});

		describe("when sidebar is hidden", () => {
			it("should show sidebar toggle button in topbar", () => {
				defineWindowWidth(564);
				const { wrapper } = setup();
				const sidebarToggle = wrapper.findComponent({
					name: "VAppBarNavIcon",
				});
				expect(sidebarToggle.exists()).toBe(true);
			});

			it("should show logo", () => {
				defineWindowWidth(564);
				const { wrapper } = setup();

				const topbar = wrapper.getComponent(Topbar);
				const topbarLogo = topbar.findComponent({ name: "CloudLogo" });
				expect(topbarLogo.exists()).toBe(true);
			});

			describe("and sidebar toggle button in topbar is clicked", () => {
				it("should expand sidebar", async () => {
					defineWindowWidth(564);
					const { wrapper } = setup();

					const topbar = wrapper.getComponent(Topbar);
					topbar.vm.$emit("sidebar-toggled");
					await nextTick();

					expect(topbar.emitted("sidebar-toggled")).toHaveLength(1);

					const sidebar = wrapper.getComponent(Sidebar);
					const nav = sidebar.get("nav");

					expect(nav.classes()).toContain("v-navigation-drawer--active");
				});
			});
		});
	});

	it("should not have sidebar in taborder", async () => {
		defineWindowWidth(564);
		const sidebarExpanded = true;
		const { wrapper } = setup();

		const sidebar = wrapper.find("nav");

		if (!sidebarExpanded) expect(sidebar.attributes("tabindex")).toBe("-1");
	});

	it("should call 'localStorage.getItem' on mounted", async () => {
		setup();
		expect(mockGetLocalStorage).toHaveBeenCalledWith("sidebarExpanded");
	});

	it("should set localStorage key 'sidebarExpanded' to 'false' on sidebar click", async () => {
		const { wrapper } = setup();
		const topbarComponent = wrapper.findComponent(Topbar);
		topbarComponent.vm.$emit("sidebar-toggled");

		const sidebar = wrapper.find("nav");

		await sidebar.trigger("click");

		expect(mockSetLocalStorage).toHaveBeenCalledWith(
			"sidebarExpanded",
			"false"
		);
	});

	it("should set localStorage key 'sidebarExpanded' to 'true' on topbar click", async () => {
		const { wrapper } = setup();
		const topbarComponent = wrapper.findComponent(Topbar);
		topbarComponent.vm.$emit("sidebar-toggled");
		await nextTick();

		expect(mockSetLocalStorage).toHaveBeenCalledWith("sidebarExpanded", "true");
	});
});
