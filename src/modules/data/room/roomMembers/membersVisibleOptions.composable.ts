import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { computed, ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { RoomRoles, roleConfigMap } from "./memberVisibilityConfig";
import { RoomMember } from "./types";

type VisibilityOptionReturnType = {
	isVisibleSelectionColumn: ComputedRef<boolean>;
	isVisibleActionColumn: ComputedRef<boolean>;
	isVisibleAddMemberButton: ComputedRef<boolean>;
	isVisibleChangeRoleButton: ComputedRef<boolean>;
	isVisibleLeaveRoomButton: ComputedRef<boolean>;
	isVisiblePageInfoText: ComputedRef<boolean>;
	isVisibleTabNavigation: ComputedRef<boolean>;
	isVisibleActionInRow: (user: RoomMemberResponse) => boolean;
	isVisibleRemoveMemberButton: (user: RoomMemberResponse) => boolean;
};

export const useRoomMemberVisibilityOptions = (
	currentUser: ComputedRef<RoomMember>
): VisibilityOptionReturnType => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const {
		FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED,
		FEATURE_ROOMMEMBERS_TABS_ENABLED,
	} = envConfigModule.getEnv;

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

	const isVisiblePageInfoText = computed(() => {
		return visibilityOptions.value?.isVisiblePageInfoText;
	});

	const isVisibleTabNavigation = computed(() => {
		return (
			visibilityOptions.value?.isVisibleTabNavigation &&
			FEATURE_ROOMMEMBERS_TABS_ENABLED
		);
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
		isVisiblePageInfoText,
		isVisibleTabNavigation,
		isVisibleActionInRow,
		isVisibleRemoveMemberButton,
	};
};
