import { useRoomPermissionsStore } from "./roomPermissions.store";
import { createPinia, defineStore, setActivePinia } from "pinia";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { Permission, RoleName } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { mockedPiniaStoreTyping, roomFactory } from "@@/tests/test-utils";
import { ref } from "vue";
import { useRoomDetailsStore } from "./RoomDetails.store";

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

export type PiniaStore<T extends (...args: any) => any> = Omit<
	ReturnType<T>,
	keyof ReturnType<typeof defineStore>
>;

interface PermissionKeywords {
	create: boolean;
	edit: boolean;
	view: boolean;
}

function createRoomPermissionsArray(permissionKeywords: PermissionKeywords) {
	const permissions = [];
	if (permissionKeywords.create)
		permissions.push(Permission.RoomCreate.toLowerCase() as Permission);
	if (permissionKeywords.edit) permissions.push(Permission.RoomEdit);
	if (permissionKeywords.view) permissions.push(Permission.RoomView);
	return permissions;
}

let roomDetailsStore: ReturnType<typeof useRoomDetailsStore>;

describe("useRoomPermissionsStore", () => {
	const setup = ({
		userRoles,
		userPermissions,
		roomPermissions,
	}: {
		userRoles: RoleName[];
		userPermissions: Permission[];
		roomPermissions: Permission[];
	}) => {
		setActivePinia(createPinia());
		roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		mockedInjectStrict.mockImplementation((key) => {
			switch (key) {
				case AUTH_MODULE_KEY:
					return {
						getMe: {
							user: {
								id: "123",
								name: "Teacher",
							},
						},
						getUserRoles: userRoles,
						getUserPermissions: userPermissions,
					};
				case ENV_CONFIG_MODULE_KEY:
					return {
						getEnv: {
							FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED: true,
						},
					};
			}
		});

		const room = ref<RoomDetails>(
			roomFactory.build({ permissions: roomPermissions })
		);
		roomDetailsStore.room = room.value;

		const store = useRoomPermissionsStore();
		return { store };
	};

	describe("manageMembersVisibility", () => {
		describe("when the user is roomowner or roomadmin", () => {
			it("should ...", async () => {
				const { store } = setup({
					userRoles: [RoleName.Teacher],
					userPermissions: createRoomPermissionsArray({
						create: true,
						edit: true,
						view: true,
					}),
					roomPermissions: [Permission.RoomView],
				});
				store.manageMembersVisibility;
				expect(store.canViewRoom).toBe(true);
				expect(store.canCreateRoom).toBe(true);
			});
		});
	});
});
