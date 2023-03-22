import { contentModule, filePathsModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import { Envs } from "./types/env-config";

export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

export const configsFromEnvironmentVars = {
	FEATURE_LERNSTORE_ENABLED:
		process.env.FEATURE_LERNSTORE_ENABLED?.toLowerCase() == "true",
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
		SC_SHORT_TITLE: "",
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

	get getTeacherStudentVisibilityIsConfigurable() {
		return this.env.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE;
	}

	get getVideoConferenceEnabled() {
		return this.env.FEATURE_VIDEOCONFERENCE_ENABLED;
	}

	get getSchoolPolicyEnabled() {
		return this.env.FEATURE_SCHOOL_POLICY_ENABLED;
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
