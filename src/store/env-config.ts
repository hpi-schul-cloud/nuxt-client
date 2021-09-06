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

type Status = "pending" | "completed" | "error" | "";

type BusinessError = {
	statusCode: string;
	message: string;
};

export interface Envs {
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: boolean;
	DOCUMENT_BASE_DIR: string;
	FALLBACK_DISABLED?: boolean;
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED?: boolean;
	FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED?: boolean;
	FEATURE_ES_COLLECTIONS_ENABLED?: boolean;
	FEATURE_EXTENSIONS_ENABLED?: boolean;
	FEATURE_TEAMS_ENABLED?: boolean;
	FEATURE_SCHOOL_POLICY_ENABLED?: boolean;
	FEATURE_VIDEOCONFERENCE_ENABLED?: boolean;
	FEATURE_MATRIX_MESSENGER_ENABLED?: string;
	I18N__AVAILABLE_LANGUAGES: string;
	I18N__DEFAULT_LANGUAGE: string;
	I18N__DEFAULT_TIMEZONE: string;
	I18N__FALLBACK_LANGUAGE: string;
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: number;
	JWT_TIMEOUT_SECONDS: number;
	LERNSTORE_MODE?: string;
	MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE?: boolean;
	MATRIX_MESSENGER__STUDENT_ROOM_CREATION?: boolean;
	MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED?: boolean;
	MATRIX_MESSENGER__DISCOVER_URI: string | undefined;
	MATRIX_MESSENGER__EMBED_URI: string | undefined;
	MATRIX_MESSENGER__URI: string | undefined;
	NOT_AUTHENTICATED_REDIRECT_URL: string;
	ROCKETCHAT_SERVICE_ENABLED?: boolean;
	SC_THEME: string;
	SC_TITLE: string;
	SC_SHORT_TITLE: string;
}

export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

export const configsFromEnvironmentVars = {
	FEATURE_MATRIX_MESSENGER_ENABLED:
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED,
	MATRIX_MESSENGER__EMBED_URI: process.env.MATRIX_MESSENGER__EMBED_URI,
	MATRIX_MESSENGER__URI: process.env.MATRIX_MESSENGER__URI,
	MATRIX_MESSENGER__DISCOVER_URI: process.env.MATRIX_MESSENGER__DISCOVER_URI,
	LERNSTORE_MODE: process.env.LERNSTORE_MODE,
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
		return this.env.I18N__FALLBACK_LANGUAGE || "de";
	}

	get getDefaultTimezone(): string {
		return this.env.I18N__DEFAULT_TIMEZONE || "Europe/Berlin";
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
			this.env.LERNSTORE_MODE === "EDUSHARING"
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
