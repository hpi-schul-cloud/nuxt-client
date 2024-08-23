import { Factory } from "fishery";
import { CourseInfoResponse } from "@/serverApi/v3";

export const courseInfoResponseFactory = Factory.define<CourseInfoResponse>(
	({ sequence }) => ({
		id: `course-${sequence}`,
		name: `Course ${sequence}`,
		classNames: [],
		teacherNames: [],
		syncedWithGroup: undefined,
	})
);
