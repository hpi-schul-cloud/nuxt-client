<template>
	<AudioRecordPlayer
		:src="audioRecordProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	/>
	<!-- <AudioRecordPlayer
		v-if="hasAudioMimeType"
		:src="audioRecordProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	/>
	<AudioVideoRecordPlayer
		v-else-if="hasVideoMimeType"
		:src="audioRecordProperties.url"
		:name="audioRecordProperties.name"
		:show-menu="showMenu"
		@error="onAddAlert"
	/> -->
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { PropType } from "vue";

import { AudioRecordProperties } from "../../../types/audio-record-properties";
import { AudioRecordAlert } from "../alert/AudioRecordAlert.enum";
import AudioRecordPlayer from "../display/player/AudioRecordPlayer.vue";
// import { isAudioMimeType, isVideoMimeType } from "@/utils/fileHelper";
// import AudioVideoRecordPlayer from "../display/player/AudioVideoPlayer.vue";
const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
});

// const hasVideoMimeType = computed(() => {
// 	return isVideoMimeType(props.audioRecordProperties.mimeType);
// });

// const hasAudioMimeType = computed(() => {
// 	return isAudioMimeType(props.audioRecordProperties.mimeType);
// });

const emit = defineEmits(["add:alert"]);

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};
</script>
