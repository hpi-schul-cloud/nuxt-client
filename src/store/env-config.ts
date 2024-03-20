import {
	FileApiFactory,
	FileApiInterface,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";
import {
	ConfigResponse,
	DefaultApiFactory,
	DefaultApiInterface,
	LanguageType,
	SchulcloudTheme,
	Timezone,
} from "@/serverApi/v3";
import {
	applicationErrorModule,
	contentModule,
	filePathsModule,
} from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";

@Module({
	name: "envConfigModule",
	namespaced: true,
	stateFactory: true,
})
export default class EnvConfigModule extends VuexModule {
	env: ConfigResponse = {
		NOT_AUTHENTICATED_REDIRECT_URL: "",
		SC_THEME: SchulcloudTheme.Default,
		JWT_TIMEOUT_SECONDS: -1,
		JWT_SHOW_TIMEOUT_WARNING_SECONDS: -1,
		FEATURE_LERNSTORE_ENABLED: false,
		MIGRATION_END_GRACE_PERIOD_MS: -1,
		ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: false,
		DOCUMENT_BASE_DIR: "",
		FEATURE_CONSENT_NECESSARY: false,
		FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
		GHOST_BASE_URL: "",
		I18N__AVAILABLE_LANGUAGES: [],
		I18N__FALLBACK_LANGUAGE: LanguageType.De,
		I18N__DEFAULT_LANGUAGE: LanguageType.De,
		I18N__DEFAULT_TIMEZONE: Timezone.EuropeBerlin,
		SC_TITLE: "",
		FEATURE_SHOW_OUTDATED_USERS: false,
		FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
		FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
		FEATURE_CTL_TOOLS_TAB_ENABLED: false,
		FEATURE_CTL_TOOLS_COPY_ENABLED: false,
		ACCESSIBILITY_REPORT_EMAIL: "",
		FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: false,
		FEATURE_LTI_TOOLS_TAB_ENABLED: true,
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
		FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: false,
		FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: false,
		FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED: false,
		ROCKETCHAT_SERVICE_ENABLED: false,
		FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: false,
		CTL_TOOLS_RELOAD_TIME_MS: 299000,
	};
	envFile: FilesStorageConfigResponse = {
		MAX_FILE_SIZE: 2684354560,
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

	get getFallbackLanguage(): string {
		return this.env.I18N__FALLBACK_LANGUAGE || this.env.I18N__DEFAULT_LANGUAGE;
	}

	get getDefaultTimezone(): Timezone {
		return this.env.I18N__DEFAULT_TIMEZONE;
	}

	get getAdminToggleStudentLernstoreViewEnabled(): boolean {
		return (
			this.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED &&
			this.env.FEATURE_LERNSTORE_ENABLED
		);
	}

	get getFeatureSchoolSanisUserMigrationEnabled(): boolean {
		return this.env.FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED;
	}

	get getTheme(): SchulcloudTheme {
		return this.env.SC_THEME;
	}

	get getMigrationEndGracePeriod(): number {
		return this.env.MIGRATION_END_GRACE_PERIOD_MS;
	}

	get getTeacherStudentVisibilityIsConfigurable(): boolean {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE;
	}

	get getTeacherStudentVisibilityIsEnabledByDefault(): boolean {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT;
	}

	get getTeacherStudentVisibilityIsVisible(): boolean {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_VISIBLE;
	}

	get getVideoConferenceEnabled(): boolean {
		return this.env.FEATURE_VIDEOCONFERENCE_ENABLED;
	}

	get getLoginLinkEnabled(): boolean {
		return this.env.FEATURE_LOGIN_LINK_ENABLED;
	}

	get getRocketChatEnabled(): boolean {
		return this.env.ROCKETCHAT_SERVICE_ENABLED;
	}

	get getNewSchoolAdminPageAsDefault(): boolean {
		return this.env.FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED;
	}

	get getSchoolPolicyEnabled(): boolean {
		return this.env.FEATURE_SCHOOL_POLICY_ENABLED_NEW;
	}

	get getSchoolTermsOfUseEnabled(): boolean {
		return this.env.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED;
	}

	get getAvailableLanguages(): LanguageType[] {
		return this.env.I18N__AVAILABLE_LANGUAGES;
	}

	get getGhostBaseUrl(): string {
		return this.env.GHOST_BASE_URL;
	}

	get getAccessibilityReportEmail(): string {
		return this.env.ACCESSIBILITY_REPORT_EMAIL;
	}

	get getCtlToolsTabEnabled(): boolean {
		return this.env.FEATURE_CTL_TOOLS_TAB_ENABLED;
	}

	get getShowOutdatedUsers(): boolean {
		return this.env.FEATURE_SHOW_OUTDATED_USERS;
	}

	get getEnableLdapSyncDuringMigration(): boolean {
		return this.env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION;
	}

	get getCtlContextConfigurationEnabled(): boolean {
		return this.env.FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED;
	}

	get getLtiToolsTabEnabled(): boolean {
		return this.env.FEATURE_LTI_TOOLS_TAB_ENABLED;
	}

	get getCtlToolsCopyEnabled(): boolean {
		return this.env.FEATURE_CTL_TOOLS_COPY_ENABLED;
	}

	get getEnv(): ConfigResponse {
		return this.env;
	}

	get getMaxFileSize(): number {
		return this.envFile.MAX_FILE_SIZE;
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
	async loadFileConfig(): Promise<void> {
		const fileConfig = await this.fileApi.publicConfig();
		this.setFileEnvs(fileConfig.data);
	}

	@Action
	async loadCoreConfig(): Promise<void> {
		const serverConfig =
			await this.serverApi.serverConfigControllerPublicConfig();
		this.setEnvs(serverConfig.data);
	}

	@Action
	async loadConfiguration({ optional = false } = {}): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			const configCalls = [this.loadFileConfig(), this.loadCoreConfig()];

			if (optional) {
				await Promise.allSettled(configCalls);
			} else {
				await Promise.all(configCalls);
			}

			contentModule.init();
			filePathsModule.init();

			this.setStatus("completed");
		} catch (error: unknown) {
			const applicationError = createApplicationError(
				HttpStatusCode.GatewayTimeout
			);
			applicationErrorModule.setError(applicationError);
			console.error(`Configuration could not be loaded from the server`, error);

			this.setStatus("error");
		}
	}
}
