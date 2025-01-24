import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import {
	envsFactory,
	mountComposable,
	roomMemberFactory,
} from "@@/tests/test-utils";
import { useRoomMemberVisibilityOptions, useRoomMembers } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { computed, ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { roleConfigMap } from "./membersVisibleOptions.composable";

jest.mock("./roomMembers.composable");
const mockUseRoomMembers = jest.mocked(useRoomMembers);

const mockOptions = () => {
	const defaultOptions = {
		isSelectionColumnVisible: false,
		isActionColumnVisible: false,
		isAddMemberButtonVisible: false,
		isActionInRowVisible: false,
		isChangeRoleButtonVisible: false,
		isLeaveRoomButtonVisible: true,
	};
	roleConfigMap[RoleName.Roomowner] = {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isActionInRowVisible: false,
		isAddMemberButtonVisible: true,
		isChangeRoleButtonVisible: true,
		isLeaveRoomButtonVisible: false,
	};
	roleConfigMap[RoleName.Roomadmin] = {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isAddMemberButtonVisible: true,
		isActionInRowVisible: true,
		isChangeRoleButtonVisible: true,
		isLeaveRoomButtonVisible: true,
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
	): ComputedRef<RoomMemberResponse> => {
		return computed(() => ({
			firstName: "first-name",
			lastName: "last-name",
			roomRoleName,
			schoolRoleName: "school-role-name",
			schoolName: "school-name",
			userId: "user-id",
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
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isVisibleSelectionColumn } = setup({ roomRoleName });

			expect(isVisibleSelectionColumn.value).toBe(expected);
		});
	});

	describe("isVisibleActionColumn", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isVisibleActionColumn } = setup({ roomRoleName });

			expect(isVisibleActionColumn.value).toBe(expected);
		});
	});

	describe("isVisibleAddMemberButton", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isVisibleAddMemberButton } = setup({ roomRoleName });

			expect(isVisibleAddMemberButton.value).toBe(expected);
		});
	});

	describe("isVisibleActionInRow", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: false },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: true },
			{ roomRoleName: RoleName.Roomviewer, expected: true },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isVisibleActionInRow } = setup({ roomRoleName });

			const roomMember = roomMemberFactory(roomRoleName).build();

			expect(isVisibleActionInRow(roomMember)).toBe(expected);
		});
	});

	describe("isVisibleChangeRoleButton", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isVisibleChangeRoleButton } = setup({ roomRoleName });

			expect(isVisibleChangeRoleButton.value).toBe(expected);
		});

		describe("when FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED is false", () => {
			it.each([
				{ roomRoleName: RoleName.Roomowner, expected: false },
				{ roomRoleName: RoleName.Roomadmin, expected: false },
				{ roomRoleName: RoleName.Roomeditor, expected: false },
				{ roomRoleName: RoleName.Roomviewer, expected: false },
			])("should return %p for %p", ({ roomRoleName, expected }) => {
				const { isVisibleChangeRoleButton } = setup({
					roomRoleName: roomRoleName,
					changeRoleFeatureFlag: false,
				});

				expect(isVisibleChangeRoleButton.value).toBe(expected);
			});
		});
	});
});
