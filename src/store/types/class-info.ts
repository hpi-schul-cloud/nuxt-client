export interface ClassInfoProps {
	id: string;
	type: ClassRootType;
	name: string;
	externalSourceName?: string;
	teacherNames: string[];
	isUpgradable?: boolean;
	studentCount: number;
	synchronizedCourses?: CourseInfo[];
}

export class ClassInfo implements ClassInfoProps {
	id: string;
	type: ClassRootType;
	name: string;
	externalSourceName?: string;
	teacherNames: string[];
	isUpgradable?: boolean;
	studentCount: number;
	synchronizedCourses?: CourseInfo[];

	constructor(props: ClassInfoProps) {
		this.id = props.id;
		this.type = props.type;
		this.name = props.name;
		this.externalSourceName = props.externalSourceName;
		this.teacherNames = props.teacherNames;
		this.isUpgradable = props.isUpgradable;
		this.studentCount = props.studentCount;
		this.synchronizedCourses = props.synchronizedCourses;
	}

	/**
	 * Groups can only have one synchronized course at the moment
	 */
	get synchronizedCourse(): CourseInfo | undefined {
		return this.synchronizedCourses?.[0];
	}
}

export interface CourseInfo {
	id: string;
	name: string;
}

export enum ClassRootType {
	Class = "class",
	Group = "group",
}
