import { FileConfigApiFactory, FilesStorageConfigResponse } from "@/fileStorageApi/v3";
import { ConfigResponse, LanguageType, SchulcloudTheme, ServerConfigApiFactory, Timezone } from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import { Status } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { createSharedComposable } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";

export const defaultConfigEnvs: ConfigResponse = {
	NOT_AUTHENTICATED_REDIRECT_URL: "",
	SC_THEME: SchulcloudTheme.Default,
	JWT_TIMEOUT_SECONDS: -1,
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: -1,
	FEATURE_LERNSTORE_ENABLED: false,
	MIGRATION_END_GRACE_PERIOD_MS: -1,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: false,
	DOCUMENT_BASE_DIR: "",
	FEATURE_CONSENT_NECESSARY: false,
	FEATURE_USER_LOGIN_MIGRATION_ENABLED: false,
	GHOST_BASE_URL: "",
	I18N__AVAILABLE_LANGUAGES: [],
	I18N__FALLBACK_LANGUAGE: LanguageType.De,
	I18N__DEFAULT_LANGUAGE: LanguageType.De,
	I18N__DEFAULT_TIMEZONE: Timezone.EuropeBerlin,
	SC_TITLE: "",
	TRAINING_URL: "https://lernen.dbildungscloud.de",
	FEATURE_SHOW_OUTDATED_USERS: false,
	FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
	FEATURE_CTL_TOOLS_COPY_ENABLED: false,
	ACCESSIBILITY_REPORT_EMAIL: "",
	SC_CONTACT_EMAIL: "",
	FEATURE_SHOW_MIGRATION_WIZARD: false,
	FEATURE_TLDRAW_ENABLED: false,
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
	FEATURE_VIDEOCONFERENCE_ENABLED: false,
	FEATURE_COLUMN_BOARD_ENABLED: false,
	FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
	FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: false,
	FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
	FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: false,
	FEATURE_COLUMN_BOARD_SHARE: false,
	FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: false,
	FEATURE_COLUMN_BOARD_H5P_ENABLED: false,
	FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false,
	FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
	FEATURE_COURSE_SHARE: false,
	FEATURE_BOARD_READERS_CAN_EDIT_TOGGLE: false,
	FEATURE_BOARD_LAYOUT_ENABLED: false,
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
	FEATURE_MEDIA_SHELF_ENABLED: false,
	BOARD_COLLABORATION_URI: "ws://localhost:4450",
	FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: false,
	FEATURE_AI_TUTOR_ENABLED: false,
	FEATURE_ROOM_COPY_ENABLED: false,
	FEATURE_ROOM_SHARE: false,
	FEATURE_ADMINISTRATE_ROOMS_ENABLED: false,
	CALENDAR_SERVICE_ENABLED: false,
	FEATURE_PREFERRED_CTL_TOOLS_ENABLED: false,
	FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: false,
	FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED: false,
	FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false,
	LICENSE_SUMMARY_URL: "",
	ROOM_MEMBER_INFO_URL: "",
};
export const useEnvStore = defineStore("envConfigStore", () => {
	const serverApi = ServerConfigApiFactory(undefined, "/v3", $axios);
	const fileConfigApi = FileConfigApiFactory(undefined, "/v3", $axios);

	const envFile = reactive<FilesStorageConfigResponse>({
		MAX_FILE_SIZE: 2684354560,
		COLLABORA_MAX_FILE_SIZE_IN_BYTES: 104857600,
	});
	const env = reactive<ConfigResponse>(defaultConfigEnvs);
	const status = ref<Status>("pending");

	const setEnvs = (envConfig: ConfigResponse) => {
		Object.assign(env, envConfig);
	};

	const setFileEnvs = (fileEnvsConfig: FilesStorageConfigResponse) => {
		Object.assign(envFile, fileEnvsConfig);
	};

	const fallBackLanguage = computed(() => env.I18N__FALLBACK_LANGUAGE ?? env.I18N__DEFAULT_LANGUAGE);

	const instituteTitle = computed(() => {
		switch (env.SC_THEME) {
			case SchulcloudTheme.N21:
				return "Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)";
			case SchulcloudTheme.Thr:
				return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
			case SchulcloudTheme.Brb:
				return "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg";
			default:
				return "Dataport";
		}
	});

	const loadConfiguration = async () => {
		try {
			const [serverConfigRes, fileConfigRes] = await Promise.all([
				serverApi.serverConfigControllerPublicConfig(),
				fileConfigApi.publicConfig().catch(() => undefined), // Optional, catching when not available
			]);

			setEnvs(serverConfigRes.data);
			if (fileConfigRes?.data) {
				setFileEnvs(fileConfigRes?.data);
			}

			status.value = "completed";
			return true;
		} catch {
			applicationErrorModule.setError(createApplicationError(HttpStatusCode.GatewayTimeout));
			status.value = "error";
			return false;
		}
	};

	return {
		loadConfiguration,
		status,
		env,
		envFile,
		fallBackLanguage,
		instituteTitle,
	};
});

export const useEnvConfig = createSharedComposable(() => {
	const { env } = storeToRefs(useEnvStore());
	return env;
});

export const useEnvFileConfig = createSharedComposable(() => {
	const { envFile } = storeToRefs(useEnvStore());
	return envFile;
});
