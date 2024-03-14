import { ClassInfoResponse, ClassInfoResponseTypeEnum } from "@/serverApi/v3";
import { Factory } from "fishery";

export const classInfoResponseFactory = Factory.define<ClassInfoResponse>(
	({ sequence }) => ({
		name: `className${sequence}`,
		externalSourceName: "Source",
		teacherNames: ["TestTeacher"],
		type: ClassInfoResponseTypeEnum.Class,
		id: `id-${sequence}`,
		studentCount: 2,
	})
);
