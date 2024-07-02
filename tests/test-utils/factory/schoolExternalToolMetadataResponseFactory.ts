import { SchoolExternalToolMetadataResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolExternalToolMetadataResponseFactory: Factory<SchoolExternalToolMetadataResponse> =
	Factory.define<SchoolExternalToolMetadataResponse>(() => ({
		contextExternalToolCountPerContext: {
			course: 5,
			boardElement: 6,
			mediaBoard: 0,
		},
	}));
