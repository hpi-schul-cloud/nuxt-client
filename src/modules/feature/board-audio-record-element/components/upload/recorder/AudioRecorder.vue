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
				<audio
					v-if="audioUrl"
					ref="audio"
					controls
					:src="audioUrl"
					class="ml-2"
				/>
				<v-btn
					v-show="state === RecordingStateEnum.INACTIVE && audioUrl"
					class="float-right download-button"
					icon
					size="small"
					variant="text"
					@click="onUpload"
				>
					<v-icon>{{ mdiTrayArrowUp }}</v-icon>
				</v-btn>
			</div>
		</template>
		<template v-if="showMenu" #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import {
	mdiMicrophone,
	mdiPause,
	mdiPlay,
	mdiStop,
	mdiTrayArrowUp,
} from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, onUnmounted, ref } from "vue";
import { RecordingStateEnum, useAudioRecorder } from "../../../composables";
import { formatSecondsToHourMinSec } from "../../../../../../utils/fileHelper";

export default defineComponent({
	name: "AudioRecorder",
	components: { ContentElementBar },
	props: {
		showMenu: { type: Boolean, required: true },
	},
	emits: ["upload:file"],
	setup(props, { emit }) {
		const audio = ref<HTMLAudioElement | null>(null);
		const audioUrl = ref<string>("");

		const controls = useMediaControls(audio, {
			src: audioUrl,
		});

		const { playing, currentTime, duration, volume, rate, onSourceError } =
			controls;

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
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}

			pause();
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

		const elapsedTimeDisplay = computed(() => {
			return formatSecondsToHourMinSec(elapsedTime.value);
		});

		// Moving these variables to template causes the audio not to play on iOS

		onUnmounted(() => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		});

		const onUpload = async () => {
			if (audioUrl.value) {
				const response = await fetch(audioUrl.value);
				const blob = await response.blob();
				// remove mp3 exte if savin as webm
				const file = new File([blob], `${new Date().getTime()}-audio.mp3`, {
					type: blob.type,
				});
				await emit("upload:file", file);
			}
		};

		return {
			mdiTrayArrowUp,
			duration,
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
			onUpload,
			RecordingStateEnum,
			playing,
			currentTime,
			volume,
			rate,
			onSourceError,
			elapsedTimeDisplay,
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
