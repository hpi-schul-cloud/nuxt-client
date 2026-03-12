import { SchoolExternalToolMetadataResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolExternalToolMetadataResponseFactory: Factory<SchoolExternalToolMetadataResponse> =
	Factory.define<SchoolExternalToolMetadataResponse>(() => ({
		contextExternalToolCountPerContext: {
			course: 5,
			boardElement: 6,
			mediaBoard: 0,
		},
	}));
