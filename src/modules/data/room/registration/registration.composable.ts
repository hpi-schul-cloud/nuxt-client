import { notifyError } from "../../application/notification-store";
import { LanguageType } from "@/serverApi/v3";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRegistration = () => {
	const i18n = useI18n();
	const { t } = i18n;
	const selectedLanguage = ref<LanguageType | undefined>(undefined);
	const password = ref<string>("");
	const isTermsOfUseAccepted = ref<boolean>(false);
	const isPrivacyPolicyAccepted = ref<boolean>(false);
	const fullName = ref<string>("");
	const userData = ref<{ name: string; surname: string; email: string } | null>(null);

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
		const data = await Promise.resolve({
			name: "Max",
			surname: "Mustermann",
			email: "max@mustermann.de",
		});
		userData.value = data;
		fullName.value = `${data.name} ${data.surname}`;
	};

	const createAccount = async (): Promise<boolean> => {
		const testError = false;
		try {
			await new Promise((resolve, reject) => {
				if (testError) {
					reject();
				} else {
					resolve(true);
					return true;
				}
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
		initializeLanguage,
		isPrivacyPolicyAccepted,
		isTermsOfUseAccepted,
		password,
		selectedLanguage,
		setCookie,
		setSelectedLanguage,
		userData,
	};
};
