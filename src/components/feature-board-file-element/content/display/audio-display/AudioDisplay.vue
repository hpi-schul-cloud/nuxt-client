<template>
	<ContentElementBar class="audioPlayer grey darken-3">
		<template #element>
			<audio ref="audio" loading="lazy" />
			<v-btn
				v-if="playing"
				:aria-label="$t('media.player.action.pause')"
				icon
				@click="onPlay"
				color="white"
				small
			>
				<v-icon> {{ mdiPause }}</v-icon>
			</v-btn>
			<v-btn
				v-else
				:aria-label="$t('media.player.action.play')"
				icon
				@click="onPlay"
				color="white"
				small
			>
				<v-icon>{{ mdiPlay }}</v-icon>
			</v-btn>
			<span class="duration pr-2 pl-1">
				{{ formatDurationHourMinSec(currentTime) }} /
				{{ formatDurationHourMinSec(duration) }}</span
			>
			<v-slider
				:aria-label="$t('media.player.action.slider')"
				class="duration-slider pt-6"
				color="white"
				thumb-color="white"
				track-color="#9e9e9e"
				:value="currentTime"
				start="0"
				end="duration"
				step="durationStep"
				:min="0"
				:max="duration"
				@click="stopPropagation"
				@mousedown="stopPropagation"
				@mouseup="stopPropagation"
				@input="onInputSlider"
			/>
			<SpeedMenu @rate="onSpeedRateChange" />
			<v-icon
				color="white"
				class="pr-0"
				right
				v-if="!isVolumeSliderShown"
				@click="showVolumeSlider"
				:aria-label="$t('media.player.action.volume')"
				aria-hidden="false"
				>{{ mdiVolumeHigh }}</v-icon
			>
			<div class="volume-wrapper mr-n2" v-if="isVolumeSliderShown">
				<v-slider
					:aria-label="$t('media.player.action.volume.slider')"
					class="volume-slider pl-1"
					color="white"
					thumb-color="white"
					track-color="v-grey-base"
					v-model="volume"
					step="volumeStep"
					:min="0"
					:max="1"
					@click="stopPropagation"
					@mousedown="stopPropagation"
					@mouseup="stopPropagation"
				/>
				<v-icon
					color="white"
					class="pr-1"
					@click="showVolumeSlider"
					:aria-label="$t('media.player.action.volume')"
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

		const controls = useMediaControls(audio, {
			src: source,
		});

		const { playing, currentTime, duration, volume, rate, onSourceError } =
			controls;

		onSourceError(() => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		});

		const onPlay = () => {
			playing.value = !playing.value;
		};

		const onInputSlider = (seconds: number) => {
			controls.currentTime.value = seconds;
		};

		const onSpeedRateChange = (rate: number) => {
			controls.rate.value = rate;
		};

		const formatDurationHourMinSec = (seconds: number) => {
			const isoString = new Date(1000 * seconds).toISOString();
			let duration = isoString.slice(14, 19);

			const secondsInOneHour = 3600;
			if (seconds >= secondsInOneHour) {
				duration = isoString.slice(12, 19);
			}

			return duration;
		};

		const isVolumeSliderShown: Ref<boolean> = ref(false);
		const showVolumeSlider = () => {
			isVolumeSliderShown.value = !isVolumeSliderShown.value;
		};

		const stopPropagation = (event: Event) => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		// Moving these variables to template causes the audio not to play on iOS
		const durationStep = 0.0000001;
		const volumeStep = 0.01;

		return {
			durationStep,
			volumeStep,
			audio,
			playing,
			currentTime,
			duration,
			volume,
			rate,
			onSpeedRateChange,
			mdiPlay,
			mdiPause,
			mdiVolumeOff,
			mdiVolumeHigh,
			mdiPlaySpeed,
			onPlay,
			formatDurationHourMinSec,
			isVolumeSliderShown,
			showVolumeSlider,
			stopPropagation,
			onInputSlider,
		};
	},
});
</script>
<style scoped lang="scss">
.audioPlayer {
	border-top-right-radius: 0.25rem;
	border-top-left-radius: 0.25rem;
}
.duration {
	white-space: nowrap;
	color: white;
}
.duration-slider {
	width: 40%;
}
.volume-wrapper {
	display: flex;
	float: right;
	width: 50%;
	height: 36px;
	border-radius: 0.125rem;
	background-color: rgba(map-get($grey, "darken-4"), 0.54);
}

.volume-slider {
	width: 50%;
	padding-top: 2px;
}
</style>
