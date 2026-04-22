import { ClassInfo, ClassRootType } from "@/modules/data/group/types/class-info";
import { Factory } from "fishery";

export const classInfoFactory = Factory.define<ClassInfo>(
	({ sequence }) =>
		new ClassInfo({
			name: `className${sequence}`,
			externalSourceName: "Source",
			teacherNames: ["TestTeacher"],
			type: ClassRootType.GROUP,
			id: `id-${sequence}`,
			studentCount: 2,
		})
);
