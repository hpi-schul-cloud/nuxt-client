import { AnyContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";

export interface BoardCard {
	id: string;
	height: number;
	elements: AnyContentElement[];
	visibility: VisibilitySettings;
	title: string;
}
