import { mount } from "@vue/test-utils";
import { h } from "vue";
import { VApp } from "vuetify/lib/components/index.mjs";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	THEME_KEY,
} from "@/utils/inject";
import Sidebar from "./Sidebar.vue";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createModuleMocks } from "@/utils/mock-store-module";
import { SchulcloudTheme } from "@/serverApi/v3";
import { envsFactory } from "@@/tests/test-utils";

const setup = (permissions?: string[]) => {
	const authModule = createModuleMocks(AuthModule, {
		getUserPermissions: permissions,
	});

	const envs = envsFactory.build();
	const envConfigModule = createModuleMocks(EnvConfigModule, {
		getEnv: envs,
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
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[AUTH_MODULE_KEY.valueOf()]: authModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
				[THEME_KEY.valueOf()]: {
					name: "default",
				},
			},
		},
		slots: {
			default: h(Sidebar),
		},
	});

	return {
		wrapper,
	};
};

describe("Sidebar", () => {
	it("should render correctly", () => {
		const { wrapper } = setup([]);

		expect(wrapper.exists()).toBe(true);
	});

	describe("when user does not have needed permission", () => {
		it("should filter items correctly", () => {
			const { wrapper } = setup([]);

			expect(wrapper.find("[data-testid='Teams']").exists()).toBe(false);
		});
	});

	describe("when user does have needed permission", () => {
		it("should display items correctly ", () => {
			const { wrapper } = setup(["TEAMS_ENABLED".toLowerCase()]);

			expect(wrapper.find("[data-testid='Teams']").exists()).toBe(true);
		});
	});

	describe("when multiple permissions are applicable", () => {
		describe("when user does not have needed permission", () => {
			it("should filter items correctly", () => {
				const { wrapper } = setup([]);

				expect(wrapper.find("[data-testid='Aufgaben']").exists()).toBe(false);
			});
		});

		describe("when user does have one of the needed permissions", () => {
			it("should display items correctly ", () => {
				const { wrapper } = setup(["TASK_DASHBOARD_VIEW_V3".toLowerCase()]);

				expect(wrapper.find("[data-testid='Aufgaben']").exists()).toBe(true);
			});
		});
	});
});
