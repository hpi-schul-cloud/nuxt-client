import { onUnmounted, Ref, ref } from "vue";
import lamejs from "@breezystack/lamejs"; // Correct import statement

export enum RecordingStateEnum {
	INACTIVE = "inactive",
	RECORDING = "recording",
	PAUSED = "paused",
}

export const useAudioRecorder = () => {
	const mediaRecorder: Ref<MediaRecorder | undefined> = ref();
	const chunks: Ref<Blob[]> = ref([]);

	const isSupportedByBrowser = (): boolean => {
		return !!navigator?.mediaDevices?.getUserMedia;
	};

	const state: Ref<RecordingStateEnum> = ref(RecordingStateEnum.INACTIVE);

	const start = async (): Promise<void> => {
		if (state.value !== RecordingStateEnum.INACTIVE) {
			return;
		}

		if (isSupportedByBrowser()) {
			if (mediaRecorder.value) {
				dispose();
			}

			try {
				const mediaStream: MediaStream =
					await navigator.mediaDevices.getUserMedia({ audio: true });

				mediaStream.getTracks().forEach((track: MediaStreamTrack): void => {
					// Handles disconnect of microphone
					track.onended = (): void => {
						dispose();
					};
				});

				mediaRecorder.value = new MediaRecorder(mediaStream, {
					mimeType: "audio/webm",
				});

				mediaRecorder.value.ondataavailable = (event: BlobEvent): void => {
					chunks.value.push(event.data);
				};

				mediaRecorder.value.onstart = (): void => {
					state.value = RecordingStateEnum.RECORDING;
				};

				mediaRecorder.value.onpause = (): void => {
					state.value = RecordingStateEnum.PAUSED;
				};

				mediaRecorder.value.onresume = (): void => {
					state.value = RecordingStateEnum.RECORDING;
				};

				mediaRecorder.value.onstop = (): void => {
					dispose();
				};

				mediaRecorder.value.onerror = (): void => {
					dispose();
				};

				mediaRecorder.value.start();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e: unknown) {
				// Ignore errors
			}
		}
	};

	const stop = async (): Promise<Blob | null> => {
		return new Promise((resolve): void => {
			if (!mediaRecorder.value || state.value === RecordingStateEnum.INACTIVE) {
				return resolve(null);
			}

			const mimeType: string = mediaRecorder.value.mimeType;
			mediaRecorder.value.onstop = async (): Promise<void> => {
				const webmBlob: Blob = new Blob(chunks.value, {
					type: mimeType,
				});

				dispose();

				const mp3Blob = await convertWebmBlobToMp3(webmBlob);
				resolve(mp3Blob);
			};

			mediaRecorder.value.onerror = (): void => {
				dispose();
				resolve(null);
			};

			mediaRecorder.value.stop();
		});
	};

	const pause = (): void => {
		if (!mediaRecorder.value || state.value !== RecordingStateEnum.RECORDING) {
			return;
		}

		mediaRecorder.value.pause();
	};

	const resume = (): void => {
		if (!mediaRecorder.value || state.value !== RecordingStateEnum.PAUSED) {
			return;
		}

		mediaRecorder.value.resume();
	};

	const dispose = (): void => {
		state.value = RecordingStateEnum.INACTIVE;
		chunks.value = [];

		if (!mediaRecorder.value) {
			return;
		}

		if (mediaRecorder.value.state !== "inactive") {
			try {
				mediaRecorder.value.stop();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e: unknown) {
				// Ignore errors
			}
		}

		mediaRecorder.value.stream
			.getTracks()
			.forEach((track: MediaStreamTrack): void => {
				track.stop();
			});
		mediaRecorder.value = undefined;
	};

	onUnmounted((): void => {
		dispose();
	});

	const convertWebmBlobToMp3 = async (webmBlob: Blob): Promise<Blob> => {
		// Read the Blob as an ArrayBuffer
		const arrayBuffer = await webmBlob.arrayBuffer();

		// Decode the WebM file (assuming it's a single audio track)
		const audioContext = new AudioContext();
		const audioData = await audioContext.decodeAudioData(arrayBuffer);

		// Convert the Float32Array audio data to Int16Array
		const samples = audioData.getChannelData(0);
		const int16Samples = new Int16Array(samples.length);
		for (let i = 0; i < samples.length; i++) {
			int16Samples[i] = Math.max(-32768, Math.min(32767, samples[i] * 32768));
		}

		// Convert the audio data to MP3
		const mp3Encoder = new lamejs.Mp3Encoder(1, audioData.sampleRate, 128);
		const mp3Data = [];

		const sampleBlockSize = 1152;
		for (let i = 0; i < int16Samples.length; i += sampleBlockSize) {
			const sampleChunk = int16Samples.subarray(i, i + sampleBlockSize);
			const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
			if (mp3buf.length > 0) {
				mp3Data.push(mp3buf);
			}
		}
		const mp3buf = mp3Encoder.flush();
		if (mp3buf.length > 0) {
			mp3Data.push(mp3buf);
		}

		// Create a Blob from the MP3 data
		const mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });

		return mp3Blob;
	};

	return {
		mediaRecorder,
		chunks,
		state,
		isSupportedByBrowser,
		start,
		stop,
		pause,
		resume,
	};
};
