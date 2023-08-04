import { useBoardFocusHandler } from "./shared/BoardFocusHandler.composable";
import BoardMenu from "./shared/BoardMenu.vue";
import BoardMenuAction from "./shared/BoardMenuAction.vue";
import { useDeleteBoardNodeConfirmation } from "./shared/DeleteBoardNodeConfirmation.composable";
import { useInlineEditInteractionHandler } from "./shared/InlineEditInteractionHandler.composable";
import { useElementTypeSelection } from "./shared/ElementTypeSelection.composable";
import { useSharedElementTypeSelection } from "./shared/SharedElementTypeSelection.composable";
import { useContentElementState } from "./state/ContentElementState.composable";
import { AnyContentElement } from "./types/ContentElement";
/**
 * Todo: Refactor to accept any permission and be less specific to the board. then move to another module and export form there
 */
// import { useBoardPermissions } from "./shared/BoardPermissions.composable";

export {
	useContentElementState,
	useBoardFocusHandler,
	useDeleteBoardNodeConfirmation,
	useElementTypeSelection,
	useInlineEditInteractionHandler,
	useSharedElementTypeSelection,
	AnyContentElement,
	BoardMenu,
	BoardMenuAction,
};
