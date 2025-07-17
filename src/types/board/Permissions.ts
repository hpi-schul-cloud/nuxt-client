import { ref, Ref } from "vue";

export type BoardPermissionChecks = {
	hasMovePermission: Ref<boolean>;
	hasCreateCardPermission: Ref<boolean>;
	hasCreateColumnPermission: Ref<boolean>;
	hasCreateToolPermission: Ref<boolean>;
	hasEditPermission: Ref<boolean>;
	hasDeletePermission: Ref<boolean>;
	hasManageVideoConferencePermission: Ref<boolean>;
	isTeacher: Ref<boolean>;
	isStudent: Ref<boolean>;
};

export const defaultPermissions: BoardPermissionChecks = {
	hasMovePermission: ref(true),
	hasCreateCardPermission: ref(true),
	hasCreateColumnPermission: ref(true),
	hasCreateToolPermission: ref(true),
	hasDeletePermission: ref(true),
	hasEditPermission: ref(true),
	hasManageVideoConferencePermission: ref(true),
	isTeacher: ref(true),
	isStudent: ref(false),
};
