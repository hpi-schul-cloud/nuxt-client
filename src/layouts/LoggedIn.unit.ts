import { SchulcloudTheme } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	THEME_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { VApp } from "vuetify/lib/components/index.mjs";
import LoggedInLayout from "./LoggedIn.layout.vue";
import { Topbar } from "@ui-layout";

jest.mock("vue-router", () => ({
	useRoute: () => ({ path: "rooms/courses-list" }),
}));

const setup = () => {
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
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[AUTH_MODULE_KEY.valueOf()]: authModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
				[THEME_KEY.valueOf()]: {
					name: SchulcloudTheme.N21,
				},
			},
			stubs: {
				SkipLink: { template: "<div></div>" },
				"application-error-wrapper": { template: "<div></div>" },
				snackbar: { template: "<div></div>" },
				"router-view": { template: "<div></div>" },
				"loading-state-dialog": { template: "<div></div>" },
				"keep-alive": { template: "<div></div>" },
				autoLogoutWarning: { template: "<div></div>" },
				topbar: { template: "<div></div>" },
			},
		},
	});

	return {
		wrapper,
	};
};

const defineWindowWidth = (width: number) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

const mockGetLocalStorage = jest.fn();
const mockSetLocalStorage = jest.fn();
Object.defineProperty(window, "localStorage", {
	value: {
		getItem: mockGetLocalStorage,
		setItem: mockSetLocalStorage,
	},
});

describe("LoggedIn.layout.vue", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render correctly", async () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should show sidebar on Desktop as default", async () => {
		defineWindowWidth(1564);
		const sidebarExpanded = true;
		const { wrapper } = setup();
		const sidebar = wrapper.find("nav");

		if (!sidebarExpanded)
			expect(sidebar.classes()).toContain("v-navigation-drawer--active");
	});

	it("should not show sidebar on table and smaller as default", async () => {
		defineWindowWidth(564);
		const sidebarExpanded = true;
		const { wrapper } = setup();
		const sidebar = wrapper.find("nav");

		if (!sidebarExpanded)
			expect(sidebar.classes()).not.toContain("v-navigation-drawer--active");
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
		defineWindowWidth(1564);
		const { wrapper } = setup();
		const topbarComponent = wrapper.findComponent(Topbar);
		topbarComponent.vm.$emit("sidebar-toggled");

		const sidebar = wrapper.find("nav");

		await sidebar.trigger("click");
		await nextTick();

		expect(mockSetLocalStorage).toHaveBeenCalledWith(
			"sidebarExpanded",
			"false"
		);
	});

	it("should set localStorage key 'sidebarExpanded' to 'true' on topbar click", async () => {
		defineWindowWidth(564);
		const { wrapper } = setup();
		const topbarComponent = wrapper.findComponent(Topbar);
		topbarComponent.vm.$emit("sidebar-toggled");
		await nextTick();

		expect(mockSetLocalStorage).toHaveBeenCalledWith("sidebarExpanded", "true");
	});
});
