<template>
	<div>
		<div class="bg-grey-lighten-4 pa-4 rounded-t">
			<AudioRecordContentTitle />
		</div>
		<AudioRecordDisplay
			:audio-record-properties="audioRecordProperties"
			:element-id="audioRecordProperties.element.id"
			:is-edit-mode="isEditMode"
			:show-menu="isMenuShownOnFileDisplay"
		/>
	</div>
	<div>
		<AudioRecordDescription
			:caption="audioRecordProperties.element.content.caption"
			:show-title="showTitle"
			:show-menu="isMenuShownOnFileDisplay"
			:is-edit-mode="isEditMode"
			@add:alert="onAddAlert"
		/>
		<AudioRecordInputs
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateText"
			@update:caption="onUpdateCaption"
		/>
		<AudioRecordContentElementFooter
			:audio-record-properties="audioRecordProperties"
		/>
		<AudioRecordAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import AudioRecordContentTitle from "./AudioRecordContentTitle.vue";
import AudioRecordDisplay from "./display/AudioRecordDisplay.vue";
import AudioRecordDescription from "./display/description/AudioRecordDescription.vue";
import AudioRecordInputs from "./inputs/AudioRecordInputs.vue";
import AudioRecordContentElementFooter from "./footer/AudioRecordContentElementFooter.vue";

import { isAudioMimeType } from "@/utils/fileHelper";
import { useDebounceFn } from "@vueuse/core";
import { AudioRecordProperties } from "../../types/audio-record-properties";
import { AudioRecordAlert } from "./alert/AudioRecordAlert.enum";
import AudioRecordAlerts from "./alert/AudioRecordAlert.vue";
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

const showTitle = computed(() => {
	return hasAudioMimeType.value;
});
const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.audioRecordProperties.mimeType);
});
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
const isMenuShownOnFileDisplay = computed(() => {
	const isFileDisplayRendered =
		!!props.audioRecordProperties.previewUrl || hasAudioMimeType.value;

	return isFileDisplayRendered;
});
</script>

<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
