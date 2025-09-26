import { ref, Ref } from "vue";

export type BoardPermissionChecks = {
	arePermissionsLoaded: Ref<boolean>;
	hasMovePermission: Ref<boolean>;
	hasCreateCardPermission: Ref<boolean>;
	hasCreateColumnPermission: Ref<boolean>;
	hasCreateToolPermission: Ref<boolean>;
	hasEditPermission: Ref<boolean>;
	hasDeletePermission: Ref<boolean>;
	hasManageBoardPermission: Ref<boolean>;
	hasManageReadersCanEditPermission: Ref<boolean>;
	hasManageVideoConferencePermission: Ref<boolean>;
	hasShareBoardPermission: Ref<boolean>;
	isTeacher: Ref<boolean>;
	isStudent: Ref<boolean>;
};

export const defaultPermissions: BoardPermissionChecks = {
	arePermissionsLoaded: ref(false),
	hasMovePermission: ref(true),
	hasCreateCardPermission: ref(true),
	hasCreateColumnPermission: ref(true),
	hasCreateToolPermission: ref(true),
	hasDeletePermission: ref(true),
	hasEditPermission: ref(true),
	hasManageBoardPermission: ref(false),
	hasManageReadersCanEditPermission: ref(true),
	hasManageVideoConferencePermission: ref(true),
	hasShareBoardPermission: ref(true),
	isTeacher: ref(true),
	isStudent: ref(false),
};
