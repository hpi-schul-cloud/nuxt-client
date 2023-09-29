import { InjectionKey } from "vue";
import EnvConfigModule from "@/store/env-config";
import { I18n } from "vue-i18n";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import ExternalToolsModule from "@/store/external-tools";
import ApplicationErrorModule from "@/store/application-error";
import ContextExternalToolsModule from "@/store/context-external-tools";
import RoomModule from "@/store/room";
import VideoConferenceModule from "@/store/video-conference";
import StatusAlertsModule from "@/store/status-alerts";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import SystemsModule from "@/store/systems";
import GroupModule from "@/store/group";
import PrivacyPolicyModule from "@/store/privacy-policy";
import TermsOfUseModule from "@/store/terms-of-use";
import SchoolsModule from "@/store/schools";

export const ENV_CONFIG_MODULE_KEY: InjectionKey<EnvConfigModule> =
	Symbol("envConfigModule");
export const I18N_KEY: InjectionKey<I18n> = Symbol("i18n");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE_KEY: InjectionKey<AuthModule> = Symbol("authModule");
export const EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<ExternalToolsModule> =
	Symbol("externalToolsModule");
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
