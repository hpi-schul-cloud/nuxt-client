import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { useI18n } from "vue-i18n";
import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
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

export const SR_I18N_KEYS_MAP = {
	CARD_CREATED_SUCCESS:
		"components.board.screenReader.notification.cardCreated.success",
	COLUMN_CREATED_SUCCESS:
		"components.board.screenReader.notification.columnCreated.success",
	CARD_DELETED_SUCCESS:
		"components.board.screenReader.notification.cardDeleted.success",
	COLUMN_DELETED_SUCCESS:
		"components.board.screenReader.notification.columnDeleted.success",
	CARD_MOVED_IN_SAME_COLUMN_SUCCESS:
		"components.board.screenReader.notification.cardMovedInSameColumn.success",
	CARD_MOVED_TO_ANOTHER_COLUMN_SUCCESS:
		"components.board.screenReader.notification.cardMovedToAnotherColumn.success",
	COLUMN_MOVED_SUCCESS:
		"components.board.screenReader.notification.columnMoved.success",
	BOARD_TITLE_UPDATED_SUCCESS:
		"components.board.screenReader.notification.boardTitleUpdated.success",
	BOARD_PUBLISHED_SUCCESS:
		"components.board.screenReader.notification.boardVisibilityUpdated.published",
	BOARD_UNPUBLISHED_SUCCESS:
		"components.board.screenReader.notification.boardVisibilityUpdated.draft",
	COLUMN_TITLE_UPDATED_SUCCESS:
		"components.board.screenReader.notification.columnTitleUpdated.success",
	CARD_TITLE_UPDATED_SUCCESS:
		"components.board.screenReader.notification.cardTitleUpdated.success",
	CARD_UPDATED_SUCCESS:
		"components.board.screenReader.notification.cardUpdated.success",
};

export const useBoardAriaNotification = () => {
	const { t } = useI18n();
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

	const notifyCreateCardSuccess = (action: CreateCardSuccessPayload) => {
		const { columnId, isOwnAction } = action;
		if (isOwnAction) return;

		const columnIndex = boardStore.getColumnIndex(columnId);
		if (columnIndex === undefined) return;

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.CARD_CREATED_SUCCESS, {
				columnPosition: columnIndex + 1,
			})
		);
	};

	const notifyCreateColumnSuccess = (action: CreateColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.COLUMN_CREATED_SUCCESS));
	};

	const notifyDeleteCardSuccess = (action: DeleteCardSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.CARD_DELETED_SUCCESS));
	};

	const notifyDeleteColumnSuccess = (action: DeleteColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.COLUMN_DELETED_SUCCESS));
	};

	const notifyMoveCardSuccess = (action: MoveCardSuccessPayload) => {
		const { newIndex, toColumnIndex, fromColumnIndex, isOwnAction } = action;
		if (isOwnAction) return;

		if (fromColumnIndex === toColumnIndex) {
			notifyOnScreenReader(
				t(SR_I18N_KEYS_MAP.CARD_MOVED_IN_SAME_COLUMN_SUCCESS, {
					columnPosition: fromColumnIndex + 1,
					newPosition: newIndex + 1,
				})
			);
		} else {
			notifyOnScreenReader(
				t(SR_I18N_KEYS_MAP.CARD_MOVED_TO_ANOTHER_COLUMN_SUCCESS, {
					fromColumnPosition: fromColumnIndex + 1,
					toColumnPosition: toColumnIndex + 1,
				})
			);
		}
	};

	const notifyMoveColumnSuccess = (action: MoveColumnSuccessPayload) => {
		const { addedIndex, removedIndex } = action.columnMove;
		const { isOwnAction } = action;
		if (isOwnAction) return;

		if (addedIndex == undefined || removedIndex == undefined) return;

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.COLUMN_MOVED_SUCCESS, {
				oldPosition: removedIndex + 1,
				newPosition: addedIndex + 1,
			})
		);
	};

	const notifyUpdateBoardTitleSuccess = (
		action: UpdateBoardTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.BOARD_TITLE_UPDATED_SUCCESS, {
				newTitle,
			})
		);
	};

	const notifyUpdateBoardVisibilitySuccess = (
		action: UpdateBoardVisibilitySuccessPayload
	) => {
		const { isVisible, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			isVisible
				? t(SR_I18N_KEYS_MAP.BOARD_PUBLISHED_SUCCESS)
				: t(SR_I18N_KEYS_MAP.BOARD_UNPUBLISHED_SUCCESS)
		);
	};

	const notifyUpdateColumnTitleSuccess = (
		action: UpdateColumnTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction, columnId } = action;
		if (isOwnAction) return;

		const columnIndex = boardStore.getColumnIndex(columnId);
		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.COLUMN_TITLE_UPDATED_SUCCESS, {
				newTitle,
				columnPosition: columnIndex + 1,
			})
		);
	};

	const notifyUpdateCardTitleSuccess = (
		action: UpdateCardTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction, cardId } = action;
		if (isOwnAction) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.CARD_TITLE_UPDATED_SUCCESS, {
				cardPosition: cardIndex + 1,
				columnPosition: columnIndex + 1,
				newTitle,
			})
		);
	};

	const notifyUpdateElementSuccess = (action: UpdateElementSuccessPayload) => {
		const { elementId, isOwnAction } = action;
		if (isOwnAction) return;

		const cardId = getElementOwner(elementId);
		if (!cardId) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS, {
				cardPosition: cardIndex + 1,
				columnPosition: columnIndex + 1,
			})
		);
	};

	const notifyDeleteElementSuccess = (action: DeleteElementSuccessPayload) => {
		const { elementId, isOwnAction } = action;
		if (isOwnAction) return;

		const cardId = getElementOwner(elementId);
		if (cardId == undefined) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(cardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS, {
				cardPosition: cardIndex + 1,
				columnPosition: columnIndex + 1,
			})
		);
	};

	const notifyMoveElementSuccess = (action: MoveElementSuccessPayload) => {
		const { toCardId, isOwnAction } = action;
		if (isOwnAction) return;

		const { columnIndex, cardIndex } = boardStore.getCardLocation(toCardId) as {
			columnIndex: number;
			cardIndex: number;
		};

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS, {
				cardPosition: cardIndex + 1,
				columnPosition: columnIndex + 1,
			})
		);
	};

	return {
		notifyCreateCardSuccess,
		notifyCreateColumnSuccess,
		notifyDeleteCardSuccess,
		notifyDeleteColumnSuccess,
		notifyMoveCardSuccess,
		notifyMoveColumnSuccess,
		notifyUpdateBoardTitleSuccess,
		notifyUpdateBoardVisibilitySuccess,
		notifyUpdateColumnTitleSuccess,
		notifyUpdateCardTitleSuccess,
		notifyUpdateElementSuccess,
		notifyDeleteElementSuccess,
		notifyMoveElementSuccess,
	};
};
