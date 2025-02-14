type SelectItemKey =
	| boolean
	| string
	| (string | number)[]
	| ((item: Record<string, unknown>, fallback?: unknown) => unknown);

export type DataTableCompareFunction<T = unknown> = (a: T, b: T) => number;
export type DataTableHeader = {
	key: string;
	value?: SelectItemKey;
	title: string;
	colspan?: number;
	rowspan?: number;
	fixed?: boolean;
	align?: "start" | "end" | "center";
	width?: number | string;
	minWidth?: string;
	maxWidth?: string;
	sortable?: boolean;
	sort?: DataTableCompareFunction;
};
