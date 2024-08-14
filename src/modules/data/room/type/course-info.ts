export interface CourseInfoProps {
	id: string;
	name: string;
	teacherNames?: string[];
	classNames?: string[];
	syncedWithGroup?: string;
}

export class CourseInfo implements CourseInfoProps {
	id: string;
	name: string;
	classNames?: string[];
	teacherNames?: string[];
	syncedWithGroup?: string;

	constructor(props: CourseInfoProps) {
		this.id = props.id;
		this.name = props.name;
		this.teacherNames = props.teacherNames;
		this.classNames = props.classNames;
		this.syncedWithGroup = props.syncedWithGroup;
	}
}

export interface ClassInfo {
	id: string;
}

export interface teacherName {
	name: string;
}
