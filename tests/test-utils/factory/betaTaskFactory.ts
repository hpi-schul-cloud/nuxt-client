import { TaskCardResponse } from "@/serverApi/v3";
import { TaskCard } from "@/store/types/beta-task/beta-task";
import { taskFactory } from "@@/tests/test-utils/factory";

const defaultBetaTask: TaskCard = {
	id: "642162cc44a17f1ce8939ddb",
	courseId: "123",
	courseName: "Mathe",
	title: "Mathe Task",
	cardElements: [],
	draggable: true,
	task: taskFactory(),
	visibleAtDate: "",
	dueDate: "",
	completedBy: [],
};

export const betaTaskFactory = (
	overwrites: Partial<TaskCard> = {}
): TaskCard => {
	return {
		...defaultBetaTask,
		...overwrites,
	};
};
