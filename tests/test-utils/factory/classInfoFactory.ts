import { Factory } from "fishery";
import { ClassInfo, ClassRootType } from "@/store/types/class-info";

export const classInfoFactory = Factory.define<ClassInfo>(({ sequence }) => ({
	name: `className${sequence}`,
	externalSourceName: "Source",
	teachers: ["TestTeacher"],
	type: ClassRootType.Class,
	id: `id-${sequence}`,
}));
