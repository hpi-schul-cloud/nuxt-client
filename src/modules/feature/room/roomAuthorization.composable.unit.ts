import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { RoomDetails } from "@/types/room/Room";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils";
import { roomDetailsFactory } from "@@/tests/test-utils/factory/roomDetailsFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { ref } from "vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";

type setupParams = { userRoles?: Roles[]; roomPermissions?: Permission[] };

describe("roomAuthorization", () => {
	const genericSetup = ({
		userRoles = [],
		roomPermissions = [],
	}: setupParams) => {
		const room = ref<RoomDetails>(
			roomDetailsFactory.build({ permissions: roomPermissions })
		);
		const authModuleMock = createModuleMocks(AuthModule, {
			getUserRoles: userRoles,
		});
		return mountComposable(() => useRoomAuthorization(room), {
			global: { provide: { [AUTH_MODULE_KEY]: authModuleMock } },
		});
	};

	describe("canCreateRoom", () => {
		describe("when the user has room edit permission and is a teacher", () => {
			const setup = () => {
				return genericSetup({
					userRoles: [Roles.Teacher],
					roomPermissions: [Permission.RoomEdit],
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
