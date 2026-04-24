import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenInfoResponseParentType } from "@api-server";

export const mapShareTokenParentTypeToContentItemType = (shareTokenParentType: ShareTokenInfoResponseParentType) => {
	switch (shareTokenParentType) {
		case ShareTokenInfoResponseParentType.COURSES:
			return ContentItemTypeEnum.Course;
		case ShareTokenInfoResponseParentType.LESSONS:
			return ContentItemTypeEnum.Lesson;
		case ShareTokenInfoResponseParentType.TASKS:
			return ContentItemTypeEnum.Task;
		case ShareTokenInfoResponseParentType.COLUMN_BOARD:
			return ContentItemTypeEnum.ColumnBoard;
		case ShareTokenInfoResponseParentType.ROOM:
			return ContentItemTypeEnum.Room;
		default:
			return ContentItemTypeEnum.Unknown;
	}
};

export const getTranslationKeyForContentItem = (contentItemType: ContentItemTypeEnum) => {
	switch (contentItemType) {
		case ContentItemTypeEnum.Course:
			return "common.labels.course";
		case ContentItemTypeEnum.Task:
			return "common.words.task";
		case ContentItemTypeEnum.Lesson:
			return "common.words.topic";
		case ContentItemTypeEnum.ColumnBoard:
			return "components.board";
		case ContentItemTypeEnum.Room:
			return "common.labels.room";
		case ContentItemTypeEnum.Card:
			return "components.boardCard";
		default:
			return undefined;
	}
};
