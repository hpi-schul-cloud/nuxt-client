import { YearsResponse } from "@api-server";
import { Factory } from "fishery";
import { schoolYearResponseFactory } from "./schoolYearResponseFactory";

export const yearsResponseFactory = Factory.define<YearsResponse>(() => {
	const schoolYears = schoolYearResponseFactory.buildList(3);

	const years = {
		schoolYears,
		activeYear: schoolYears[1],
		lastYear: schoolYears[0],
		nextYear: schoolYears[2],
	};

	return years;
});
