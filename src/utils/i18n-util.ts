import VueI18n, { Locale } from "vue-i18n";
import { inject } from "@vue/composition-api";
import { ChangeLanguageParamsLanguageEnum } from "@/serverApi/v3";

export function i18n() {
	const i18nLib = inject<VueI18n>("i18n");

	const t = (key: string): string => {
		const translateResult = i18nLib?.t(key);
		if (typeof translateResult === "string") {
			return translateResult;
		}
		return "unknown translation-key:" + key;
	};

	const locale = (): Locale => {
		if (i18nLib?.locale === ChangeLanguageParamsLanguageEnum.Ua) {
			return "uk"; // TODO https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes use everywhere uk (language code)
		}
		return i18nLib?.locale || "de";
	};

	return { t, locale };
}
