export type FormValidatorFn<T> = (
	errMsg: string
) => (value: T) => string | true;

/**
 * Checks if given value is not a nullish value
 */
export const isRequired: FormValidatorFn<unknown> = (errMsg) => (value) =>
	!!value || errMsg;

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
		if (
			!(urlObject.hostname.includes(".") || urlObject.hostname === "localhost")
		) {
			throw new Error("TopLevelDomain missing");
		}
		if (/(^-)|(--)|(-$)/.test(urlObject.hostname)) {
			throw new Error("IDN hyphen rules violated");
		}
	} catch (e) {
		return errMsg;
	}
	return true;
};

/**
 * Checks if given value has valid time format
 */
export const isValidTimeFormat: FormValidatorFn<string> =
	(errMsg) => (value) => {
		if (value === "" || value === null) {
			return true;
		}

		const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/g;

		return !value.match(timeRegex) ? errMsg : true;
	};

/**
 * Checks if given value has valid time format
 */
// export const isValidDateFormat: FormValidatorFn<string> =
// 	(errMsg) => (value) => {
// 		if (value === "" || value === null) {
// 			return true;
// 		}

// 		const dateRegex = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/g;

// 		return !value.match(dateRegex) ? errMsg : true;
// 	};

export const isValidDateFormat = (value: string | null) => {
	if (value === "" || value === null) {
		return true;
	}

	const dateRegex = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/g;

	return !!value.match(dateRegex);
};
