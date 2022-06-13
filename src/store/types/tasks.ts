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
	description?: string;
	availableDate?: string;
	duedate?: string;
	courseId: string;
	courseName: string;
	displayColor?: string;
	status: TaskStatus;
	createdAt: string;
	updatedAt: string;
};

export type OpenTasksForStudent = {
	overdue: Task[];
	noDueDate: Task[];
	withDueDate: Task[];
};

export type CompletedTasksForStudent = {
	submitted: Task[];
	graded: Task[];
};

export type OpenTasksForTeacher = {
	overdue: Task[];
	noDueDate: Task[];
	withDueDate: Task[];
};

export type TasksCountPerCourseStudent = {
	open: Record<string, number>;
	completed: Record<string, number>;
};

export type TasksCountPerCourseTeacher = {
	open: Record<string, number>;
	drafts: Record<string, number>;
};

export type TaskCourseFilter = {
	value: string;
	text: string;
	isSubstitution: boolean;
};
