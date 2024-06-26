import { h, nextTick } from "vue";
import { VApp } from "vuetify/lib/components/index.mjs";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { envsFactory } from "@@/tests/test-utils";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	THEME_KEY,
} from "@/utils/inject";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createModuleMocks } from "@/utils/mock-store-module";
import { SchulcloudTheme } from "@/serverApi/v3";
import NewLoggedIn from "./newLoggedIn.layout.vue";
import { mount } from "@vue/test-utils";

jest.mock("vue-router", () => ({
	useRoute: () => ({ path: "rooms-list" }),
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
			default: h(NewLoggedIn),
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
				SkipLinks: { template: "<div></div>" },
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

describe("newLoggedIn", () => {
	it("should render correctly", async () => {
		const { wrapper } = setup();
		await nextTick();
		await nextTick();

		expect(wrapper.exists()).toBe(true);
	});

	it("should show sidebar on Desktop as default", async () => {
		defineWindowWidth(1564);

		const { wrapper } = setup();
		await nextTick();
		await nextTick();
		const sidebar = wrapper.find("nav");

		expect(sidebar.classes()).toContain("v-navigation-drawer--active");
	});

	it("should not show sidebar on table and smaller as default", async () => {
		defineWindowWidth(564);

		const { wrapper } = setup();
		await nextTick();
		await nextTick();
		const sidebar = wrapper.find("nav");

		expect(sidebar.classes()).not.toContain("v-navigation-drawer--active");
	});
});
