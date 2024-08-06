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
	ltiToolIds: string[];
	color: string;
	features?: CourseFeatures[];
};

export enum CourseFeatures {
	VIDEOCONFERENCE = "videoconference",
}

export type CourseData = {
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
