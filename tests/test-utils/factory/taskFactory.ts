import { TaskResponse } from "@/serverApi/v3";

const defaultTask: TaskResponse = {
	id: "248",
	users: [],
	name: "Mathe Task",
	courseName: "Mathe",
	courseId: "123",
	createdAt: "",
	updatedAt: "",
	lessonHidden: false,
	status: {
		submitted: 0,
		maxSubmissions: 0,
		graded: 0,
		isDraft: true,
		isSubstitutionTeacher: true,
		isFinished: false,
	},
};

export const taskFactory = (
	overwrites: Partial<TaskResponse> = {}
): TaskResponse => {
	return {
		...defaultTask,
		...overwrites,
	};
};
