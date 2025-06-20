import { ENV_CONFIG_MODULE_KEY, FILE_PATHS_MODULE_KEY } from "@/utils/inject";
import { envsFactory, mountComposable } from "@@/tests/test-utils";
import { useSidebarItems } from "./SidebarItems.composable";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { ConfigResponse, SchulcloudTheme } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createTestingI18n } from "@@/tests/test-utils/setup";

const setup = (envs?: Partial<ConfigResponse>, theme = SchulcloudTheme.Brb) => {
	const defaultEnvs = envsFactory.build({
		ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		ACCESSIBILITY_REPORT_EMAIL: "email",
		TRAINING_URL: "https://lernen.dbildungscloud.de",
		FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: true,
		FEATURE_MEDIA_SHELF_ENABLED: true,
	});

	const envConfigModule = createModuleMocks(EnvConfigModule, {
		getEnv: { ...defaultEnvs, ...envs },
		getNewSchoolAdminPageAsDefault:
			envs?.FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED || false,
		getTheme: theme,
	});

	const filePathsModule = createModuleMocks(FilePathsModule, {
		getSpecificFiles: {
			accessibilityStatement: "statement",
			privacy: "",
			termsOfUse: "",
			analogConsent: "",
		},
	});

	return mountComposable(() => useSidebarItems(), {
		global: {
			plugins: [createTestingI18n()],
			provide: {
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
			},
		},
	});
};

describe("SidebarItems Composable", () => {
	it("should have correct amount of page links", () => {
		const { pageLinks } = setup();

		expect(pageLinks.value).toHaveLength(11);
	});

	describe("when FEATURE_ROOM_ADD_STUDENTS_ENABLED feature is enabled", () => {
		it("should have correct amount of page links", () => {
			const { pageLinks } = setup({
				FEATURE_ROOM_ADD_STUDENTS_ENABLED: true,
			});

			expect(pageLinks.value).toHaveLength(11);
			expect(pageLinks.value[1].permissions).toBeUndefined();

			const roomsLink = pageLinks.value.find(
				(link) => link.title === "global.sidebar.item.rooms"
			);

			expect(roomsLink?.permissions).toBeUndefined();
		});
	});

	it("should have correct amount of legal links", () => {
		const { legalLinks } = setup();

		expect(legalLinks.value).toHaveLength(5);
	});

	it("should have correct amount of meta links", () => {
		const { metaLinks } = setup();

		expect(metaLinks.value).toHaveLength(3);
	});
});
