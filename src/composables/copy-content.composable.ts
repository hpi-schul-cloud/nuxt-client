import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { computed, type MaybeRef, unref } from "vue";
import { useI18n } from "vue-i18n";

export interface CopyWarning {
	testId: string;
	text: string;
}

export interface CopyContentTemplate {
	text: string;
	info: string;
	warnings: CopyWarning[];
}

export const useCopyContent = (copyItemType: MaybeRef<ContentItemTypeEnum>) => {
	const { t } = useI18n();

	const copyContent = computed<CopyContentTemplate>(() => {
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
			[ContentItemTypeEnum.Unknown]: {
				text: "",
				info: "",
				warnings: [],
			},
		};

		return templates[unref(copyItemType) || ContentItemTypeEnum.Unknown];
	});

	// Return individual reactive properties for better ergonomics
	const text = computed(() => copyContent.value.text);
	const info = computed(() => copyContent.value.info);
	const warnings = computed(() => copyContent.value.warnings);

	return {
		text,
		info,
		warnings,
	};
};
