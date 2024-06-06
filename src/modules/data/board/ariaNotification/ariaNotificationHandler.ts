import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { useI18n } from "vue-i18n";
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
			t("components.board.screenReader.notification.cardCreated.success", {
				columnIndex: columnIndex + 1,
			}),
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnCreateColumnSuccess = (action: CreateColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t("components.board.screenReader.notification.columnCreated.success"),
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnDeleteCardSuccess = (action: DeleteCardSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t("components.board.screenReader.notification.cardDeleted.success"),
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnDeleteColumnSuccess = (action: DeleteColumnSuccessPayload) => {
		const { isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t("components.board.screenReader.notification.columnDeleted.success"),
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnMoveCardSuccess = (action: MoveCardSuccessPayload) => {
		const { newIndex, toColumnIndex, fromColumnIndex, isOwnAction } = action;
		if (isOwnAction) return;

		if (fromColumnIndex === toColumnIndex) {
			notifyOnScreenReader(
				t("components.board.screenReader.notification.cardMoved.success", {
					newIndex: newIndex + 1,
				}),
				ARIA_IMPORTANCE.POLITE
			);
		}

		if (fromColumnIndex !== toColumnIndex) {
			notifyOnScreenReader(
				t(
					"components.board.screenReader.notification.cardMovedToAnotherColumn.success",
					{
						fromColumnIndex: fromColumnIndex + 1,
						toColumnIndex: toColumnIndex + 1,
					}
				),
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
			t("components.board.screenReader.notification.columnMoved.success", {
				removedIndex: removedIndex + 1,
				addedIndex: addedIndex + 1,
			}),
			ARIA_IMPORTANCE.POLITE
		);
	};

	const notifyOnUpdateBoardTitleSuccess = (
		action: UpdateBoardTitleSuccessPayload
	) => {
		const { newTitle, isOwnAction } = action;
		if (isOwnAction) return;

		notifyOnScreenReader(
			t(
				"components.board.screenReader.notification.boardTitleUpdated.success",
				{
					newTitle,
				}
			),
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
				? t(
						"components.board.screenReader.notification.boardVisibilityUpdated.published"
					)
				: t(
						"components.board.screenReader.notification.boardVisibilityUpdated.draft"
					),
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
			t(
				"components.board.screenReader.notification.columnTitleUpdated.success",
				{
					newTitle,
					columnIndex: columnIndex + 1,
				}
			),
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
			t("components.board.screenReader.notification.cardTitleUpdated.success", {
				cardIndex: cardIndex + 1,
				columnIndex: columnIndex + 1,
				newTitle,
			}),
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
			t("components.board.screenReader.notification.elementUpdated.success", {
				cardIndex: cardIndex + 1,
				columnIndex: columnIndex + 1,
			}),
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
			t("components.board.screenReader.notification.elementUpdated.success", {
				cardIndex: cardIndex + 1,
				columnIndex: columnIndex + 1,
			}),
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
			t("components.board.screenReader.notification.elementUpdated.success", {
				cardIndex: cardIndex + 1,
				columnIndex: columnIndex + 1,
			}),
			ARIA_IMPORTANCE.POLITE
		);
	};

	return { actionToAriaMessage };
};
