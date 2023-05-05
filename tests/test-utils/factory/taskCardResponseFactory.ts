import { Factory } from "fishery";
import { TaskCardResponse } from "@/serverApi/v3";
import { taskResponseFactory } from "@@/tests/test-utils/factory";

export const taskCardResponseFactory = Factory.define<TaskCardResponse>(
	({ sequence }) => ({
		id: `taskCard${sequence}`,
		courseId: "123",
		courseName: "Mathe",
		title: "Mathe Task",
		cardElements: [],
		draggable: true,
		task: taskResponseFactory.build(),
		visibleAtDate: new Date().toISOString(),
		dueDate: new Date().toISOString(),
	})
);
