export enum ProvisioningOptionsEnum {
	CLASS = "class",
	COURSE = "course",
	OTHERS = "others",
	CTLTOOL = "ctltool",
}

export type ProvisioningOptions = Record<ProvisioningOptionsEnum, boolean>;
