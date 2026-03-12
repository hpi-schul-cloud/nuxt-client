import { Factory } from "fishery";
import { CourseInfoDataResponse } from "@api-server";

export const courseInfoDataResponseFactory =
	Factory.define<CourseInfoDataResponse>(({ sequence }) => ({
		id: `course-${sequence}`,
		name: `Course ${sequence}`,
		classNames: [],
		teacherNames: [],
		syncedWithGroup: undefined,
	}));
