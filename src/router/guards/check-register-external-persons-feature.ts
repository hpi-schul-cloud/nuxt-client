import { useEnvConfig } from "@data-env";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const checkRegisterExternalPersonsFeature = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (useEnvConfig().value.FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED) {
		next();
	} else {
		next("/");
	}
};
