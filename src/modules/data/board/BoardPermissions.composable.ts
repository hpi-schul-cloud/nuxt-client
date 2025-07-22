import { Permission, RoleName } from "@/serverApi/v3";
import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { storeToRefs } from "pinia";
import { Ref, ref, toValue, watchEffect } from "vue";
import { useBoardStore } from "./Board.store";

const boardPermissions = (): BoardPermissionChecks => {
	const userRoles: string[] = authModule?.getUserRoles || [];
	const isTeacher: Ref<boolean> = ref(userRoles.includes(RoleName.Teacher));
	const isStudent: Ref<boolean> = ref(userRoles.includes(RoleName.Student));

	const { board } = storeToRefs(useBoardStore());
	const arePermissionsLoaded = ref(false);
	const hasMovePermission = ref(false);
	const hasCreateCardPermission = ref(false);
	const hasCreateColumnPermission = ref(false);
	const hasCreateToolPermission = ref(false);
	const hasEditPermission = ref(false);
	const hasDeletePermission = ref(false);
	const hasManageVideoConferencePermission = ref(false);
	const hasShareBoardPermission = ref(false);

	watchEffect(() => {
		const boardPermissions = toValue(board)?.permissions ?? [];
		arePermissionsLoaded.value = boardPermissions.length > 0;
		const schoolRolePermissions = authModule?.getUserPermissions || [];
		// boardPermissions are upper case, schoolRolePermissions are lower case
		const permissions = [...boardPermissions, ...schoolRolePermissions];

		hasMovePermission.value = permissions.includes(Permission.BoardEdit);
		hasCreateCardPermission.value = permissions.includes(Permission.BoardEdit);
		hasCreateColumnPermission.value = permissions.includes(
			Permission.BoardEdit
		);
		// TODO fix lower case permissions
		hasCreateToolPermission.value = permissions.includes(
			Permission.ContextToolAdmin.toLowerCase()
		);
		hasEditPermission.value = permissions.includes(Permission.BoardEdit);
		hasDeletePermission.value = permissions.includes(Permission.BoardEdit);
		hasManageVideoConferencePermission.value = permissions.includes(
			Permission.BoardManageVideoconference
		);
		hasShareBoardPermission.value = permissions.includes(
			Permission.BoardShareBoard
		);
	});

	return {
		arePermissionsLoaded,
		hasMovePermission,
		hasCreateCardPermission,
		hasCreateColumnPermission,
		hasCreateToolPermission,
		hasEditPermission,
		hasDeletePermission,
		hasManageVideoConferencePermission,
		hasShareBoardPermission,
		isTeacher,
		isStudent,
	};
};

export const useBoardPermissions =
	createTestableSharedComposable(boardPermissions);
