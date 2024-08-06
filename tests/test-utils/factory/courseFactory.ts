import { Course } from "@/store/types/course";
import { Factory } from "fishery";

export const courseFactory = Factory.define<Course>(({ sequence }) => ({
	id: `course-${sequence}`,
	name: `Course ${sequence}`,
	color: "#FFFFFF",
	schoolId: "schoolId",
	classIds: [],
	ltiToolIds: [],
	substitutionIds: [],
	teacherIds: [],
}));
