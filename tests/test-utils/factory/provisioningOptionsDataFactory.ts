import { Factory } from "fishery";
import { ProvisioningOptions } from "@/modules/data/provisioning-options";

export const provisioningOptionsDataFactory =
	Factory.define<ProvisioningOptions>(() => ({
		class: true,
		course: false,
		others: false,
	}));
