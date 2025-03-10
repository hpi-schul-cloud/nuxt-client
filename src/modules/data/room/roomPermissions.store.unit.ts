import { useRoomPermissionsStore } from "./roomPermissions.store";
import { createPinia, setActivePinia } from "pinia";
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
import { roomMemberFactory } from "@@/tests/test-utils/factory/room/roomMembersFactory";

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

interface PermissionKeywords {
	create?: boolean;
	edit?: boolean;
	view?: boolean;
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
		userPermissions = [],
		roomPermissions = [],
	}: {
		userRoles: RoleName[];
		userPermissions?: Permission[];
		roomPermissions?: Permission[];
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

	describe("when the user is roomowner or roomadmin", () => {
		it("should be allowed to create rooms", async () => {
			const { store } = setup({
				userRoles: [RoleName.Teacher],
				userPermissions: createRoomPermissionsArray({
					create: true,
					edit: true,
					view: true,
				}),
				roomPermissions: [Permission.RoomView],
			});
			expect(store.canCreateRoom).toBe(true);
		});
	});

	describe("manageMembersVisibility", () => {
		describe("when the user is roomowner or roomadmin and feature is enabled", () => {
			const setupManageMembersVisibility = () => {
				const { store } = setup({
					userRoles: [RoleName.Teacher],
					userPermissions: createRoomPermissionsArray({
						create: true,
						edit: true,
						view: true,
					}),
					roomPermissions: [
						Permission.RoomView,
						Permission.RoomMembersChangeRole,
					],
				});
				return { store };
			};
			it("should show changeRoleButton", async () => {
				const { store } = setupManageMembersVisibility();

				const { isVisibleChangeRoleButton } = store.manageMembersVisibility;

				expect(isVisibleChangeRoleButton).toBe(true);
			});

			describe("when the user is roomowner", () => {
				it("should not show the action menu for rows", async () => {
					const { store } = setupManageMembersVisibility();

					const { isVisibleActionInRow } = store.manageMembersVisibility;
					const user = roomMemberFactory(RoleName.Roomowner).build();

					expect(isVisibleActionInRow(user)).toBe(false);
				});
			});

			describe("when the user is roomadmin", () => {
				it("should show the action menu for rows", async () => {
					const { store } = setupManageMembersVisibility();

					const { isVisibleActionInRow } = store.manageMembersVisibility;
					const user = roomMemberFactory(RoleName.Roomadmin).build();

					expect(isVisibleActionInRow(user)).toBe(true);
				});
			});
		});

		describe("when the user is roomeditor", () => {
			it("should show removeMemberButton", () => {
				const { store } = setup({
					userRoles: [RoleName.Teacher],
					roomPermissions: [Permission.RoomView, Permission.RoomEdit],
				});

				const { isVisibleRemoveMemberButton } = store.manageMembersVisibility;
				const user = roomMemberFactory(RoleName.Roomeditor).build();

				expect(isVisibleRemoveMemberButton(user)).toBe(true);
			});
		});
	});
});
