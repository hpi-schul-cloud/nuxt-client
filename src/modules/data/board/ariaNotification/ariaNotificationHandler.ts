import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
// import { useI18n } from "vue-i18n";
import * as BoardActions from "../boardActions/boardActions";
import * as CardActions from "../cardActions/cardActions";
import { useBoardStore } from "../Board.store";

import { useCardStore } from "../Card.store";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import {
	CreateCardSuccessPayload,
	CreateColumnSuccessPayload,
	DeleteColumnSuccessPayload,
	MoveCardSuccessPayload,
	MoveColumnSuccessPayload,
	UpdateBoardTitleSuccessPayload,
	UpdateBoardVisibilitySuccessPayload,
	UpdateColumnTitleSuccessPayload,
} from "../boardActions/boardActionPayload";

import {
	DeleteCardSuccessPayload,
	DeleteElementSuccessPayload,
	MoveElementSuccessPayload,
	UpdateCardTitleSuccessPayload,
	UpdateElementSuccessPayload,
} from "../cardActions/cardActionPayload";

const { notifyOnScreenReader } = useAriaLiveNotifier();

enum ARIA_IMPORTANCE {
	OFF = "off",
	POLITE = "polite",
	ASSERTIVE = "assertive",
}

export const useBoardAriaNotification = () => {
	// const { t } = useI18n();
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { cards } = cardStore;

	const getElementOwner = (elementId: string) => {
		if (!cards) return;

		const card = Object.values(cards).find((c) => {
			return c.elements.find((element) => element.id === elementId);
		});
		if (!card) return;

		return card.id;
	};

	const actionToAriaMessage = (
		action: PermittedStoreActions<typeof BoardActions & typeof CardActions>
	) => {
		handle(
			action,
			// board success actions
			on(BoardActions.createCardSuccess, notifyOnCreateCardSuccess),
			on(BoardActions.createColumnSuccess, notifyOnCreateColumnSuccess),
			on(CardActions.deleteCardSuccess, notifyOnDeleteCardSuccess),
			on(BoardActions.deleteColumnSuccess, notifyOnDeleteColumnSuccess),
			on(BoardActions.moveCardSuccess, notifyOnMoveCardSuccess),
			on(BoardActions.moveColumnSuccess, notifyOnMoveColumnSuccess),
			on(
				BoardActions.updateColumnTitleSuccess,
				notifyOnUpdateColumnTitleSuccess
			),
			on(BoardActions.updateBoardTitleSuccess, notifyOnUpdateBoardTitleSuccess),
			on(
				BoardActions.updateBoardVisibilitySuccess,
				notifyOnUpdateBoardVisibilitySuccess
			),

			// card success actions
			on(CardActions.deleteElementSuccess, notifyOnDeleteElementSuccess),
			on(CardActions.moveElementSuccess, notifyOnMoveElementSuccess),
			on(CardActions.updateElementSuccess, notifyOnUpdateElementSuccess),
			on(CardActions.updateCardTitleSuccess, notifyOnUpdateCardTitleSuccess)
		);
	};

	const notifyOnCreateCardSuccess = (action: CreateCardSuccessPayload) => {
		const { columnId, isOwnAction } = action;
		if (isOwnAction) return;

		const columnIndex = boardStore.getColumnIndex(columnId);
		if (columnIndex === undefined) return;

		notifyOnScreenReader(
			`A card was created by another user in column position ${
				columnIndex + 1
			}`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnCreateColumnSuccess = (action: CreateColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			"A column was created by another user",
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnDeleteCardSuccess = (action: DeleteCardSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			"A card was deleted by another user",
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnDeleteColumnSuccess = (action: DeleteColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			"A column was deleted by another user",
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnMoveCardSuccess = (action: MoveCardSuccessPayload) => {
		const { newIndex, toColumnIndex, fromColumnIndex, isOwnAction } = action;
		if (isOwnAction) return;

		if (fromColumnIndex === toColumnIndex) {
			notifyOnScreenReader(
				`A card was moved position number ${newIndex + 1} in the same column`,
				ARIA_IMPORTANCE.POLITE
			);
		}

		if (fromColumnIndex !== toColumnIndex) {
			notifyOnScreenReader(
				`A card was moved from column position number ${
					fromColumnIndex + 1
				} to column position number ${toColumnIndex + 1}`,
				ARIA_IMPORTANCE.POLITE
			);
		}
	};

	const notifyOnMoveColumnSuccess = (action: MoveColumnSuccessPayload) => {
		const { addedIndex, removedIndex } = action.columnMove;
		const { isOwnAction } = action;
		if (isOwnAction) return;

		if (addedIndex == undefined || removedIndex == undefined) return;

		notifyOnScreenReader(
			`A column was moved from position number ${
				removedIndex + 1
			} to position number ${addedIndex + 1}`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateBoardTitleSuccess = (
		action: UpdateBoardTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			`The board title was changed to ${newTitle} by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateBoardVisibilitySuccess = (
		action: UpdateBoardVisibilitySuccessPayload
	) => {
		const { isVisible, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			isVisible
				? "The board is published by another user"
				: "The board is reverted to draft by another user",
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateColumnTitleSuccess = (
		action: UpdateColumnTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction, columnId } = action;
		if (isOwnAction) return;

		const columnIndex = boardStore.getColumnIndex(columnId);
		notifyOnScreenReader(
			`The column title was changed to ${newTitle} in column position number ${
				columnIndex + 1
			} by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateCardTitleSuccess = (
		action: UpdateCardTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction, cardId } = action;
		if (isOwnAction) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			`The card title in position number ${
				cardIndex + 1
			} in column position number ${
				columnIndex + 1
			} was changed to ${newTitle} by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateElementSuccess = (
		action: UpdateElementSuccessPayload
	) => {
		const { elementId, isOwnAction } = action;
		if (isOwnAction) return;

		const cardId = getElementOwner(elementId);
		if (!cardId) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			`The card in position number ${cardIndex + 1} in column position number ${
				columnIndex + 1
			} was updated by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnDeleteElementSuccess = (
		action: DeleteElementSuccessPayload
	) => {
		const { elementId, isOwnAction } = action;
		if (isOwnAction) return;

		const cardId = getElementOwner(elementId);
		if (!cardId) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			`The card in position number ${cardIndex + 1} in column position number ${
				columnIndex + 1
			} was updated by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnMoveElementSuccess = (action: MoveElementSuccessPayload) => {
		const { toCardId, isOwnAction } = action;
		if (isOwnAction) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(toCardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			`The card in position number ${cardIndex + 1} in column position number ${
				columnIndex + 1
			} was updated by another user`,
			ARIA_IMPORTANCE.POLITE
		);
	};

	return { actionToAriaMessage };
};

// the card I am already working on was deleted ??? => should be assertive

// delete-element-success && update-element-success => a card was updated by someone

// update-card-title-success => card title was updated to "new title" by another user // or the title was deleted
// same for column title and board title

// draft mode for the board

// move-card-success => a card was moved from column 'index' to another column 'index' column by another user
// if the card inside the same column => "a card was moved to another position in the same column"

// and so on...
