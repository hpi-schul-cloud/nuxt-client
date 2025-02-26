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

	watch(
		() => contextType.value,
		async () => {
			if (contextType.value === BoardContextType.Room && roomId.value) {
				const { fetchRoom } = useRoomDetailsStore();
				await fetchRoom(roomId?.value);
				const { currentUserRole, canEditRoomBoard } = useRoomAuthorization();
				console.log("canEditBoard :", canEditRoomBoard.value);
				console.log("currentUserRole :", currentUserRole.value);
				canEditBoard.value = canEditRoomBoard.value;
			}
		}
	);

	return {
		hasMovePermission: permissions.includes("course_create"),
		hasCreateCardPermission: permissions.includes("course_create"),
		hasCreateColumnPermission: permissions.includes("course_create"),
		hasCreateToolPermission: permissions.includes("context_tool_admin"),
		hasEditPermission: permissions.includes("course_edit"),
		hasDeletePermission: permissions.includes("course_remove"),
		isTeacher: userRoles.includes("teacher"),
		isStudent: userRoles.includes("student"),
		canEditRoomBoard: canEditBoard,
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
