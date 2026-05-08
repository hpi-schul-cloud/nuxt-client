import { getTranslationKeyForContentItem, mapShareTokenParentTypeToContentItemType } from "./content-item.utils";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenInfoResponseParentType } from "@api-server";
import { describe, expect, it } from "vitest";

describe("mapShareTokenParentTypeToContentItemType", () => {
	it.each([
		[ShareTokenInfoResponseParentType.COURSES, ContentItemTypeEnum.Course],
		[ShareTokenInfoResponseParentType.LESSONS, ContentItemTypeEnum.Lesson],
		[ShareTokenInfoResponseParentType.TASKS, ContentItemTypeEnum.Task],
		[ShareTokenInfoResponseParentType.COLUMN_BOARD, ContentItemTypeEnum.ColumnBoard],
		[ShareTokenInfoResponseParentType.ROOM, ContentItemTypeEnum.Room],
		[ShareTokenInfoResponseParentType.CARD, ContentItemTypeEnum.Card],
	])("maps %s to %s", (input, expected) => {
		expect(mapShareTokenParentTypeToContentItemType(input)).toBe(expected);
	});

	it("returns Unknown for an unrecognised parent type", () => {
		expect(mapShareTokenParentTypeToContentItemType("unknown-type" as ShareTokenInfoResponseParentType)).toBe(
			ContentItemTypeEnum.Unknown
		);
	});
});

describe("getTranslationKeyForContentItem", () => {
	it.each([
		[ContentItemTypeEnum.Course, "common.labels.course"],
		[ContentItemTypeEnum.Task, "common.words.task"],
		[ContentItemTypeEnum.Lesson, "common.words.topic"],
		[ContentItemTypeEnum.ColumnBoard, "components.board"],
		[ContentItemTypeEnum.Room, "common.labels.room"],
		[ContentItemTypeEnum.Card, "components.boardCard"],
	])("returns %s for %s", (input, expected) => {
		expect(getTranslationKeyForContentItem(input)).toBe(expected);
	});

	it("returns undefined for an unrecognised content item type", () => {
		expect(getTranslationKeyForContentItem("unknown" as ContentItemTypeEnum)).toBeUndefined();
	});
});
