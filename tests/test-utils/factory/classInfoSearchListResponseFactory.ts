import { ClassInfoSearchListResponse } from "@api-server";
import { Factory } from "fishery";
import { classInfoResponseFactory } from "./classInfoResponseFactory";

export const classInfoSearchListResponseFactory =
	Factory.define<ClassInfoSearchListResponse>(() => ({
		data: [classInfoResponseFactory.build()],
		limit: 10,
		skip: 0,
		total: 25,
	}));
