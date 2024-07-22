import { SchoolSystemResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolSystemResponseFactory = Factory.define<SchoolSystemResponse>(
	({ sequence }) => ({
		id: `system-${sequence}`,
		type: `system-type-${sequence}`,
	})
);
