import { useContentElementState } from "./state/ContentElementState.composable";
import { useBoardFocusHandler } from "./shared/BoardFocusHandler.composable";
import { useDeleteBoardNodeConfirmation } from "./shared/DeleteBoardNodeConfirmation.composable";
import BoardMenu from "./shared/BoardMenu.vue";
import BoardMenuAction from "./shared/BoardMenuAction.vue";
/**
 * Todo: Refactor to accept any permission and be less specific to the board. then move to another module and export form there
 */
// import { useBoardPermissions } from "./shared/BoardPermissions.composable";

export {
	useContentElementState,
	useBoardFocusHandler,
	useDeleteBoardNodeConfirmation,
	BoardMenu,
	BoardMenuAction,
};
