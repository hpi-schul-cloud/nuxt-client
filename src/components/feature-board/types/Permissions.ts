export type BoardPermissionChecks = {
	hasMovePermission: boolean;
	hasCreateCardPermission: boolean;
	hasCreateColumnPermission: boolean;
	hasEditPermission: boolean;
	hasDeletePermission: boolean;
	isTeacher: boolean;
};

export const defaultPermissions = {
	hasMovePermission: true,
	hasCreateCardPermission: true,
	hasCreateColumnPermission: true,
	hasDeletePermission: true,
	hasEditPermission: true,
	isTeacher: true,
};
