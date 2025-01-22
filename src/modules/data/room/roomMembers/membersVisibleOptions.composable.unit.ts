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

jest.mock("./roomMembers.composable");
const mockUseRoomMembers = jest.mocked(useRoomMembers);

describe("useRoomMemberVisibilityOptions", () => {
	let mockRoomMemberCalls: DeepMocked<ReturnType<typeof useRoomMembers>>;

	beforeEach(() => {
		mockRoomMemberCalls = createMock<ReturnType<typeof useRoomMembers>>();
		mockUseRoomMembers.mockReturnValue(mockRoomMemberCalls);
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

	describe("isSelectionColumnVisible", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isSelectionColumnVisible } = setup({ roomRoleName });

			expect(isSelectionColumnVisible()).toBe(expected);
		});
	});

	describe("isActionColumnVisible", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isActionColumnVisible } = setup({ roomRoleName });

			expect(isActionColumnVisible()).toBe(expected);
		});
	});

	describe("isAddMemberButtonVisible", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isAddMemberButtonVisible } = setup({ roomRoleName });

			expect(isAddMemberButtonVisible()).toBe(expected);
		});
	});

	describe("isActionInRowVisible", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: false },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: true },
			{ roomRoleName: RoleName.Roomviewer, expected: true },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isActionInRowVisible } = setup({ roomRoleName });

			const roomMember = roomMemberFactory(roomRoleName).build();

			expect(isActionInRowVisible(roomMember)).toBe(expected);
		});
	});

	describe("isChangeRoleButtonVisible", () => {
		it.each([
			{ roomRoleName: RoleName.Roomowner, expected: true },
			{ roomRoleName: RoleName.Roomadmin, expected: true },
			{ roomRoleName: RoleName.Roomeditor, expected: false },
			{ roomRoleName: RoleName.Roomviewer, expected: false },
		])("should return %p for %p", ({ roomRoleName, expected }) => {
			const { isChangeRoleButtonVisible } = setup({ roomRoleName });

			expect(isChangeRoleButtonVisible()).toBe(expected);
		});

		describe("when FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED is false", () => {
			it.each([
				{ roomRoleName: RoleName.Roomowner, expected: false },
				{ roomRoleName: RoleName.Roomadmin, expected: false },
				{ roomRoleName: RoleName.Roomeditor, expected: false },
				{ roomRoleName: RoleName.Roomviewer, expected: false },
			])("should return %p for %p", ({ roomRoleName, expected }) => {
				const { isChangeRoleButtonVisible } = setup({
					roomRoleName: roomRoleName,
					changeRoleFeatureFlag: false,
				});

				expect(isChangeRoleButtonVisible()).toBe(expected);
			});
		});
	});
});
