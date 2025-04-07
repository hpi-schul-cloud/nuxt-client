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
