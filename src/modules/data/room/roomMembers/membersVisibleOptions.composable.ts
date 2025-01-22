import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { ComputedRef } from "vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

type VisibilityOptions = {
	isSelectionColumnVisible: boolean;
	isActionColumnVisible: boolean;
	isAddMemberButtonVisible: boolean;
	isActionInRowVisible: boolean;
	isChangeRoleButtonVisible: boolean;
	isLeaveRoomButtonVisible: boolean;
};

type RoomRoles =
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer;

const defaultOptions: VisibilityOptions = {
	isSelectionColumnVisible: false,
	isActionColumnVisible: false,
	isAddMemberButtonVisible: false,
	isActionInRowVisible: false,
	isChangeRoleButtonVisible: false,
	isLeaveRoomButtonVisible: true,
};

const roleConfigMap: Record<RoomRoles, VisibilityOptions> = {
	[RoleName.Roomowner]: {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isActionInRowVisible: false,
		isAddMemberButtonVisible: true,
		isChangeRoleButtonVisible: true,
		isLeaveRoomButtonVisible: false,
	},
	[RoleName.Roomadmin]: {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isAddMemberButtonVisible: true,
		isActionInRowVisible: true,
		isChangeRoleButtonVisible: true,
		isLeaveRoomButtonVisible: true,
	},
	[RoleName.Roomeditor]: defaultOptions,
	[RoleName.Roomviewer]: defaultOptions,
};

export const useRoomMemberVisibilityOptions = (
	currentUser: ComputedRef<RoomMemberResponse>
) => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED } = envConfigModule.getEnv;

	const isSelectionColumnVisible = () => {
		return roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
			?.isSelectionColumnVisible;
	};

	const isActionColumnVisible = () => {
		return roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
			?.isActionColumnVisible;
	};

	const isAddMemberButtonVisible = () => {
		return roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
			?.isAddMemberButtonVisible;
	};

	const isActionInRowVisible = (user: RoomMemberResponse) => {
		if (user.roomRoleName === RoleName.Roomowner) return false;
		return user.userId !== currentUser?.value.userId;
	};

	const isChangeRoleButtonVisible = () => {
		return (
			roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
				?.isChangeRoleButtonVisible && FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED
		);
	};

	const isLeaveRoomButtonVisible = () => {
		return roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
			?.isLeaveRoomButtonVisible;
	};

	return {
		isSelectionColumnVisible,
		isActionColumnVisible,
		isAddMemberButtonVisible,
		isActionInRowVisible,
		isChangeRoleButtonVisible,
		isLeaveRoomButtonVisible,
	};
};
