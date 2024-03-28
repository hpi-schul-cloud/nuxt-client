import { Factory } from "fishery";
import { ProvisioningOptions } from "@data-provisioning-options";

export const provisioningOptionsDataFactory =
	Factory.define<ProvisioningOptions>(() => ({
		class: true,
		course: false,
		others: false,
	}));
