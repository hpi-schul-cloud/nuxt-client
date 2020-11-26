export default {
	methods: {
		errorHandler(error) {
			const errorMessages = [];

			error.forEach((err) => {
				switch (err.type) {
					case "WRONG_CREDENTIALS":
						errorMessages.push(
							this.$t("pages.administration.ldap.errors.credentials")
						);
						break;
					case "CONNECTION_ERROR":
						errorMessages.push(err.message);
						break;
					case "WRONG_SEARCH_PATH":
						errorMessages.push(
							this.$t("pages.administration.ldap.errors.path")
						);
						break;
					case "INVALID_CONFIGURATION_OBJECT":
						errorMessages.push(
							this.$t("pages.administration.ldap.errors.configuration")
						);
						break;
					default:
						return;
				}
			});

			return errorMessages;
		},
	},
};
