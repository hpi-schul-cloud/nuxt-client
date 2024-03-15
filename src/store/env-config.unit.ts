import { ConfigResponse, SchulcloudTheme } from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import EnvConfigModule from "./env-config";
// import { FilesStorageConfigResponse } from "@/fileStorageApi/v3";

const mockEnvs: ConfigResponse = {
	ALERT_STATUS_URL: "mockValue",
	NOT_AUTHENTICATED_REDIRECT_URL: "/mock",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	FEATURE_LERNSTORE_ENABLED: true,
	SC_THEME: SchulcloudTheme.Default,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: false,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	I18N__AVAILABLE_LANGUAGES: [],
	I18N__DEFAULT_LANGUAGE: "mockValue",
	I18N__DEFAULT_TIMEZONE: "mockValue",
	I18N__FALLBACK_LANGUAGE: "mockValue",
	DOCUMENT_BASE_DIR: "mockValue",
	SC_TITLE: "mockValue",
	GHOST_BASE_URL: "mockValue",
	FEATURE_CONSENT_NECESSARY: true,
	FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED: true,
	MIGRATION_END_GRACE_PERIOD_MS: 1,
	FEATURE_SHOW_OUTDATED_USERS: true,
	FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
	FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED: true,
	ACCESSIBILITY_REPORT_EMAIL: "",
	FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: false,
	FEATURE_CTL_TOOLS_TAB_ENABLED: false,
	FEATURE_LTI_TOOLS_TAB_ENABLED: false,
	FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
	FEATURE_CTL_TOOLS_COPY_ENABLED: false,
	FEATURE_SHOW_MIGRATION_WIZARD: false,
	FEATURE_TLDRAW_ENABLED: false,
	TLDRAW__ASSETS_ENABLED: false,
	TLDRAW__ASSETS_MAX_SIZE: 0,
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
	TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
	TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
	TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false,
	FEATURE_SCHOOL_POLICY_ENABLED_NEW: false,
	FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: false,
	FEATURE_NEST_SYSTEMS_API_ENABLED: false,
	FEATURE_NEXBOARD_COPY_ENABLED: false,
	FEATURE_VIDEOCONFERENCE_ENABLED: false,
	FEATURE_COLUMN_BOARD_ENABLED: false,
	FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
	FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: false,
	FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
	FEATURE_COURSE_SHARE: false,
	FEATURE_LOGIN_LINK_ENABLED: false,
	FEATURE_LESSON_SHARE: false,
	FEATURE_TASK_SHARE: false,
	FEATURE_USER_MIGRATION_ENABLED: false,
	FEATURE_COPY_SERVICE_ENABLED: false,
	FEATURE_IMSCC_COURSE_EXPORT_ENABLED: false,
	FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
	ROCKETCHAT_SERVICE_ENABLED: false,
	CTL_TOOLS_RELOAD_TIME_MS: 299000,
};
/*
const mockFileEnvs: FilesStorageConfigResponse = {
	MAX_FILE_SIZE: -1,
};
*/
const axiosInitializer = (envs?: any, error?: boolean) => {
	initializeAxios({
		get: async () => {
			if (error) throw new Error();

			return { data: envs };
		},
	} as unknown as AxiosInstance);
};

jest.useFakeTimers();

