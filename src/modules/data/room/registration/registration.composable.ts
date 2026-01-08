import { notifyError } from "../../application/notification-store";
import { LanguageType, RegistrationApiFactory } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRegistration = () => {
	const i18n = useI18n();
	const { t } = i18n;
	const selectedLanguage = ref<LanguageType | undefined>(undefined);
	const password = ref<string>("");
	const isTermsOfUseAccepted = ref<boolean>(false);
	const isPrivacyPolicyAccepted = ref<boolean>(false);
	const userData = ref<{ firstName: string; lastName: string; email: string } | null>(null);
	const registrationSecret = ref<string>("");
	const hasApiErrorOccurred = ref<boolean>(false);
	const fullName = computed(() => (userData.value ? `${userData.value.firstName} ${userData.value.lastName}` : ""));

	const registrationApi = RegistrationApiFactory(undefined, "/v3", $axios);

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
		try {
			const { firstName, lastName, email } = (
				await registrationApi.registrationControllerGetBySecret(registrationSecret.value)
			).data;
			userData.value = { firstName, lastName, email };
		} catch (error: unknown) {
			const { code } = mapAxiosErrorToResponseError(error);
			hasApiErrorOccurred.value = true;
			if (code === HttpStatusCode.NotFound) {
				notifyError(t("pages.registrationExternalMembers.error.404"), false);
				return;
			}
			notifyError(t("pages.registrationExternalMembers.error"), false);
		}
	};

	const createAccount = async (): Promise<boolean> => {
		try {
			await registrationApi.registrationControllerCompleteRegistration(registrationSecret.value, {
				language: selectedLanguage.value || LanguageType.De,
				password: password.value,
			});
			return true;
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.notCompleted"), false);
			return false;
		}
	};

	return {
		createAccount,
		fetchUserData,
		fullName,
		hasApiErrorOccurred,
		initializeLanguage,
		isPrivacyPolicyAccepted,
		isTermsOfUseAccepted,
		password,
		registrationSecret,
		selectedLanguage,
		setCookie,
		setSelectedLanguage,
		userData,
	};
};
