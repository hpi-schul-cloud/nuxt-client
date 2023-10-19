<template>
	<ContentElementBar class="my-2">
		<template #element>
			<audio
				controls
				controlsList="nodownload noplaybackrate"
				loading="lazy"
				:src="src"
				v-on:error="onError"
				class="audio mr-2"
			/>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar },
	props: {
		src: { type: String, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};
		return { onError };
	},
});
</script>
<style scoped>
.audio {
	width: 100%;
}
</style>