describe("env-config module", () => {
	let consoleWarnSpy: any;
	let consoleErrorSpy: any;

	beforeEach(() => {
		consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		consoleWarnSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	describe("actions", () => {
		it("findEnv should make a get request to the right path", async () => {
			const envConfigModule = new EnvConfigModule({});
			axiosInitializer(mockEnvs);

			await envConfigModule.loadConfiguration();
			// expect(requestPath).toStrictEqual(URL);
		});

		it("findEnv should get envs", async () => {
			const envConfigModule = new EnvConfigModule({});
			axiosInitializer(mockEnvs);

			await envConfigModule.loadConfiguration();
			expect(envConfigModule.getEnv).toStrictEqual(mockEnvs);
		});

		it("findEnv should call resetBusinessError, setStatus, and setEnvs mutations", async () => {
			const envConfigModule = new EnvConfigModule({});
			axiosInitializer(mockEnvs);

			const businessErrorSpy = jest.spyOn(
				envConfigModule,
				"resetBusinessError"
			);
			const setStatusSpy = jest.spyOn(envConfigModule, "setStatus");
			const setEnvsSpy = jest.spyOn(envConfigModule, "setEnvs");

			expect(businessErrorSpy).not.toBeCalled();
			expect(setStatusSpy).not.toBeCalled();
			expect(setEnvsSpy).not.toBeCalled();

			await envConfigModule.loadConfiguration();

			expect(businessErrorSpy).toBeCalled();
			expect(setStatusSpy).toBeCalled();
			expect(setEnvsSpy).toBeCalled();
		});

		it("findEnv should log errors for missing required vars", async () => {
			const envConfigModule = new EnvConfigModule({});
			const misingRequiredVars = {
				NOT_AUTHENTICATED_REDIRECT_URL: null,
				JWT_SHOW_TIMEOUT_WARNING_SECONDS: null,
				JWT_TIMEOUT_SECONDS: null,
				SC_THEME: null,
			};
			axiosInitializer({ ...mockEnvs, ...misingRequiredVars });

			await envConfigModule.loadConfiguration();
			expect(consoleWarnSpy.mock.calls).toHaveLength(
				Object.keys(misingRequiredVars).length
			);
		});

		it("findEnvs should retry on error", async () => {
			axiosInitializer(mockEnvs, true);

			const envConfigModule = new EnvConfigModule({});
			const businessErrorSpy = jest.spyOn(
				envConfigModule,
				"resetBusinessError"
			);

			expect(envConfigModule.loadingErrorCount).toBe(0);

			await envConfigModule.loadConfiguration();
			jest.runOnlyPendingTimers();

			expect(envConfigModule.loadingErrorCount).toBe(1);
			expect(consoleErrorSpy.mock.calls).toHaveLength(1);
			expect(businessErrorSpy.mock.calls).toHaveLength(2);
		});

		it("findEnvs should not retry afer the 10th time", async () => {
			axiosInitializer(null, true);
			const envConfigModule = new EnvConfigModule({});
			const businessErrorSpy = jest.spyOn(
				envConfigModule,
				"resetBusinessError"
			);

			envConfigModule.loadingErrorCount = 10;
			expect(envConfigModule.loadingErrorCount).toBe(10);

			await envConfigModule.loadConfiguration();
			jest.runOnlyPendingTimers();

			expect(envConfigModule.loadingErrorCount).toBe(10);
			expect(consoleErrorSpy.mock.calls).toHaveLength(1);
			expect(businessErrorSpy.mock.calls).toHaveLength(1);
		});
	});

	describe("mutations", () => {
		it("setEnvs should set envs", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.env.SC_THEME).not.toBe("mockValue");
			envConfigModule.setEnvs(mockEnvs);
			expect(envConfigModule.env.SC_THEME).toBe("mockValue");
		});

		it("increaseLoadingErrorCount should increase loadingErrorCount value by 1", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.loadingErrorCount).toBe(0);
			envConfigModule.increaseLoadingErrorCount();
			expect(envConfigModule.loadingErrorCount).toBe(1);
		});

		it("setBusinessError should set businessError", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.businessError.message).toBe("");
			envConfigModule.setBusinessError({
				statusCode: "mockValue",
				message: "mockValue",
			});
			expect(envConfigModule.businessError.message).toBe("mockValue");
		});

		it("resetBusinessError should reset businessError", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.setBusinessError({
				statusCode: "mockValue",
				message: "mockValue",
			});
			expect(envConfigModule.businessError.message).toBe("mockValue");
			envConfigModule.resetBusinessError();
			expect(envConfigModule.businessError.message).toBe("");
		});

		it("setStatus should set status", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.status).toBe("");
			envConfigModule.setStatus("completed");
			expect(envConfigModule.status).toBe("completed");
		});
	});

	describe("getters", () => {
		it("getFallbackLanguage should get 'de' if I18N__FALLBACK_LANGUAGE is not defined", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.env.I18N__FALLBACK_LANGUAGE).toBe("");
			expect(envConfigModule.getFallbackLanguage).toBe("de");
		});

		it("getDefaultTimeZone should get 'Europe/Berlin' if I18N__DEFAULT_TIMEZONE is not defined", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.env.I18N__DEFAULT_TIMEZONE).toBe("");
			expect(envConfigModule.getDefaultTimezone).toBe("Europe/Berlin");
		});

		it("getMaxFileSize should get default value if MAX_FILE_SIZE is not defined", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.envFile.MAX_FILE_SIZE).toBe(-1);
			expect(envConfigModule.getMaxFileSize).toStrictEqual(2684354560);
		});

		it("getEnv should get env", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.getEnv).not.toStrictEqual(mockEnvs);
			envConfigModule.env = mockEnvs;
			expect(envConfigModule.getEnv).toStrictEqual(mockEnvs);
		});

		it("getMigrationEndGracePeriod should get MIGRATION_END_GRACE_PERIOD_MS", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = mockEnvs;
			expect(envConfigModule.getMigrationEndGracePeriod).toStrictEqual(
				mockEnvs.MIGRATION_END_GRACE_PERIOD_MS
			);
		});

		it("getShowOutdatedUsers should get FEATURE_SHOW_OUTDATED_USERS", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getShowOutdatedUsers).toStrictEqual(
				mockEnvs.FEATURE_SHOW_OUTDATED_USERS
			);
		});

		/*
		it("getShowOutdatedUsers should not get FEATURE_SHOW_OUTDATED_USERS", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = mockEnvs;
			delete envConfigModule.env.FEATURE_SHOW_OUTDATED_USERS;

			expect(envConfigModule.getShowOutdatedUsers).toEqual(false);
		});
		*/

		describe("when getting FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION", () => {
			describe("when feature exists", () => {
				it("should return value", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env = mockEnvs;

					expect(
						envConfigModule.getEnableLdapSyncDuringMigration
					).toStrictEqual(mockEnvs.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION);
				});
			});
			/*
			describe("when feature does not exist", () => {
				it("return false", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env = mockEnvs;
					delete envConfigModule.env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION;

					expect(envConfigModule.getEnableLdapSyncDuringMigration).toEqual(
						false
					);
				});
			});
			*/
		});

		it("getCtlContextConfigurationEnabled should get FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getCtlContextConfigurationEnabled).toStrictEqual(
				mockEnvs.FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED
			);
		});
		/*
		it("getCtlContextConfigurationEnabled should not get FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = mockEnvs;
			delete envConfigModule.env.FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED;

			expect(envConfigModule.getCtlContextConfigurationEnabled).toEqual(false);
		});
		*/
	});
});
