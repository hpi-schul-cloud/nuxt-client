import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
type Options = {
	show: boolean;
	disabled: boolean;
};

type PageViewOptions = {
	"selection-column": Options;
	"actions-column": Options;
	"add-member-button"?: Options;
	"checkbox-in-row"?: Options;
	"actions-in-row"?: Options;
};

export type UserRoles =
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer;

type RoomRoles = Pick<Record<RoleName, PageViewOptions>, UserRoles>;

const ROLES: RoomRoles = {
	[RoleName.Roomowner]: {
		"selection-column": {
			show: false,
			disabled: false,
		},
		"actions-column": {
			show: false,
			disabled: false,
		},
		"add-member-button": {
			show: false,
			disabled: false,
		},
		"checkbox-in-row": {
			show: true,
			disabled: false,
		},
		"actions-in-row": {
			show: true,
			disabled: false,
		},
	},
	[RoleName.Roomadmin]: {
		"selection-column": {
			show: true,
			disabled: false,
		},
		"actions-column": {
			show: true,
			disabled: false,
		},
		"add-member-button": {
			show: false,
			disabled: false,
		},
		"checkbox-in-row": {
			show: true,
			disabled: false,
		},
		"actions-in-row": {
			show: true,
			disabled: false,
		},
	},
	[RoleName.Roomeditor]: {
		"selection-column": {
			show: false,
			disabled: false,
		},
		"actions-column": {
			show: false,
			disabled: false,
		},
		"checkbox-in-row": {
			show: false,
			disabled: false,
		},
		"actions-in-row": {
			show: false,
			disabled: false,
		},
	},
	[RoleName.Roomviewer]: {
		"selection-column": {
			show: false,
			disabled: false,
		},
		"actions-column": {
			show: false,
			disabled: false,
		},
		"checkbox-in-row": {
			show: false,
			disabled: false,
		},
		"actions-in-row": {
			show: false,
			disabled: false,
		},
	},
};

export const useRoomMemberVisibilityOptions = () => {
	const checkPageVisibleOption = (
		userRole: UserRoles,
		source: keyof PageViewOptions,
		action: keyof Options
	) => {
		if (!ROLES[userRole] || !ROLES[userRole][source]) {
			return false;
		}

		return ROLES[userRole][source][action];
	};

	return {
		checkPageVisibleOption,
	};
};

// Usage:

const { checkPageVisibleOption } = useRoomMemberVisibilityOptions();

checkPageVisibleOption(RoleName.Roomowner, "selection-column", "show"); // true
checkPageVisibleOption(RoleName.Roomowner, "selection-column", "disabled"); // false
checkPageVisibleOption(RoleName.Roomviewer, "selection-column", "show");
checkPageVisibleOption(RoleName.Roomviewer, "actions-in-row", "show"); // false
