export class SchoolExternalToolItem {
	id: string;

	externalToolId: string;

	name: string;

	statusText: string;

	isOutdated: boolean;

	isDeactivated: boolean;

	restrictToContexts: string;

	constructor(props: SchoolExternalToolItem) {
		this.id = props.id;
		this.externalToolId = props.externalToolId;
		this.name = props.name;
		this.statusText = props.statusText;
		this.isOutdated = props.isOutdated;
		this.isDeactivated = props.isDeactivated;
		this.restrictToContexts = props.restrictToContexts;
	}
}
