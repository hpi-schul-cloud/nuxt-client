export type FabAction = {
	icon: string;
	label: string;
	ariaLabel?: string;
	dataTestId?: string;
	href?: string;
	to?: string;
	clickHandler?: () => void;
};
