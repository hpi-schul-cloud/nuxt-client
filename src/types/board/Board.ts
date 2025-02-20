import type {
	BoardResponse as Board,
	BoardColumnBoardResponse as BoardColumnBoard,
	BoardElementResponse as BoardElement,
	BoardLessonResponse as BoardLesson,
	BoardTaskResponse as BoardTask,
	ColumnResponse as BoardColumn,
	CardSkeletonResponse as BoardSkeletonCard,
} from "@/serverApi/v3";
import { BoardElementResponseTypeEnum as BoardElementType } from "@/serverApi/v3";

export {
	Board,
	BoardColumnBoard,
	BoardElement,
	BoardElementType,
	BoardLesson,
	BoardTask,
	BoardColumn,
	BoardSkeletonCard,
};
