import {
	ImportUserResponseRoleNamesEnum,
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { mockAuthModule } from "@@/tests/test-utils/mockAuthModule";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";

type setupParams = {
	userRoles?: ImportUserResponseRoleNamesEnum[];
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

		mockAuthModule(userRoles, userPermissions);

		return useRoomAuthorization();
	};

	describe("canCreateRoom", () => {
		describe("when the user has room edit permission and is a teacher", () => {
			const setup = () => {
				return genericSetup({
					userRoles: [Roles.Teacher],
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
					userRoles: [Roles.Student],
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
					userRoles: [Roles.Teacher],
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
});
