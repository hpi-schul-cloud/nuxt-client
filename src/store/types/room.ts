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
			content: Task | {};
		}
	];
};
