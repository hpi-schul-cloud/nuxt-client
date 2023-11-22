export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teachers: string[];
	type: ClassRootType;
	id: string;
	isUpgradable?: boolean;
	studentCount: number;
};

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
