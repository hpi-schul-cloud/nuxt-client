import { RoleName } from "@/serverApi/v3";
type Options = {
	show: boolean;
	disabled: boolean;
};

type ViewOptions = {
	"selection-column": Options;
	"actions-column": Options;
	"checkbox-in-row"?: Options;
	"actions-in-row"?: Options;
};

type RoomRoles = Pick<
	Record<RoleName, ViewOptions>,
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer
>;

const ROLES: RoomRoles = {
	[RoleName.Roomowner]: {
		"selection-column": {
			show: true,
			disabled: false,
		},
		"actions-column": {
			show: true,
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
			show: true,
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

export const hasVisibleOption = (
	roleName: keyof RoomRoles,
	source: keyof ViewOptions,
	action:
		| keyof ViewOptions["selection-column"]
		| keyof ViewOptions["actions-column"]
		| keyof ViewOptions["checkbox-in-row"]
		| keyof ViewOptions["actions-in-row"]
) => {
	const sourceOption = ROLES[roleName]?.[source];
	if (!action || typeof sourceOption === "boolean") {
		return sourceOption;
	}
	return sourceOption?.[action];
};
