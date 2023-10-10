import VueI18n from "vue-i18n";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export const useI18n = () => {
	const i18n: VueI18n = injectStrict(I18N_KEY);

	const t = (key: string, values?: VueI18n.Values): string => {
		return i18n.tc(key, 0, values);
	};

	const te = (key: string, locale?: VueI18n.Locale): boolean => {
		return i18n.te(key, locale);
	};

	const locale = i18n.locale;

	return {
		t,
		te,
		locale,
	};
};
