import Board from "./board/Board.vue";
import { useInlineEditInteractionHandler } from "./shared/InlineEditInteractionHandler.composable";
/**
 * Todo: Refactor to accept any permission and be less specific to the board. then move to another module and export form there
 */
// import { useBoardPermissions } from "./shared/BoardPermissions.composable";

export {
	useInlineEditInteractionHandler, // WIP: refactor so export is not needed anymore
	Board,
};
