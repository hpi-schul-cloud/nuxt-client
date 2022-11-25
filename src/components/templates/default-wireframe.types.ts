export type Breadcrumb = {
	text: string;
	href?: string;
	to?: string;
	disabled?: boolean;
};

type FabAction = {
	icon: String;
	label: String;
	href?: String;
	to?: String;
	dataTestid?: String;
	class?: String;
	testId?: String;
	ariaLabel?: String;
};

export type Fab = {
	actions?: FabAction[];
	icon: String;
	title: String;
	href?: String;
};
