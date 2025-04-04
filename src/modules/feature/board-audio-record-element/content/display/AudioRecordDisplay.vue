<template>
	<AudioDisplay
		:src="fileProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	>
		<slot />
	</AudioDisplay>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { AudioRecordProperties } from "../../shared/types/audio-record-properties";
import { AudioRecordAlert } from "../../shared/types/AudioRecordAlert.enum";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import { isAudioMimeType } from "@/utils/fileHelper";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
});
const emit = defineEmits(["video-error", "add:alert"]);

const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.fileProperties.mimeType);
});

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};
</script>
