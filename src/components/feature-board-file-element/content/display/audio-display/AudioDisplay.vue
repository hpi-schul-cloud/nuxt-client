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
			<button @click="onPlay">
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
				@click="currentTimeSlider"
				@change="currentTimeSliderNumber"
				@mousedown="currentTimeSlider"
				@mouseup="currentTimeSlider"
			/>
			<SpeedMenu @rate="speedRate" />
			<v-icon
				v-if="!isShow"
				@click="showVolumeSlider"
				role="img"
				aria-hidden="false"
				style="color: white"
				>{{ mdiVolumeHigh }}</v-icon
			>
			<div class="volume-wrapper" v-if="isShow">
				<v-slider
					color="white"
					thumb-color="white"
					track-color="#9e9e9e"
					v-model="volumeValue"
				/>
				<v-icon
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
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
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

		const currentTimeValue = computed({
			get: () => controls?.currentTime,
			set: (value) => (controls.currentTime = value),
		});

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
			return Math.floor(duration.value);
		});

		const min = computed(() => {
			return 0;
		});

		const onPlay = () => {
			playing.value = !playing.value;
		};

		const currentTimeSlider = (event: Event) => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		const currentTimeSliderNumber = (num: number) => {
			controls.currentTime.value = num;
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
			min,
			volumeValue,
			showVolumeSlider,
			isShow,
			currentTimeValue,
			onPlay,
			currentTimeSlider,
			currentTimeSliderNumber,
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
	margin-top: 0px;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
}
.audio {
	width: 100%;
}
.duration {
	width: 40%;
}
.slider {
	width: 30%;
	padding-top: 20px;
}
.volume-wrapper {
	display: flex;
	width: 30%;
	height: 36px;
	border-radius: 2px;
	background: var(--shades-color-overlay-dark, rgba(33, 33, 33, 0.54));
}
</style>
