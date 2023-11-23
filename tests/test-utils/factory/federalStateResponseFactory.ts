import { FederalStateResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const federalStateResponseFactory = Factory.define<FederalStateResponse>(
	({ sequence }) => ({
		id: `federal-state-${sequence}`,
		name: "Niedersachen",
		abbreviation: "NI",
		logoUrl: "https://example.com/logo.png",
	})
);
