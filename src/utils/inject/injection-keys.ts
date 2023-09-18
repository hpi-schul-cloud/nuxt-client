import { InjectionKey } from "vue";
import EnvConfigModule from "@/store/env-config";
import VueI18n from "vue-i18n";
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

export const ENV_CONFIG_MODULE_KEY: InjectionKey<EnvConfigModule> =
	Symbol("envConfigModule");
export const I18N_KEY: InjectionKey<VueI18n> = Symbol("i18n");
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
