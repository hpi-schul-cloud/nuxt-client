export class SchoolExternalToolItem {
	id: string;

	externalToolId: string;

	name: string;

	statusText: string;

	isOutdated: boolean;

	isDeactivated: boolean;

	constructor(props: SchoolExternalToolItem) {
		this.id = props.id;
		this.externalToolId = props.externalToolId;
		this.name = props.name;
		this.statusText = props.statusText;
		this.isOutdated = props.isOutdated;
		this.isDeactivated = props.isDeactivated;
	}
}
