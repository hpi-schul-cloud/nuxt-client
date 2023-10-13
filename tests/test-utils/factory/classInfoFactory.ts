import { Factory } from "fishery";
import { ClassInfo } from "@/store/types/class-info";

export const classInfoFactory = Factory.define<ClassInfo>(() => ({
	name: "className",
	externalSourceName: "Source",
	teachers: ["TestTeacher"],
}));
