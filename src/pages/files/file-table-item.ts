export interface FileTableItem {
	name: string;
	path: string;
	icon: {
		name: string;
		colored?: boolean;
	};
	size: string;
	lastChanged: Date;
}
