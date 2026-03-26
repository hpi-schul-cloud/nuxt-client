import { useLocalizedDateTime } from "@/composables/date-time.composables";
import { useI18nGlobal } from "@/plugins/i18n";

export type FormValidatorFn<T> = (errMsg?: string) => (value: T) => string | true;

/**
 * Checks if given value is not a nullish value
 */
export const isRequired: FormValidatorFn<unknown> =
	(errMsg = useI18nGlobal().t("common.validation.required")) =>
	(value) =>
		!!value || errMsg;

/**
 * Checks if the input is a non-empty string containing at least one non-whitespace character
 */
export const isNonEmptyString: FormValidatorFn<unknown> =
	(errMsg = useI18nGlobal().t("common.validation.nonEmptyString")) =>
	(value) => {
		if (typeof value !== "string" || value.trim() === "") {
			return errMsg;
		}
		return true;
	};

/**
 * Checks if given value is a valid URL
 */
export const isValidUrl: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("util-validators-invalid-url")) =>
	(value) => {
		try {
			const urlWithProtocol = value.match(/:\/\//) ? value : `https://${value}`;
			const urlObject = new URL(urlWithProtocol);

			if (!["http:", "https:"].includes(urlObject.protocol)) {
				throw new Error("Wrong protocol");
			}
			if (!(urlObject.hostname.includes(".") || urlObject.hostname === "localhost")) {
				throw new Error("TopLevelDomain missing");
			}
			if (/(^-)|(--)|(-$)/.test(urlObject.hostname)) {
				throw new Error("IDN hyphen rules violated");
			}
		} catch {
			return errMsg;
		}
		return true;
	};

/**
 * Vuelidate Validator
 * Checks if given value has valid time format
 */
export const isValidTime = (value: string | undefined) => {
	if (value === "" || !value) {
		return true;
	}
	const { timeRegex, timePlaceHolder } = useLocalizedDateTime();
	return !!value.match(timeRegex) || useI18nGlobal().t("components.timePicker.validation.format", { timePlaceHolder });
};

export const isValidDate = (value: string | undefined) => {
	if (value === "" || !value) {
		return true;
	}
	const { dateRegex, datePlaceHolder } = useLocalizedDateTime();
	return (
		!!value.match(dateRegex.value) ||
		useI18nGlobal().t("components.datePicker.validation.format", { datePlaceHolder: datePlaceHolder.value })
	);
};

/**
 * Checks if given value is of given max length
 */
export const isOfMaxLength =
	(maxLength: number): FormValidatorFn<unknown> =>
	(errMsg = useI18nGlobal().t("common.validation.tooLong")) =>
	(value) => {
		if (value === null || value === undefined) {
			return true;
		}

		if (typeof value === "string" && value.length > maxLength) {
			return errMsg;
		}
		return true;
	};

/**
 * Checks if given value is of given min length
 */
export const isOfMinLength =
	(minLength: number): FormValidatorFn<string | null | undefined> =>
	(errMsg = useI18nGlobal().t("common.validation.tooShort")) =>
	(value) => {
		if (value === null || value === undefined) {
			return true;
		}

		if (typeof value === "string" && value.length < minLength) {
			return errMsg;
		}

		return true;
	};

/** * Checks if given value is a valid email address
 */
export const isValidEmail: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.email")) =>
	(value) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!emailRegex.test(value)) {
			return errMsg;
		}
		return true;
	};
