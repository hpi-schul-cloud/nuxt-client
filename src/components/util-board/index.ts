import { useBoardNotifier } from "./BoardNotifier.composable";
import { useSharedLastCreatedElement } from "./LastCreatedElement.composable";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
	BOARD_CARD_IS_LAST_ELEMENT,
	BOARD_HAS_MULTIPLE_COLUMNS,
	BOARD_IS_FIRST_COLUMN,
	BOARD_IS_LAST_COLUMN,
} from "./board-injection-tokens";

export {
	useBoardNotifier,
	useSharedLastCreatedElement,
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
	BOARD_CARD_IS_LAST_ELEMENT,
	BOARD_HAS_MULTIPLE_COLUMNS,
	BOARD_IS_FIRST_COLUMN,
	BOARD_IS_LAST_COLUMN,
};
