import { CopyResultItemElement } from "@components/copy-result-modal/types/CopyResultItemElement";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";

export interface CopyResultItem {
	elementId: string; // the element id this item refers to -> we need this to create the edit URL
	title: string;
	elements: CopyResultItemElement[]; // the list of actually failed entries for this item
	type: CopyApiResponseTypeEnum;
}

/*
 * Tasks (Enum.TASK):
 *  Enum.FILE_GROUP, Enum.FILE (leaf-type we need)
 *
 * Lesson (Enum.LESSON):
 *  Enum.LESSON_CONTENT_GROUP > Enum.LESSON_CONTENT (leaf-type we need), Enum.EMBEDDED_TASK
 *  Enum.LEARNSTORE_MATERIAL_GROUP > Enum.LEARNSTORE_MATERIAL (leaf-type we need)
 *  Enum.TASK_GROUP > Enum.TASK
 *
 * Kurse (Enum.COURSE):
 *  Enum.COURSE_GROUP -> not-implemented
 *
 * Board
 *  Enum.BOARD -> Merged Kinder von TASK und LESSON
 *
 */
