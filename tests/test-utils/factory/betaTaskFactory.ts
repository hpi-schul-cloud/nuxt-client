import { TaskCardResponse } from "@/serverApi/v3";
import { taskFactory } from "@@/tests/test-utils/factory";

const defaultBetaTask: TaskCardResponse = {
	id: "642162cc44a17f1ce8939ddb",
	courseId: "123",
	courseName: "Mathe",
	title: "Mathe Task",
	cardElements: [],
	draggable: true,
	task: taskFactory(),
	visibleAtDate: "",
	dueDate: "",
};

export const betaTaskFactory = (
	overwrites: Partial<TaskCardResponse> = {}
): TaskCardResponse => {
	return {
		...defaultBetaTask,
		...overwrites,
	};
};
