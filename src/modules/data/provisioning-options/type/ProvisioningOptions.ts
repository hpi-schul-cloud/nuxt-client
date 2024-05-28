export enum ProvisioningOptionsEnum {
	CLASS = "class",
	COURSE = "course",
	OTHERS = "others",
	SCHOOL_EXTERNAL_TOOLS = "schoolExternalTools",
}

export type ProvisioningOptions = Record<ProvisioningOptionsEnum, boolean>;
