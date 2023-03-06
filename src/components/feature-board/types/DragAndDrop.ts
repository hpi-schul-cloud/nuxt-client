import { BoardColumn, BoardSkeletonCard } from "./Board";

export interface CardMove {
	removedIndex: number | null;
	addedIndex: number | null;
	payload: BoardSkeletonCard;
}

export interface CardMoveByKeyboard {
	card: BoardSkeletonCard;
	cardIndex: number;
	columnIndex: number;
	targetColumnIndex: number;
	targetColumnPosition: number;
}

export interface ColumnMove {
	addedIndex: number;
	removedIndex: number;
	payload: BoardColumn["id"];
}

export type DragAndDropKeys =
	| "ArrowUp"
	| "ArrowDown"
	| "ArrowLeft"
	| "ArrowRight"
	| " "
	| "Enter";

export const cardDropPlaceholderOptions = {
	className: "mb-6 rounded-sm grey lighten-1",
	animationDuration: "150",
	showOnTop: true,
};

export const drowpdownDropPlaceholderOptions = {
	className: "mb-6 rounded-sm grey lighten-1",
	animationDuration: "150",
	showOnTop: true,
};
