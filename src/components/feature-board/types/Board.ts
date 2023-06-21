import {
	BoardResponse,
	CardSkeletonResponse,
	ColumnResponse,
} from "@/serverApi/v3";

export type Board = BoardResponse;

export type BoardColumn = ColumnResponse;

export type BoardSkeletonCard = CardSkeletonResponse;

export type BoardPermissionsTypes = {
	hasMovePermission?: boolean;
	hasCreateCardPermission?: boolean;
	hasCreateColumnPermission?: boolean;
	hasEditPermission?: boolean;
	hasDeletePermission?: boolean;
	isTeacher?: boolean;
};
