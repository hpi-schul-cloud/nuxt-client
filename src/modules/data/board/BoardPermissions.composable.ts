import { Permission } from "@/serverApi/v3";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useBoardStore } from "./Board.store";
import { useAppStoreRefs } from "@data-app";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";

const boardPermissions = (): BoardPermissionChecks => {
	const boardPermissions = computed(() => board.value?.permissions ?? []);

	const { isTeacher, isStudent, userPermissions } = useAppStoreRefs();
	const { board } = storeToRefs(useBoardStore());

	const arePermissionsLoaded = computed(
		() => boardPermissions.value.length > 0
	);

	const permissions = computed(() => [
		...boardPermissions.value,
		...userPermissions.value,
	]);

	const checkPermission = (permission: Permission) =>
		permissions.value.includes(permission);

	const isBoardEditAllowed = computed(() =>
		checkPermission(Permission.BoardEdit)
	);

	const hasMovePermission = computed(() => isBoardEditAllowed.value);
	const hasCreateCardPermission = computed(() => isBoardEditAllowed.value);
	const hasCreateColumnPermission = computed(() => isBoardEditAllowed.value);
	const hasEditPermission = computed(() => isBoardEditAllowed.value);
	const hasDeletePermission = computed(() => isBoardEditAllowed.value);

	const hasCreateToolPermission = computed(() =>
		checkPermission(Permission.ContextToolAdmin)
	);

	const hasManageVideoConferencePermission = computed(() =>
		checkPermission(Permission.BoardManageVideoconference)
	);

	const hasShareBoardPermission = computed(() =>
		checkPermission(Permission.BoardShareBoard)
	);

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
