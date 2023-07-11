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

export const ENV_CONFIG_MODULE_KEY: InjectionKey<EnvConfigModule> =
	Symbol("envConfigModule");
export const I18N_KEY: InjectionKey<VueI18n> = Symbol("i18n");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE: InjectionKey<AuthModule> = Symbol("authModule");
export const EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<ExternalToolsModule> =
	Symbol("externalToolsModule");
export const CONTEXT_EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<ContextExternalToolsModule> =
	Symbol("contextExternalToolsModule");
export const APPLICATION_ERROR_KEY: InjectionKey<ApplicationErrorModule> =
	Symbol("applicationError");
export const ROOM_MODULE_KEY: InjectionKey<RoomModule> = Symbol("roomModule");
export const VIDEO_CONFERENCE_MODULE_KEY: InjectionKey<VideoConferenceModule> =
	Symbol("videoConferenceModule");
export const STATUS_ALERTS_MODULE: InjectionKey<StatusAlertsModule> =
	Symbol("statusAlertsModule");
