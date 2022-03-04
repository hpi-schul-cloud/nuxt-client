export type Lesson = {
	id: string;
	name: string;
	courseName?: string;
	createdAt: string;
	updatedAt: string;
	hidden: boolean;
};

export type Task = {
	id: string;
	name: string;
	description?: string;
	availableDate?: string;
	duedate?: string;
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

export type RoomData = {
	roomId: string;
	title: string;
	displayColor: string;
	elements: [
		{
			type: string;
			content: Task | Lesson | {};
		}
	];
};

export enum RoomCardTypes {
	Task = "task",
	Lesson = "lesson",
	LockedTask = "lockedtask",
}
