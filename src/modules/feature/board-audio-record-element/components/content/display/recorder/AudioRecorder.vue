<template>
	<ContentElementBar class="audio-record-player bg-grey-darken-3">
		<template #element>
			<div class="d-flex flex-nowrap pb-0 pl-2 pr-1 fill-height align-center">
				<v-btn
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.pauseRecording')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="pause"
				>
					<v-icon> {{ mdiPause }}</v-icon>
				</v-btn>
				<v-btn
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.resumeRecording')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="resume"
				>
					<v-icon> {{ mdiPlay }}</v-icon>
				</v-btn>
				<v-btn
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.startRecording')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="start"
				>
					<v-icon> {{ mdiMicrophone }}</v-icon>
				</v-btn>
				<v-btn
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.stopRecording')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="stop"
				>
					<v-icon> {{ mdiStop }}</v-icon>
				</v-btn>
				<!-- <v-slider
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.slider')
					"
					class="duration-slider"
					color="white"
					thumb-color="white"
					track-color="black"
				/> -->
			</div>
		</template>
	</ContentElementBar>
</template>
<script lang="ts">
import {
	mdiMicrophone,
	mdiPause,
	mdiPlay,
	mdiPlaySpeed,
	mdiStop,
} from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import { useAudioRecorder } from "../../../../composables/useAudioRecorder.composable";
import SpeedMenu from "./audio-record-display/SpeedMenu.vue";

export default defineComponent({
	name: "AudioRecorder",
	components: { ContentElementBar },
	props: {
		src: { type: String, required: true },
		showMenu: { type: Boolean, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		// const audio = ref();
		// const source = computed(() => {
		// 	return props.src;
		// });

		// const controls = useMediaControls(audio, {
		// 	src: source,
		// });

		// const { playing, currentTime, duration, volume, rate, onSourceError } =
		// 	controls;

		// onSourceError(() => {
		// 	emit("error", AudioRecordAlert.AUDIO_FORMAT_ERROR);
		// });

		// const onPlay = () => {
		// 	playing.value = !playing.value;
		// };

		// const onInputSlider = (seconds: number) => {
		// 	controls.currentTime.value = seconds;
		// };

		// const onSpeedRateChange = (rate: number) => {
		// 	controls.rate.value = rate;
		// };

		// const durationDisplay = computed(() => {
		// 	const durationValue = formatSecondsToHourMinSec(duration.value);
		// 	const currentTimeValue = formatSecondsToHourMinSec(currentTime.value);
		// 	return currentTimeValue + " / " + durationValue;
		// });

		// // Moving these variables to template causes the audio not to play on iOS
		// const durationStep = 0.0000001;
		// const volumeStep = 0.01;

		// Audio Recorder
		const { state, start, stop, pause, resume } = useAudioRecorder();

		return {
			// durationStep,
			// volumeStep,
			// audio,
			// playing,
			// currentTime,
			// duration,
			// volume,
			// rate,
			// onSpeedRateChange,
			mdiPlay,
			mdiPause,
			mdiPlaySpeed,
			mdiMicrophone,
			mdiStop,
			// onPlay,
			// onInputSlider,
			// durationDisplay,
			state,
			start,
			stop,
			pause,
			resume,
		};
	},
});
</script>
<style scoped>
button {
	margin: 5px;
}
</style>
