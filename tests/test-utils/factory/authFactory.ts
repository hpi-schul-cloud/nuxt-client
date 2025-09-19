import { getActivePinia, setActivePinia } from "pinia";
import { useAuthStore } from "@data-auth";
import { meResponseFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { MeResponse, Permission, RoleName } from "@/serverApi/v3";
import { DeepPartial } from "fishery";
import { createTestingPinia } from "@pinia/testing";

export const createTestAuthStore = ({
	me,
	stubActions,
}: {
	me?: DeepPartial<MeResponse>;
	stubActions?: boolean;
} = {}) => {
	if (!getActivePinia()) {
		setActivePinia(createTestingPinia({ stubActions }));
	}

	const mockedMe = meResponseFactory.build(me);

	useAuthStore().$patch({
		meResponse: mockedMe,
	});
	const authStore = mockedPiniaStoreTyping(useAuthStore);

	return { mockedMe, authStore };
};

export const createTestAuthStoreWithPermissions = (
	permissions: Permission[],
	stubActions?: boolean
) => createTestAuthStore({ me: { permissions }, stubActions });

export const createTestAuthStoreWithUser = (
	id?: string,
	stubActions?: boolean
) => createTestAuthStore({ me: { user: { id } }, stubActions });

export const createTestAuthStoreWithRole = (
	roleName: RoleName,
	stubActions?: boolean
) =>
	createTestAuthStore({
		me: { roles: [{ id: roleName, name: roleName }] },
		stubActions,
	});
