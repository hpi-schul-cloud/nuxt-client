import { TaskResponse } from "@api-server";

export type Lesson = {
	id: string;
	name: string;
	courseName?: string;
	createdAt: string;
	updatedAt: string;
	hidden: boolean;
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
			content: TaskResponse | Lesson | object;
		},
	];
};
