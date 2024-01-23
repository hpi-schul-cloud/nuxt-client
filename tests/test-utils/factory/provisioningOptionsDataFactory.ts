import { Factory } from "fishery";
import { ProvisioningOptions } from "@/components/data-provisioning-options";

export const provisioningOptionsDataFactory =
	Factory.define<ProvisioningOptions>(() => ({
		class: true,
		course: false,
		others: false,
	}));
