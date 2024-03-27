import { createAction, props } from "./ActionFactory";

export const fetchBoardAction = createAction(
	"fetch-board",
	props<{ id: string }>()
);

export const createCard = createAction(
	"create-card",
	props<{ columnId: string }>()
);

export const createColumn = createAction(
	"create-column",
	props<{ boardId: string }>()
);
