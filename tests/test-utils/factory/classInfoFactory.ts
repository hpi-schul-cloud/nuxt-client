import { ClassInfo, ClassRootType } from "@data-group";
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
