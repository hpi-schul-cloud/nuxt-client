import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { computed, ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { RoomRoles, roleConfigMap } from "./memberVisibilityConfig";

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

	const isVisibleAddMemberText = computed(() => {
		return visibilityOptions.value?.isVisibleAddMemberText;
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
		isVisibleAddMemberText,
		isVisibleActionInRow,
		isVisibleRemoveMemberButton,
	};
};
