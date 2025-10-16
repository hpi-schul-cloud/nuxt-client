<template>
	<div
		class="d-flex"
		:class="{
			'flex-row': hasRowStyle,
			'flex-column': !hasRowStyle,
		}"
	>
		<div
			:class="{
				'w-33': hasRowStyle,
			}"
		>
			<FileDisplay
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				:show-menu="isMenuShownOnFileDisplay"
				@add:alert="onAddAlert"
			>
				<slot />
			</FileDisplay>
		</div>
		<div class="d-flex flex-column" :class="{ 'file-information': hasRowStyle }">
			<FileDescription
				:name="fileProperties.name"
				:caption="fileProperties.element.content.caption"
				:show-title="showTitle"
				:show-menu="!isMenuShownOnFileDisplay"
				:is-edit-mode="isEditMode"
				:src="fileDescriptionSrc"
			>
				<slot />
			</FileDescription>
			<FileInputs
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				@update:alternative-text="onUpdateText"
				@update:caption="onUpdateCaption"
				@update:name="onUpdateName"
			/>
			<ContentElementFooter :file-properties="fileProperties" />
			<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
		</div>
	</div>
</template>

<script setup lang="ts">
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import { FileAlert } from "../shared/types/FileAlert.enum";
import FileInputs from "././inputs/FileInputs.vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDescription from "./display/file-description/FileDescription.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import { isAudioMimeType, isPdfMimeType, isVideoMimeType } from "@/utils/fileHelper";
import { injectStrict } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { computed, PropType, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	alerts: { type: Array as PropType<FileAlert[]>, required: true },
});

const emit = defineEmits(["fetch:file", "update:alternativeText", "update:caption", "update:name", "add:alert"]);

const onFetchFile = () => {
	emit("fetch:file");
};

const onUpdateCaption = useDebounceFn((value: string) => {
	emit("update:caption", value);
}, 600);

const onUpdateText = useDebounceFn((value: string) => {
	emit("update:alternativeText", value);
}, 600);

const onUpdateName = useDebounceFn((value: string) => {
	emit("update:name", value);
}, 600);

const onAddAlert = (alert: FileAlert) => {
	emit("add:alert", alert);
};

const hasVideoMimeType = computed(() => isVideoMimeType(props.fileProperties.mimeType));

const hasCollaboraType = computed(() => props.fileProperties.isCollaboraEditable);

const hasPdfMimeType = computed(() => isPdfMimeType(props.fileProperties.mimeType));

const hasAudioMimeType = computed(() => isAudioMimeType(props.fileProperties.mimeType));

const fileDescriptionSrc = computed(() => (hasPdfMimeType.value ? props.fileProperties.url : undefined));

const showTitle = computed(
	() => hasPdfMimeType.value || (!props.fileProperties.previewUrl && !hasVideoMimeType.value && !hasAudioMimeType.value)
);

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => smAndUp.value && isListLayout.value);

const hasRowStyle = computed(() => isSmallOrLargerListBoard.value && hasSmallPreview.value);

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const hasSmallPreview = computed(
	() =>
		(hasPdfMimeType.value && props.fileProperties.previewUrl) || (hasCollaboraType.value && isCollaboraEnabled.value)
);

const isMenuShownOnFileDisplay = computed(() => {
	const isFileDisplayRendered =
		!!props.fileProperties.previewUrl ||
		hasVideoMimeType.value ||
		hasAudioMimeType.value ||
		(hasCollaboraType.value && isCollaboraEnabled.value);

	return isFileDisplayRendered && !hasRowStyle.value;
});
</script>

<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
