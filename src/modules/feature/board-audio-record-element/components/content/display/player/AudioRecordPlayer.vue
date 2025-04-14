<template>
	<ContentElementBar class="audio-player bg-grey-darken-3">
		<template #element>
			<div class="d-flex flex-nowrap pb-0 pl-2 pr-1 fill-height align-center">
				<v-btn
					v-if="state === RecordingStateEnum.INACTIVE"
					:aria-label="
						$t('component.cardElement.audioRecordElement.audioPlayer.record')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="onStart"
				>
					<v-icon>{{ mdiMicrophone }}</v-icon>
				</v-btn>
				<v-btn
					v-if="state === RecordingStateEnum.INACTIVE && audioUrl"
					:aria-label="
						$t('component.cardElement.audioRecordElement.audioPlayer.play')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="play"
				>
					<v-icon>{{ mdiPlay }}</v-icon>
				</v-btn>
				<v-btn
					v-if="state === RecordingStateEnum.RECORDING"
					:aria-label="
						$t('component.cardElement.audioRecordElement.audioPlayer.pause')
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="onPause"
				>
					<v-icon>{{ mdiPause }}</v-icon>
				</v-btn>
				<v-btn
					v-if="state === RecordingStateEnum.PAUSED"
					:aria-label="
						$t(
							'component.cardElement.audioRecordElement.audioPlayer.resumeRecording'
						)
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="onResume"
				>
					<v-icon>{{ mdiMicrophone }}</v-icon>
				</v-btn>
				<v-btn
					v-if="state !== RecordingStateEnum.INACTIVE"
					:aria-label="
						$t(
							'component.cardElement.audioRecordElement.audioPlayer.stopRecording'
						)
					"
					color="transparent"
					density="comfortable"
					icon
					variant="flat"
					@click="stopRecording"
				>
					<v-icon>{{ mdiStop }}</v-icon>
				</v-btn>
				<div class="duration py-1 pl-1 pr-2 text-body-2">
					{{ elapsedTimeDisplay }}
				</div>
				<div>
					<v-slider
						:aria-label="
							$t('component.cardElement.audioRecordElement.audioPlayer.slider')
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
				</div>
				<audio
					v-if="audioUrl"
					ref="audio"
					controls
					:src="audioUrl"
					class="ml-2"
				/>
			</div>
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { mdiPause, mdiPlay, mdiStop, mdiMicrophone } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed, defineComponent, ref, onUnmounted } from "vue";
import { useAudioRecorder, RecordingStateEnum } from "../../../../composables";
import { useMediaControls } from "@vueuse/core";
import { formatSecondsToHourMinSec } from "../../../../../../../utils/fileHelper";

export default defineComponent({
	name: "AudioRecordPlayer",
	components: { ContentElementBar },
	props: {
		showMenu: { type: Boolean, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const audio = ref();
		const audioUrl = ref("");

		// Use Media Controls
		const controls = useMediaControls(audio, {
			src: audioUrl,
		});

		const { playing, currentTime, duration, volume, rate, onSourceError } =
			controls;

		// Audio Recorder
		const {
			mediaRecorder,
			chunks,
			state,
			isSupportedByBrowser,
			start,
			stop,
			pause,
			resume,
		} = useAudioRecorder();

		const elapsedTime = ref(0);
		let intervalId: number | null = null;

		const onStart = async () => {
			await start();
			elapsedTime.value = 0;
			intervalId = window.setInterval(() => {
				elapsedTime.value += 1;
			}, 1000);
		};

		const onPause = () => {
			pause();
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		const onResume = () => {
			resume();
			intervalId = window.setInterval(() => {
				elapsedTime.value += 1;
			}, 1000);
		};

		const stopRecording = async () => {
			const blob = await stop();
			if (blob) {
				audioUrl.value = URL.createObjectURL(blob);
				if (audio.value) {
					audio.value.src = audioUrl.value;
				}
			}
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		const play = () => {
			if (audio.value) {
				audio.value.play();
			}
		};
		const onInputSlider = (seconds: number) => {
			controls.currentTime.value = seconds;
		};

		const elapsedTimeDisplay = computed(() => {
			return formatSecondsToHourMinSec(elapsedTime.value);
		});

		// Moving these variables to template causes the audio not to play on iOS
		const durationStep = 0.0000001;
		const durationDisplay = computed(() => {
			const durationValue = formatSecondsToHourMinSec(duration.value);
			const currentTimeValue = formatSecondsToHourMinSec(currentTime.value);
			return currentTimeValue + " / " + durationValue;
		});
		onUnmounted(() => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		});

		return {
			durationStep,
			duration,
			elapsedTimeDisplay,
			audio,
			audioUrl,
			mdiPlay,
			mdiPause,
			mdiStop,
			mdiMicrophone,
			mediaRecorder,
			chunks,
			state,
			isSupportedByBrowser,
			onStart,
			onPause,
			onResume,
			stopRecording,
			play,
			RecordingStateEnum,
			playing,
			currentTime,
			volume,
			rate,
			onSourceError,
			onInputSlider,
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
