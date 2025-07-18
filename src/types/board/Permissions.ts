import { ref, Ref } from "vue";

export type BoardPermissionChecks = {
	hasMovePermission: Ref<boolean>;
	hasCreateCardPermission: Ref<boolean>;
	hasCreateColumnPermission: Ref<boolean>;
	hasCreateToolPermission: Ref<boolean>;
	hasEditPermission: Ref<boolean>;
	hasDeletePermission: Ref<boolean>;
	hasShareBoardPermission: Ref<boolean>;
	isTeacher: Ref<boolean>;
	isStudent: Ref<boolean>;
	arePermissionsLoaded: Ref<boolean>;
};

export const defaultPermissions: BoardPermissionChecks = {
	hasMovePermission: ref(true),
	hasCreateCardPermission: ref(true),
	hasCreateColumnPermission: ref(true),
	hasCreateToolPermission: ref(true),
	hasDeletePermission: ref(true),
	hasEditPermission: ref(true),
	hasShareBoardPermission: ref(true),
	isTeacher: ref(true),
	isStudent: ref(false),
	arePermissionsLoaded: ref(false),
};
