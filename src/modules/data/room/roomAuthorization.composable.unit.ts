import { Permission, RoleName } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { meResponseFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import setupStores from "../../../../tests/test-utils/setupStores";
import { authModule } from "../../../store";
import AuthModule from "../../../store/auth";
import { useRoomAuthorization } from "./roomAuthorization.composable";

type setupParams = {
	userRoles?: RoleName[];
	userPermissions?: Permission[];
	roomPermissions?: Permission[];
};

let roomDetailsStore: ReturnType<typeof useRoomDetailsStore>;

describe("roomAuthorization", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
	});

	const genericSetup = ({
		userRoles = [],
		userPermissions = [],
		roomPermissions = [],
	}: setupParams) => {
		const room = ref<RoomDetails>(
			roomFactory.build({ permissions: roomPermissions })
		);
		roomDetailsStore.room = room.value;

		setupStores({ authModule: AuthModule });
		const userRoleEntities = userRoles.map((role: RoleName) => ({
			id: Math.random().toString(),
			name: role,
		}));
		const mockMe = meResponseFactory.build({
			roles: userRoleEntities,
			permissions: userPermissions,
		});
		authModule.setMe(mockMe);

		return useRoomAuthorization();
	};

	describe("canCreateRoom", () => {
		describe("when the user has room edit permission and is a teacher", () => {
			const setup = () => {
				return genericSetup({
					userRoles: [RoleName.Teacher],
					userPermissions: [
						Permission.RoomCreate.toLocaleLowerCase() as Permission,
					],
				});
			};

			it("should be allowed to create a room", () => {
				const { canCreateRoom } = setup();
				expect(canCreateRoom.value).toBe(true);
			});
		});

		describe("when the user has room edit permission but is not a teacher", () => {
			const setup = () => {
				return genericSetup({
					userRoles: [RoleName.Student],
					roomPermissions: [Permission.RoomEdit],
				});
			};

			it("should not be allowed to create a room", () => {
				const { canCreateRoom } = setup();
				expect(canCreateRoom.value).toBe(false);
			});
		});

		describe("when the user has room view permission and is a teacher", () => {
			const setup = () => {
				return genericSetup({
					userRoles: [RoleName.Teacher],
					roomPermissions: [Permission.RoomView],
				});
			};

			it("should not be allowed to create a room", () => {
				const { canCreateRoom } = setup();
				expect(canCreateRoom.value).toBe(false);
			});
		});
	});

	describe("canViewRoom", () => {
		describe("when the user has room view permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomView] });
			};

			it("should be allowed to view the room", () => {
				const { canViewRoom } = setup();
				expect(canViewRoom.value).toBe(true);
			});
		});

		describe("when the user does not have room view permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to view the room", () => {
				const { canViewRoom } = setup();
				expect(canViewRoom.value).toBe(false);
			});
		});
	});

	describe("canEditRoom", () => {
		describe("when the user has room edit permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomEdit] });
			};

			it("should be allowed to edit the room", () => {
				const { canEditRoom } = setup();
				expect(canEditRoom.value).toBe(true);
			});
		});

		describe("when the user does not have room edit permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to edit the room", () => {
				const { canEditRoom } = setup();
				expect(canEditRoom.value).toBe(false);
			});
		});
	});

	describe("canEditRoomContent", () => {
		describe("when the user has room content edit permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomContentEdit],
				});
			};

			it("should be allowed to edit the room content", () => {
				const { canEditRoomContent } = setup();
				expect(canEditRoomContent.value).toBe(true);
			});
		});

		describe("when the user does not have room content edit permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to edit the room content", () => {
				const { canEditRoomContent } = setup();
				expect(canEditRoomContent.value).toBe(false);
			});
		});
	});

	describe("canDeleteRoom", () => {
		describe("when the user has room delete permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomDelete] });
			};

			it("should be allowed to delete the room", () => {
				const { canDeleteRoom } = setup();
				expect(canDeleteRoom.value).toBe(true);
			});
		});

		describe("when the user does not have room delete permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to delete the room", () => {
				const { canDeleteRoom } = setup();
				expect(canDeleteRoom.value).toBe(false);
			});
		});
	});

	describe("canAddRoomMembers", () => {
		describe("when the user has room members add permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomMembersAdd],
				});
			};

			it("should be allowed to add room members", () => {
				const { canAddRoomMembers } = setup();
				expect(canAddRoomMembers.value).toBe(true);
			});
		});

		describe("when the user does not have room members add permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to add room members", () => {
				const { canAddRoomMembers } = setup();
				expect(canAddRoomMembers.value).toBe(false);
			});
		});
	});

	describe("canRemoveRoomMembers", () => {
		describe("when the user has room members remove permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomMembersRemove],
				});
			};

			it("should be allowed to remove room members", () => {
				const { canRemoveRoomMembers } = setup();
				expect(canRemoveRoomMembers.value).toBe(true);
			});
		});

		describe("when the user does not have room members remove permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to remove room members", () => {
				const { canRemoveRoomMembers } = setup();
				expect(canRemoveRoomMembers.value).toBe(false);
			});
		});
	});

	describe("canChangeOwner", () => {
		describe("when the user has room change owner permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomChangeOwner],
				});
			};

			it("should be allowed to change the room owner", () => {
				const { canChangeOwner } = setup();
				expect(canChangeOwner.value).toBe(true);
			});
		});

		describe("when the user does not have room change owner permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to change the room owner", () => {
				const { canChangeOwner } = setup();
				expect(canChangeOwner.value).toBe(false);
			});
		});
	});

	describe("canLeaveRoom", () => {
		describe("when the user has room leave permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomLeave] });
			};

			it("should be allowed to leave the room", () => {
				const { canLeaveRoom } = setup();
				expect(canLeaveRoom.value).toBe(true);
			});
		});

		describe("when the user does not have room leave permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to leave the room", () => {
				const { canLeaveRoom } = setup();
				expect(canLeaveRoom.value).toBe(false);
			});
		});
	});

	describe("canCopyRoom", () => {
		describe("when the user has room duplicate permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomCopy] });
			};

			it("should be allowed to duplicate the room", () => {
				const { canCopyRoom } = setup();
				expect(canCopyRoom.value).toBe(true);
			});
		});

		describe("when the user does not have room duplicate permission", () => {
			it.todo("should not be allowed to duplicate the room");
		});
	});
});
