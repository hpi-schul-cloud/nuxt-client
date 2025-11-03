import { useBoardStore } from "../Board.store";
import {
	CreateCardSuccessPayload,
	CreateColumnSuccessPayload,
	DeleteColumnSuccessPayload,
	MoveCardSuccessPayload,
	MoveColumnSuccessPayload,
	UpdateBoardLayoutSuccessPayload,
	UpdateBoardTitleSuccessPayload,
	UpdateBoardVisibilitySuccessPayload,
	UpdateColumnTitleSuccessPayload,
	UpdateReaderCanEditSuccessPayload,
} from "../boardActions/boardActionPayload.types";
import { useCardStore } from "../Card.store";
import {
	CreateElementSuccessPayload,
	DeleteCardSuccessPayload,
	DeleteElementSuccessPayload,
	DuplicateCardSuccessPayload,
	MoveElementSuccessPayload,
	UpdateCardTitleSuccessPayload,
	UpdateElementSuccessPayload,
} from "../cardActions/cardActionPayload.types";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { BoardLayout } from "@/serverApi/v3";
import { useI18n } from "vue-i18n";

const { notifyOnScreenReader } = useAriaLiveNotifier();

export const SR_I18N_KEYS_MAP = {
	CARD_CREATED_SUCCESS: "components.board.screenReader.notification.cardCreated.success",
	COLUMN_CREATED_SUCCESS: "components.board.screenReader.notification.columnCreated.success",
	CARD_DELETED_SUCCESS: "components.board.screenReader.notification.cardDeleted.success",
	CARD_DUPLICATED_SUCCESS: "components.board.screenReader.notification.cardDuplicated.success",
	COLUMN_DELETED_SUCCESS: "components.board.screenReader.notification.columnDeleted.success",
	CARD_MOVED_IN_SAME_COLUMN_SUCCESS: "components.board.screenReader.notification.cardMovedInSameColumn.success",
	CARD_MOVED_TO_ANOTHER_COLUMN_SUCCESS: "components.board.screenReader.notification.cardMovedToAnotherColumn.success",
	COLUMN_MOVED_SUCCESS: "components.board.screenReader.notification.columnMoved.success",
	BOARD_TITLE_UPDATED_SUCCESS: "components.board.screenReader.notification.boardTitleUpdated.success",
	BOARD_PUBLISHED_SUCCESS: "components.board.screenReader.notification.boardVisibilityUpdated.published",
	BOARD_UNPUBLISHED_SUCCESS: "components.board.screenReader.notification.boardVisibilityUpdated.draft",
	COLUMN_TITLE_UPDATED_SUCCESS: "components.board.screenReader.notification.columnTitleUpdated.success",
	CARD_TITLE_UPDATED_SUCCESS: "components.board.screenReader.notification.cardTitleUpdated.success",
	CARD_UPDATED_SUCCESS: "components.board.screenReader.notification.cardUpdated.success",
	BOARD_LAYOUT_UPDATED_SUCCESS: "components.board.screenReader.notification.boardLayoutUpdated.success",
	BOARD_SET_AS_EDITABLE_FOR_ALL_USERS_SUCCESS:
		"components.board.screenReader.notification.boardSetAsEditableForAllUsers.success",
	BOARD_SET_AS_NOT_EDITABLE_FOR_ALL_USERS_SUCCESS:
		"components.board.screenReader.notification.boardSetAsNotEditableForAllUsers.success",
};

export const useBoardAriaNotification = () => {
	const { t } = useI18n();
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { cards } = cardStore;

	const getElementOwner = (elementId: string) => {
		if (!cards) return;

		const card = Object.values(cards).find((c) => c.elements.find((element) => element.id === elementId));
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

	const notifyDuplicateCardSuccess = (action: DuplicateCardSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.CARD_DUPLICATED_SUCCESS));
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

		if (addedIndex === undefined || removedIndex === undefined) return;

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.COLUMN_MOVED_SUCCESS, {
				oldPosition: removedIndex + 1,
				newPosition: addedIndex + 1,
			})
		);
	};

	const notifyUpdateBoardTitleSuccess = (action: UpdateBoardTitleSuccessPayload) => {
		const { newTitle, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.BOARD_TITLE_UPDATED_SUCCESS, {
				newTitle,
			})
		);
	};

	const notifyUpdateBoardVisibilitySuccess = (action: UpdateBoardVisibilitySuccessPayload) => {
		const { isVisible, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			isVisible ? t(SR_I18N_KEYS_MAP.BOARD_PUBLISHED_SUCCESS) : t(SR_I18N_KEYS_MAP.BOARD_UNPUBLISHED_SUCCESS)
		);
	};

	const notifyUpdateColumnTitleSuccess = (action: UpdateColumnTitleSuccessPayload) => {
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

	const notifyUpdateCardTitleSuccess = (action: UpdateCardTitleSuccessPayload) => {
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

	const notifyCreateElementSuccess = (action: CreateElementSuccessPayload) => {
		const { cardId, isOwnAction } = action;
		if (isOwnAction) return;

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
		if (cardId === undefined) return;

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

	const notifyUpdateBoardLayoutSuccess = (action: UpdateBoardLayoutSuccessPayload): void => {
		const { layout, isOwnAction } = action;
		if (isOwnAction) return;

		let layoutName: string;
		switch (layout) {
			case BoardLayout.Columns:
				layoutName = t("pages.room.dialog.boardLayout.multiColumn");
				break;
			case BoardLayout.List:
				layoutName = t("pages.room.dialog.boardLayout.singleColumn");
				break;
			default:
				layoutName = t("common.labels.unknown");
				break;
		}

		notifyOnScreenReader(
			t(SR_I18N_KEYS_MAP.BOARD_LAYOUT_UPDATED_SUCCESS, {
				layout: layoutName,
			})
		);
	};

	const notifySetBoardAsEditableForAllUsersSuccess = (action: UpdateReaderCanEditSuccessPayload) => {
		if (action.isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.BOARD_SET_AS_EDITABLE_FOR_ALL_USERS_SUCCESS));
	};

	const notifySetBoardAsNotEditableForAllUsersSuccess = (action: UpdateReaderCanEditSuccessPayload) => {
		if (action.isOwnAction) return;

		notifyOnScreenReader(t(SR_I18N_KEYS_MAP.BOARD_SET_AS_NOT_EDITABLE_FOR_ALL_USERS_SUCCESS));
	};

	return {
		notifyCreateCardSuccess,
		notifyCreateColumnSuccess,
		notifyCreateElementSuccess,
		notifyDeleteCardSuccess,
		notifyDuplicateCardSuccess,
		notifyDeleteColumnSuccess,
		notifyDeleteElementSuccess,
		notifyMoveCardSuccess,
		notifyMoveColumnSuccess,
		notifyMoveElementSuccess,
		notifySetBoardAsEditableForAllUsersSuccess,
		notifySetBoardAsNotEditableForAllUsersSuccess,
		notifyUpdateBoardLayoutSuccess,
		notifyUpdateBoardTitleSuccess,
		notifyUpdateBoardVisibilitySuccess,
		notifyUpdateCardTitleSuccess,
		notifyUpdateColumnTitleSuccess,
		notifyUpdateElementSuccess,
	};
};
