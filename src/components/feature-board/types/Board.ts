import { BoardResponse } from "@/serverApi/v3";

export type Board = BoardResponse;

export interface BoardColumn {
	id: string;
	title: string;
	cards: BoardSkeletonCard[];
}

export interface BoardSkeletonCard {
	id: string;
	height: number;
}
