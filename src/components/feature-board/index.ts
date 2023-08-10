import Board from "./board/Board.vue";
import { useAddElementDialog } from "./shared/AddElementDialog.composable";
import { useBoardFocusHandler } from "./shared/BoardFocusHandler.composable";
import { useContentElementState } from "./state/ContentElementState.composable";
import { useInlineEditInteractionHandler } from "./shared/InlineEditInteractionHandler.composable";
import { useSharedBoardBreadcrumbs } from "./shared/BoardBreadcrumbs.composable";
/**
 * Todo: Refactor to accept any permission and be less specific to the board. then move to another module and export form there
 */
// import { useBoardPermissions } from "./shared/BoardPermissions.composable";

export {
	useAddElementDialog, // WIP: refactor so export is not needed anymore
	useBoardFocusHandler, // WIP: refactor so export is not needed anymore
	useContentElementState, // WIP: refactor so export is not needed anymore
	useInlineEditInteractionHandler, // WIP: refactor so export is not needed anymore
	useSharedBoardBreadcrumbs, // WIP: refactor so export is not needed anymore
	Board,
};
