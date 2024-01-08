import { Factory } from "fishery";
import { SchoolExternalToolMetadataResponse } from "@/serverApi/v3";

export const schoolExternalToolMetadataResponseFactory: Factory<SchoolExternalToolMetadataResponse> =
	Factory.define<SchoolExternalToolMetadataResponse>(() => ({
		contextExternalToolCountPerContext: {
			course: 5,
			boardElement: 6,
		},
	}));
