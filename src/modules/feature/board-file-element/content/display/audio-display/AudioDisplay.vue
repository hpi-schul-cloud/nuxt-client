<template>
	<ContentElementBar class="audio-player bg-grey-darken-3">
		<template #element>
			<AudioPlayer :src="src" @error="handleError" />
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import { FileAlert } from "../../../shared/types/FileAlert.enum";
import { AudioPlayer } from "@ui-audio-player";
import { ContentElementBar } from "@ui-board";

type Props = {
	src: string;
	showMenu: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
	(e: "error", fileAlert: FileAlert): void;
}>();

const handleError = () => {
	emit("error", FileAlert.AUDIO_FORMAT_ERROR);
};
</script>

<style scoped>
.audio-player {
	border-top-right-radius: 0.25rem;
	border-top-left-radius: 0.25rem;
}
.audio-player:focus {
	outline: none;
}
</style>
