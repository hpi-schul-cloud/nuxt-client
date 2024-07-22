import { School } from "@/store/types/schools";
import { Factory } from "fishery";
import { mockSchool } from "../mockObjects";

export const schoolFactory = Factory.define<School>(() => ({
	...mockSchool,
}));
