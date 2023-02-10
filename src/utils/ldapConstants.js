import { helpers } from "vuelidate/lib/validators";

/**
 * Regex for the LDAP path.
 *
 * The composition of this regex is as follows:
 *  attributeType = [A-Za-z][\w-]*|\d+(?:\.\d+)*
 *  attributeValue = #(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"
 *  nameComponent = (?#attributeType)=(?#attributeValue)(?:\+(?#attributeType)=(?#attributeValue))*
 *  and finally
 *  ldapPathRegex = (?#nameComponent)(?:,(?#nameComponent))*
 *
 *  It matches the following format: nameComponent[, or ;;]nameComponent
 */
export const ldapPathRegex =
	/^(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*(?:(,|;;)(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*)*$/;

export const ldapURLRegex =
	/^ldaps?:\/\/(([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;

export const ldapSecuredURLRegex =
	/^ldaps:\/\/(([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;

// Regex-based validator for the LDAP path.
export const ldapPathRegexValidator = helpers.regex("alpha", ldapPathRegex);

// Regex-based validator for the LDAP URL (possibly unsecured). Not recommended for use in production environment.
export const ldapURLRegexValidator = helpers.regex("alpha", ldapURLRegex);

// Regex-based validator for the secured LDAP URL. Should be used in every production environment.
export const ldapSecuredURLRegexValidator = helpers.regex(
	"alpha",
	ldapSecuredURLRegex
);

// Placeholder used for an unchanged password.
export const unchangedPassword = "🐱‍👤[unchanged]**";
