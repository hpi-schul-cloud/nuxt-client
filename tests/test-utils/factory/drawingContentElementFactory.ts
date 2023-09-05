import { DrawingElementContent } from "@/serverApi/v3";
import { Factory } from "fishery";

export const drawingContentElementFactory =
	Factory.define<DrawingElementContent>(() => ({
		drawingName: "Board1234",
		description: "Some description for Board1234",
		timestamps: {
			lastUpdatedAt: "21-02-2022",
		},
	}));
