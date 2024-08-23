import { Factory } from "fishery";
import { CourseInfo } from "@data-room";

export const courseInfoFactory = Factory.define<CourseInfo>(({ sequence }) => ({
	id: `course-${sequence}`,
	name: `Course ${sequence}`,
	classNames: [],
	teacherNames: [],
	syncedWithGroup: undefined,
}));
