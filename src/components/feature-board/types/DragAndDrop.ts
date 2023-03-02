import { BoardSkeletonCardReponse } from "@/serverApi/v3";
import { BoardSkeletonCard } from "./Board";

export interface CardMove {
	removedIndex: number | null;
	addedIndex: number | null;
	payload: BoardSkeletonCardReponse;
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
