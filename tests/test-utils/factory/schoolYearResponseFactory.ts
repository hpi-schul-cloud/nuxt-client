import { SchoolYearResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

type SchoolYearResponseTransientParams = {
	startYear: number;
};

class SchoolYearResponseFactory extends Factory<
	SchoolYearResponse,
	SchoolYearResponseTransientParams
> {
	public withStartYear(startYear: number): this {
		this.rewindSequence();
		return this.transient({ startYear });
	}
}

export const schoolYearResponseFactory = SchoolYearResponseFactory.define(
	({ sequence, transientParams }) => {
		const id = `school-year-${sequence}`;

		const startYearWithoutSequence =
			transientParams?.startYear ?? new Date().getFullYear();
		const startYear = startYearWithoutSequence + sequence - 1;

		const name = `${startYear}/${(startYear + 1).toString().slice(-2)}`;
		const startDate = new Date(`${startYear}-08-01`).toISOString();
		const endDate = new Date(`${startYear + 1}-07-31`).toISOString();
		const courseCreationInNextYear = false;

		return { id, name, startDate, endDate, courseCreationInNextYear };
	}
);
