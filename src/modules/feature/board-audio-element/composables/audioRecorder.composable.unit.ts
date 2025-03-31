import { mountComposable } from "@@/tests/test-utils";
import { createMock } from "@golevelup/ts-jest";
import {
	RecordingStateEnum,
	useAudioRecorder,
} from "./audioRecorder.composable";

describe("AudioRecorder", () => {
	const setupMediaRecorder = (initialState: RecordingState = "inactive") => {
		const getUserMediaMock = jest.fn();
		const mediaStreamMock = createMock<MediaStream>();
		const mediaStreamTrackMock = createMock<MediaStreamTrack>();
		const mediaRecorderMock = createMock<MediaRecorder>({
			get state() {
				return initialState;
			},
			mimeType: "text/plain",
			get stream() {
				return mediaStreamMock;
			},
		});

		getUserMediaMock.mockReturnValue(mediaStreamMock);
		mediaStreamMock.getTracks.mockReturnValue([mediaStreamTrackMock]);

		Object.defineProperty(global, "MediaRecorder", {
			writable: true,
			value: () => mediaRecorderMock,
		});

		Object.defineProperty(navigator, "mediaDevices", {
			value: {
				getUserMedia: getUserMediaMock,
			},
			configurable: true,
			writable: true,
		});

		return {
			getUserMediaMock,
			mediaStreamMock,
			mediaStreamTrackMock,
			mediaRecorderMock,
		};
	};

	describe("isSupportedByBrowser", () => {
		describe("when the browser has media devices", () => {
			const setup = () => {
				Object.defineProperty(navigator, "mediaDevices", {
					value: {
						getUserMedia: () => {},
					},
					configurable: true,
					writable: true,
				});

				const composable = mountComposable(() => useAudioRecorder());

				return {
					composable,
				};
			};

			it("should return false", () => {
				const { composable } = setup();

				const result = composable.isSupportedByBrowser();

				expect(result).toEqual(true);
			});
		});

		describe("when the browser has no media devices", () => {
			const setup = () => {
				Object.defineProperty(navigator, "mediaDevices", {
					value: undefined,
					configurable: true,
					writable: true,
				});

				const composable = mountComposable(() => useAudioRecorder());

				return {
					composable,
				};
			};

			it("should return false", () => {
				const { composable } = setup();

				const result = composable.isSupportedByBrowser();

				expect(result).toEqual(false);
			});
		});
	});

	describe("start", () => {
		describe("when the state is recording", () => {
			const setup = () => {
				const composable = mountComposable(() => useAudioRecorder());

				composable.state.value = RecordingStateEnum.RECORDING;

				return {
					composable,
				};
			};

			it("should do nothing", async () => {
				const { composable } = setup();

				await composable.start();

				expect(composable.state.value).toEqual(RecordingStateEnum.RECORDING);
			});
		});

		describe("when the state is paused", () => {
			const setup = () => {
				const composable = mountComposable(() => useAudioRecorder());

				composable.state.value = RecordingStateEnum.PAUSED;

				return {
					composable,
				};
			};

			it("should do nothing", async () => {
				const { composable } = setup();

				await composable.start();

				expect(composable.state.value).toEqual(RecordingStateEnum.PAUSED);
			});
		});

		describe("when the browser is not supported", () => {
			const setup = () => {
				Object.defineProperty(navigator, "mediaDevices", {
					value: undefined,
					configurable: true,
					writable: true,
				});

				const composable = mountComposable(() => useAudioRecorder());

				return {
					composable,
				};
			};

			it("should be inactive and have no recorder", async () => {
				const { composable } = setup();

				await composable.start();

				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
			});
		});

		describe("when access to a media device was denied", () => {
			const setup = () => {
				const getUserMediaMock = jest.fn();

				getUserMediaMock.mockRejectedValue(new Error());

				Object.defineProperty(navigator, "mediaDevices", {
					value: {
						getUserMedia: getUserMediaMock,
					},
					configurable: true,
					writable: true,
				});

				const composable = mountComposable(() => useAudioRecorder());

				return {
					composable,
				};
			};

			it("should be inactive and have no recorder", async () => {
				const { composable } = setup();

				await composable.start();

				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
			});
		});

		describe("when the browser is supported and there is still a media recorder", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should start recording to a media recorder", async () => {
				const { composable, mediaRecorderMock } = setup();

				await composable.start();

				expect(composable.mediaRecorder.value).toBeDefined();
				expect(mediaRecorderMock.start).toHaveBeenCalledTimes(1);
			});

			it("should register a onended event that sets the state to inactive and resets the recorder", async () => {
				const { composable, mediaRecorderMock, mediaStreamTrackMock } = setup();

				await composable.start();
				mediaStreamTrackMock.onended?.({} as Event);

				expect(mediaStreamTrackMock.onended).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
				expect(mediaStreamTrackMock.stop).toHaveBeenCalledTimes(2);
			});

			it("should register a ondataavailable event that adds the data chunks to a list", async () => {
				const { composable, mediaRecorderMock } = setup();

				await composable.start();

				const blob = new Blob(["test"]);
				mediaRecorderMock.ondataavailable?.({ data: blob } as BlobEvent);

				expect(mediaRecorderMock.ondataavailable).toBeDefined();
				expect(composable.chunks.value).toEqual([blob]);
			});

			it("should register a onstart event that sets the state to recording", async () => {
				const { composable, mediaRecorderMock } = setup();

				await composable.start();
				mediaRecorderMock.onstart?.({} as Event);

				expect(mediaRecorderMock.onstart).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.RECORDING);
			});

			it("should register a onpause event that sets the state to paused", async () => {
				const { composable, mediaRecorderMock } = setup();

				await composable.start();
				mediaRecorderMock.onpause?.({} as Event);

				expect(mediaRecorderMock.onpause).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.PAUSED);
			});

			it("should register a onresume event that sets the state to recording", async () => {
				const { composable, mediaRecorderMock } = setup();

				await composable.start();
				mediaRecorderMock.onresume?.({} as Event);

				expect(mediaRecorderMock.onresume).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.RECORDING);
			});

			it("should register a onstop event that sets the state to inactive and resets the recorder", async () => {
				const { composable, mediaRecorderMock, mediaStreamTrackMock } = setup();

				await composable.start();
				mediaRecorderMock.onstop?.({} as Event);

				expect(mediaRecorderMock.onstop).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
				expect(mediaStreamTrackMock.stop).toHaveBeenCalledTimes(2);
			});

			it("should register a onerror event that sets the state to inactive and resets the recorder", async () => {
				const { composable, mediaRecorderMock, mediaStreamTrackMock } = setup();

				await composable.start();
				mediaRecorderMock.onerror?.({} as ErrorEvent);

				expect(mediaRecorderMock.onerror).toBeDefined();
				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
				expect(mediaStreamTrackMock.stop).toHaveBeenCalledTimes(2);
			});
		});
	});

	describe("stop", () => {
		describe("when there is no media recorder", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = undefined;
				composable.state.value = RecordingStateEnum.RECORDING;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should return null", async () => {
				const { composable, mediaRecorderMock } = setup();

				const result = await composable.stop();

				expect(result).toBeNull();
			});
		});

		describe("when the media recorder is inactive", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.INACTIVE;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should return null", async () => {
				const { composable, mediaRecorderMock } = setup();

				const result = await composable.stop();

				expect(result).toBeNull();
			});
		});

		describe("when the media recorder is recording", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const blob = new Blob(["test"]);

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.RECORDING;
				composable.chunks.value = [blob];

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
					blob,
				};
			};

			it("should stop recording and return a blob", async () => {
				let { composable, mediaRecorderMock, mediaStreamTrackMock, blob } =
					setup();

				const promise = composable.stop();
				mediaRecorderMock.onstop?.({} as Event);
				const result = await promise;

				expect(mediaRecorderMock.onstop).toBeDefined();
				expect(result).toEqual(blob);
				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
				expect(mediaStreamTrackMock.stop).toHaveBeenCalledTimes(1);
				expect(mediaRecorderMock.stop).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("resume", () => {
		describe("when there is no media recorder", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = undefined;
				composable.state.value = RecordingStateEnum.PAUSED;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.resume();

				expect(mediaRecorderMock.resume).not.toHaveBeenCalled();
			});
		});

		describe("when the state is recording", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.RECORDING;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.resume();

				expect(mediaRecorderMock.resume).not.toHaveBeenCalled();
			});
		});

		describe("when the state is inactive", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.INACTIVE;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.resume();

				expect(mediaRecorderMock.resume).not.toHaveBeenCalled();
			});
		});

		describe("when the state is paused", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.PAUSED;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should resume the recorder", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.resume();

				expect(mediaRecorderMock.resume).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("resume", () => {
		describe("when there is no media recorder", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = undefined;
				composable.state.value = RecordingStateEnum.RECORDING;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.pause();

				expect(mediaRecorderMock.pause).not.toHaveBeenCalled();
			});
		});

		describe("when the state is paused", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.PAUSED;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.pause();

				expect(mediaRecorderMock.pause).not.toHaveBeenCalled();
			});
		});

		describe("when the state is inactive", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.INACTIVE;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should do nothing", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.pause();

				expect(mediaRecorderMock.pause).not.toHaveBeenCalled();
			});
		});

		describe("when the state is recording", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder();

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.RECORDING;

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should resume the recorder", async () => {
				const { composable, mediaRecorderMock } = setup();

				composable.pause();

				expect(mediaRecorderMock.pause).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("onUnmount", () => {
		describe("when there is no media recorder", () => {
			const setup = () => {
				const { mediaStreamMock, mediaRecorderMock, mediaStreamTrackMock } =
					setupMediaRecorder("recording");

				const composable = mountComposable(() => useAudioRecorder());

				composable.mediaRecorder.value = mediaRecorderMock;
				composable.state.value = RecordingStateEnum.RECORDING;
				composable.chunks.value = [new Blob()];

				return {
					composable,
					mediaRecorderMock,
					mediaStreamMock,
					mediaStreamTrackMock,
				};
			};

			it("should set the state to inactive and reset the recorder", async () => {
				const { composable, mediaRecorderMock, mediaStreamTrackMock } = setup();

				composable.wrapper.unmount();

				expect(composable.state.value).toEqual(RecordingStateEnum.INACTIVE);
				expect(composable.mediaRecorder.value).toBeUndefined();
				expect(composable.chunks.value).toEqual([]);
				expect(mediaRecorderMock.stop).toHaveBeenCalledTimes(1);
				expect(mediaStreamTrackMock.stop).toHaveBeenCalledTimes(1);
			});
		});
	});
});
