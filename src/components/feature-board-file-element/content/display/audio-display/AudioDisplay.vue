<template>
	<ContentElementBar class="audioplayer">
		<template #element>
			<audio ref="audio" loading="lazy" v-on:error="onError" />
			<v-btn icon @click="onPlay" color="white" small class="pa-0 ma-0">
				<v-icon
					v-if="!playing"
					role="img"
					aria-label="Play"
					aria-hidden="false"
					>{{ mdiPlay }}</v-icon
				>
				<v-icon v-else role="img" aria-label="Pause" aria-hidden="false">
					{{ mdiPause }}</v-icon
				>
			</v-btn>
			<span class="duration pr-2 pl-1">
				{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span
			>
			<v-slider
				aria-label="Audio slider"
				class="slider pt-6"
				color="white"
				thumb-color="white"
				track-color="#9e9e9e"
				:value="currentTime"
				start="0"
				end="duration"
				step="step"
				:min="0"
				:max="max"
				@click="stopPropagation"
				@mousedown="stopPropagation"
				@mouseup="stopPropagation"
				@input="onInputSlider"
			/>
			<SpeedMenu @rate="speedRate" />
			<v-icon
				color="white"
				right
				v-if="!isShow"
				@click="showVolumeSlider"
				role="img"
				aria-label="Volume"
				aria-hidden="false"
				>{{ mdiVolumeHigh }}</v-icon
			>
			<div class="volume-wrapper mr-n2" v-if="isShow">
				<v-slider
					aria-label="Volume slider"
					class="volume-slider pl-2"
					color="white"
					thumb-color="white"
					track-color="#9e9e9e"
					v-model="volume"
					step="0.01"
					:min="0"
					:max="1"
					@click="stopPropagation"
					@mousedown="stopPropagation"
					@mouseup="stopPropagation"
				/>
				<v-icon
					color="white"
					class="pr-2"
					@click="showVolumeSlider"
					role="img"
					aria-label="Volume"
					aria-hidden="false"
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

		const step = 0.0000001;

		const controls = useMediaControls(audio, {
			src: source,
		});

		const { playing, currentTime, duration, volume, rate } = controls;

		const onPlay = () => {
			playing.value = !playing.value;
		};

		const onInputSlider = (seconds: number) => {
			controls.currentTime.value = seconds;
		};

		const formatDuration = (seconds: number) => {
			return new Date(1000 * seconds).toISOString().slice(14, 19);
		};

		const max = computed(() => {
			return duration.value;
		});

		const speedRate = (rate: number) => {
			controls.rate.value = rate;
		};

		const isShow: Ref<boolean> = ref(false);
		const showVolumeSlider = () => {
			isShow.value = !isShow.value;
		};

		const stopPropagation = (event: Event) => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		return {
			audio,
			playing,
			currentTime,
			duration,
			volume,
			rate,
			step,
			speedRate,
			mdiPlay,
			mdiPause,
			mdiVolumeOff,
			mdiVolumeHigh,
			mdiPlaySpeed,
			onPlay,
			formatDuration,
			max,
			isShow,
			showVolumeSlider,
			stopPropagation,
			onError,
			onInputSlider,
		};
	},
});
</script>
<style scoped>
.audioplayer {
	background-color: #424242;
	border-top-right-radius: 0.25rem;
	border-top-left-radius: 0.25rem;
}
.duration {
	white-space: nowrap;
	color: white;
}
.slider {
	width: 30%;
}
.volume-wrapper {
	display: flex;
	float: right;
	width: 50%;
	height: 36px;
	border-radius: 0.125rem;
	background: var(--shades-color-overlay-dark, rgba(33, 33, 33, 0.54));
}

.volume-slider {
	width: 50%;
	padding-top: 3px;
}
</style>
