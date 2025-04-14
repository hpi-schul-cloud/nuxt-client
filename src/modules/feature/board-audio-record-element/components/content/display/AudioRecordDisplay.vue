<template>
	<AudioRecordPlayer
		v-if="hasAudioMimeType"
		:src="audioRecordProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	>
		<slot />
	</AudioRecordPlayer>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { AudioRecordProperties } from "../../../types/audio-record-properties";
import { AudioRecordAlert } from "../alert/AudioRecordAlert.enum";
import AudioRecordPlayer from "../display/player/AudioRecordPlayer.vue";

import { isAudioMimeType } from "@/utils/fileHelper";

const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
});
const emit = defineEmits(["audio-error", "add:alert"]);
const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.audioRecordProperties.mimeType);
});
const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};
</script>
