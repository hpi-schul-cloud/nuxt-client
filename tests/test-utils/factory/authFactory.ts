import { getActivePinia, setActivePinia } from "pinia";
import { useAppStore } from "@data-app";
import { meResponseFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { MeResponse, Permission, RoleName } from "@/serverApi/v3";
import { DeepPartial } from "fishery";
import { createTestingPinia } from "@pinia/testing";

export const createTestAppStore = ({
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

	useAppStore().$patch({ meResponse: mockedMe });
	const appStore = mockedPiniaStoreTyping(useAppStore);

	return { mockedMe, appStore };
};

export const createTestAppStoreWithPermissions = (
	permissions: Permission[],
	stubActions?: boolean
) => createTestAppStore({ me: { permissions }, stubActions });

export const createTestAppStoreWithSchool = (
	schoolId?: string,
	stubActions?: boolean
) => createTestAppStore({ me: { school: { id: schoolId } }, stubActions });

export const createTestAppStoreWithUser = (
	id?: string,
	stubActions?: boolean
) => createTestAppStore({ me: { user: { id } }, stubActions });

export const createTestAppStoreWithRole = (
	roleName: RoleName,
	stubActions?: boolean
) =>
	createTestAppStore({
		me: { roles: [{ id: roleName, name: roleName }] },
		stubActions,
	});
