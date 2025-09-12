import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useEnvConfig } from "@data-env";

export const checkFolderFeature = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (useEnvConfig().value.FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED) {
		next();
	} else {
		next("/");
	}
};
