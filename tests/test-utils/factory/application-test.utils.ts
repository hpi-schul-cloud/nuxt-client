import { Pinia } from "pinia";
import { AlertStatus, useAppStore, useNotificationStore } from "@data-app";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { LanguageType, MeResponse, Permission, RoleName } from "@/serverApi/v3";
import { DeepPartial, Factory } from "fishery";

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
	pinia,
}: {
	me?: DeepPartial<MeResponse>;
	pinia?: Pinia;
} = {}) => {
	const mockedMe = meResponseFactory.build(me);
	const store = useAppStore(pinia);

	store.$patch({ meResponse: mockedMe });
	const appStore = mockedPiniaStoreTyping(useAppStore);

	return { mockedMe, appStore };
};

export const createTestAppStoreWithPermissions = (
	permissions: Permission[],
	pinia?: Pinia
) => createTestAppStore({ me: { permissions }, pinia });

export const createTestAppStoreWithSchool = (
	schoolId?: string,
	pinia?: Pinia
) => createTestAppStore({ me: { school: { id: schoolId } }, pinia });

export const createTestAppStoreWithUser = (id?: string, pinia?: Pinia) =>
	createTestAppStore({ me: { user: { id } }, pinia });

export const createTestAppStoreWithRole = (roleName: RoleName, pinia?: Pinia) =>
	createTestAppStore({
		me: { roles: [{ id: roleName, name: roleName }] },
		pinia,
	});

export const expectNotification = (status: AlertStatus) => {
	expect(useNotificationStore().notify).toHaveBeenCalledWith(
		expect.objectContaining({ status })
	);
};
