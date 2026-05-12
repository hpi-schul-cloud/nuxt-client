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

const apiTypeToEntityType: Record<string, ContentItemTypeEnum | undefined> = {
	[ShareTokenInfoResponseParentType.COURSES]: ContentItemTypeEnum.Course,
	[ShareTokenInfoResponseParentType.TASKS]: ContentItemTypeEnum.Task,
	[ShareTokenInfoResponseParentType.LESSONS]: ContentItemTypeEnum.Lesson,
	[ShareTokenInfoResponseParentType.COLUMN_BOARD]: ContentItemTypeEnum.ColumnBoard,
	[ShareTokenInfoResponseParentType.ROOM]: ContentItemTypeEnum.Room,
	[ShareTokenInfoResponseParentType.CARD]: ContentItemTypeEnum.Card,
};

export const useCopyContent = (copyItemType: Ref<ContentItemTypeEnum | undefined>) => {
	const { t } = useI18nGlobal();

	const templates = computed<Record<ContentItemTypeEnum, CopyContentTemplate>>(() => ({
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
	}));

	const copyContent = computed(() =>
		copyItemType.value
			? templates.value[copyItemType.value]
			: {
					text: "",
					info: "",
					warnings: [],
				}
	);

	const messageKeys: Record<ContentItemTypeEnum, string> = {
		[ContentItemTypeEnum.Course]: "common.labels.course",
		[ContentItemTypeEnum.Task]: "common.words.task",
		[ContentItemTypeEnum.Lesson]: "common.words.topic",
		[ContentItemTypeEnum.ColumnBoard]: "components.board",
		[ContentItemTypeEnum.Room]: "common.labels.room",
		[ContentItemTypeEnum.Card]: "components.boardCard",
	};

	const text = computed(() => copyContent.value.text);
	const info = computed(() => copyContent.value.info);
	const warnings = computed(() => copyContent.value.warnings);
	const itemNameKey = computed(() => (copyItemType.value ? messageKeys[copyItemType.value] : "unknown"));

	return {
		text,
		info,
		warnings,
		itemNameKey,
	};
};

export const useImportContent = (shareTokenParentType: Ref<ShareTokenInfoResponseParentType | undefined>) => {
	const contentItemType = computed(() =>
		shareTokenParentType.value ? apiTypeToEntityType[shareTokenParentType.value] : undefined
	);

	return useCopyContent(contentItemType);
};

export const useShareContent = (shareTokenParentType: Ref<ShareTokenBodyParamsParentType | undefined>) => {
	const { t } = useI18nGlobal();

	const contentItemType = computed(() =>
		shareTokenParentType.value ? apiTypeToEntityType[shareTokenParentType.value] : undefined
	);

	return {
		...useCopyContent(contentItemType),
		text: computed(() => t(`components.molecules.share.${shareTokenParentType.value}.options.infoText`)),
	};
};
