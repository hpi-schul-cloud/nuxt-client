import { RichText } from "@api-server";

export type TaskStatus = {
	submitted: number;
	maxSubmissions: number;
	graded: number;
	isDraft: boolean;
	isSubstitutionTeacher: boolean;
};

export type Task = {
	id: string;
	name: string;
	description?: RichText;
	availableDate?: string;
	dueDate?: string;
	courseId: string;
	courseName: string;
	displayColor?: string;
	status: TaskStatus;
	createdAt: string;
	updatedAt: string;
};
