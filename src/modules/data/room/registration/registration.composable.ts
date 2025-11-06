import { LanguageType } from "@/serverApi/v3";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRegistration = () => {
	const i18n = useI18n();
	const selectedLanguage = ref<LanguageType | undefined>(undefined);
	const password = ref<string>("");

	const initializeLanguage = () => {
		const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
		if (match) {
			selectedLanguage.value = match[1] as LanguageType;
			i18n.locale.value = match[1] as LanguageType;
		}
	};

	const setCookie = (lang = LanguageType.De) => {
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);
		document.cookie = `USER_LANG=${lang}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
	};

	const setSelectedLanguage = (value: LanguageType) => {
		setCookie(value);
		selectedLanguage.value = value;
		i18n.locale.value = value;
	};

	return { selectedLanguage, setCookie, setSelectedLanguage, initializeLanguage, password };
};
