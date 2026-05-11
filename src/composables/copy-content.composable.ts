import { useI18nGlobal } from "@/plugins/i18n";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenBodyParamsParentType, ShareTokenInfoResponseParentType } from "@api-server";
import { computed, Ref } from "vue";

export interface CopyWarning {
	testId: string;
	text: string;
}

export interface CopyContentTemplate {
	text: string;
	info: string;
	warnings: CopyWarning[];
}

const mapShareTokenInfoParentTypeToContentItemType = (
	shareTokenParentType: ShareTokenInfoResponseParentType | undefined
) => {
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
		case ShareTokenInfoResponseParentType.CARD:
			return ContentItemTypeEnum.Card;
		default:
			return undefined;
	}
};

const mapShareTokenBodyParentTypeToContentItemType = (
	shareTokenBodyParentType: ShareTokenBodyParamsParentType | undefined
) => {
	switch (shareTokenBodyParentType) {
		case ShareTokenBodyParamsParentType.COURSES:
			return ContentItemTypeEnum.Course;
		case ShareTokenBodyParamsParentType.LESSONS:
			return ContentItemTypeEnum.Lesson;
		case ShareTokenBodyParamsParentType.TASKS:
			return ContentItemTypeEnum.Task;
		case ShareTokenBodyParamsParentType.COLUMN_BOARD:
			return ContentItemTypeEnum.ColumnBoard;
		case ShareTokenBodyParamsParentType.ROOM:
			return ContentItemTypeEnum.Room;
		case ShareTokenBodyParamsParentType.CARD:
			return ContentItemTypeEnum.Card;
		default:
			return undefined;
	}
};

export const useCopyContent = (copyItemType: Ref<ContentItemTypeEnum | undefined>) => {
	const { t } = useI18nGlobal();

	const templates: Record<ContentItemTypeEnum, CopyContentTemplate> = {
		[ContentItemTypeEnum.Course]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofCourse") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [
				{
					testId: "copy-info-members-permissions",
					text: t("feature-copy.copyInfo.text.alert.membersPermissions", {
						type: t("feature-copy.copyInfo.type.course"),
					}),
				},
				{
					testId: "copy-info-etherpad",
					text: t("feature-copy.copyInfo.text.alert.Etherpad"),
				},
				{
					testId: "copy-info-whiteboard",
					text: t("feature-copy.copyInfo.text.alert.whiteboard"),
				},
				{
					testId: "copy-info-geogebra",
					text: t("feature-copy.copyInfo.text.alert.geogebra"),
				},
				{
					testId: "copy-info-protected-external-tool",
					text: t("feature-copy.copyInfo.text.alert.protectedSettings"),
				},
			],
		},
		[ContentItemTypeEnum.ColumnBoard]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofBoard") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [
				{
					testId: "copy-info-etherpad",
					text: t("feature-copy.copyInfo.text.alert.Etherpad"),
				},
				{
					testId: "copy-info-whiteboard",
					text: t("feature-copy.copyInfo.text.alert.whiteboard"),
				},
				{
					testId: "copy-info-protected-external-tool",
					text: t("feature-copy.copyInfo.text.alert.protectedSettings"),
				},
			],
		},
		[ContentItemTypeEnum.Lesson]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofLesson") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [
				{
					testId: "copy-info-etherpad",
					text: t("feature-copy.copyInfo.text.alert.Etherpad"),
				},
				{
					testId: "copy-info-geogebra",
					text: t("feature-copy.copyInfo.text.alert.geogebra"),
				},
			],
		},
		[ContentItemTypeEnum.Task]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofTask") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [],
		},
		[ContentItemTypeEnum.Room]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofRoom") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [
				{
					testId: "copy-info-members-permissions",
					text: t("feature-copy.copyInfo.text.alert.membersPermissions", {
						type: t("feature-copy.copyInfo.type.room"),
					}),
				},
				{
					testId: "copy-info-etherpad",
					text: t("feature-copy.copyInfo.text.alert.Etherpad"),
				},
				{
					testId: "copy-info-whiteboard",
					text: t("feature-copy.copyInfo.text.alert.whiteboard"),
				},
				{
					testId: "copy-info-protected-external-tool",
					text: t("feature-copy.copyInfo.text.alert.protectedSettings"),
				},
			],
		},
		[ContentItemTypeEnum.Card]: {
			text: t("feature-copy.copyInfo.text.nextStep", { type: t("feature-copy.copyInfo.type.ofCard") }),
			info: t("feature-copy.copyInfo.checkPrivacyAndCopyright"),
			warnings: [
				{
					testId: "copy-info-etherpad",
					text: t("feature-copy.copyInfo.text.alert.Etherpad"),
				},
				{
					testId: "copy-info-whiteboard",
					text: t("feature-copy.copyInfo.text.alert.whiteboard"),
				},
			],
		},
	};

	const copyContent = computed(() =>
		copyItemType.value
			? templates[copyItemType.value]
			: {
					text: "",
					info: "",
					warnings: [],
				}
	);

	const text = computed(() => copyContent.value.text);
	const info = computed(() => copyContent.value.info);
	const warnings = computed(() => copyContent.value.warnings);

	return {
		text,
		info,
		warnings,
	};
};

export const useImportContent = (shareTokenParentType: Ref<ShareTokenInfoResponseParentType>) => {
	const contentItemType = computed(() => mapShareTokenInfoParentTypeToContentItemType(shareTokenParentType.value));

	return useCopyContent(contentItemType);
};

export const useShareContent = (shareTokenParentType: Ref<ShareTokenBodyParamsParentType>) => {
	const contentItemType = computed(() => mapShareTokenBodyParentTypeToContentItemType(shareTokenParentType.value));

	return useCopyContent(contentItemType);
};

export const useCopyItemName = (copyItemType: Ref<ContentItemTypeEnum | undefined>) => {
	const { t } = useI18nGlobal();

	const messageKeys: Record<ContentItemTypeEnum, string> = {
		[ContentItemTypeEnum.Course]: "common.labels.course",
		[ContentItemTypeEnum.Task]: "common.words.task",
		[ContentItemTypeEnum.Lesson]: "common.words.topic",
		[ContentItemTypeEnum.ColumnBoard]: "components.board",
		[ContentItemTypeEnum.Room]: "common.labels.room",
		[ContentItemTypeEnum.Card]: "components.boardCard",
	};

	const itemNameKey = computed(() => (copyItemType.value ? messageKeys[copyItemType.value] : "unknown"));

	return {
		itemNameKey,
	};
};

export const useImportItemName = (shareTokenParentType: Ref<ShareTokenInfoResponseParentType | undefined>) => {
	const contentItemType = computed(() => mapShareTokenInfoParentTypeToContentItemType(shareTokenParentType.value));

	return useCopyItemName(contentItemType);
};

export const useShareItemName = (shareTokenParentType: Ref<ShareTokenBodyParamsParentType | undefined>) => {
	const contentItemType = computed(() => mapShareTokenBodyParentTypeToContentItemType(shareTokenParentType.value));

	return useCopyItemName(contentItemType);
};
