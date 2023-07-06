import { InjectionKey } from "vue";
import EnvConfigModule from "@/store/env-config";
import VueI18n from "vue-i18n";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import ExternalToolsModule from "@/store/external-tools";
import ContextExternalToolsModule from "@/store/context-external-tools";
import RoomModule from "@/store/room";
import VideoConferenceModule from "@/store/video-conference";

export const ENV_CONFIG_MODULE_KEY: InjectionKey<EnvConfigModule> =
	Symbol("envConfigModule");
export const I18N_KEY: InjectionKey<VueI18n> = Symbol("i18n");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE: InjectionKey<AuthModule> = Symbol("authModule");
export const EXTERNAL_TOOLS_MODULE: InjectionKey<ExternalToolsModule> = Symbol(
	"externalToolsModule"
);
export const CONTEXT_EXTERNAL_TOOLS_MODULE: InjectionKey<ContextExternalToolsModule> =
	Symbol("contextExternalToolsModule");
export const ROOM_MODULE: InjectionKey<RoomModule> = Symbol("roomModule");
export const VIDEO_CONFERENCE_MODULE: InjectionKey<VideoConferenceModule> =
	Symbol("videoConferenceModule");
