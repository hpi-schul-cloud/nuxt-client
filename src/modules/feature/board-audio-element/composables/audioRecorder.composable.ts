import { onUnmounted, Ref, ref } from "vue";

export enum RecordingStateEnum {
	INACTIVE = "inactive",
	RECORDING = "recording",
	PAUSED = "paused",
}

export const useAudioRecorder = () => {
	const mediaRecorder: Ref<MediaRecorder | undefined> = ref();
	let chunks: Ref<Blob[]> = ref([]);

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

				mediaRecorder.value = new MediaRecorder(mediaStream);

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
			mediaRecorder.value.onstop = (): void => {
				const blob: Blob = new Blob(chunks.value, { type: mimeType });

				dispose();

				resolve(blob);
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
