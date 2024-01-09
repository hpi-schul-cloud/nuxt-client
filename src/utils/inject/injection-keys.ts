import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import EnvConfigModule from "@/store/env-config";
import GroupModule from "@/store/group";
import NotifierModule from "@/store/notifier";
import PrivacyPolicyModule from "@/store/privacy-policy";
import RoomModule from "@/store/room";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import SystemsModule from "@/store/systems";
import TermsOfUseModule from "@/store/terms-of-use";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import VideoConferenceModule from "@/store/video-conference";
import NewsModule from "@/store/news";
import ContentModule from "@/store/content";
import { InjectionKey } from "vue";

export const ENV_CONFIG_MODULE_KEY: InjectionKey<EnvConfigModule> =
	Symbol("envConfigModule");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE_KEY: InjectionKey<AuthModule> = Symbol("authModule");
export const SCHOOL_EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<SchoolExternalToolsModule> =
	Symbol("schoolExternalToolsModule");
export const CONTEXT_EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<ContextExternalToolsModule> =
	Symbol("contextExternalToolsModule");
export const APPLICATION_ERROR_KEY: InjectionKey<ApplicationErrorModule> =
	Symbol("applicationError");
export const ROOM_MODULE_KEY: InjectionKey<RoomModule> = Symbol("roomModule");
export const VIDEO_CONFERENCE_MODULE_KEY: InjectionKey<VideoConferenceModule> =
	Symbol("videoConferenceModule");
export const STATUS_ALERTS_MODULE_KEY: InjectionKey<StatusAlertsModule> =
	Symbol("statusAlertsModule");
export const USER_LOGIN_MIGRATION_MODULE_KEY: InjectionKey<UserLoginMigrationModule> =
	Symbol("userLoginMigrationModule");
export const SYSTEMS_MODULE_KEY: InjectionKey<SystemsModule> =
	Symbol("systemsModule");
export const GROUP_MODULE_KEY: InjectionKey<GroupModule> =
	Symbol("groupModule");
export const PRIVACY_POLICY_MODULE_KEY: InjectionKey<PrivacyPolicyModule> =
	Symbol("privacyPolicyModule");
export const TERMS_OF_USE_MODULE_KEY: InjectionKey<TermsOfUseModule> =
	Symbol("termsOfUseModule");
export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> =
	Symbol("schoolsModule");
export const NEWS_MODULE_KEY: InjectionKey<NewsModule> = Symbol("newsModule");
export const CONTENT_MODULE_KEY: InjectionKey<ContentModule> =
	Symbol("contentModule");
