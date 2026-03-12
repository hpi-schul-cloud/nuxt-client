import { SchoolSystemResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolSystemResponseFactory = Factory.define<SchoolSystemResponse>(({ sequence }) => ({
	id: `system-${sequence}`,
	type: `system-type-${sequence}`,
}));
