import { ClassInfoSearchListResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { classInfoResponseFactory } from "./classInfoResponseFactory";

export const classInfoSearchListResponseFactory =
	Factory.define<ClassInfoSearchListResponse>(() => ({
		data: [classInfoResponseFactory.build()],
		limit: 10,
		skip: 0,
		total: 25,
	}));
