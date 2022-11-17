import { authModule, errorModule } from "@/store";

export default async ({ app, route }) => {
	errorModule.resetError();
	const user = authModule.getUser;
	const error = {
		message: app.i18n.t("error.401"),
		statusCode: "401",
	};

	const userExternallyManaged = authModule.userIsExternallyManaged;

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.userNotExternallyManaged) {
			return allowed;
		}
		if (!user) {
			errorModule.setError(error);
			throw new Error(error.message);
		}
		return !userExternallyManaged;
	}, true);
	if (ACCESS_ALLOWED) {
		return true; // Access allowed
	}
	errorModule.setError(error);
	throw new Error(error.message);
};
