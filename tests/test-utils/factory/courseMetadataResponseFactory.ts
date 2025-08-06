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
		isLocked: false,
	}));
