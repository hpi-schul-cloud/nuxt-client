import { ProvisioningOptions } from "@data-provisioning-options";
import { Factory } from "fishery";

export const provisioningOptionsDataFactory =
	Factory.define<ProvisioningOptions>(() => ({
		class: true,
		course: false,
		others: false,
		schoolExternalTools: false,
	}));
