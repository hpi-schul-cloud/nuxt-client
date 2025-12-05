import { notifyError } from "../../application/notification-store";
import { LanguageType, RegistrationApiFactory, RegistrationItemResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRegistration = () => {
	const i18n = useI18n();
	const { t } = i18n;
	const registrationApi = RegistrationApiFactory(undefined, "/v3", $axios);

	const selectedLanguage = ref<LanguageType | undefined>(undefined);
	const password = ref<string>("");
	const isTermsOfUseAccepted = ref<boolean>(false);
	const isPrivacyPolicyAccepted = ref<boolean>(false);
	const userData = ref<RegistrationItemResponse | null>(null);
	const firstName = computed(() => userData.value?.firstName || "");
	const lastName = computed(() => userData.value?.lastName || "");
	const fullName = computed(() => `${firstName.value} ${lastName.value}`);
	const email = computed(() => userData.value?.email || "");

	const initializeLanguage = () => {
		const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
		if (match) {
			selectedLanguage.value = match[1] as LanguageType;
			i18n.locale.value = selectedLanguage.value;
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

	const fetchUserData = async () => {
		const response = await registrationApi.registrationControllerGetBySecret("abc");
		userData.value = response.data;
	};

	const completeRegistration = async (): Promise<boolean> => {
		try {
			await registrationApi.registrationControllerCompleteRegistration("abc", {
				language: selectedLanguage.value ?? LanguageType.De,
				password: password.value,
			});

			return true;
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.notCompleted"), false);
			return false;
		}
	};

	return {
		completeRegistration,
		fetchUserData,

		initializeLanguage,
		isPrivacyPolicyAccepted,
		isTermsOfUseAccepted,
		password,
		selectedLanguage,
		setCookie,
		setSelectedLanguage,
		firstName,
		lastName,
		fullName,
		email,
	};
};
