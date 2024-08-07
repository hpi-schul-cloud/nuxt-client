export interface RoomInfoProps {
	id: string;
	title: string;
	shortTitle: string;
	name: string;
	teacherNames: string[];
	isUpgradable?: boolean;
	synchronizedGroup?: string;
}

export class RoomInfo implements RoomInfoProps {
	id: string;
	name: string;
	teacherNames: string[];
	isUpgradable?: boolean;
	synchronizedGroup?: string;

	constructor(props: RoomInfoProps) {
		this.id = props.id;
		this.name = props.name;
		this.teacherNames = props.teacherNames;
		this.isUpgradable = props.isUpgradable;
		this.synchronizedGroup = props.synchronizedGroup;
	}
}
