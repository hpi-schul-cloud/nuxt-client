export type Breadcrumb = {
	title: string;
	href?: string;
	to?: string;
	disabled?: boolean;
};

export type FabAction = {
	icon: string;
	label: string;
	href?: string;
	to?: string;
	dataTestId?: string;
	class?: string;
	testId?: string;
	ariaLabel?: string;
	customEvent?: string;
};

export type Fab = {
	actions?: FabAction[];
	icon: string;
	title: string;
	href?: string;
	to?: string;
	ariaLabel?: string;
	dataTestId?: string;
};
