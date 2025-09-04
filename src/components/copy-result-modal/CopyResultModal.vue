<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<template #title>
			<div ref="textTitle" class="text-h4 my-2 wordbreak-normal">
				{{ $t("components.molecules.copyResult.title.partial") }}
			</div>
		</template>
		<template #content>
			<InfoAlert class="mb-4">
				{{ t("components.molecules.share.checkPrivacyAndCopyright") }}
			</InfoAlert>
			<WarningAlert data-testid="copy-result-notifications">
				{{ t("components.molecules.share.options.tableHeader.InfoText") }}
				<ul class="ml-6">
					<template v-for="(warning, index) in copyResultWarnings">
						<li v-if="warning.isShow" :key="index" data-testid="warning-title">
							{{ warning.text }}
						</li>
					</template>
				</ul>
			</WarningAlert>
			<template v-if="hasErrors && isCourse">
				<div>
					<p>{{ $t("components.molecules.copyResult.information") }}</p>
				</div>
				<copy-result-modal-list :items="items" />
			</template>
		</template>
	</v-custom-dialog>
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import CopyResultModalList from "./CopyResultModalList.vue";

const { t } = useI18n();

type CopyResultItem = {
	elements: Array<{
		type: CopyApiResponseTypeEnum;
	}>;
};

type Props = {
	isOpen?: boolean;
	copyResultItems?: Array<CopyResultItem>;
	copyResultRootItemType?: string;
};

const props = withDefaults(defineProps<Props>(), {
	isOpen: false,
	copyResultItems: () => [] as CopyResultItem[],
	copyResultRootItemType: "",
});

const emit = defineEmits<{
	(e: "copy-dialog-closed"): void;
}>();

const hasElementOfType = (
	items: CopyResultItem[],
	types: CopyApiResponseTypeEnum
) => {
	let found = false;
	items.forEach((item) => {
		if (found) return;
		found = item.elements.find((e) => types.includes(e.type)) !== undefined;
	});
	return found;
};

const onDialogClosed = () => {
	emit("copy-dialog-closed");
};

const items = computed(() => props.copyResultItems);
const copyResultWarnings = computed(() => {
	return [
		{
			isShow: hasGeogebraElement.value,
			text: t("components.molecules.copyResult.geogebraCopy.info"),
		},
		{
			isShow: hasEtherpadElement.value,
			text: t("components.molecules.copyResult.etherpadCopy.info"),
		},
		{
			isShow: hasDrawingElement.value,
			text: t("components.molecules.copyResult.tldrawCopy.info"),
		},
		{
			isShow: hasFileElement.value || isCourse.value,
			text: filesInfoText.value,
		},
		{
			isShow: hasExternalTool.value || hasExternalToolElement.value,
			text: externalToolsInfoText.value,
		},
		{
			isShow: hasCourseGroup.value,
			text: t("components.molecules.copyResult.courseGroupCopy.info"),
		},
	];
});

const hasGeogebraElement = computed(() => {
	return hasElementOfType(
		items.value,
		CopyApiResponseTypeEnum.LessonContentGeogebra
	);
});

const hasEtherpadElement = computed(() => {
	return (
		hasElementOfType(
			items.value,
			CopyApiResponseTypeEnum.CollaborativeTextEditorElement
		) ||
		hasElementOfType(items.value, CopyApiResponseTypeEnum.LessonContentEtherpad)
	);
});

const hasDrawingElement = computed(() => {
	return hasElementOfType(items.value, CopyApiResponseTypeEnum.DrawingElement);
});

const hasFileElement = computed(() => {
	return hasElementOfType(items.value, CopyApiResponseTypeEnum.File);
});

const hasCourseGroup = computed(() => {
	return hasElementOfType(
		items.value,
		CopyApiResponseTypeEnum.CoursegroupGroup
	);
});

const hasErrors = computed(() => {
	return items.value.length > 0;
});

const isCourse = computed(() => {
	return props.copyResultRootItemType === CopyApiResponseTypeEnum.Course;
});

const filesInfoText = computed(() => {
	const courseFilesText = isCourse.value
		? t("components.molecules.copyResult.courseFiles.info")
		: "";
	const fileErrorText = hasFileElement.value
		? t("components.molecules.copyResult.fileCopy.error")
		: "";
	return `${courseFilesText} ${fileErrorText}`.trim();
});

const externalToolsInfoText = computed(() => {
	return envConfigModule.getEnv.FEATURE_CTL_TOOLS_COPY_ENABLED
		? t("components.molecules.copyResult.ctlTools.withFeature.info")
		: t("components.molecules.copyResult.ctlTools.info");
});

const hasExternalTool = computed(() => {
	return hasElementOfType(items.value, CopyApiResponseTypeEnum.ExternalTool);
});

const hasExternalToolElement = computed(() => {
	return hasElementOfType(
		items.value,
		CopyApiResponseTypeEnum.ExternalToolElement
	);
});
</script>

<style scoped lang="scss">
.wordbreak-normal {
	word-break: normal;
}

.aligned-with-icon {
	padding-top: 4px;
}
</style>
