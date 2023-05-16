import {
	BoardResponse,
	CardSkeletonResponse,
	ColumnResponse,
} from "@/serverApi/v3";

export type Board = BoardResponse;

export type BoardColumn = ColumnResponse;

export type BoardSkeletonCard = CardSkeletonResponse;

export type BoardPermissionsType = {
	hasBoardMovePermission?: boolean;
	hasBoardCardCreatePermission?: boolean;
	hasBoardColumnCreatePermission?: boolean;
	hasBoardEditPermission?: boolean;
	hasBoardDeletePermission?: boolean;
};
