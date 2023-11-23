import { SchoolYearResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolYearResponseFactory = Factory.define<SchoolYearResponse>(
	({ sequence }) => {
		const id = `school-year-${sequence}`;
		const year = new Date().getFullYear();
		const nextYear = (year + 1).toString().substr(-2);
		const name = `${year}/${nextYear}`;
		const startDate = new Date(`${year}-08-01`).toISOString();
		const endDate = new Date(`${year + 1}-07-31`).toISOString();

		return { id, name, startDate, endDate };
	}
);
