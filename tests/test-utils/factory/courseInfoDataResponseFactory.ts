import { CourseInfoDataResponse } from "@api-server";
import { Factory } from "fishery";

export const courseInfoDataResponseFactory = Factory.define<CourseInfoDataResponse>(({ sequence }) => ({
	id: `course-${sequence}`,
	name: `Course ${sequence}`,
	classNames: [],
	teacherNames: [],
	syncedWithGroup: undefined,
}));
