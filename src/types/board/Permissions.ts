import { ref, Ref } from "vue";

export type BoardPermissionChecks = {
	hasMovePermission: boolean;
	hasCreateCardPermission: boolean;
	hasCreateColumnPermission: boolean;
	hasCreateToolPermission: boolean;
	hasEditPermission: boolean;
	hasDeletePermission: boolean;
	isTeacher: boolean;
	isStudent: boolean;
	canEditRoomBoard: Ref<boolean>;
};

export const defaultPermissions: BoardPermissionChecks = {
	hasMovePermission: true,
	hasCreateCardPermission: true,
	hasCreateColumnPermission: true,
	hasCreateToolPermission: true,
	hasDeletePermission: true,
	hasEditPermission: true,
	isTeacher: true,
	isStudent: false,
	canEditRoomBoard: ref(true),
};
