import { ContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";

export type BoardCardType =
	| "task"
	| "content"
	| "legacy-task-reference"
	| "legacy-lesson-reference";

export interface BoardCard {
	id: string;
	height: number;
	elements: ContentElement[];
	cardType: BoardCardType;
	visibility: VisibilitySettings;
	title: string;
}
