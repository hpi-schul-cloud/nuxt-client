import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { applicationErrorModule, courseRoomDetailsModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { useSharedEditMode } from "@util-board";
import { useI18n } from "vue-i18n";
import { useBoardStore } from "../Board.store";
import { useBoardApi } from "../BoardApi.composable";
import {
	CreateCardRequestPayload,
	DeleteBoardRequestPayload,
	DeleteColumnRequestPayload,
	FetchBoardRequestPayload,
	MoveCardRequestPayload,
	MoveColumnRequestPayload,
	UpdateBoardLayoutRequestPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateColumnTitleRequestPayload,
	UpdateReaderCanEditRequestPayload,
} from "./boardActionPayload.types";
import * as BoardActions from "./boardActions";

export const useBoardRestApi = () => {
	const boardStore = useBoardStore();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const {
		createCardCall,
		createColumnCall,
		deleteColumnCall,
		fetchBoardCall,
		moveCardCall,
		moveColumnCall,
		updateColumnTitleCall,
		updateBoardTitleCall,
		updateBoardVisibilityCall,
		updateBoardLayoutCall,
		updateReaderCanEditCall,
	} = useBoardApi();

	const { t } = useI18n();

	const { setEditModeId } = useSharedEditMode();

	const createCardRequest = async (payload: CreateCardRequestPayload) => {
		if (boardStore.board === undefined) return;

		try {
			const newCard = await createCardCall(payload.columnId);

			boardStore.createCardSuccess({
				newCard,
				columnId: payload.columnId,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardCard"),
			});
		}
	};

	const fetchBoardRequest = async (
		payload: FetchBoardRequestPayload
	): Promise<void> => {
		boardStore.setLoading(true);
		try {
			const board = await fetchBoardCall(payload.boardId);
			boardStore.fetchBoardSuccess(board);
		} catch {
			applicationErrorModule.setError(
				createApplicationError(
					HttpStatusCode.NotFound,
					t("components.board.error.404")
				)
			);
		}
		boardStore.setLoading(false);
	};

	const deleteBoardRequest = async (payload: DeleteBoardRequestPayload) => {
		try {
			await courseRoomDetailsModule.deleteBoard(payload.boardId);
			boardStore.deleteBoardSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "board"),
			});
		}
	};

	const createColumnRequest = async () => {
		if (boardStore.board === undefined) return;

		try {
			const newColumn = await createColumnCall(boardStore.board?.id);
			boardStore.createColumnSuccess({ newColumn, isOwnAction: true });
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const deleteColumnRequest = async (payload: DeleteColumnRequestPayload) => {
		if (boardStore.board === undefined) return;
		const { columnId } = payload;

		try {
			await deleteColumnCall(columnId);
			boardStore.deleteColumnSuccess({ columnId, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const moveCardRequest = async (
		payload: MoveCardRequestPayload
	): Promise<void> => {
		if (boardStore.board === undefined) return;

		try {
			const { cardId, newIndex, oldIndex, fromColumnId } = payload;
			let { toColumnId, toColumnIndex } = payload;

			const isInSameColumn = toColumnId === fromColumnId;

			if (newIndex === oldIndex && isInSameColumn) return;
			if (isInSameColumn && newIndex === -1 && oldIndex === 0) {
				return;
			}
			if (toColumnId === undefined && toColumnIndex === undefined) {
				// need to create a new column
				const newColumn = await createColumnRequest();
				if (newColumn) {
					toColumnId = newColumn.id;
					toColumnIndex = boardStore.getLastColumnIndex();
				}
			}
			if (toColumnId === undefined || toColumnIndex === undefined) return; // shouldn't happen because its either existing or newly created
			await moveCardCall(cardId, toColumnId, newIndex);

			boardStore.moveCardSuccess({
				...payload,
				toColumnId,
				toColumnIndex,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumnRequest = async (payload: MoveColumnRequestPayload) => {
		if (boardStore.board === undefined) return;
		const { columnMove } = payload;

		try {
			const { addedIndex, columnId } = columnMove;
			await moveColumnCall(columnId, boardStore.board.id, addedIndex);

			boardStore.moveColumnSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitleRequest = async (
		payload: UpdateColumnTitleRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { columnId, newTitle } = payload;

		try {
			await updateColumnTitleCall(columnId, newTitle);

			boardStore.updateColumnTitleSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateBoardTitleRequest = async (
		payload: UpdateBoardTitleRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { boardId, newTitle } = payload;

		try {
			await updateBoardTitleCall(boardId, newTitle);

			boardStore.updateBoardTitleSuccess({
				boardId,
				newTitle,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardVisibilityRequest = async (
		payload: UpdateBoardVisibilityRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { boardId, isVisible } = payload;

		try {
			await updateBoardVisibilityCall(boardId, isVisible);
			boardStore.updateBoardVisibilitySuccess({
				boardId,
				isVisible,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateReaderCanEditRequest = async (
		payload: UpdateReaderCanEditRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { boardId, readersCanEdit } = payload;

		try {
			await updateReaderCanEditCall(boardId, readersCanEdit);
			boardStore.updateReaderCanEditSuccess({
				boardId,
				readersCanEdit,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardLayoutRequest = async (
		payload: UpdateBoardLayoutRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { boardId, layout } = payload;

		try {
			await updateBoardLayoutCall(boardId, layout);
			boardStore.updateBoardLayoutSuccess({
				boardId,
				layout,
				isOwnAction: true,
			});
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
			if (boardStore.board === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (boardStore.board === undefined) return;

		await fetchBoardRequest({ boardId: boardStore.board.id });
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	const reloadBoardSuccess = (
		action: ReturnType<typeof BoardActions.reloadBoardSuccess>
	) => {
		return action;
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	const disconnectSocketRequest = (): void => {
		return;
	};

	return {
		fetchBoardRequest,
		createCardRequest,
		createColumnRequest,
		deleteBoardRequest,
		deleteColumnRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
		updateReaderCanEditRequest,
		updateBoardLayoutRequest,
		reloadBoard,
		reloadBoardSuccess,
		disconnectSocketRequest,
	};
};
