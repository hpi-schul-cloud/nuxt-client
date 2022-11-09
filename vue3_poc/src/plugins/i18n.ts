import { createI18n } from "vue-i18n";
import { Language } from "@/store/types/Language";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

export default createI18n({
	// https://vue-i18n.intlify.dev/guide/advanced/composition.html
	legacy: false,
	locale: Language.German,
	fallbackLocale: Language.English,
	messages: {
		en,
		de,
	},
});
