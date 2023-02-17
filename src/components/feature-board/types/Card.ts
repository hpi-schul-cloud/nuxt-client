import { ContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";

export declare type AnyCard = LegacyLessonCard | LegacyTaskCard; // union of all BoardCard-Interfaces

export type BoardCardType =
	| "task"
	| "content"
	| "legacy-task-reference"
	| "legacy-lesson-reference";

interface BaseCard {
	id: string;
	height: number;
	elements: ContentElement[];
	cardType: BoardCardType;
	visibility: VisibilitySettings;
	title: string;
}

export interface LegacyLessonCard extends BaseCard {
	cardType: "legacy-lesson-reference";
	lessonId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyLesson
}

export interface LegacyTaskCard extends BaseCard {
	cardType: "legacy-task-reference";
	taskId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyTask
}
