import { Course } from "@/types/course-room/CourseRoom";
import { Factory } from "fishery";

export const courseFactory = Factory.define<Course>(({ sequence }) => ({
	id: `course-${sequence}`,
	name: `Course ${sequence}`,
	color: "#FFFFFF",
	schoolId: "schoolId",
	classIds: [],
	substitutionIds: [],
	teacherIds: [],
}));
