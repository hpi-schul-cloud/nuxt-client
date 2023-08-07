import { useBoardFocusHandler } from "./shared/BoardFocusHandler.composable";
import Board from "./board/Board.vue";
import { useInlineEditInteractionHandler } from "./shared/InlineEditInteractionHandler.composable";
import { useElementTypeSelection } from "./shared/ElementTypeSelection.composable";
import { useSharedElementTypeSelection } from "./shared/SharedElementTypeSelection.composable";
import { useSharedBoardBreadcrumbs } from "./shared/BoardBreadcrumbs.composable";
import { useContentElementState } from "./state/ContentElementState.composable";
/**
 * Todo: Refactor to accept any permission and be less specific to the board. then move to another module and export form there
 */
// import { useBoardPermissions } from "./shared/BoardPermissions.composable";

export {
	useContentElementState, // WIP: refactor so export is not needed anymore
	useBoardFocusHandler, // WIP: refactor so export is not needed anymore
	useElementTypeSelection, // WIP: refactor so export is not needed anymore
	useInlineEditInteractionHandler, // WIP: refactor so export is not needed anymore
	useSharedElementTypeSelection, // WIP: refactor so export is not needed anymore
	useSharedBoardBreadcrumbs, // WIP: refactor so export is not needed anymore
	Board,
};
