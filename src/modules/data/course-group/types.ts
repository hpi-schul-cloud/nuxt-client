export type CourseGroupMember = {
	id: string;
	firstName: string;
	lastName: string;
	fullName: string;
};

export type CourseGroup = {
	id: string;
	name: string;
	courseId: string;
	members: CourseGroupMember[];
};

export type CourseGroupCourse = {
	id: string;
	name: string;
	color?: string;
	isArchived: boolean;
	students: CourseGroupMember[];
	teachers: CourseGroupMember[];
};

export type CourseGroupPayload = {
	name: string;
	userIds: string[];
};

export type CourseGroupTopic = {
	id: string;
	name: string;
};

export type CourseGroupTask = {
	homeworkId: string;
	name: string;
	description: string;
	date?: string;
	url: string;
};

export type CourseGroupTasks = {
	done: CourseGroupTask[];
	open: CourseGroupTask[];
};

// Raw v1 (Feathers) responses, only the fields used here
export type V1User = {
	_id: string;
	firstName?: string;
	lastName?: string;
};

export type V1CourseGroup = {
	_id: string;
	name: string;
	courseId: string | { _id: string };
	userIds?: (V1User | string)[];
};

export type V1Course = {
	_id: string;
	name: string;
	color?: string;
	isArchived?: boolean;
	untilDate?: string;
	userIds?: (V1User | string)[];
	teacherIds?: (V1User | string)[];
};

export type V1Lesson = {
	_id: string;
	name: string;
};

export type V1Homework = {
	_id: string;
	name: string;
	description?: string;
	dueDate?: string;
	teamSubmissions?: boolean;
	maxTeamMembers?: number | null;
};

export type V1Submission = {
	_id: string;
	updatedAt?: string;
	homeworkId: V1Homework;
};

export type V1Paginated<T> = { data: T[] } | T[];
