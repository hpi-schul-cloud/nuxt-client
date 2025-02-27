import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createSharedComposable } from "@vueuse/core";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
import { ref, watch } from "vue";
import { useRoomDetailsStore } from "@data-room";
import { BoardContextType } from "@/types/board/BoardContext";
import { useRoomAuthorization } from "@feature-room";

const boardPermissions = (): BoardPermissionChecks => {
	const permissions = authModule?.getUserPermissions || [];
	const userRoles = authModule?.getUserRoles || [];

	const { contextType, roomId } = useSharedBoardPageInformation();
	const canEditBoard = ref(true);
	const hasMovePermission = ref(permissions.includes("course_create"));
	const hasCreateCardPermission = ref(permissions.includes("course_create"));
	const hasCreateColumnPermission = ref(permissions.includes("course_create"));
	const hasCreateToolPermission = ref(
		permissions.includes("context_tool_admin")
	);
	const hasEditPermission = ref(permissions.includes("course_edit"));
	const hasDeletePermission = ref(permissions.includes("course_remove"));
	const isTeacher = ref(userRoles.includes("teacher"));
	const isStudent = ref(userRoles.includes("student"));

	watch(
		() => contextType.value,
		async () => {
			const { fetchRoom, resetState } = useRoomDetailsStore();
			if (contextType.value === BoardContextType.Room && roomId.value) {
				await fetchRoom(roomId?.value);
				const { currentUserRole, canEditRoomBoard } = useRoomAuthorization();
				console.log("canEditBoard :", canEditRoomBoard.value);
				console.log("currentUserRole :", currentUserRole.value);
				canEditBoard.value = canEditRoomBoard.value;
				hasMovePermission.value = canEditRoomBoard.value;
				hasCreateCardPermission.value = canEditRoomBoard.value;
			} else {
				resetState();
			}
		}
	);

	return {
		hasMovePermission,
		hasCreateCardPermission,
		hasCreateColumnPermission,
		hasCreateToolPermission,
		hasEditPermission,
		hasDeletePermission,
		isTeacher,
		isStudent,
		canEditRoomBoard: canEditBoard,
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
