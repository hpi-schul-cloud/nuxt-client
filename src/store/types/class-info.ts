export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teachers: string[];
	type: ClassRootType;
	id: string;
	isUpgradable?: boolean;
};

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
