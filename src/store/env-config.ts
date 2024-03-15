import { contentModule, filePathsModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import { Envs } from "./types/env-config";

export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	VUE_APP_SC_THEME: process.env.VUE_APP_SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

export const configsFromEnvironmentVars = {
	FEATURE_LERNSTORE_ENABLED:
		process.env.FEATURE_LERNSTORE_ENABLED?.toLowerCase() == "true",
	MIGRATION_END_GRACE_PERIOD_MS: Number(
		process.env.MIGRATION_END_GRACE_PERIOD_MS
	),
};

const retryLimit = 10;

@Module({
	name: "envConfigModule",
	namespaced: true,
	stateFactory: true,
})
export default class EnvConfigModule extends VuexModule {
	env: Envs = {
		...requiredVars,
		...configsFromEnvironmentVars,
		ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		DOCUMENT_BASE_DIR: "",
		FALLBACK_DISABLED: false,
		FEATURE_CONSENT_NECESSARY: true,
		FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
		GHOST_BASE_URL: "",
		I18N__AVAILABLE_LANGUAGES: "",
		I18N__FALLBACK_LANGUAGE: "",
		I18N__DEFAULT_LANGUAGE: "",
		I18N__DEFAULT_TIMEZONE: "",
		SC_TITLE: "",
		FILES_STORAGE__MAX_FILE_SIZE: 0,
		FEATURE_SHOW_OUTDATED_USERS: false,
		FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
		FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
		FEATURE_CTL_TOOLS_TAB_ENABLED: false,
		FEATURE_CTL_TOOLS_COPY_ENABLED: false,
		CTL_TOOLS_RELOAD_TIME_MS: 299000,
		VUE_APP_SC_THEME: "",
	};
	loadingErrorCount = 0;
	status: Status = "";
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	@Mutation
	setEnvs(env: Envs): void {
		this.env = { ...requiredVars, ...env };
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
		return this.env.I18N__FALLBACK_LANGUAGE || "de"; // TODO rely on server provided default
	}

	get getDefaultTimezone(): string {
		return this.env.I18N__DEFAULT_TIMEZONE || "Europe/Berlin"; // TODO rely on server provided default
	}

	get getAdminToggleStudentLernstoreViewEnabled() {
		return (
			this.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED &&
			this.env.FEATURE_LERNSTORE_ENABLED
		);
	}

	get getFeatureSchoolSanisUserMigrationEnabled() {
		return this.env.FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED;
	}

	get getMigrationEndGracePeriod() {
		return this.env.MIGRATION_END_GRACE_PERIOD_MS;
	}

	get getTeacherStudentVisibilityIsConfigurable() {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE;
	}

	get getTeacherStudentVisibilityIsEnabledByDefault() {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT;
	}

	get getTeacherStudentVisibilityIsVisible() {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_VISIBLE;
	}

	get getTheme() {
		return this.env.VUE_APP_SC_THEME;
	}

	get getVideoConferenceEnabled() {
		return this.env.FEATURE_VIDEOCONFERENCE_ENABLED;
	}

	get getSchoolPolicyEnabled() {
		return this.env.FEATURE_SCHOOL_POLICY_ENABLED_NEW;
	}

	get getSchoolTermsOfUseEnabled() {
		return this.env.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED;
	}

	get getLoginLinkEnabled() {
		return this.env.FEATURE_LOGIN_LINK_ENABLED;
	}

	get getRocketChatEnabled() {
		return this.env.ROCKETCHAT_SERVICE_ENABLED;
	}

	get getAvailableLanguages() {
		return this.env.I18N__AVAILABLE_LANGUAGES;
	}

	get getGhostBaseUrl() {
		return this.env.GHOST_BASE_URL;
	}

	get getAccessibilityReportEmail(): string | undefined {
		return this.env.ACCESSIBILITY_REPORT_EMAIL;
	}

	get getNewSchoolAdminPageAsDefault(): boolean {
		return (
			this.env.FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED ??
			false
		);
	}

	get getCtlToolsTabEnabled(): boolean {
		return this.env.FEATURE_CTL_TOOLS_TAB_ENABLED ?? false;
	}

	get getLtiToolsTabEnabled(): boolean {
		return this.env.FEATURE_LTI_TOOLS_TAB_ENABLED ?? true;
	}

	get getMaxFileSize(): number {
		return this.env.FILES_STORAGE__MAX_FILE_SIZE;
	}

	get getShowOutdatedUsers(): boolean {
		return this.env.FEATURE_SHOW_OUTDATED_USERS ?? false;
	}

	get getEnableLdapSyncDuringMigration(): boolean {
		return this.env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION ?? false;
	}

	get getCtlContextConfigurationEnabled(): boolean {
		return this.env.FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED ?? false;
	}

	get getShowNewClassViewEnabled(): boolean {
		return this.env.FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED ?? false;
	}

	get getCtlToolsCopyEnabled(): boolean {
		return this.env.FEATURE_CTL_TOOLS_COPY_ENABLED ?? false;
	}

	get getEnv(): Envs {
		return this.env;
	}

	@Action
	async findEnvs(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			const envs = (await $axios.get("/v1/config/app/public")).data;
			Object.entries(requiredVars).forEach(([key]) => {
				if (envs[key] == null) {
					console.warn(`Missing configuration by server for key ${key}`);
				}
			});
			this.setEnvs({ ...configsFromEnvironmentVars, ...envs });

			contentModule.init();
			filePathsModule.init();
			this.setStatus("completed");
		} catch (error: any) {
			this.setBusinessError(error);
			this.setStatus("error");
			console.error(`Configuration could not be loaded from the server`);

			if (this.loadingErrorCount < retryLimit) {
				this.increaseLoadingErrorCount();
				setTimeout(() => {
					this.findEnvs();
				}, 500);
			}
		}
	}
}
