import { ENV_CONFIG_MODULE_KEY, FILE_PATHS_MODULE_KEY } from "@/utils/inject";
import { mountComposable, envsFactory } from "@@/tests/test-utils";
import { useSidebarItems } from "./SidebarItems.composable";
import { createModuleMocks } from "@/utils/mock-store-module";
import { ConfigResponse, SchulcloudTheme } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createTestingI18n } from "@@/tests/test-utils/setup";

const setup = (envs?: Partial<ConfigResponse>, theme = SchulcloudTheme.Brb) => {
	const defaultEnvs = envsFactory.build({
		ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		ACCESSIBILITY_REPORT_EMAIL: "email",
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

		expect(pageLinks.value).toHaveLength(10);
	});

	it("should have correct amount of legal links", () => {
		const { legalLinks } = setup();

		expect(legalLinks.value).toHaveLength(4);
	});

	it("should have correct amount of meta links", () => {
		const { metaLinks } = setup();

		expect(metaLinks.value).toHaveLength(3);
	});

	//describe("env vars", () => {
	/* describe("when FEATURE_MEDIA_SHELF_ENABLED is set to true", () => {
			it("should have correct amount of page links", () => {
				const { pageLinks } = setup({
					FEATURE_MEDIA_SHELF_ENABLED: true,
				} as Partial<ConfigResponse>);

				expect(pageLinks.value).toHaveLength(10);
			});
		});

		describe("when FEATURE_MEDIA_SHELF_ENABLED is set to false", () => {
			it("should have correct amount of page links", () => {
				const { pageLinks } = setup({
					FEATURE_MEDIA_SHELF_ENABLED: false,
				} as Partial<ConfigResponse>);

				expect(pageLinks.value).toHaveLength(9);
			});
		}); */
	/* describe("when FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED is set to true", () => {
			it("should have correct classes link", () => {
				const { metaLinks } = setup({
					FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: true,
				} as Partial<ConfigResponse>);

				const adminLinks = metaLinks.value[0].children;

				expect(adminLinks).toContainEqual({
					title: "global.sidebar.item.classes",
					icon: "$class",
					href: "/administration/groups/classes",
					testId: "Klassen",
					permissions: ["ADMIN_VIEW", "TEACHER_LIST"],
					feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
				});
			});
		}); */
	/* describe("when FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED is set to false", () => {
			it("should have correct classes link", () => {
				const { metaLinks } = setup({
					FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
				} as Partial<ConfigResponse>);

				const adminLinks = metaLinks.value[0].children;

				expect(adminLinks).toContainEqual({
					title: "global.sidebar.item.classes",
					icon: "$class",
					href: "/administration/classes",
					testId: "Klassen",
					permissions: ["ADMIN_VIEW", "TEACHER_LIST"],
					feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
					featureValue: false,
				});
			});
		}); */
	/* describe("when FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED is set to true", () => {
			it("should have correct schools page link", () => {
				const { metaLinks } = setup({
					FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: true,
				} as Partial<ConfigResponse>);

				const adminLinks = metaLinks.value[0].children;

				expect(adminLinks).toContainEqual({
					title: "global.sidebar.item.school",
					icon: "$school_outline",
					to: "/administration/school-settings",
					testId: "Schule",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
				});
			});
		}); */
	/* describe("when FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED is set to false", () => {
			it("should have correct schools page link", () => {
				const { metaLinks } = setup({
					FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: false,
				} as Partial<ConfigResponse>);

				const adminLinks = metaLinks.value[0].children;

				expect(adminLinks).toContainEqual({
					title: "global.sidebar.item.school",
					icon: "$school_outline",
					href: "/administration/school",
					testId: "Schule",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
					featureValue: false,
				});
			});
		}); */
	/*describe("system Links", () => {
			describe("when ALERT_STATUS_URL is set", () => {
				const { metaLinks } = setup({
					ALERT_STATUS_URL: "https://status.dbildungscloud.de",
				} as Partial<ConfigResponse>);

				const systemLinks = metaLinks.value.filter(
					(link) => link.testId === "system"
				)[0].children;

				it("should have status item", () => {
					expect(systemLinks).toContainEqual({
						href: "https://status.dbildungscloud.de",
						title: "components.legacy.footer.status",
						testId: "status",
						target: "_blank",
						rel: "noopener",
						feature: "ALERT_STATUS_URL",
					});
				});

				it("should have correct amount of system links", () => {
					expect(systemLinks).toHaveLength(3);
				});
			});

			describe("when ALERT_STATUS_URL is not set", () => {
				const { metaLinks } = setup({
					ALERT_STATUS_URL: null,
				} as Partial<ConfigResponse>);

				const systemLinks = metaLinks.value.filter(
					(link) => link.testId === "system"
				)[0].children;

				it("should not have status item", () => {
					expect(systemLinks).not.toContainEqual({
						href: "https://status.dbildungscloud.de",
						title: "components.legacy.footer.status",
						testId: "status",
						target: "_blank",
						rel: "noopener",
					});
				});

				it("should have correct amount of system links", () => {
					expect(systemLinks).toHaveLength(1);
				});
			});
		});

		describe("when theme is default", () => {
			const { metaLinks } = setup(
				{
					ALERT_STATUS_URL: "https://status.dbildungscloud.de",
				} as Partial<ConfigResponse>,
				SchulcloudTheme.Default
			);

			const systemLinks = metaLinks.value.filter(
				(link) => link.testId === "system"
			)[0].children;

			it("should have security item", () => {
				expect(systemLinks).toContainEqual({
					href: "/security",
					title: "components.legacy.footer.security",
					testId: "security",
				});
			});

			it("should have correct amount of system links", () => {
				expect(systemLinks).toHaveLength(3);
			});
		});

		describe("when theme is not default", () => {
			const { metaLinks } = setup({
				ACCESSIBILITY_REPORT_EMAIL: "email",
			} as Partial<ConfigResponse>);

			const a11yGroup = metaLinks.value[metaLinks.value.length - 1];

			it("should show a11y group", () => {
				expect(a11yGroup).toBeDefined();
			});

			describe("when ACCESSIBILITY_REPORT_EMAIL is set", () => {
				const a11yLinks = a11yGroup.children;

				it("should have report a11y link", () => {
					expect(a11yLinks).toContainEqual({
						href:
							"mailto:" +
							"email" +
							"?subject=" +
							"components.legacy.footer.accessibility.report",
						title: "components.legacy.footer.accessibility.report",
						testId: "report-accessibility",
						target: "_blank",
						rel: "noopener",
					});
				});

				it("should have correct amount of a11y links", () => {
					expect(a11yLinks).toHaveLength(2);
				});
			});
		});*/
	// });
});
