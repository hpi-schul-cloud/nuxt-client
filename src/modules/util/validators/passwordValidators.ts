// type FormValidatorFn<T> = (errMsg: string) => (value: T) => string | true;

import { FormValidatorFn } from "./validators";
import { useI18nGlobal } from "@/plugins/i18n";

/**
 * Checks if given value has min one uppercase letter
 */
export const hasUppercaseLetter: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.password.upperCase")) =>
	(value) => {
		if (!/[A-Z]/.test(value)) {
			return errMsg;
		}
		return true;
	};

/**
 * Checks if given value has min one lowercase letter
 */
export const hasLowercaseLetter: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.password.lowerCase")) =>
	(value) => {
		if (!/[a-z]/.test(value)) {
			return errMsg;
		}
		return true;
	};

/**
 * Checks if given value has min one number
 */
export const hasNumber: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.password.number")) =>
	(value) => {
		if (!/[0-9]/.test(value)) {
			return errMsg;
		}
		return true;
	};

/**
 * Checks if given value has min one special character
 */
export const hasSpecialCharacter: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.password.specialCharacter")) =>
	(value) => {
		if (!/[!§$%&/()=?\\;:,.#+*~-]/.test(value)) {
			return errMsg;
		}
		return true;
	};
