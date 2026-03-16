import { mockSchool } from "../mockObjects";
import { School } from "@/store/types/schools";
import { Factory } from "fishery";

export const schoolFactory = Factory.define<School>(() => ({
	...mockSchool,
}));
