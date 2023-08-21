import { BoardColumn, BoardSkeletonCard } from "./Board";
import { AnyContentElement } from "./ContentElement";

export interface CardMove {
	removedIndex: number | null;
	addedIndex: number | null;
	payload: BoardSkeletonCard;
	columnId?: string;
	columnIndex?: number;
}

export interface ColumnMove {
	addedIndex: number;
	removedIndex: number;
	payload: BoardColumn["id"];
}

export interface ElementMove {
	elementIndex: number;
	payload: AnyContentElement["id"];
}

export type DragAndDropKey =
	| "ArrowUp"
	| "ArrowDown"
	| "ArrowLeft"
	| "ArrowRight"
	| " "
	| "Enter";

export const cardDropPlaceholderOptions = {
	className: "rounded-sm grey lighten-1 my-3 mx-3",
	animationDuration: "150",
	showOnTop: false,
};

export const columnDropPlaceholderOptions = {
	className: "mb-6 rounded-sm grey lighten-1",
	animationDuration: "150",
	showOnTop: true,
};

export const verticalCursorKeys: (DragAndDropKey | string)[] = [
	"ArrowUp",
	"ArrowDown",
];

export const horizontalCursorKeys: (DragAndDropKey | string)[] = [
	"ArrowLeft",
	"ArrowRight",
];
