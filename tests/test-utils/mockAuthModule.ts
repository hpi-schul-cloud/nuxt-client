import { ImportUserResponseRoleNamesEnum, Permission } from "@/serverApi/v3";
import setupStores from "./setupStores";
import AuthModule from "@/store/auth";
import { meResponseFactory } from "./factory";
import { authModule } from "@/store";

export const mockAuthModule = (
	userRoles: ImportUserResponseRoleNamesEnum[],
	userPermissions: Permission[]
) => {
	setupStores({
		authModule: AuthModule,
	});

	const userRoleEntities = userRoles.map((role) => ({
		id: Math.random().toString(),
		name: role,
	}));

	const mockMe = meResponseFactory.build({
		roles: userRoleEntities,
		permissions: userPermissions,
	});

	authModule.setMe(mockMe);
};
