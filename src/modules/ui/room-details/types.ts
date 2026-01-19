import { BoardLayout } from "@/serverApi/v3";

export type PickerOption = {
	icon: string;
	label: string;
	type: BoardLayout;
	dataTestId: string;
	ariaLabel: string;
};
