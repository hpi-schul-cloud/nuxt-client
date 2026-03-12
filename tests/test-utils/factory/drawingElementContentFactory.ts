import { DrawingElementContent } from "@/generated/serverApi/v3";
import { Factory } from "fishery";

export const drawingElementContentFactory =
	Factory.define<DrawingElementContent>(() => ({
		description: "Some description for Board1234",
		timestamps: {
			lastUpdatedAt: "21-02-2022",
		},
	}));
