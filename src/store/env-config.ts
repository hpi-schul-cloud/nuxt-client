import { contentModule, filePathsModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import {
	DefaultApiFactory,
	DefaultApiInterface,
	ConfigResponse,
} from "../serverApi/v3/api";
import {
	FileApiFactory,
	FileApiInterface,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";

import { applicationErrorModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

/*
export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	// JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	// JWT_TIMEOUT_SECONDS: 7200,
	// SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};


export const configsFromEnvironmentVars = {
	FEATURE_LERNSTORE_ENABLED:
		process.env.FEATURE_LERNSTORE_ENABLED?.toLowerCase() == "true",
	MIGRATION_END_GRACE_PERIOD_MS: Number(
		process.env.MIGRATION_END_GRACE_PERIOD_MS
	),
};
*/

type CallbackFunctions = (paypal: number) => void;

const retryLoading = (callback: CallbackFunctions, retry: number): void => {
	if (retry <= 10) {
		const increasedRetry = retry + 1;
		setTimeout(() => {
			callback(increasedRetry);
		}, 1500);
	} else {
		throw new Error("Loading for config failed.");
	}
};

@Module({
	name: "envConfigModule",
	namespaced: true,
	stateFactory: true,
})
export default class EnvConfigModule extends VuexModule {
	private defaultFileSize = 2684354560;
	private retryConfigLoadingNumber = 9;

	env: ConfigResponse = {
		NOT_AUTHENTICATED_REDIRECT_URL: "",
		SC_THEME: "",
		JWT_TIMEOUT_SECONDS: -1,
		JWT_SHOW_TIMEOUT_WARNING_SECONDS: -1,
		FEATURE_LERNSTORE_ENABLED: false,
		MIGRATION_END_GRACE_PERIOD_MS: -1,
		ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: false,
		DOCUMENT_BASE_DIR: "",
		FEATURE_CONSENT_NECESSARY: false,
		FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
		GHOST_BASE_URL: "",
		I18N__AVAILABLE_LANGUAGES: "",
		I18N__FALLBACK_LANGUAGE: "",
		I18N__DEFAULT_LANGUAGE: "",
		I18N__DEFAULT_TIMEZONE: "",
		SC_TITLE: "",
		FEATURE_SHOW_OUTDATED_USERS: false,
		FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
		FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
		FEATURE_CTL_TOOLS_TAB_ENABLED: false,
		FEATURE_CTL_TOOLS_COPY_ENABLED: false,
		ACCESSIBILITY_REPORT_EMAIL: "",
		FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: false,
		FEATURE_LTI_TOOLS_TAB_ENABLED: false,
		FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED: false,
		FEATURE_SHOW_MIGRATION_WIZARD: false,
		FEATURE_TLDRAW_ENABLED: false,
		TLDRAW__ASSETS_ENABLED: false,
		TLDRAW__ASSETS_MAX_SIZE: -1,
		ALERT_STATUS_URL: null,
		FEATURE_ES_COLLECTIONS_ENABLED: false,
		FEATURE_EXTENSIONS_ENABLED: false,
		FEATURE_TEAMS_ENABLED: false,
		FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
		TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
		TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
		TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false,
		FEATURE_SCHOOL_POLICY_ENABLED_NEW: false,
		FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: false,
		FEATURE_NEXBOARD_COPY_ENABLED: false,
		FEATURE_VIDEOCONFERENCE_ENABLED: false,
		FEATURE_COLUMN_BOARD_ENABLED: false,
		FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
		FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: false,
		FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
		FEATURE_COURSE_SHARE: false,
		FEATURE_COURSE_SHARE_NEW: false,
		FEATURE_LOGIN_LINK_ENABLED: false,
		FEATURE_LESSON_SHARE: false,
		FEATURE_TASK_SHARE: false,
		FEATURE_USER_MIGRATION_ENABLED: false,
		FEATURE_COPY_SERVICE_ENABLED: false,
		FEATURE_IMSCC_COURSE_EXPORT_ENABLED: false,
		FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED: false,
		ROCKETCHAT_SERVICE_ENABLED: false,
	};
	envFile: FilesStorageConfigResponse = {
		MAX_FILE_SIZE: -1,
	};
	loadingErrorCount = 0;
	status: Status = "";
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	@Mutation
	setEnvs(env: ConfigResponse): void {
		this.env = env;
	}

	@Mutation
	setFileEnvs(envFile: FilesStorageConfigResponse): void {
		this.envFile = envFile;
	}

	@Mutation
	increaseLoadingErrorCount(): void {
		this.loadingErrorCount += 1;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
	}

	public get getFallbackLanguage(): string {
		return this.env.I18N__FALLBACK_LANGUAGE || this.env.I18N__DEFAULT_LANGUAGE;
	}

	public get getDefaultTimezone(): string {
		return this.env.I18N__DEFAULT_TIMEZONE;
	}

	public get getFeatureSchoolSanisUserMigrationEnabled() {
		return this.env.FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED;
	}

	public get getTheme() {
		return this.env.SC_THEME;
	}

	get getMigrationEndGracePeriod() {
		return this.env.MIGRATION_END_GRACE_PERIOD_MS;
	}

	get getNewSchoolAdminPageAsDefault(): boolean {
		return this.env.FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED;
	}

	public get getSchoolPolicyEnabled() {
		return this.env.FEATURE_SCHOOL_POLICY_ENABLED_NEW;
	}

	public get getSchoolTermsOfUseEnabled() {
		return this.env.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED;
	}

	public get getAvailableLanguages() {
		return this.env.I18N__AVAILABLE_LANGUAGES;
	}

	public get getGhostBaseUrl() {
		return this.env.GHOST_BASE_URL;
	}

	public get getAccessibilityReportEmail(): string {
		return this.env.ACCESSIBILITY_REPORT_EMAIL;
	}

	public get getCtlToolsTabEnabled(): boolean {
		return this.env.FEATURE_CTL_TOOLS_TAB_ENABLED;
	}

	public get getShowOutdatedUsers(): boolean {
		return this.env.FEATURE_SHOW_OUTDATED_USERS;
	}

	public get getEnableLdapSyncDuringMigration(): boolean {
		return this.env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION;
	}

	public get getCtlContextConfigurationEnabled(): boolean {
		return this.env.FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED;
	}

	public get getEnv(): ConfigResponse {
		return this.env;
	}

	public get getMaxFileSize(): number {
		const maxFileSize =
			this.envFile.MAX_FILE_SIZE === -1
				? this.defaultFileSize // when config not loaded
				: this.envFile.MAX_FILE_SIZE;

		return maxFileSize;
	}

	public get getShowNewClassViewEnabled(): boolean {
		return this.env.FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED;
	}

	private get serverApi(): DefaultApiInterface {
		const serverApi = DefaultApiFactory(undefined, "/v3", $axios);

		return serverApi;
	}

	private get fileApi(): FileApiInterface {
		const fileApi = FileApiFactory(undefined, "/v3", $axios);

		return fileApi;
	}

	@Action
	async loadFileConfig(retry = 0): Promise<void> {
		try {
			const fileConfig = await this.fileApi.publicConfig();
			this.setFileEnvs(fileConfig.data);
		} catch (error) {
			retryLoading(this.loadFileConfig, retry);
		}
	}

	@Action
	async loadCoreConfig(retry = 0): Promise<void> {
		try {
			const serverConfig =
				await this.serverApi.serverConfigControllerPublicConfig();
			this.setEnvs(serverConfig.data);
		} catch (error) {
			retryLoading(this.loadCoreConfig, retry);
		}
	}

	@Action
	async loadConfiguration(optional = false): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			if (optional) {
				await Promise.allSettled([
					this.loadFileConfig(),
					this.loadCoreConfig(),
				]);
			} else {
				await Promise.all([this.loadFileConfig(), this.loadCoreConfig()]);
			}

			contentModule.init();
			filePathsModule.init();
			this.setStatus("completed");
		} catch (error: unknown) {
			const applikationError = createApplicationError(
				HttpStatusCode.GatewayTimeout
			);
			applicationErrorModule.setError(applikationError);
			console.error(`Configuration could not be loaded from the server`, error);

			this.setStatus("error");
		}
	}
}
