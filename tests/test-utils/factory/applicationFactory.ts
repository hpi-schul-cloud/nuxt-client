import { getActivePinia, setActivePinia } from "pinia";
import { useAppStore } from "@data-app";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { LanguageType, MeResponse, Permission, RoleName } from "@/serverApi/v3";
import { DeepPartial, Factory } from "fishery";
import { createTestingPinia } from "@pinia/testing";

export const meResponseFactory = Factory.define<MeResponse>(({ sequence }) => ({
	user: {
		id: `user-${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		customAvatarBackgroundColor: `customAvatarBackgroundColor${sequence}`,
	},
	school: {
		id: `school-${sequence}`,
		name: `schoolName${sequence}`,
		logo: {
			url: `logoUrl${sequence}`,
			name: `logoName${sequence}`,
		},
	},
	roles: [],
	permissions: [],
	language: LanguageType.De,
	account: {
		id: `account-${sequence}`,
	},
}));

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
