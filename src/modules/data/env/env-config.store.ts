import { defineStore, storeToRefs } from "pinia";
import { applicationErrorModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { ConfigResponse, ServerConfigApiFactory } from "@/serverApi/v3";
import { defaultConfigEnvs } from "@/store/env-config-defaults";
import {
	FileConfigApiFactory,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";
import { Status } from "@/store/types/commons";
import { computed, reactive, ref } from "vue";
import { $axios } from "@/utils/api";
import { createSharedComposable } from "@vueuse/core";

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

	const getFallbackLanguage = computed(() => {
		return env.I18N__FALLBACK_LANGUAGE ?? env.I18N__DEFAULT_LANGUAGE;
	});

	const getDefaultTimezone = computed(() => {
		return env.I18N__DEFAULT_TIMEZONE;
	});

	const getAdminToggleStudentLernstoreViewEnabled = computed(
		() =>
			env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED &&
			env.FEATURE_LERNSTORE_ENABLED
	);

	const getTheme = computed(() => env.SC_THEME);
	const getMigrationEndGracePeriod = computed(
		() => env.MIGRATION_END_GRACE_PERIOD_MS
	);
	const getTeacherStudentVisibilityIsConfigurable = computed(
		() => env.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE
	);
	const getTeacherStudentVisibilityIsEnabledByDefault = computed(
		() => env.TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT
	);
	const getTeacherStudentVisibilityIsVisible = computed(
		() => env.TEACHER_STUDENT_VISIBILITY__IS_VISIBLE
	);
	const getVideoConferenceEnabled = computed(
		() => env.FEATURE_VIDEOCONFERENCE_ENABLED
	);
	const getLoginLinkEnabled = computed(() => env.FEATURE_LOGIN_LINK_ENABLED);
	const getRocketChatEnabled = computed(() => env.ROCKETCHAT_SERVICE_ENABLED);
	const getAvailableLanguages = computed(() => env.I18N__AVAILABLE_LANGUAGES);
	const getGhostBaseUrl = computed(() => env.GHOST_BASE_URL);
	const getContactEmail = computed(() => env.SC_CONTACT_EMAIL);
	const getAccessibilityReportEmail = computed(
		() => env.ACCESSIBILITY_REPORT_EMAIL
	);
	const getShowOutdatedUsers = computed(() => env.FEATURE_SHOW_OUTDATED_USERS);
	const getEnableLdapSyncDuringMigration = computed(
		() => env.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION
	);
	const getCtlToolsCopyEnabled = computed(
		() => env.FEATURE_CTL_TOOLS_COPY_ENABLED
	);
	const getMaxFileSize = computed(() => envFile.MAX_FILE_SIZE);
	const getCollaboraMaxFileSizeInBytes = computed(
		() => envFile.COLLABORA_MAX_FILE_SIZE_IN_BYTES
	);

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

			// TODO: Need to call that? Can we not just remove that?
			// contentModule.init();
			// filePathsModule.init();

			status.value = "completed";
		} catch {
			applicationErrorModule.setError(
				createApplicationError(HttpStatusCode.GatewayTimeout)
			);
			status.value = "error";
		}
	};

	return {
		loadConfiguration,
		setEnvs,
		env,
		envFile,
		getFallbackLanguage,
		getAccessibilityReportEmail,
		getAvailableLanguages,
		getDefaultTimezone,
		getAdminToggleStudentLernstoreViewEnabled,
		getMaxFileSize,
		getCollaboraMaxFileSizeInBytes,
		getCtlToolsCopyEnabled,
		getShowOutdatedUsers,
		getContactEmail,
		getGhostBaseUrl,
		getRocketChatEnabled,
		getLoginLinkEnabled,
		getVideoConferenceEnabled,
		getEnableLdapSyncDuringMigration,
		getTheme,
		getMigrationEndGracePeriod,
		getTeacherStudentVisibilityIsVisible,
		getTeacherStudentVisibilityIsConfigurable,
		getTeacherStudentVisibilityIsEnabledByDefault,
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
