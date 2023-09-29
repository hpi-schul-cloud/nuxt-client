/**
 * Checks if given value is not a nullish value
 */
export const isRequired = (errMsg: string) => (value: unknown) =>
	!!value || errMsg;

/**
 * Checks if given value is a valid URL
 */
export const isValidUrl = (errMsg: string) => (value: string) => {
	try {
		const urlWithProtocol = value.match(/:\/\//) ? value : `https://${value}`;
		const urlObject = new URL(urlWithProtocol);
		if (!["http:", "https:"].includes(urlObject.protocol)) {
			throw new Error("Wrong protocol");
		}
		if (!urlObject.hostname.includes(".")) {
			throw new Error("TopLevelDomain missing");
		}
		if (/^-|--|-$/.test(urlObject.hostname)) {
			throw new Error("IDN hyphen rules violated");
		}
	} catch (e) {
		return errMsg;
	}
	return true;
};
