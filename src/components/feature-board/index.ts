import { useBoardFocusHandler } from "./shared/BoardFocusHandler.composable";
import Board from "./board/Board.vue";
import { BoardCard } from "./types/Card"; // WIP: should probably be replaced by API-type?!?
import BoardMenu from "./shared/BoardMenu.vue";
import BoardMenuAction from "./shared/BoardMenuAction.vue";
import TestBoard from "./TestBoard.vue";
import { useInlineEditInteractionHandler } from "./shared/InlineEditInteractionHandler.composable";
import { useElementTypeSelection } from "./shared/ElementTypeSelection.composable";
import { useSharedElementTypeSelection } from "./shared/SharedElementTypeSelection.composable";
import { useSharedBoardBreadcrumbs } from "./shared/BoardBreadcrumbs.composable";
import { useContentElementState } from "./state/ContentElementState.composable";
import { AnyContentElement } from "./types/ContentElement";
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
	AnyContentElement,
	Board,
	BoardCard, // WIP: refactor so export is not needed anymore
	BoardMenu, // WIP: refactor so export is not needed anymore
	BoardMenuAction, // WIP: refactor so export is not needed anymore
	TestBoard,
};
