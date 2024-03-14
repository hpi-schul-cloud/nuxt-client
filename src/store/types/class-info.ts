export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teacherNames: string[];
	type: ClassRootType;
	id: string;
	isUpgradable?: boolean;
	studentCount: number;
	synchronizedCourses?: string[];
};

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
