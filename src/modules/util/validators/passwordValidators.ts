type FormValidatorFn<T> = (errMsg: string) => (value: T) => string | true;

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
