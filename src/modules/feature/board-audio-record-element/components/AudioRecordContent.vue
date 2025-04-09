<template>
	<AudioRecordRecorderDisplay :is-edit-mode="true" :show-menu="true">
		<slot />
	</AudioRecordRecorderDisplay>
	<AudioRecordPlayerDisplay
		:src="audioRecordProperties.url"
		:is-edit-mode="true"
		:show-menu="true"
	>
		<slot />
	</AudioRecordPlayerDisplay>

	<AudioRecordDescription
		:name="audioRecordProperties.name"
		:caption="audioRecordProperties.element.content.caption"
		:show-title="true"
		:show-menu="!isMenuShownOnFileDisplay"
		:is-edit-mode="true"
		:src="fileDescriptionSrc"
	>
		<slot />
	</AudioRecordDescription>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import AudioRecordDescription from "./AudioRecordDescription.vue";
import { useDebounceFn } from "@vueuse/core";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDisplay } from "vuetify";
import { isAudioMimeType } from "@/utils/fileHelper";
import AudioRecordPlayerDisplay from "./AudioRecordPlayerDisplay.vue";
import { AudioRecordProperties } from "../types/audio-record-properties";
import AudioRecordRecorderDisplay from "./AudioRecordRecorderDisplay.vue";

const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	//alerts: { type: Array as PropType<FileAlert[]>, required: true },
});

const emit = defineEmits([
	"fetch:file",
	"update:alternativeText",
	"update:caption",
	"add:alert",
]);

const onFetchFile = () => {
	emit("fetch:file");
};
const onUpdateCaption = useDebounceFn((value: string) => {
	emit("update:caption", value);
}, 600);

const onUpdateText = useDebounceFn((value: string) => {
	emit("update:alternativeText", value);
}, 600);

// const onAddAlert = (alert: FileAlert) => {
// 	emit("add:alert", alert);
// };

const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.audioRecordProperties.mimeType);
});

const fileDescriptionSrc = computed(() => {
	return hasAudioMimeType.value ? props.audioRecordProperties.url : undefined;
});

const showTitle = computed(() => {
	return (
		hasAudioMimeType.value ||
		(!props.audioRecordProperties.previewUrl && !hasAudioMimeType.value)
	);
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});

const hasRowStyle = computed(
	() =>
		isSmallOrLargerListBoard.value &&
		hasAudioMimeType.value &&
		props.audioRecordProperties.previewUrl
);

const isMenuShownOnFileDisplay = computed(() => {
	const isFileDisplayRendered =
		!!props.audioRecordProperties.previewUrl || hasAudioMimeType.value;

	const isPdfOnSmallOrLargerListBoard =
		isSmallOrLargerListBoard.value && hasAudioMimeType.value;

	return isFileDisplayRendered && !isPdfOnSmallOrLargerListBoard;
});
</script>

<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
