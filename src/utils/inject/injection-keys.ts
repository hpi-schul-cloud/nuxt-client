import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { InjectionKey } from "vue";
import VueI18n from "vue-i18n";

export const I18N_KEY: InjectionKey<VueI18n> = Symbol("i18n");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE: InjectionKey<AuthModule> = Symbol("authModule");
export const EXTERNAL_TOOLS_MODULE: InjectionKey<ExternalToolsModule> = Symbol(
	"externalToolsModule"
);
export const CONTEXT_EXTERNAL_TOOLS_MODULE: InjectionKey<ContextExternalToolsModule> =
	Symbol("contextExternalToolsModule");
