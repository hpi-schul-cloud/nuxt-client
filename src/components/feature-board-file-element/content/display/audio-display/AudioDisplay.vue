<template>
	<ContentElementBar class="audioplayer">
		<template #element>
			<audio
				ref="audio"
				class="audio"
				loading="lazy"
				v-on:error="onError"
				controlsList="nodownload noplaybackrate"
			/>
			<v-icon
				@click="playing = !playing"
				role="img"
				aria-hidden="false"
				style="color: white"
				v-if="!playing"
				>{{ mdiPlay }}</v-icon
			>
			<v-icon
				@click="playing = !playing"
				role="img"
				aria-hidden="false"
				style="color: white"
				v-else
			>
				{{ mdiPause }}</v-icon
			>
			<span
				style="color: white; font-size: 10px; padding: 10px"
				class="duration text-body-2"
			>
				{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span
			>
			<v-icon
				@click="muted = !muted"
				role="img"
				aria-hidden="false"
				style="color: white"
				v-if="muted"
				>{{ mdiVolumeOff }}</v-icon
			>
			<v-icon
				@click="muted = !muted"
				role="img"
				aria-hidden="false"
				style="color: white; padding: 10px"
				v-else
				>{{ mdiVolumeHigh }}</v-icon
			>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { mdiPause, mdiPlay, mdiVolumeHigh, mdiVolumeOff } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, onMounted, ref } from "vue";
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

		const { playing, currentTime, duration, volume, muted } = useMediaControls(
			audio,
			{
				src: source,
			}
		);

		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		const formatDuration = (seconds: number) => {
			return new Date(1000 * seconds).toISOString().slice(14, 19);
		};

		onMounted(() => {
			volume.value = 0.5;
			currentTime.value = 60;
		});

		return {
			audio,
			playing,
			currentTime,
			duration,
			volume,
			muted,
			mdiPlay,
			mdiPause,
			mdiVolumeOff,
			mdiVolumeHigh,
			onError,
			formatDuration,
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
.duration {
	width: 100%;
}
</style>
