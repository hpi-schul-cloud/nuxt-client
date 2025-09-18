import { Permission, RoleName } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import {
	createTestAuthStore,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";

type setupParams = {
	userRoles?: RoleName[];
	userPermissions?: Permission[];
	roomPermissions?: Permission[];
};

let roomDetailsStore: ReturnType<typeof useRoomDetailsStore>;

describe("roomAuthorization", () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});
	beforeEach(() => {
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

		const userRoleEntities = userRoles.map((role: RoleName) => ({
			id: Math.random().toString(),
			name: role,
		}));
		createTestAuthStore({
			me: {
				permissions: userPermissions,
				roles: userRoleEntities,
			},
		});

		return useRoomAuthorization();
	};

	describe("canCreateRoom", () => {
		describe("when the user has school create room permission", () => {
			const setup = () => {
				return genericSetup({
					userPermissions: [Permission.SchoolCreateRoom],
				});
			};

			it("should be allowed to create a room", () => {
				const { canCreateRoom } = setup();
				expect(canCreateRoom.value).toBe(true);
			});
		});

		describe("when the user has no room create permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomEditRoom],
				});
			};

			it("should not be allowed to create a room", () => {
				const { canCreateRoom } = setup();
				expect(canCreateRoom.value).toBe(false);
			});
		});

		describe("when the user has room view permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomListContent],
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
				return genericSetup({ roomPermissions: [Permission.RoomListContent] });
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
				return genericSetup({ roomPermissions: [Permission.RoomEditRoom] });
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
					roomPermissions: [Permission.RoomEditContent],
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
				return genericSetup({ roomPermissions: [Permission.RoomDeleteRoom] });
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
					roomPermissions: [Permission.RoomAddMembers],
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
					roomPermissions: [Permission.RoomRemoveMembers],
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
				return genericSetup({ roomPermissions: [Permission.RoomLeaveRoom] });
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

	describe("canSeeAllStudents", () => {
		describe("when the user has student list permission", () => {
			const setup = () => {
				return genericSetup({ userPermissions: [Permission.StudentList] });
			};

			it("should be allowed to add every student of the school as room members", () => {
				const { canSeeAllStudents } = setup();
				expect(canSeeAllStudents.value).toBe(true);
			});
		});

		describe("when the user does not have student list permission", () => {
			const setup = () => {
				return genericSetup({ userPermissions: [] });
			};

			it("should not be allowed to add every student of the school as room members", () => {
				const { canSeeAllStudents } = setup();
				expect(canSeeAllStudents.value).toBe(false);
			});
		});

		describe("when the user has permission to add room members but not student list permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomAddMembers],
				});
			};

			it("should not be allowed to add every student of the school as room members", () => {
				const { canSeeAllStudents } = setup();
				expect(canSeeAllStudents.value).toBe(false);
			});
		});
	});

	describe("canCopyRoom", () => {
		describe("when the user has school create room and room copy permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomCopyRoom],
					userPermissions: [Permission.SchoolCreateRoom],
				});
			};

			it("should be allowed to copy the room", () => {
				const { canCopyRoom } = setup();
				expect(canCopyRoom.value).toBe(true);
			});
		});

		describe("when the user has room copy permission but not school create room permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomCopyRoom],
					userPermissions: [],
				});
			};
			it("should not be allowed to copy the room", () => {
				const { canCopyRoom } = setup();
				expect(canCopyRoom.value).toBe(false);
			});
		});

		describe("when the user does not have room copy and school create permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};
			it("should not be allowed to copy the room", () => {
				const { canCopyRoom } = setup();
				expect(canCopyRoom.value).toBe(false);
			});
		});
	});

	describe("canShareRoom", () => {
		describe("when the user has school create room and room share permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomShareRoom],
					userPermissions: [Permission.SchoolCreateRoom],
				});
			};

			it("should be allowed to share the room", () => {
				const { canShareRoom } = setup();
				expect(canShareRoom.value).toBe(true);
			});
		});

		describe("when the user has room share permission but not school create room permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomShareRoom],
					userPermissions: [],
				});
			};

			it("should not be allowed to share the room", () => {
				const { canShareRoom } = setup();
				expect(canShareRoom.value).toBe(false);
			});
		});

		describe("when the user does not have room share and school create permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to share the room", () => {
				const { canShareRoom } = setup();
				expect(canShareRoom.value).toBe(false);
			});
		});
	});

	describe("canManageRoomInvitationLinks", () => {
		describe("when the user has school manage room invitation links and room manage invitation links permissions", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomManageInvitationlinks],
					userPermissions: [Permission.SchoolManageRoomInvitationlinks],
				});
			};

			it("should be allowed to manage room invitation links", () => {
				const { canManageRoomInvitationLinks } = setup();
				expect(canManageRoomInvitationLinks.value).toBe(true);
			});
		});

		describe("when the user has room manage invitation links permission but not school manage room invitation links permission", () => {
			const setup = () => {
				return genericSetup({
					roomPermissions: [Permission.RoomManageInvitationlinks],
					userPermissions: [],
				});
			};

			it("should not be allowed to manage room invitation links", () => {
				const { canManageRoomInvitationLinks } = setup();
				expect(canManageRoomInvitationLinks.value).toBe(false);
			});
		});

		describe("when the user does not have room manage invitation links and school manage room invitation links permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to manage room invitation links", () => {
				const { canManageRoomInvitationLinks } = setup();
				expect(canManageRoomInvitationLinks.value).toBe(false);
			});
		});
	});

	describe("canListDrafts", () => {
		describe("when the user has room list drafts permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [Permission.RoomListDrafts] });
			};

			it("should be allowed to list drafts", () => {
				const { canListDrafts } = setup();
				expect(canListDrafts.value).toBe(true);
			});
		});

		describe("when the user does not have room list drafts permission", () => {
			const setup = () => {
				return genericSetup({ roomPermissions: [] });
			};

			it("should not be allowed to list drafts", () => {
				const { canListDrafts } = setup();
				expect(canListDrafts.value).toBe(false);
			});
		});
	});
});
