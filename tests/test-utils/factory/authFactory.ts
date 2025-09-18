import { createPinia, getActivePinia, setActivePinia } from "pinia";
import { useAuthStore } from "@data-auth";
import { meResponseFactory } from "@@/tests/test-utils";
import { MeResponse, Permission, RoleName } from "@/serverApi/v3";
import { DeepPartial } from "fishery";

export const createTestAuthStore = (
	options: {
		me?: DeepPartial<MeResponse>;
	} = {}
) => {
	if (!getActivePinia()) {
		setActivePinia(createPinia());
	}

	const mockedMe = meResponseFactory.build(options.me);

	useAuthStore().$patch({
		meResponse: mockedMe,
	});
	return { mockedMe };
};

export const createTestAuthStoreWithPermissions = (permissions: Permission[]) =>
	createTestAuthStore({ me: { permissions } });

export const createTestAuthStoreWithUser = (id: string) =>
	createTestAuthStore({ me: { user: { id } } });

export const createTestAuthStoreWithRole = (roleName: RoleName) =>
	createTestAuthStore({
		me: { roles: [{ id: roleName, name: roleName }] },
	});

export const createTestAuthStoreWithRole = (roleName: RoleName) => {
	return {};
};
