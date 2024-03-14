import { ClassInfo, ClassRootType } from "@/store/types/class-info";
import { Factory } from "fishery";

export const classInfoFactory = Factory.define<ClassInfo>(({ sequence }) => ({
	name: `className${sequence}`,
	externalSourceName: "Source",
	teacherNames: ["TestTeacher"],
	type: ClassRootType.Group,
	id: `id-${sequence}`,
	studentCount: 2,
}));
