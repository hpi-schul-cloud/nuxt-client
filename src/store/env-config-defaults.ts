import {
	ConfigResponse,
	LanguageType,
	SchulcloudTheme,
	Timezone,
} from "@/serverApi/v3";

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
	FEATURE_SHOW_MIGRATION_WIZARD: false,
	FEATURE_TLDRAW_ENABLED: false,
	TLDRAW__ASSETS_ENABLED: false,
	TLDRAW__ASSETS_MAX_SIZE: -1,
	TLDRAW__ASSETS_ALLOWED_MIME_TYPES_LIST: [],
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
	FEATURE_COLUMN_BOARD_SHARE: false,
	FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: false,
	FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
	FEATURE_COURSE_SHARE: false,
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
};
