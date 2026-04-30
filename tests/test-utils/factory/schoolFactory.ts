import { mockSchool } from "../mockObjects";
import { SchoolResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolFactory = Factory.define<SchoolResponse>(() => ({
	...mockSchool,
}));
