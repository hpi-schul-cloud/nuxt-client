import { BoardSkeletonCardReponse } from "@/serverApi/v3";

export interface CardMovePayload {
	removedIndex: number | null;
	addedIndex: number | null;
	payload: BoardSkeletonCardReponse;
}

export interface CardDndPayload {
	cardId: string;
	cardPosition: number;
	columnIndex: number;
	targetColumnIndex: number;
	targetColumnPosition: number;
}

export interface ColumnDndPayload {
	addedIndex: number;
	removedIndex: number;
	payload: string;
}

export const keyStrokeList = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	" ",
	"Enter",
];

export const dropPlaceholderOptions = {
	className: "drop-preview",
	animationDuration: "150",
	showOnTop: true,
};

export const upperDropPlaceholderOptions = {
	className: "cards-drop-preview",
	animationDuration: "150",
	showOnTop: true,
};
