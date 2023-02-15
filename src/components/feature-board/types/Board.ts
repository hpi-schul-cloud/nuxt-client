export interface Board {
	id: string;
	title: string;
	columns: BoardColumn[];
	// timestamps: BoardTimestamps;
}

export interface BoardColumn {
	id: string;
	title: string;
	cards: BoardSkeletonCard[];
}

export interface BoardSkeletonCard {
	id: string;
	height: number;
}
