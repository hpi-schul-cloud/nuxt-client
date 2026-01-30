import type {
	BoardColumnBoardResponse as BoardColumnBoard,
	BoardElementResponse as BoardElement,
	BoardLessonResponse as BoardLesson,
	BoardTaskResponse as BoardTask,
} from "@/serverApi/v3";
import { BoardElementResponseTypeEnum as BoardElementType } from "@/serverApi/v3";

export { BoardColumnBoard, BoardElement, BoardElementType, BoardLesson, BoardTask };

export type Lesson = {
	id: string;
	name: string;
	courseName?: string;
	createdAt: string;
	updatedAt: string;
	hidden: boolean;
};

export type LessonData = Lesson & {
	numberOfDraftTasks: number;
	numberOfPlannedTasks: number;
	numberOfPublishedTasks: number;
};

export type Task = {
	id: string;
	name: string;
	description?: string;
	availableDate?: string;
	dueDate?: string;
	courseName: string;
	displayColor?: string;
	status?: {
		submitted: number;
		maxSubmissions: number;
		graded: number;
		isDraft: boolean;
		isSubstitutionTeacher: boolean;
		isFinished: boolean;
	};
	createdAt: string;
	updatedAt: string;
};

export type Course = {
	id: string;
	name: string;
	schoolId: string;
	description?: string;
	classIds: string[];
	teacherIds: string[];
	substitutionIds: string[];
	color: string;
	features?: CourseFeatures[];
};

export enum CourseFeatures {
	VIDEOCONFERENCE = "videoconference",
}

export type RoomData = {
	roomId: string;
	title: string;
	displayColor: string;
	elements: [
		{
			type: string;
			content: Task | Lesson | object;
		},
	];
};

export type MenuItem = {
	icon: string;
	action: () => void;
	name: string;
	dataTestId: string;
};
