import { YearsResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { schoolYearResponseFactory } from "./schoolYearResponseFactory";

export const yearsResponseFactory = Factory.define<YearsResponse>(() => {
	const schoolYears = schoolYearResponseFactory.buildList(3);

	const years = {
		schoolYears,
		activeYear: schoolYears[1],
		defaultYear: schoolYears[1],
		lastYear: schoolYears[0],
		nextYear: schoolYears[2],
	};

	return years;
});
