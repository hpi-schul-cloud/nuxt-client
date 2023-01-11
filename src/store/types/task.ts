import { TranslateResult } from "vue-i18n";

export enum ElementComponentEnum {
	Title = "TaskTitleElement",
	RichText = "TaskTextElement",
}

export type Element = {
	id: string;
	type: string;
	model: string;
	props?: {
		component: ElementComponentEnum;
		placeholder: TranslateResult;
		editable: Boolean;
	};
};
