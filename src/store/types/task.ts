import { TranslateResult } from "vue-i18n";

export enum ElementComponentEnum {
	Title = "TaskTitleElement",
	RichText = "TaskTextElement",
}

export type Element = {
	component: ElementComponentEnum;
	id: string;
	model: string;
	props?: {
		placeholder: TranslateResult;
		editable: Boolean;
	};
};
