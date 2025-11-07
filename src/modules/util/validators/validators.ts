export type FormValidatorFn<T> = (errMsg: string) => (value: T) => string | true;

/**
 * Checks if given value is not a nullish value
 */
export const isRequired: FormValidatorFn<unknown> = (errMsg) => (value) => !!value || errMsg;

/**
 * Checks if the input is a non-empty string containing at least one non-whitespace character
 */
export const isNonEmptyString: FormValidatorFn<unknown> = (errMsg) => (value) => {
	if (typeof value !== "string" || value.trim() === "") {
		return errMsg;
	}
	return true;
};

/**
 * Checks if given value is a valid URL
 */
export const isValidUrl: FormValidatorFn<string> = (errMsg) => (value) => {
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
export const isValidTimeFormat = (value: string | null) => {
	if (value === "" || value === null || value === undefined) {
		return true;
	}

	const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/g;

	return !!value.match(timeRegex);
};

/**
 * Vuetify Rules Validator
 * Checks if given value has valid time format
 */
export const isValidDateFormat: FormValidatorFn<string | null> = (errorMessage) => (value) => {
	if (value === "" || value === null || value === undefined) {
		return true;
	}

	const dateRegex = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/g;

	return !!value.match(dateRegex) || errorMessage;
};

/**
 * Checks if given value is of given max length
 */
export const isOfMaxLength =
	(maxLength: number): FormValidatorFn<unknown> =>
	(errMsg) =>
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
	(errMsg) =>
	(value) => {
		if (value === null || value === undefined) {
			return true;
		}

		if (typeof value === "string" && value.length < minLength) {
			return errMsg;
		}

		return true;
	};

/**
 * Checks if given value has min one uppercase letter
 */
export const hasUppercaseLetter: FormValidatorFn<string> = (errMsg) => (value) => {
	if (!/[A-Z]/.test(value)) {
		return errMsg;
	}
	return true;
};

/**
 * Checks if given value has min one lowercase letter
 */
export const hasLowercaseLetter: FormValidatorFn<string> = (errMsg) => (value) => {
	if (!/[a-z]/.test(value)) {
		return errMsg;
	}
	return true;
};

/**
 * Checks if given value has min one number
 */
export const hasNumber: FormValidatorFn<string> = (errMsg) => (value) => {
	if (!/[0-9]/.test(value)) {
		return errMsg;
	}
	return true;
};

/**
 * Checks if given value has min one special character
 */
export const hasSpecialCharacter: FormValidatorFn<string> = (errMsg) => (value) => {
	if (!/[!§$%&/()=?\\;:,.#+*~-]/.test(value)) {
		return errMsg;
	}
	return true;
};
