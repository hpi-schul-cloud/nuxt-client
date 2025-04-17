<template>
	<AudioRecordPlayer
		:src="audioRecordProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	/>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { AudioRecordProperties } from "../../../types/audio-record-properties";
import { AudioRecordAlert } from "../alert/AudioRecordAlert.enum";
import AudioRecordPlayer from "../display/player/AudioRecordPlayer.vue";
defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
});
const emit = defineEmits(["add:alert"]);

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};
</script>
