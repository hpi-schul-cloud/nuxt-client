import { ClassInfoResponse } from "../../../../serverApi/v3";

export interface CourseInfoProps {
	id: string;
	name: string;
	teacherNames: string[];
	classes: ClassInfo[];
	syncedGroup?: ClassInfoResponse;
}

export class CourseInfo implements CourseInfoProps {
	id: string;
	name: string;
	classes: ClassInfo[];
	teacherNames: string[];
	syncedGroup?: ClassInfoResponse;

	constructor(props: CourseInfoProps) {
		this.id = props.id;
		this.name = props.name;
		this.teacherNames = props.teacherNames;
		this.classes = props.classes;
		this.syncedGroup = props.syncedGroup;
	}
}

export interface ClassInfo {
	id: string;
	name: string;
}
