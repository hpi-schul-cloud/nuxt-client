import { Factory } from "fishery";
import { CourseInfoDataResponse } from "@/generated/serverApi/v3";

export const courseInfoDataResponseFactory =
	Factory.define<CourseInfoDataResponse>(({ sequence }) => ({
		id: `course-${sequence}`,
		name: `Course ${sequence}`,
		classNames: [],
		teacherNames: [],
		syncedWithGroup: undefined,
	}));
