import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { storeToRefs } from "pinia";
import { ref, toValue, watchEffect } from "vue";
import { useBoardStore } from "./Board.store";

const boardPermissions = (): BoardPermissionChecks => {
	// TODO: really needed? remove - if not
	const userRoles = authModule?.getUserRoles || [];
	const isTeacher = ref(userRoles.includes("teacher"));
	const isStudent = ref(userRoles.includes("student"));

	const { board } = storeToRefs(useBoardStore());

	const hasMovePermission = ref(false);
	const hasCreateCardPermission = ref(false);
	const hasCreateColumnPermission = ref(false);
	const hasCreateToolPermission = ref(false);
	const hasEditPermission = ref(false);
	const hasDeletePermission = ref(false);

	watchEffect(() => {
		const boardPermissions = (toValue(board)?.permissions ?? []).map((p) =>
			p.toLowerCase()
		);
		const schoolRolePermissions = authModule?.getUserPermissions || [];
		const permissions = [...boardPermissions, ...schoolRolePermissions];

		hasMovePermission.value = permissions.includes("board_edit");
		hasCreateCardPermission.value = permissions.includes("board_edit");
		hasCreateColumnPermission.value = permissions.includes("board_edit");
		hasCreateToolPermission.value = permissions.includes("context_tool_admin");
		hasEditPermission.value = permissions.includes("board_edit");
		hasDeletePermission.value = permissions.includes("board_edit");

		// if course ??? needed?
		// resetState();
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
