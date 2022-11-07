import VueI18n, { IVueI18n, Locale } from "vue-i18n";
import { ChangeLanguageParamsLanguageEnum } from "@/serverApi/v3";

export type TranslationFunction = (key: string) => string;

export class I18nUtil {
	constructor(private readonly i18nLib: VueI18n | undefined) {}

	t(key: string): string {
		const translateResult = this.i18nLib?.t(key);
		if (typeof translateResult === "string") {
			return translateResult;
		}
		return "unknown translation-key:" + key;
	}

	locale(): Locale {
		if (this.i18nLib?.locale === ChangeLanguageParamsLanguageEnum.Ua) {
			return "uk"; // TODO https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes use everywhere uk (language code)
		}
		return this.i18nLib?.locale || "de";
	}
}
