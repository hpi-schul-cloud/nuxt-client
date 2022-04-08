import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import ContentModule from "@/store/content";
import FilePathsModule from "@/store/filePaths";
import { BusinessError, Status } from "./types/commons";
import { Envs } from "./types/env-config";

export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

export const configsFromEnvironmentVars = {
	FEATURE_MATRIX_MESSENGER_ENABLED:
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED,
	FEATURE_LERNSTORE_ENABLED:
		process.env.FEATURE_LERNSTORE_ENABLED?.toLowerCase() == "true",
	MATRIX_MESSENGER__EMBED_URI: process.env.MATRIX_MESSENGER__EMBED_URI,
	MATRIX_MESSENGER__URI: process.env.MATRIX_MESSENGER__URI,
	MATRIX_MESSENGER__DISCOVER_URI: process.env.MATRIX_MESSENGER__DISCOVER_URI,
};

const retryLimit: number = 10;

@Module({
	name: "env-config",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class EnvConfig extends VuexModule {
	env: Envs = {
		...requiredVars,
		...configsFromEnvironmentVars,
		FALLBACK_DISABLED: false,
		ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		I18N__AVAILABLE_LANGUAGES: "",
		I18N__DEFAULT_LANGUAGE: "",
		I18N__DEFAULT_TIMEZONE: "",
		I18N__FALLBACK_LANGUAGE: "",
		DOCUMENT_BASE_DIR: "",
		SC_TITLE: "",
		SC_SHORT_TITLE: "",
	};
	loadingErrorCount: number = 0;
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

	get getMatrixConfig() {
		return {
			enabled: this.env.FEATURE_MATRIX_MESSENGER_ENABLED,
			schoolSettingsVisible: this.env.MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE,
			studentRoomCreation: this.env.MATRIX_MESSENGER__STUDENT_ROOM_CREATION,
			schoolRoomEnabled: this.env.MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED,
		};
	}

	get getAdminToggleStudentLernstoreViewEnabled() {
		return (
			this.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED &&
			this.env.FEATURE_LERNSTORE_ENABLED
		);
	}

	get getAdminToggleStudentVisibilityEnabled() {
		return this.env.FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED;
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

	get getEnv(): Envs {
		return this.env;
	}

	@Action
	async findEnvs(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const envs = await $axios.$get("/v1/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (envs[key] == null) {
					console.warn(`Missing configuration by server for key ${key}`);
				}
			});
			this.setEnvs({ ...configsFromEnvironmentVars, ...envs });

			ContentModule.init();
			FilePathsModule.init();
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

export default getModule(EnvConfig);
