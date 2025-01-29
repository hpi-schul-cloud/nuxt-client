import { RoleName } from "@/serverApi/v3";

type VisibilityOptions = {
	isVisibleSelectionColumn: boolean;
	isVisibleActionColumn: boolean;
	isVisibleAddMemberButton: boolean;
	isVisibleActionInRow: boolean;
	isVisibleChangeRoleButton: boolean;
	isVisibleLeaveRoomButton: boolean;
	isVisibleAddMemberText: boolean;
};

export type RoomRoles =
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
	isVisibleAddMemberText: false,
};

export const roleConfigMap: Record<RoomRoles, VisibilityOptions> = {
	[RoleName.Roomowner]: {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleActionInRow: false,
		isVisibleAddMemberButton: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: false,
		isVisibleAddMemberText: true,
	},
	[RoleName.Roomadmin]: {
		isVisibleSelectionColumn: true,
		isVisibleActionColumn: true,
		isVisibleAddMemberButton: true,
		isVisibleActionInRow: true,
		isVisibleChangeRoleButton: true,
		isVisibleLeaveRoomButton: true,
		isVisibleAddMemberText: true,
	},
	[RoleName.Roomeditor]: defaultOptions,
	[RoleName.Roomviewer]: defaultOptions,
};
