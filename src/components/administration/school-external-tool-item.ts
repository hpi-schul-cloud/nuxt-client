export class SchoolExternalToolItem {
	id: string;

	name: string;

	status: string;

	outdated: boolean;

	constructor(props: SchoolExternalToolItem) {
		this.id = props.id;
		this.name = props.name;
		this.status = props.status;
		this.outdated = props.outdated;
	}
}
