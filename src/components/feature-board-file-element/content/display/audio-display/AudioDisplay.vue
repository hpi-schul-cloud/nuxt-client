<template>
	<ContentElementBar class="audioplayer mt-0">
		<template #element>
			<audio
				ref="audio"
				class="audio"
				loading="lazy"
				v-on:error="onError"
				controlsList="nodownload noplaybackrate"
			/>
			<button @click="onPlay">
				<v-icon
					class="mr-2"
					role="img"
					aria-hidden="false"
					style="color: white"
					v-if="!playing"
					>{{ mdiPlay }}</v-icon
				>
				<v-icon
					class="mr-2"
					role="img"
					aria-hidden="false"
					style="color: white"
					v-else
				>
					{{ mdiPause }}</v-icon
				>
			</button>
			<span style="color: white" class="duration text-body-2">
				{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span
			>
			<v-slider
				class="slider"
				color="white"
				thumb-color="white"
				track-color="#9e9e9e"
				:value="currentTime"
				:min="0"
				:max="max"
				@click="currentTimeSlider"
				@change="currentTimeSeconds"
				@mousedown="currentTimeSlider"
				@mouseup="currentTimeSlider"
			/>
			<SpeedMenu @rate="speedRate" />
			<v-icon
				v-if="!isShow"
				@click="showVolumeSlider"
				role="img"
				aria-hidden="false"
				style="color: white; position: absolute; right: 16px"
				>{{ mdiVolumeHigh }}</v-icon
			>
			<div class="volume-wrapper mr-n2" v-if="isShow">
				<v-slider
					class="volume-slider"
					color="white"
					thumb-color="white"
					track-color="#9e9e9e"
					v-model="volumeValue"
				/>
				<v-icon
					class="px-2"
					@click="showVolumeSlider"
					role="img"
					aria-hidden="false"
					style="color: white"
					>{{ mdiVolumeHigh }}</v-icon
				>
			</div>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import {
	mdiPause,
	mdiPlay,
	mdiPlaySpeed,
	mdiVolumeHigh,
	mdiVolumeOff,
} from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, Ref, ref } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";
import SpeedMenu from "./SpeedMenu.vue";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar, SpeedMenu },
	props: {
		src: { type: String, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const audio = ref();
		const source = computed(() => {
			return props.src;
		});

		const controls = useMediaControls(audio, {
			src: source,
		});

		const { playing, currentTime, duration, volume, muted, rate } = controls;

		const volumeValue = (volume: number) => {
			controls.volume.value = volume + 5;
		};

		const isShow: Ref<boolean> = ref(false);
		const showVolumeSlider = () => {
			isShow.value = !isShow.value;
		};
		const speedRate = (rate: number) => {
			controls.rate.value = rate;
		};

		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		const formatDuration = (seconds: number) => {
			return new Date(1000 * seconds).toISOString().slice(14, 19);
		};

		const max = computed(() => {
			return duration.value;
		});

		const onPlay = () => {
			playing.value = !playing.value;
		};

		const currentTimeSlider = (event: Event) => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		const currentTimeSeconds = (seconds: number) => {
			console.log(seconds);
			controls.currentTime.value = seconds;
		};

		return {
			audio,
			playing,
			currentTime,
			duration,
			volume,
			muted,
			rate,
			speedRate,
			mdiPlay,
			mdiPause,
			mdiVolumeOff,
			mdiVolumeHigh,
			mdiPlaySpeed,
			onError,
			formatDuration,
			max,
			volumeValue,
			showVolumeSlider,
			isShow,
			onPlay,
			currentTimeSlider,
			currentTimeSeconds,
		};
	},
});
</script>
<style scoped>
button:focus {
	outline: none;
}

.audioplayer {
	background-color: #424242;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
}
.audio {
	width: 100%;
}
.duration {
	white-space: nowrap;
	padding-right: 2px;
}
.slider {
	width: 30%;
	padding-top: 23px;
}
.volume-wrapper {
	display: flex;
	float: right;
	width: 50%;
	height: 36px;
	border-radius: 2px;
	background: var(--shades-color-overlay-dark, rgba(33, 33, 33, 0.54));
}

.volume-slider {
	width: 50%;
	padding-left: 10px;
	padding-top: 3px;
}
</style>
