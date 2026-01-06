import { useRegistrationStore } from "./registration.store";
import { LanguageType } from "@/serverApi/v3";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRegistrationStepper = () => {
	const i18n = useI18n();
	const { userData } = storeToRefs(useRegistrationStore());

	const selectedLanguage = ref<LanguageType | undefined>(undefined);
	const password = ref("");
	const isTermsOfUseAccepted = ref(false);
	const isPrivacyPolicyAccepted = ref(false);

	const fullName = computed(() => (userData?.value ? `${userData.value.firstName} ${userData.value.lastName}` : ""));

	const initializeLanguage = () => {
		const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
		if (match) {
			selectedLanguage.value = match[1] as LanguageType;
			i18n.locale.value = selectedLanguage.value;
		}
	};

	const setCookie = (lang: LanguageType) => {
		const expires = new Date();
		const oneDay = 24 * 60 * 60 * 1000;
		expires.setTime(expires.getTime() + oneDay);
		document.cookie = `USER_LANG=${lang}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
	};

	const setSelectedLanguage = (lang: LanguageType) => {
		setCookie(lang);
		selectedLanguage.value = lang;
		i18n.locale.value = lang;
	};

	return {
		password,
		selectedLanguage,
		isTermsOfUseAccepted,
		isPrivacyPolicyAccepted,
		fullName,
		initializeLanguage,
		setCookie,
		setSelectedLanguage,
	};
};
