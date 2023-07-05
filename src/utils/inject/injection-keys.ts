import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import EnvConfigModule from "@/store/env-config";
import ExternalToolsModule from "@/store/external-tools";
import NotifierModule from "@/store/notifier";
import { InjectionKey } from "vue";
import VueI18n from "vue-i18n";

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
