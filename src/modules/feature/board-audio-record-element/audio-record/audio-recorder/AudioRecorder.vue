<template>
	<div>
		<button @click="startRecording">Start Recording</button>
		<button
			@click="pauseRecording"
			v-if="state === RecordingStateEnum.RECORDING"
		>
			Pause Recording
		</button>
		<button @click="resumeRecording" v-if="state === RecordingStateEnum.PAUSED">
			Resume Recording
		</button>
		<button @click="stopRecording" v-if="state !== RecordingStateEnum.INACTIVE">
			Stop Recording
		</button>
	</div>
</template>

<script setup>
import { RecordingStateEnum, useAudioRecorder } from "../../composables";

const { mediaRecorder, chunks, state, start, stop, pause, resume } =
	useAudioRecorder();

const startRecording = async () => {
	await start();
};

const pauseRecording = () => {
	pause();
};

const resumeRecording = () => {
	resume();
};

const stopRecording = async () => {
	const audioBlob = await stop();
	if (audioBlob) {
		const audioURL = URL.createObjectURL(audioBlob);
		const audio = new Audio(audioURL);
		audio.play();
	}
};
</script>
