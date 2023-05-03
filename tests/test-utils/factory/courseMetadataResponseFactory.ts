// import { CourseMetadataResponse } from "@/serverApi/v3";

// const defaultCourseMetadata: CourseMetadataResponse = {
// 	id: "123",
// 	title: "Mathe",
// 	shortTitle: "Ma",
// 	displayColor: "#54616e",
// 	startDate: "2019-12-07T23:00:00.000Z",
// 	untilDate: "2020-12-16T23:00:00.000Z",
// 	copyingSince: "2020-12-16T23:00:00.000Z",
// };

// export const courseMetadataFactory = (
// 	overwrites: Partial<CourseMetadataResponse> = {}
// ): CourseMetadataResponse => {
// 	return {
// 		...defaultCourseMetadata,
// 		...overwrites,
// 	};
// };

import { Factory } from "fishery";
import { CourseMetadataResponse } from "@/serverApi/v3";

export const courseMetadataResponseFactory =
	Factory.define<CourseMetadataResponse>(({ sequence }) => ({
		id: `course${sequence}`,
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: new Date().toISOString(),
		untilDate: new Date().toISOString(),
		copyingSince: new Date().toISOString(),
	}));
