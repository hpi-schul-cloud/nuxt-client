import { GroupEntryResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const groupEntryResponseFactory = Factory.define<GroupEntryResponse>(
	({ sequence }) => ({
		id: `group-${sequence}`,
		name: `Group ${sequence}`,
	})
);
