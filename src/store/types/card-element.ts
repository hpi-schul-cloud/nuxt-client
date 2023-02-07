export enum CardElementComponentEnum {
	Title = "TitleCardElement",
	RichText = "RichTextCardElement",
}

export type CardElement = {
	id: string;
	type: string;
	model: string;
	props?: {
		component: CardElementComponentEnum;
		placeholder: string;
		editable: boolean;
	};
};
