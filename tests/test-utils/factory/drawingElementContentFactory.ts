import { DrawingElementContent } from "@/serverApi/v3";
import { Factory } from "fishery";

export const drawingElementContent =
	Factory.define<DrawingElementContent>(() => ({
		drawingName: "Board1234",
		description: "Some description for Board1234"
	}));
