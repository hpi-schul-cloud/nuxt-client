import { ClassInfoResponse, ClassInfoResponseType } from "@api-server";
import { Factory } from "fishery";

export const classInfoResponseFactory = Factory.define<ClassInfoResponse>(
	({ sequence }) => ({
		id: `id-${sequence}`,
		name: `className${sequence}`,
		externalSourceName: "Source",
		teacherNames: ["TestTeacher"],
		type: ClassInfoResponseType.CLASS,
		studentCount: 2,
	})
);
