import { FederalStateResponse } from "@api-server";
import { Factory } from "fishery";

export const federalStateResponseFactory = Factory.define<FederalStateResponse>(({ sequence }) => ({
	id: `federal-state-${sequence}`,
	name: "Niedersachen",
	abbreviation: "NI",
	logoUrl: "https://example.com/logo.png",
	counties: [],
}));
