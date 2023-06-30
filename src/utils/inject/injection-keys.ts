import { InjectionKey } from "vue";
import VueI18n from "vue-i18n";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import ExternalToolsModule from "@/store/external-tools";
import RoomModule from "@/store/room";
import VideoConferenceModule from "@/store/video-conference";

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
