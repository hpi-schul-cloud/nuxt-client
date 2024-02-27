export type DataTableHeader = {
	key: string;
	value?: string | boolean | (string | number)[];
	title: string;
	sortable?: boolean;
	align?: "start" | "end" | "center";
	width?: number | string;
	class?: string;
	cellClass?: string;
};
