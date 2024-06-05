import { useAriaLive } from "@/composables/ariaLiveNotifier";
import { PermittedStoreActions } from "@/types/board/ActionFactory";
// import { useI18n } from "vue-i18n";
import * as BoardActions from "../boardActions/boardActions";
import * as CardActions from "../cardActions/cardActions";
import { useBoardStore } from "../Board.store";

import { useCardStore } from "../Card.store";

const { notifyOnScreenReader } = useAriaLive();

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
			return c.elements.find((e) => e.id === elementId);
		});
		if (!card) return;

		return card.id;
	};

	const generateAriaMessage = (
		action: PermittedStoreActions<typeof BoardActions & typeof CardActions>
	): string | undefined => {
		switch (action.type) {
			//#region board actions
			case "create-card-success": {
				const { columnId, isOwnAction } = action.payload;
				if (isOwnAction) return;
				const columnIndex = boardStore.getColumnIndex(columnId);
				if (columnIndex === undefined) return;

				return `A card was created by another user in column position ${
					columnIndex + 1
				}`;
			}

			case "create-column-success": {
				const { isOwnAction } = action.payload;
				if (isOwnAction) return;
				return "A column was created by another user";
			}

			case "delete-card-success": {
				const { isOwnAction } = action.payload;
				if (isOwnAction) return;
				return "A card was deleted by another user";
			}

			case "delete-column-success": {
				const { isOwnAction } = action.payload;
				if (isOwnAction) return;
				return "A column was deleted by another user";
			}

			case "move-card-success": {
				const { newIndex, toColumnIndex, fromColumnIndex, isOwnAction } =
					action.payload;
				if (isOwnAction) return;

				if (fromColumnIndex === toColumnIndex) {
					return `A card was moved position number ${
						newIndex + 1
					} in the same column`;
				}

				if (fromColumnIndex !== toColumnIndex) {
					return `A card was moved from column position number ${
						fromColumnIndex + 1
					} to column position number ${toColumnIndex + 1}`;
				}
				break;
			}

			case "move-column-success": {
				const { addedIndex, removedIndex } = action.payload.columnMove;
				const { isOwnAction } = action.payload;
				if (isOwnAction) return;

				if (addedIndex == undefined || removedIndex == undefined) return;
				return `A column was moved from position number ${
					removedIndex + 1
				} to position number ${addedIndex + 1}`;
			}

			case "update-column-title-success": {
				const { newTitle, isOwnAction, columnId } = action.payload;
				if (isOwnAction) return;

				const columnIndex = boardStore.getColumnIndex(columnId);
				return `The column title was changed to ${newTitle} in column position number ${
					columnIndex + 1
				} by another user`;
			}

			case "update-board-title-success": {
				const { newTitle, isOwnAction } = action.payload;
				if (isOwnAction) return;
				return `The board title was changed to ${newTitle} by another user`;
			}

			case "update-board-visibility-success": {
				const { isVisible, isOwnAction } = action.payload;
				if (isOwnAction) return;
				return isVisible
					? `The board is published by another user`
					: `The board is reverted to draft by another user`;
			}

			//#endregion

			//#region card actions
			case "update-card-title-success": {
				const { newTitle, isOwnAction, cardId } = action.payload;
				if (isOwnAction) return;
				const { columnIndex, cardIndex } = boardStore.getCardLocation(
					cardId
				) as {
					columnIndex: number;
					cardIndex: number;
				};
				return `The card title in position ${cardIndex + 1} in column ${
					columnIndex + 1
				} was changed to ${newTitle} by another user`;
			}

			case "update-element-success": {
				const { elementId, isOwnAction } = action.payload;
				if (isOwnAction) return;

				const cardId = getElementOwner(elementId);
				if (!cardId) return;

				const { columnIndex, cardIndex } = boardStore.getCardLocation(
					cardId
				) as {
					columnIndex: number;
					cardIndex: number;
				};

				return `The card in position ${cardIndex + 1} in column ${
					columnIndex + 1
				} was updated by another user`;
			}

			case "delete-element-success": {
				const { elementId, isOwnAction } = action.payload;
				if (isOwnAction) return;

				const cardId = getElementOwner(elementId);
				if (!cardId) return;

				const { columnIndex, cardIndex } = boardStore.getCardLocation(
					cardId
				) as {
					columnIndex: number;
					cardIndex: number;
				};

				return `The card in position ${cardIndex + 1} in column ${
					columnIndex + 1
				} was updated by another user`;
			}

			case "move-element-success": {
				const { toCardId, isOwnAction } = action.payload;
				if (isOwnAction) return;

				const { columnIndex, cardIndex } = boardStore.getCardLocation(
					toCardId
				) as {
					columnIndex: number;
					cardIndex: number;
				};

				return `The card in position ${cardIndex + 1} in column ${
					columnIndex + 1
				} was updated by another user`;
			}

			//#endregion
			default:
				return undefined;
		}
	};

	const actionToAriaMessage = (
		action: PermittedStoreActions<typeof BoardActions & typeof CardActions>
	) => {
		const message = generateAriaMessage(action);
		if (!message) return;

		notifyOnScreenReader(message, ARIA_IMPORTANCE.POLITE);
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
