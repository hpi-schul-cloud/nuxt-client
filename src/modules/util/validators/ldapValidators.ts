import { FormValidatorFn } from "./validators";

/**
 * Regex-based validator for the LDAP URL (possibly unsecured).
 * Allows both ldap:// and ldaps:// protocols.
 * Not recommended for use in production environment.
 */
export const isValidLdapUrl: FormValidatorFn<string> = (errMsg) => (value) => {
	const regex = /^ldaps?:\/\/(([\w.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;

	if (!regex.test(value)) {
		return errMsg;
	}
	return true;
};

/**
 * Regex-based validator for the secured LDAP URL.
 * Allows only the ldaps:// protocol.
 * Should be used in every production environment.
 */
export const isValidSecuredLdapUrl: FormValidatorFn<string> = (errMsg) => (value) => {
	const regex = /^ldaps:\/\/(([\w.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;

	if (!regex.test(value)) {
		return errMsg;
	}
	return true;
};

/**
 * Regex-based validator for the LDAP path.
 */
export const isValidLdapPath: FormValidatorFn<string> = (errMsg) => (value) => {
	if (!value) return true;
	// The composition of this regex is as follows:
	//   attributeType = [A-Za-z][\w-]*|\d+(?:\.\d+)*
	//   attributeValue = #(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"
	//   nameComponent = (?#attributeType)=(?#attributeValue)(?:\+(?#attributeType)=(?#attributeValue))*
	// and finally
	//   ldapPathRegex = (?#nameComponent)(?:,(?#nameComponent))*
	//
	// It matches the following format: nameComponent[, or ;;]nameComponent
	const regex =
		/^(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*(?:(,|;;)(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*)*$/;

	if (!regex.test(value)) {
		return errMsg;
	}
	return true;
};
