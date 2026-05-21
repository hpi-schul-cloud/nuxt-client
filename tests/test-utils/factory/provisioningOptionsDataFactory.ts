import { SchulConneXProvisioningOptionsResponse } from "@api-server";
import { Factory } from "fishery";

export const provisioningOptionsResponseFactory = Factory.define<SchulConneXProvisioningOptionsResponse>(() => ({
	groupProvisioningClassesEnabled: true,
	groupProvisioningCoursesEnabled: false,
	groupProvisioningOtherEnabled: false,
	schoolExternalToolProvisioningEnabled: false,
}));
