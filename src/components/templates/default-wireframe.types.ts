export type Breadcrumb = {
	title: string;
	href?: string;
	to?: string;
	disabled?: boolean;
};

export type FabAction = {
	icon: string;
	label: string;
	ariaLabel?: string;
	dataTestId?: string;
	href?: string;
	to?: string;
	customEvent?: string;
};

export type FabOptions = {
	actions?: FabAction[];
	icon: string;
	title: string;
	href?: string;
	to?: string;
	ariaLabel?: string;
	dataTestId?: string;
};
