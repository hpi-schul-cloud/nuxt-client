import { BoardLayout } from "@/serverApi/v3";

export type MenuItem = {
	icon: string;
	action: () => void;
	name: string;
	dataTestId: string;
};

export type PickerOption = {
	icon: string;
	label: string;
	type: BoardLayout;
	dataTestId: string;
	ariaLabel: string;
};
