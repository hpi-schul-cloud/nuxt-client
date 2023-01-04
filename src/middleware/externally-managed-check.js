import { authModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

export default async ({ route }) => {
	const user = authModule.getUser;

	const userExternallyManaged = authModule.userIsExternallyManaged;

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.userNotExternallyManaged) {
			return allowed;
		}
		if (!user) {
			return false;
		}
		return !userExternallyManaged;
	}, true);
	if (ACCESS_ALLOWED) {
		return true;
	}
	throw createApplicationError(HttpStatusCode.Unauthorized);
};
