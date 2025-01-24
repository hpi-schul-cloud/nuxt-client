import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { computed, ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

type VisibilityOptions = {
	isVisibleSelectionColumn: boolean;
	isVisibleActionColumn: boolean;
	isVisibleAddMemberButton: boolean;
	isVisibleActionInRow: boolean;
	isVisibleChangeRoleButton: boolean;
	isVisibleLeaveRoomButton: boolean;
};

type RoomRoles =
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer;

const defaultOptions: VisibilityOptions = {
	isVisibleSelectionColumn: false,
	isVisibleActionColumn: false,
	isVisibleAddMemberButton: false,
	isVisibleActionInRow: false,
	isVisibleChangeRoleButton: false,
	isVisibleLeaveRoomButton: true,
};

export const roleConfigMap: Record<RoomRoles, VisibilityOptions> = {
	[RoleName.Roomowner]: {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleActionInRow: false,
		isVisibleAddMemberButton: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: false,
	},
	[RoleName.Roomadmin]: {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleAddMemberButton: true,
		isVisibleActionInRow: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: true,
	},
	[RoleName.Roomeditor]: defaultOptions,
	[RoleName.Roomviewer]: defaultOptions,
};

export const useRoomMemberVisibilityOptions = (
	currentUser: ComputedRef<RoomMemberResponse>
) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED } = envConfigModule.getEnv;
	const visibilityOptions = computed(
		() => roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
	);

	const isVisibleSelectionColumn = computed(() => {
		return visibilityOptions.value?.isVisibleSelectionColumn;
	});

	const isVisibleActionColumn = computed(() => {
		return visibilityOptions.value?.isVisibleActionColumn;
	});

	const isVisibleAddMemberButton = computed(() => {
		return visibilityOptions.value?.isVisibleAddMemberButton;
	});

	const isVisibleChangeRoleButton = computed(() => {
		return (
			visibilityOptions.value?.isVisibleChangeRoleButton &&
			FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED
		);
	});

	const isVisibleLeaveRoomButton = computed(() => {
		return visibilityOptions.value?.isVisibleLeaveRoomButton;
	});

	const isVisibleActionInRow = (user: RoomMemberResponse) => {
		if (user.roomRoleName === RoleName.Roomowner) return false;
		return user.userId !== currentUser?.value.userId;
	};

	const isVisibleRemoveMemberButton = (user: RoomMemberResponse) => {
		return user.roomRoleName !== RoleName.Roomowner;
	};

	return {
		isVisibleSelectionColumn,
		isVisibleActionColumn,
		isVisibleAddMemberButton,
		isVisibleChangeRoleButton,
		isVisibleLeaveRoomButton,
		isVisibleActionInRow,
		isVisibleRemoveMemberButton,
	};
};
