import { TaskResponse } from "@/serverApi/v3";
import { CardElement } from "./card-element";

export interface TaskCard {
	id: string;
	title: string;
	cardElements?: Array<CardElement>;
	courseName: string;
	courseId: string;
	draggable: boolean;
	task: TaskResponse;
	visibleAtDate: string;
	dueDate: string;
	completedBy: Array<string>;
}
