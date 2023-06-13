import { InjectionKey } from "vue";
import VueI18n from "vue-i18n";

export const I18N_KEY: InjectionKey<VueI18n> = Symbol("i18n");
