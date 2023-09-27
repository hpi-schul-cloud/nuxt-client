import { ClassInfoResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const classInfoResponseFactory = Factory.define<ClassInfoResponse>(
	() => ({
		name: "className",
		externalSourceName: "Source",
		teachers: ["TestTeacher"],
	})
);
