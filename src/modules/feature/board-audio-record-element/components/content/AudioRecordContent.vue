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
			<AudioRecordPlayerDisplay
				:src="audioRecordProperties.url"
				:is-edit-mode="true"
				:show-menu="true"
			>
				<slot />
			</AudioRecordPlayerDisplay>
		</div>
		<div
			class="d-flex flex-column"
			:class="{ 'file-information': hasRowStyle }"
		>
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
			<AudioRecordInputs
				:audio-record-properties="audioRecordProperties"
				:is-edit-mode="isEditMode"
				@update:alternative-text="onUpdateText"
				@update:caption="onUpdateCaption"
			/>
			<AudioRecordAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import AudioRecordInputs from "./inputs/AudioRecordInputs.vue";
import AudioRecordDescription from "./AudioRecordDescription.vue";
import AudioRecordAlerts from "./AudioRecordAlert.vue";
import AudioRecordPlayerDisplay from "./AudioRecordPlayerDisplay.vue";

import { useDebounceFn } from "@vueuse/core";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDisplay } from "vuetify";
import { isAudioMimeType } from "@/utils/fileHelper";
import { AudioRecordProperties } from "../../types/audio-record-properties";
import { AudioRecordAlert } from "../../types/AudioRecordAlert.enum";

const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	alerts: { type: Array as PropType<AudioRecordAlert[]>, required: true },
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

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};

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
