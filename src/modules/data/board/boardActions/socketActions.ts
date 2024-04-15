import * as BoardActions from "./baseActions";
import {
	useBoardFocusHandler,
	useBoardSocketApi,
	useSharedEditMode,
} from "@data-board";
import { useBoardStore } from "../BoardStore";

export const useSocketApi = () => {
	const boardStore = useBoardStore();
	const { dispatch, board } = boardStore;

	const { setEditModeId } = useSharedEditMode();
	const { emitOnSocket } = useBoardSocketApi(dispatch);

	const createCardRequest = (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		emitOnSocket("create-card-request", action.payload);
	};

	const createCardSuccess = (
		action: ReturnType<typeof BoardActions.createCardSuccess>
	) => {
		const { setFocus } = useBoardFocusHandler();

		const { newCard, columnId } = action.payload;
		setFocus(newCard.id);

		const columnIndex = board?.columns.findIndex(
			(column) => column.id === columnId
		);
		if (columnIndex === undefined) return;
		board?.columns[columnIndex].cards.push({
			cardId: newCard.id,
			height: 120,
		});
		setEditModeId(newCard.id);
	};

	const createColumnRequest = (
		action: ReturnType<typeof BoardActions.createColumnRequest>
	) => {
		emitOnSocket("create-column-request", action.payload);
	};

	const createColumnSuccess = (
		action: ReturnType<typeof BoardActions.createColumnSuccess>
	) => {
		emitOnSocket("create-column-request", action.payload);
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		emitOnSocket("delete-card-request", action.payload);
	};

	const deleteCardSuccess = (
		action: ReturnType<typeof BoardActions.deleteCardSuccess>
	) => {
		emitOnSocket("delete-card-success", action.payload);
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		emitOnSocket("delete-column-request", action.payload);
	};

	const deleteColumnSuccess = (
		action: ReturnType<typeof BoardActions.deleteColumnSuccess>
	) => {
		emitOnSocket("delete-column-success", action.payload);
	};

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	) => {
		emitOnSocket("move-card-request", action.payload);
	};

	const moveCardSuccess = async (
		action: ReturnType<typeof BoardActions.moveCardSuccess>
	) => {
		emitOnSocket("move-card-success", action.payload);
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		emitOnSocket("move-column-request", action.payload);
	};

	const moveColumnSuccess = async (
		action: ReturnType<typeof BoardActions.moveColumnSuccess>
	) => {
		emitOnSocket("move-column-success", action.payload);
	};

	const updateColumnTitleRequest = (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		emitOnSocket("update-column-title-request", action.payload);
	};

	const updateColumnTitleSuccess = (
		action: ReturnType<typeof BoardActions.updateColumnTitleSuccess>
	) => {
		emitOnSocket("update-column-title-success", action.payload);
	};

	const updateBoardTitleRequest = (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		emitOnSocket("update-board-title-request", action.payload);
	};

	const updateBoardTitleSuccess = (
		action: ReturnType<typeof BoardActions.updateBoardTitleSuccess>
	) => {
		emitOnSocket("update-board-title-success", action.payload);
	};

	const updateBoardVisibilityRequest = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		emitOnSocket("update-board-visibility-request", action.payload);
	};

	const updateBoardVisibilitySuccess = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilitySuccess>
	) => {
		emitOnSocket("update-board-visibility-success", action.payload);
	};

	return {
		createCardRequest,
		createCardSuccess,
		createColumnRequest,
		createColumnSuccess,
		deleteCardRequest,
		deleteCardSuccess,
		deleteColumnRequest,
		deleteColumnSuccess,
		moveCardRequest,
		moveCardSuccess,
		moveColumnRequest,
		moveColumnSuccess,
		updateColumnTitleRequest,
		updateColumnTitleSuccess,
		updateBoardTitleRequest,
		updateBoardTitleSuccess,
		updateBoardVisibilityRequest,
		updateBoardVisibilitySuccess,
	};
};
