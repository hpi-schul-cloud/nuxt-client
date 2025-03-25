import { RoleName } from "@/serverApi/v3";
import {
	envsFactory,
	mountComposable,
	roomMemberFactory,
} from "@@/tests/test-utils";
import {
	RoomMember,
	useRoomMemberVisibilityOptions,
	useRoomMembers,
} from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { computed, ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { roleConfigMap } from "./memberVisibilityConfig";

jest.mock("./roomMembers.composable");
const mockUseRoomMembers = jest.mocked(useRoomMembers);

const mockOptions = () => {
	const defaultOptions = {
		isVisibleSelectionColumn: false,
		isVisibleActionColumn: false,
		isVisibleAddMemberButton: false,
		isVisibleActionInRow: false,
		isVisibleChangeRoleButton: false,
		isVisibleLeaveRoomButton: true,
		isVisiblePageInfoText: false,
	};
	roleConfigMap[RoleName.Roomowner] = {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleActionInRow: false,
		isVisibleAddMemberButton: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: false,
		isVisiblePageInfoText: true,
	};
	roleConfigMap[RoleName.Roomadmin] = {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleAddMemberButton: true,
		isVisibleActionInRow: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: true,
		isVisiblePageInfoText: true,
	};
	roleConfigMap[RoleName.Roomeditor] = defaultOptions;
	roleConfigMap[RoleName.Roomviewer] = defaultOptions;
};

describe("useRoomMemberVisibilityOptions", () => {
	let mockRoomMemberCalls: DeepMocked<ReturnType<typeof useRoomMembers>>;

	beforeEach(() => {
		mockRoomMemberCalls = createMock<ReturnType<typeof useRoomMembers>>();
		mockUseRoomMembers.mockReturnValue(mockRoomMemberCalls);
		mockOptions();
	});

	const createCurrentUser = (
		roomRoleName: RoleName
	): ComputedRef<RoomMember> => {
		return computed(() => ({
			firstName: "first-name",
			lastName: "last-name",
			roomRoleName,
			schoolRoleNames: [RoleName.Teacher],
			schoolName: "school-name",
			userId: "user-id",
			displayRoomRole: "display-room-role",
			displaySchoolRole: "display-school-role",
		}));
	};

	const defaultEnvs = envsFactory.build();

	const setup = (
		options: {
			roomRoleName: RoleName;
			changeRoleFeatureFlag?: boolean;
		} = {
			roomRoleName: RoleName.Roomowner,
			changeRoleFeatureFlag: true,
		}
	) => {
		const currentUser = createCurrentUser(options?.roomRoleName);
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: {
				...defaultEnvs,
				FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED:
					options.changeRoleFeatureFlag ?? true,
			},
		});

		return mountComposable(() => useRoomMemberVisibilityOptions(currentUser), {
			global: {
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
		});
	};

	describe("isVisibleSelectionColumn", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleSelectionColumn } = setup({ roomRoleName });
				expect(isVisibleSelectionColumn.value).toBe(expected);
			}
		);
	});

	describe("isVisibleActionColumn", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleActionColumn } = setup({ roomRoleName });
				expect(isVisibleActionColumn.value).toBe(expected);
			}
		);
	});

	describe("isVisibleAddMemberButton", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleAddMemberButton } = setup({ roomRoleName });
				expect(isVisibleAddMemberButton.value).toBe(expected);
			}
		);
	});

	describe("isVisibleActionInRow", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: false },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: true },
			{ roomRoleName: RoleName.Roomviewer, expected: true },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleActionInRow } = setup({ roomRoleName });
				const roomMember = roomMemberFactory(roomRoleName).build();
				expect(isVisibleActionInRow(roomMember)).toBe(expected);
			}
		);
	});

	describe("isVisibleChangeRoleButton", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleChangeRoleButton } = setup({ roomRoleName });

				expect(isVisibleChangeRoleButton.value).toBe(expected);
			}
		);

		describe("when FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED is false", () => {
			it.each([
				{ roomRoleName: RoleName.Roomowner, expected: false },
				{ roomRoleName: RoleName.Roomadmin, expected: false },
				{ roomRoleName: RoleName.Roomeditor, expected: false },
				{ roomRoleName: RoleName.Roomviewer, expected: false },
			])(
				"should return $expected for $roomRoleName",
				({ roomRoleName, expected }) => {
					const { isVisibleChangeRoleButton } = setup({
						roomRoleName: roomRoleName,
						changeRoleFeatureFlag: false,
					});
					expect(isVisibleChangeRoleButton.value).toBe(expected);
				}
			);
		});
	});

	describe("isVisibleRemoveMemberButton", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: false },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: true },
			{ roomRoleName: RoleName.Roomviewer, expected: true },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisibleRemoveMemberButton } = setup({ roomRoleName });
				const roomMember = roomMemberFactory(roomRoleName).build();
				expect(isVisibleRemoveMemberButton(roomMember)).toBe(expected);
			}
		);
	});

	describe("isVisiblePageInfoText", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])(
			"should return $expected for $roomRoleName",
			({ roomRoleName, expected }) => {
				const { isVisiblePageInfoText } = setup({ roomRoleName });
				expect(isVisiblePageInfoText.value).toBe(expected);
			}
		);
	});
});
