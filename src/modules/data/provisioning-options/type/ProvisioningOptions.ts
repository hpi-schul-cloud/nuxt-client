export enum ProvisioningOptionsEnum {
	CLASS = "class",
	COURSE = "course",
	OTHERS = "others",
}

export type ProvisioningOptions = Record<ProvisioningOptionsEnum, boolean>;
