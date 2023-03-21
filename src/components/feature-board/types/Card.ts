// import { CardResponseCardTypeEnum as BoardCardType } from "@/serverApi/v3";
import { ContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";

export declare type AnyCard = LegacyLessonCard | LegacyTaskCard; // union of all BoardCard-Interfaces

// export { BoardCardType };

interface BaseCard {
	id: string;
	height: number;
	elements: ContentElement[];
	// cardType: BoardCardType;
	visibility: VisibilitySettings;
	title: string;
}

export interface LegacyLessonCard extends BaseCard {
	// cardType: BoardCardType.LegacyLesson;
	lessonId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyLesson
}

export interface LegacyTaskCard extends BaseCard {
	// cardType: BoardCardType.LegacyTask;
	taskId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyTask
}
