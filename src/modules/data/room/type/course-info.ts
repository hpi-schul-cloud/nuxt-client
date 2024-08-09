export interface CourseInfoProps {
	id: string;
	name: string;
	teacherNames?: string[];
	classes?: ClassInfo[];
	syncedWithGroup?: ClassInfo;
	isArchived: boolean;
}

export class CourseInfo implements CourseInfoProps {
	id: string;
	name: string;
	classes?: ClassInfo[];
	teacherNames?: string[];
	syncedWithGroup?: ClassInfo;
	isArchived: boolean;

	constructor(props: CourseInfoProps) {
		this.id = props.id;
		this.name = props.name;
		this.teacherNames = props.teacherNames;
		this.classes = props.classes;
		this.syncedWithGroup = props.syncedWithGroup;
		this.isArchived = props.isArchived;
	}
}

export interface ClassInfo {
	id: string;
}

export interface teacherName {
	name: string;
}
