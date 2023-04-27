import { CardElement } from "@/store/types/beta-task/card-element";

export type StudentOverviewTask = {
	id: string;
	title: string;
	elements?: Array<CardElement>;
	course: string;
	dueDate: string;
	completed: boolean;
};
