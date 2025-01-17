import { RoleName, RoomMemberResponse } from "@/serverApi/v3";

type Options = {
	show: boolean;
	disabled?: boolean;
};

type PageViewOptions = {
	"selection-column": Options;
	"actions-column": Options;
	"add-member-button"?: Options;
	"checkbox-in-row"?: Options;
	"actions-in-row"?: Options;
};

type RoomRoles = Pick<
	Record<RoleName, PageViewOptions>,
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer
>;

const hasVisibleOption = (
	currenUserId: string,
	user: RoomMemberResponse,
	source: keyof PageViewOptions,
	action: keyof Options
) => {
	const ROLES: RoomRoles = {
		[RoleName.Roomowner]: {
			"selection-column": {
				show: true,
			},
			"actions-column": {
				show: true,
			},
			"add-member-button": {
				show: true,
			},
			"checkbox-in-row": {
				show: false,
				disabled: true,
			},
			"actions-in-row": {
				show: currenUserId !== user?.userId,
				disabled: false,
			},
		},
		[RoleName.Roomadmin]: {
			"selection-column": {
				show: true,
			},
			"actions-column": {
				show: true,
			},
			"add-member-button": {
				show: false,
			},
			"checkbox-in-row": {
				show: false,
				disabled: currenUserId === user?.userId,
			},
			"actions-in-row": {
				show: currenUserId !== user?.userId,
				disabled: false,
			},
		},
		[RoleName.Roomeditor]: {
			"selection-column": {
				show: false,
			},
			"actions-column": {
				show: false,
			},
			"checkbox-in-row": {
				show: false,
				disabled: currenUserId === user?.userId,
			},
			"actions-in-row": {
				show: currenUserId !== user?.userId,
				disabled: false,
			},
		},
		[RoleName.Roomviewer]: {
			"selection-column": {
				show: false,
			},
			"actions-column": {
				show: false,
			},
			"checkbox-in-row": {
				show: false,
				disabled: currenUserId === user?.userId,
			},
			"actions-in-row": {
				show: currenUserId !== user?.userId,
				disabled: false,
			},
		},
	};
	return ROLES[user?.roleName as keyof RoomRoles]?.[source]?.[action];
};

export const useRoomMemberVisibilityOptions = (currenUserId: string) => {
	const checkPageVisibleOption = (
		user: RoomMemberResponse,
		source: keyof PageViewOptions,
		action: keyof Options = "show"
	) => hasVisibleOption(currenUserId, user, source, action);

	return {
		checkPageVisibleOption,
	};
};
