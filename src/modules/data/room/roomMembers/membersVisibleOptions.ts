import { RoleName } from "@/serverApi/v3";
type Options = {
	show: boolean;
	disabled: boolean;
	hidden: boolean;
};

type ViewOptions = {
	"selection-column": Options;
	"actions-column": Options;
	"checkbox-in-row"?: Options;
	"actions-in-row"?: Options;
};

type RolePermissions = Pick<
	Record<RoleName, ViewOptions>,
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer
>;

const ROLES: RolePermissions = {
	[RoleName.Roomowner]: {
		"selection-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"actions-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"checkbox-in-row": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"actions-in-row": {
			show: true,
			disabled: false,
			hidden: false,
		},
	},
	[RoleName.Roomadmin]: {
		"selection-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"actions-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"checkbox-in-row": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"actions-in-row": {
			show: true,
			disabled: false,
			hidden: false,
		},
	},
	[RoleName.Roomeditor]: {
		"selection-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"actions-column": {
			show: true,
			disabled: false,
			hidden: false,
		},
		"checkbox-in-row": {
			show: false,
			disabled: false,
			hidden: true,
		},
		"actions-in-row": {
			show: false,
			disabled: false,
			hidden: true,
		},
	},
	[RoleName.Roomviewer]: {
		"selection-column": {
			show: false,
			disabled: false,
			hidden: true,
		},
		"actions-column": {
			show: false,
			disabled: false,
			hidden: true,
		},

		"checkbox-in-row": {
			show: false,
			disabled: false,
			hidden: true,
		},
		"actions-in-row": {
			show: false,
			disabled: false,
			hidden: true,
		},
	},
};

export const hasVisibleOption = (
	roleName: keyof RolePermissions,
	source: keyof ViewOptions,
	action?:
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
