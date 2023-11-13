<template>
	<ContentElementBar class="audioplayer">
		<template #element>
			<audio ref="audio" class="audio" loading="lazy" v-on:error="onError" />
			<v-btn icon @click="playing = !playing">
				<v-icon
					role="img"
					aria-hidden="false"
					style="color: white"
					v-if="!playing"
					>{{ mdiPlay }}</v-icon
				>
				<v-icon role="img" aria-hidden="false" style="color: white" v-else>
					{{ mdiPause }}</v-icon
				>
			</v-btn>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { mdiPause, mdiPlay } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar },
	props: {
		src: { type: String, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const audio = ref();
		const source = computed(() => {
			return props.src;
		});

		const { playing } = useMediaControls(audio, {
			src: source,
		});

		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		return {
			audio,
			playing,
			mdiPlay,
			mdiPause,
			onError,
		};
	},
});
</script>
<style scoped>
.audioplayer {
	background-color: #424242;
	margin-top: 0px;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
}
.audio {
	width: 100%;
}
</style>
