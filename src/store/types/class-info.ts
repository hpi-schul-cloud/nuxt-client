export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teachers: string[];
	type: ClassRootType;
	id: string;
};

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
