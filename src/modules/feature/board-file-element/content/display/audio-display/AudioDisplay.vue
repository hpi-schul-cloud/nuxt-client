<template>
	<ContentElementBar class="audio-player bg-grey-darken-3">
		<template #element>
			<AudioPlayer :src="src" @error="handleError" />
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { AudioPlayer } from "@ui-audio-player";
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar, AudioPlayer },
	props: {
		src: { type: String, required: true },
		showMenu: { type: Boolean, required: true },
	},
	emits: ["error"],

	setup(props, { emit }) {
		const handleError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		return { AudioPlayer, handleError };
	},
});
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
