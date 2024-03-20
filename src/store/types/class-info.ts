export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teacherNames: string[];
	type: ClassRootType;
	id: string;
	isUpgradable?: boolean;
	studentCount: number;
	synchronizedCourses?: CourseInfo[];
};

export type CourseInfo = {
	id: string;
	name: string;
};

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
