import { Factory } from "fishery";
import { TaskResponse } from "@/serverApi/v3";

export const taskResponseFactory = Factory.define<TaskResponse>(
	({ sequence }) => ({
		id: `task${sequence}`,
		users: [],
		name: "Mathe Task",
		courseName: "Mathe",
		courseId: "123",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		lessonHidden: false,
		status: {
			submitted: 0,
			maxSubmissions: 0,
			graded: 0,
			isDraft: false,
			isSubstitutionTeacher: false,
			isFinished: false,
		},
	})
);
