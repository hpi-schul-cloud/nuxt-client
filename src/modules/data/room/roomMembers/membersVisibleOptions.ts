import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { ComputedRef } from "vue";

const FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED = true;

type VisibilityOptions = {
	isSelectionColumnVisible: boolean;
	isActionColumnVisible: boolean;
	isAddMemberButtonVisible: boolean;
	isActionInRowVisible: boolean;
	isChangeRoleButtonVisible: boolean;
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
};

const roleConfigMap: Record<RoomRoles, VisibilityOptions> = {
	[RoleName.Roomowner]: {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isActionInRowVisible: false,
		isAddMemberButtonVisible: true,
		isChangeRoleButtonVisible: FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED,
	},
	[RoleName.Roomadmin]: {
		isSelectionColumnVisible: true,
		isActionColumnVisible: true,
		isAddMemberButtonVisible: true,
		isActionInRowVisible: true,
		isChangeRoleButtonVisible: FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED,
	},
	[RoleName.Roomeditor]: defaultOptions,
	[RoleName.Roomviewer]: defaultOptions,
};

export const useRoomMemberVisibilityOptions = (
	currentUser: ComputedRef<RoomMemberResponse>
) => {
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
		return (
			user.userId === currentUser?.value.userId ||
			user.roomRoleName === RoleName.Roomowner
		);
	};

	const isChangeRoleButtonVisible = () => {
		return roleConfigMap[currentUser?.value?.roomRoleName as RoomRoles]
			?.isChangeRoleButtonVisible;
	};

	return {
		isSelectionColumnVisible,
		isActionColumnVisible,
		isAddMemberButtonVisible,
		isActionInRowVisible,
		isChangeRoleButtonVisible,
	};
};
