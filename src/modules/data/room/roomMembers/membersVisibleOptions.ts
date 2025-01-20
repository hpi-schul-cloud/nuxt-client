import { RoleName, RoomMemberResponse } from "@/serverApi/v3";

const FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED = true;

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
	"change-role-button"?: Options;
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
	const defaultOptions = {
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
		"change-role-button": {
			show: false,
		},
	};
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
				show: false,
				disabled: false,
			},
			"change-role-button": {
				show: FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED,
			},
		},
		[RoleName.Roomadmin]: {
			...defaultOptions,
			"selection-column": {
				show: true,
			},
			"actions-column": {
				show: true,
			},
			"add-member-button": {
				show: true,
			},
			"change-role-button": {
				show: FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED,
			},
		},
		[RoleName.Roomeditor]: defaultOptions,
		[RoleName.Roomviewer]: defaultOptions,
	};
	return ROLES[user?.roomRoleName as keyof RoomRoles]?.[source]?.[action];
};

export const useRoomMemberVisibilityOptions = (currenUserId: string) => {
	/*
	 * Check if the current user or member in the list has the rights to see the option
	 * @param user - user to check
	 * @param source - source of the option
	 * @param action - action to check
	 * @returns boolean
	 */
	const checkVisibility = (
		user: RoomMemberResponse,
		source: keyof PageViewOptions,
		action: keyof Options = "show"
	) => hasVisibleOption(currenUserId, user, source, action);

	return {
		checkVisibility,
	};
};
