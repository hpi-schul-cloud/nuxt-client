import {
	FileConfigApiFactory,
	FileConfigApiInterface,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";
import {
	ConfigResponse,
	LanguageType,
	SchulcloudTheme,
	ServerConfigApiFactory,
	ServerConfigApiInterface,
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
import { defaultConfigEnvs } from "./env-config-defaults";
import { BusinessError, Status } from "./types/commons";

@Module({
	name: "envConfigModule",
	namespaced: true,
	stateFactory: true,
})
export default class EnvConfigModule extends VuexModule {
	env: ConfigResponse = defaultConfigEnvs;
		envFile: FilesStorageConfigResponse = {
			MAX_FILE_SIZE: 2684354560,
			COLLABORA_MAX_FILE_SIZE_IN_BYTES: 104857600,
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

	get getAvailableLanguages(): LanguageType[] {
		return this.env.I18N__AVAILABLE_LANGUAGES;
	}

	get getGhostBaseUrl(): string {
		return this.env.GHOST_BASE_URL;
	}

	get getContactEmail(): string {
		return this.env.SC_CONTACT_EMAIL;
	}

	get getAccessibilityReportEmail(): string {
		return this.env.ACCESSIBILITY_REPORT_EMAIL;
	}

	get getShowOutdatedUsers(): boolean {
		return this.env.FEATURE_SHOW_OUTDATED_USERS;
	}

	get getEnableLdapSyncDuringMigration(): boolean {
		return this.env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION;
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

	get getCollaboraMaxFileSizeInBytes(): number {
		return this.envFile.COLLABORA_MAX_FILE_SIZE_IN_BYTES;
	}

	private get serverApi(): ServerConfigApiInterface {
		const serverApi = ServerConfigApiFactory(undefined, "/v3", $axios);

		return serverApi;
	}

	private get fileConfigApi(): FileConfigApiInterface {
		const fileConfigApi = FileConfigApiFactory(undefined, "/v3", $axios);

		return fileConfigApi;
	}

	@Action
	async loadFileConfig(): Promise<void> {
		const fileConfig = await this.fileConfigApi.publicConfig();
		this.setFileEnvs(fileConfig.data);
	}

	@Action
	async loadCoreConfig(): Promise<void> {
		const serverConfig =
			await this.serverApi.serverConfigControllerPublicConfig();
		this.setEnvs(serverConfig.data);
	}

	@Action
	async loadConfiguration(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			const requiredConfigCalls = [this.loadCoreConfig()];
			const optionalConfigCalls = Promise.allSettled([this.loadFileConfig()]);

			await Promise.all([...requiredConfigCalls, optionalConfigCalls]);

			contentModule.init();
			filePathsModule.init();

			this.setStatus("completed");
		} catch {
			const applicationError = createApplicationError(
				HttpStatusCode.GatewayTimeout
			);
			applicationErrorModule.setError(applicationError);

			this.setStatus("error");
		}
	}
}
