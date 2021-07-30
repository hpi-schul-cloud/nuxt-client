import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";

type Status = "pending" | "completed" | "error" | "";

type BusinessError = {
	statusCode: string;
	message: string;
};

type Envs = {
	NOT_AUTHENTICATED_REDIRECT_URL: string;
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: number;
	JWT_TIMEOUT_SECONDS: number;
	SC_THEME: string;
	FALLBACK_DISABLED: boolean | null;
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: boolean;
	FEATURE_ES_COLLECTIONS_ENABLED: boolean | null;
	FEATURE_EXTENSIONS_ENABLED: boolean | null;
	FEATURE_TEAMS_ENABLED: boolean | null;
	I18N__AVAILABLE_LANGUAGES: string;
	I18N__DEFAULT_LANGUAGE: string;
	I18N__DEFAULT_TIMEZONE: string;
	I18N__FALLBACK_LANGUAGE: string;
	DOCUMENT_BASE_DIR: string;
	SC_TITLE: string;
	SC_SHORT_TITLE: string;
};

export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
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
		FALLBACK_DISABLED: null,
		ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		FEATURE_ES_COLLECTIONS_ENABLED: null,
		FEATURE_EXTENSIONS_ENABLED: null,
		FEATURE_TEAMS_ENABLED: null,
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

	get getEnv(): Envs {
		return this.env;
	}

	@Action
	async findEnvs(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const envs = await $axios.$get("/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (envs[key] == null) {
					console.warn(`Missing configuration by server for key ${key}`);
				}
			});
			this.setEnvs(envs);
			this.setStatus("completed");
		} catch (error) {
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
