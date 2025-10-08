export const ldapErrorHandler = (error = [], ctx) => {
	const errorMessages = [];

	error.forEach((err) => {
		switch (err.type) {
			case "WRONG_CREDENTIALS":
				errorMessages.push(ctx.$t("pages.administration.ldap.errors.credentials"));
				break;
			case "CONNECTION_ERROR":
				errorMessages.push(err.message);
				break;
			case "WRONG_SEARCH_PATH":
				errorMessages.push(ctx.$t("pages.administration.ldap.errors.path"));
				break;
			case "INVALID_CONFIGURATION_OBJECT":
				errorMessages.push(ctx.$t("pages.administration.ldap.errors.configuration"));
				break;
			default:
				return;
		}
	});

	return errorMessages;
};
