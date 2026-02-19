import { FormValidatorFn } from "./validators";
import { useI18nGlobal } from "@/plugins/i18n";
import { ldapPathRegex, ldapSecuredURLRegex, ldapURLRegex } from "@/utils/ldapConstants";

/**
 * Regex-based validator for the LDAP URL (possibly unsecured).
 * Allows both ldap:// and ldaps:// protocols.
 * Not recommended for use in production environment.
 */
export const isValidLdapUrl: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("pages.administration.ldapEdit.validation.url")) =>
	(value) => {
		if (!ldapURLRegex.test(value)) {
			return errMsg;
		}
		return true;
	};

/**
 * Regex-based validator for the secured LDAP URL.
 * Allows only the ldaps:// protocol.
 * Should be used in every production environment.
 */
export const isValidSecuredLdapUrl: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("pages.administration.ldapEdit.validation.url")) =>
	(value) => {
		if (!ldapSecuredURLRegex.test(value)) {
			return errMsg;
		}
		return true;
	};

/**
 * Regex-based validator for the LDAP path.
 */
export const isValidLdapPath: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("pages.administration.ldapEdit.validation.path")) =>
	(value) => {
		if (!value) return true;

		if (!ldapPathRegex.test(value)) {
			return errMsg;
		}
		return true;
	};
