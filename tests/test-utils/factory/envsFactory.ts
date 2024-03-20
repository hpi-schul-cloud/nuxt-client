import { Envs } from "@/store/types/env-config";
import { Factory } from "fishery";

export const envsFactory = Factory.define<Envs>(() => ({
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	DOCUMENT_BASE_DIR: "",
	FALLBACK_DISABLED: false,
	FEATURE_CONSENT_NECESSARY: true,
	FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
	FEATURE_LERNSTORE_ENABLED: false,
	GHOST_BASE_URL: "",
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	MIGRATION_END_GRACE_PERIOD_MS: 0,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	SC_THEME: "default",
	SC_TITLE: "dBildungscloud",
	FEATURE_CTL_TOOLS_TAB_ENABLED: false,
	FILES_STORAGE__MAX_FILE_SIZE: 0,
	FEATURE_SHOW_OUTDATED_USERS: false,
	FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
	FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
	FEATURE_CTL_TOOLS_COPY_ENABLED: false,
	CTL_TOOLS_RELOAD_TIME_MS: 299000,
	FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: false,
}));