import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { storeToRefs } from "pinia";
import { ref, toValue, watchEffect } from "vue";
import { useBoardStore } from "./Board.store";
import { Permission, RoleName } from "@/serverApi/v3";

const boardPermissions = (): BoardPermissionChecks => {
	const userRoles = authModule?.getUserRoles || [];
	const isTeacher = ref(userRoles.includes(RoleName.Teacher));
	const isStudent = ref(userRoles.includes(RoleName.Student));

	const { board } = storeToRefs(useBoardStore());

	const hasMovePermission = ref(false);
	const hasCreateCardPermission = ref(false);
	const hasCreateColumnPermission = ref(false);
	const hasCreateToolPermission = ref(false);
	const hasEditPermission = ref(false);
	const hasDeletePermission = ref(false);

	watchEffect(() => {
		const boardPermissions = toValue(board)?.permissions ?? [];
		const schoolRolePermissions = authModule?.getUserPermissions || [];
		const permissions = [...boardPermissions, ...schoolRolePermissions];

		hasMovePermission.value = permissions.includes(Permission.BoardEdit);
		hasCreateCardPermission.value = permissions.includes(Permission.BoardEdit);
		hasCreateColumnPermission.value = permissions.includes(
			Permission.BoardEdit
		);
		hasCreateToolPermission.value = permissions.includes(
			Permission.ContextToolAdmin
		);
		hasEditPermission.value = permissions.includes(Permission.BoardEdit);
		hasDeletePermission.value = permissions.includes(Permission.BoardEdit);
	});

	return {
		hasMovePermission,
		hasCreateCardPermission,
		hasCreateColumnPermission,
		hasCreateToolPermission,
		hasEditPermission,
		hasDeletePermission,
		isTeacher,
		isStudent,
	};
};

export const useBoardPermissions =
	createTestableSharedComposable(boardPermissions);
