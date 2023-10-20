export type Breadcrumb = {
	title: string;
	href?: string;
	to?: string;
	disabled?: boolean;
};

type FabAction = {
	icon: string;
	label: string;
	href?: string;
	to?: string;
	dataTestid?: string;
	class?: string;
	testId?: string;
	ariaLabel?: string;
};

export type Fab = {
	actions?: FabAction[];
	icon: string;
	title: string;
	href?: string;
};
