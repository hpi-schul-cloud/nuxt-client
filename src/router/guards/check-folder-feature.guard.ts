import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const checkFolderFeature = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

	if (envConfigModule.getEnv["FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED"]) {
		next();
	} else {
		next("/");
	}
};
