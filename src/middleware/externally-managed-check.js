import { applicationErrorModule, authModule } from "@/store";

export default async ({ route }) => {
	const user = authModule.getUser;
	const error = {
		messageTranslationKey: "error.401",
		statusCode: 401,
	};

	const userExternallyManaged = authModule.userIsExternallyManaged;

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.userNotExternallyManaged) {
			return allowed;
		}
		if (!user) {
			applicationErrorModule.setError(error);
		}
		return !userExternallyManaged;
	}, true);
	if (ACCESS_ALLOWED) {
		return true;
	}
	applicationErrorModule.setError(error);
};
