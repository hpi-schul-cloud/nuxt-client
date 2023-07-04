import * as serverApi from "@/serverApi/v3/api";
import { VideoConferenceApiInterface } from "@/serverApi/v3/api";
import {
	VideoConferenceInfo,
	VideoConferenceState,
} from "./types/video-conference";
import VideoConferenceModule from "./video-conference";

describe("VideoConferenceModule", () => {
	let module: VideoConferenceModule;

	beforeEach(() => {
		module = new VideoConferenceModule({});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockApi = () => {
		const apiMock: Partial<VideoConferenceApiInterface> = {};

		jest
			.spyOn(serverApi, "VideoConferenceApiFactory")
			.mockReturnValue(apiMock as unknown as VideoConferenceApiInterface);

		return {
			apiMock,
		};
	};

	describe("getter/setter", () => {
		describe("Loading", () => {
			describe("when the store is in it initial state", () => {
				it("should return default values", () => {
					const result = module.getLoading;

					expect(result).toEqual(false);
				});
			});

			describe("when setting loading to true", () => {
				it("should return true", () => {
					module.setLoading(true);

					expect(module.getLoading).toEqual(true);
				});
			});
		});

		describe("Error", () => {
			describe("when the store is in it initial state", () => {
				it("should return default values", () => {
					const result = module.getError;

					expect(result).toBeNull();
				});
			});

			describe("when setting an error", () => {
				it("should return the error", () => {
					const error = new Error();

					module.setError(error);

					expect(module.getError).toEqual(error);
				});
			});
		});

		describe("VideoConferenceInfo", () => {
			describe("when the store is in it initial state", () => {
				it("should return default values", () => {
					const result = module.getVideoConferenceInfo;

					expect(result).toEqual<VideoConferenceInfo>({
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					});
				});
			});

			describe("when setting an error", () => {
				it("should return the error", () => {
					const info: VideoConferenceInfo = {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: true,
							moderatorMustApproveJoinRequests: true,
							everybodyJoinsAsModerator: true,
						},
					};

					module.setVideoConferenceInfo(info);

					expect(module.getVideoConferenceInfo).toEqual(info);
				});
			});
		});
	});
});
