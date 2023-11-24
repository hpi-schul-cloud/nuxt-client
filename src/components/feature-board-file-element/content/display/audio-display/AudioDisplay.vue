<template>
	<ContentElementBar class="audioplayer">
		<template #element>
			<audio ref="audio" class="audio" loading="lazy" v-on:error="onError" />
			<v-btn icon @click="onPlay" color="white" small>
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
			<span class="duration text-body-2 px-2">
				{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span
			>
			<v-slider
				aria-label="Audio slider"
				class="slider"
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
				v-if="!isShow"
				@click="showVolumeSlider"
				role="img"
				aria-label="Volume"
				aria-hidden="false"
				style="color: white; position: absolute; right: 16px"
				>{{ mdiVolumeHigh }}</v-icon
			>
			<div class="volume-wrapper mr-n2" v-if="isShow">
				<v-slider
					aria-label="Volume slider"
					class="volume-slider"
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
					class="pr-2"
					@click="showVolumeSlider"
					role="img"
					aria-label="Volume"
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
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
}
.duration {
	white-space: nowrap;
	color: white;
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
	padding-left: 6px;
	padding-top: 3px;
}
</style>
