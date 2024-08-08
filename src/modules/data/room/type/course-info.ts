export interface CourseInfoProps {
	id: string;
	name: string;
	teacherNames: string[];
	classes: ClassInfo[];
	syncedWithGroup?: ClassInfo;
}

export class CourseInfo implements CourseInfoProps {
	id: string;
	name: string;
	classes: ClassInfo[];
	teacherNames: string[];
	syncedWithGroup?: ClassInfo;

	constructor(props: CourseInfoProps) {
		this.id = props.id;
		this.name = props.name;
		this.teacherNames = props.teacherNames;
		this.classes = props.classes;
		this.syncedWithGroup = props.syncedWithGroup;
	}
}

export interface ClassInfo {
	id: string;
	name: string;
}

export interface teacherName {
	name: string;
}
