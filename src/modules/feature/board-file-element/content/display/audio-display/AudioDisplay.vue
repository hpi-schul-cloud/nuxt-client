<template>
	<ContentElementBar class="audio-player bg-grey-darken-3">
		<template #element>
			<div
				class="d-flex flex-nowrap pb-0 pl-2 pr-1 fill-height align-center"
				data-testid="audio-thumbnail-in-card"
			>
				<audio ref="audio" loading="lazy" />
				<v-btn
					v-if="playing"
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.pause')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="onPlay"
				>
					<v-icon> {{ mdiPause }}</v-icon>
				</v-btn>
				<v-btn
					v-else
					:aria-label="$t('component.cardElement.fileElement.audioPlayer.play')"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="onPlay"
				>
					<v-icon>{{ mdiPlay }}</v-icon>
				</v-btn>
				<div class="duration py-1 pl-1 pr-2 text-body-2">
					{{ durationDisplay }}
				</div>
				<v-slider
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.slider')
					"
					class="duration-slider"
					color="white"
					thumb-color="white"
					track-color="black"
					:model-value="currentTime"
					start="0"
					end="duration"
					step="durationStep"
					:min="0"
					:max="duration"
					@update:model-value="onInputSlider"
				/>
				<div class="pl-2">
					<SpeedMenu :rate="rate" @updateRate="onSpeedRateChange" />
				</div>
			</div>
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { formatSecondsToHourMinSec } from "@/utils/fileHelper";
import { mdiPause, mdiPlay, mdiPlaySpeed } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";
import SpeedMenu from "./SpeedMenu.vue";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar, SpeedMenu },
	props: {
		src: { type: String, required: true },
		showMenu: { type: Boolean, required: true },
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

		const durationDisplay = computed(() => {
			const durationValue = formatSecondsToHourMinSec(duration.value);
			const currentTimeValue = formatSecondsToHourMinSec(currentTime.value);
			return currentTimeValue + " / " + durationValue;
		});

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
			mdiPlaySpeed,
			onPlay,
			onInputSlider,
			durationDisplay,
		};
	},
});
</script>
<style scoped lang="scss">
.audio-player {
	border-top-right-radius: 0.25rem;
	border-top-left-radius: 0.25rem;
}
.audio-player:focus {
	outline: none;
}
.duration {
	white-space: nowrap;
	color: white;
}
.duration-slider {
	width: 40%;
	max-height: 2rem;
}
</style>
