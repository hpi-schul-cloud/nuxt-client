<template>
	<AudioRecordPlayer
		:element-id="elementId"
		:show-menu="showMenu"
		@error="onAddAlert"
	/>
</template>

<script setup lang="ts">
import { AudioRecordAlert } from "../alert/AudioRecordAlert.enum";
import AudioRecordPlayer from "../display/player/AudioRecordPlayer.vue";

const props = defineProps({
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
	elementId: { type: String, required: true },
});
const emit = defineEmits(["audio-error", "add:alert"]);

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};
</script>
