import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { Board } from "@/types/board/Board";
import { nextTick, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { defineStore } from "pinia";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import * as BoardActions from "./actions/BoardStoreActions";
import { useBoardSocketApi } from "@data-board";
import { ColumnResponse } from "@/serverApi/v3";

export const useBoardStore = defineStore("boardStore", () => {
	const { handleError, notifyWithTemplate } = useErrorHandler();
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const {
		fetchBoardCall,
		createColumnCall,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		updateBoardTitleCall,
		updateColumnTitleCall,
		updateBoardVisibilityCall,
		createCardCall,
	} = useBoardApi();

	const FEATURE_SOCKET_ENABLED = true;
	const { emitOnSocket } = useBoardSocketApi(dispatch);

	type AnyBoardActionPayload = ReturnType<
		(typeof BoardActions)[keyof typeof BoardActions]
	>["payload"];

	const emit = (
		action: PermittedStoreActions<typeof BoardActions> | any,
		payload: AnyBoardActionPayload
	) => {
		if (FEATURE_SOCKET_ENABLED) return emitOnSocket(action.type, payload);
	};

	async function dispatch(action: PermittedStoreActions<typeof BoardActions>) {
		handle(
			action,
			on(BoardActions.fetchBoard, fetchBoard),
			on(BoardActions.createCardRequest, createCard),
			on(BoardActions.createCardSuccess, createCardSuccess),
			on(BoardActions.createColumn, createColumn),
			on(BoardActions.createColumnSuccess, createColumnSuccess),
			on(BoardActions.deleteCard, deleteCard),
			on(BoardActions.deleteCardSuccess, deleteCardSuccess),
			on(BoardActions.deleteColumn, deleteColumn),
			on(BoardActions.deleteColumnSuccess, deleteColumnSuccess),
			on(BoardActions.moveCard, moveCard),
			on(BoardActions.moveColumn, moveColumn),
			on(BoardActions.moveColumnSuccess, moveColumnSuccess),
			on(BoardActions.updateColumnTitle, updateColumnTitle),
			on(BoardActions.updateBoardTitle, updateBoardTitle),
			on(BoardActions.updateBoardVisibility, updateBoardVisibility),
			on(BoardActions.reloadBoard, reloadBoard)
		);
	}

	const { setEditModeId } = useSharedEditMode();

	const getColumnIndex = (columnId: string | undefined): number => {
		if (columnId === undefined) return -1;
		if (board.value === undefined) return -1;

		const columnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		return columnIndex;
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board.value === undefined) return;
		if (columnIndex === undefined) return;
		if (columnIndex < 0) return;
		if (columnIndex > board.value.columns.length - 1) return;
		if (board.value.columns[columnIndex] === undefined) return;

		return board.value.columns[columnIndex].id;
	};

	const createCard = async (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		if (board.value === undefined) return;

		try {
			const newCard = await createCardCall(action.payload.columnId);

			const payload = {
				newCard,
				columnId: action.payload.columnId,
				true: true,
			};

			dispatch(BoardActions.createCardSuccess(payload));

			emit(action, payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardCard"),
			});
		}
	};

	const createCardSuccess = (
		action: ReturnType<typeof BoardActions.createCardSuccess>
	) => {
		const { setFocus } = useBoardFocusHandler();

		const { newCard, columnId } = action.payload;
		setFocus(newCard.id);

		const columnIndex = board.value?.columns.findIndex(
			(column) => column.id === columnId
		);
		if (columnIndex === undefined) return;
		board.value?.columns[columnIndex].cards.push({
			cardId: newCard.id,
			height: 120,
		});
		setEditModeId(newCard.id);
	};

	const createColumn = async () => {
		if (board.value === undefined) return;

		try {
			const newColumn: ColumnResponse = await createColumnCall(board.value.id);

			const payload = {
				type: "create-column",
				payload: newColumn,
			};

			dispatch(BoardActions.createColumnSuccess({ newColumn }));
			emit(payload, newColumn);
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const createColumnSuccess = (
		action: ReturnType<typeof BoardActions.createColumnSuccess>
	) => {
		const { newColumn } = action.payload;
		useBoardFocusHandler().setFocus(newColumn.id);
		setEditModeId(newColumn.id);
		board.value?.columns.push(newColumn);
	};

	const deleteCard = async (
		action: ReturnType<typeof BoardActions.deleteCard>
	) => {
		if (board.value === undefined) return;
		const { cardId } = action.payload;

		try {
			await deleteCardCall(cardId);
			dispatch(BoardActions.deleteCardSuccess({ cardId }));
			emit(action, { cardId });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteCardSuccess = (
		action: ReturnType<typeof BoardActions.deleteCardSuccess>
	) => {
		const { cardId } = action.payload;
		const columnIndex = board.value?.columns.findIndex((column) =>
			column.cards.find((c) => c.cardId === cardId)
		);
		if (columnIndex === undefined) return;
		const cardIndex = board.value?.columns[columnIndex].cards.findIndex(
			(c) => c.cardId === cardId
		);
		if (!cardIndex) return;

		board.value?.columns[columnIndex].cards.splice(cardIndex, 1);
	};

	const deleteColumn = async (
		action: ReturnType<typeof BoardActions.deleteColumn>
	) => {
		if (board.value === undefined) return;
		const { columnId } = action.payload;

		try {
			await deleteColumnCall(columnId);

			dispatch(BoardActions.deleteColumnSuccess({ columnId }));
			emit(action, { columnId });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const deleteColumnSuccess = (
		action: ReturnType<typeof BoardActions.deleteColumnSuccess>
	) => {
		const { columnId } = action.payload;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex < 0) {
			return;
		}
		board.value?.columns.splice(columnIndex, 1);
	};

	const fetchBoard = async (
		action: ReturnType<typeof BoardActions.fetchBoard>
	): Promise<void> => {
		isLoading.value = true;

		try {
			board.value = await fetchBoardCall(action.payload.id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "board"),
			});
		}

		isLoading.value = false;
	};

	const moveCard = async (
		action: ReturnType<typeof BoardActions.moveCard>
	): Promise<void> => {
		if (board.value === undefined) return;

		try {
			const {
				cardId,
				newIndex,
				oldIndex,
				toColumnId,
				fromColumnId,
				columnDelta,
				forceNextTick,
			} = action.payload;

			const fromColumnIndex = getColumnIndex(fromColumnId);
			let newColumnId: string | undefined = toColumnId;
			let newColumnIndex = getColumnIndex(toColumnId);

			if (columnDelta !== undefined) {
				newColumnIndex = fromColumnIndex + columnDelta;
				newColumnId = getColumnId(newColumnIndex);
			}
			if (newColumnId === undefined) {
				// need to create a new column
				const newColumn = await createColumn();
				if (newColumn) {
					newColumnId = newColumn?.id;
					newColumnIndex = getColumnIndex(newColumnId);
				}
			}

			if (cardId === undefined || newColumnId === undefined) return; // ensure values are set

			if (fromColumnIndex === newColumnIndex) {
				if (newIndex === oldIndex && fromColumnIndex === newColumnIndex) return; // same position
				if (newIndex < 0) return; // first card - can't move up
				if (newIndex > board.value.columns[fromColumnIndex].cards.length - 1)
					return; // last card - can't move down
			}

			const item = board.value.columns[fromColumnIndex].cards.splice(
				oldIndex,
				1
			)[0];
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			if (forceNextTick === true) {
				await nextTick();
			}
			board.value.columns[newColumnIndex].cards.splice(newIndex, 0, item);

			await moveCardCall(cardId, newColumnId, newIndex);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumn = async (
		action: ReturnType<typeof BoardActions.moveColumn>
	) => {
		if (board.value === undefined) return;
		const { columnMove } = action.payload;

		try {
			const { addedIndex, columnId } = columnMove;

			await moveColumnCall(columnId, board.value.id, addedIndex);
			dispatch(BoardActions.moveColumnSuccess(action.payload));
			emit(action, action.payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumnSuccess = async (
		action: ReturnType<typeof BoardActions.moveColumnSuccess>
	) => {
		const { columnMove, byKeyboard } = action.payload;
		const { addedIndex, removedIndex } = columnMove;

		if (board.value === undefined) return;

		if (addedIndex < 0 || addedIndex > board.value?.columns.length - 1) return;
		if (removedIndex === null || removedIndex === undefined) return;

		const item = board.value?.columns.splice(removedIndex, 1)[0];
		/**
		 * refreshes the board to force rerendering in tracked v-for
		 * to maintain focus when moving columns by keyboard
		 */
		if (byKeyboard === true) {
			await nextTick();
		}
		if (!item) return;
		board.value?.columns.splice(addedIndex, 0, item);
	};

	const updateColumnTitle = async (
		action: ReturnType<typeof BoardActions.updateColumnTitle>
	) => {
		if (board.value === undefined) return;
		const { columnId, newTitle } = action.payload;

		try {
			await updateColumnTitleCall(columnId, newTitle);
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex > -1) {
				board.value.columns[columnIndex].title = newTitle;
			}
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateBoardTitle = async (
		action: ReturnType<typeof BoardActions.updateBoardTitle>
	) => {
		if (board.value === undefined) return;
		const { newTitle } = action.payload;

		try {
			await updateBoardTitleCall(board.value.id, newTitle);
			board.value.title = newTitle;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardVisibility = async (
		action: ReturnType<typeof BoardActions.updateBoardVisibility>
	) => {
		if (board.value === undefined) return;
		const { newVisibility } = action.payload;

		try {
			await updateBoardVisibilityCall(board.value.id, newVisibility);
			board.value.isVisible = newVisibility;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const notifyWithTemplateAndReload = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			if (board.value === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (board.value === undefined) return;

		await fetchBoard({ type: "fetch-board", payload: { id: board.value.id } });
	};

	return {
		board,
		isLoading,
		dispatch,
		createColumn,
	};
});
