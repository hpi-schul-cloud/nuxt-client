import * as serverApi from "@/serverApi/v3/api";
import {
	VideoConferenceApiInterface,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3/api";
import {
	videoConferenceInfoFactory,
	videoConferenceInfoResponseFactory,
} from "@@/tests/test-utils/factory";
import { AxiosError } from "axios";
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
		const apiMock = {
			videoConferenceControllerInfo: jest.fn(),
		};

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
					const info: VideoConferenceInfo = videoConferenceInfoFactory.build({
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: true,
							moderatorMustApproveJoinRequests: true,
							everybodyJoinsAsModerator: true,
						},
					});

					module.setVideoConferenceInfo(info);

					expect(module.getVideoConferenceInfo).toEqual(info);
				});
			});
		});
	});

	describe("fetchVideoConferenceInfo", () => {
		describe("when the api returns a response", () => {
			const setup = () => {
				const { apiMock } = mockApi();

				const response = videoConferenceInfoResponseFactory.build({
					state: VideoConferenceStateResponse.Running,
				});
				const state = videoConferenceInfoFactory.build({
					state: VideoConferenceState.RUNNING,
				});

				apiMock.videoConferenceControllerInfo.mockResolvedValue({
					data: response,
				});

				return {
					state,
				};
			};

			it("should update the stores video conference info", async () => {
				const { state } = setup();

				await module.fetchVideoConferenceInfo({
					scopeId: "scopeId",
					scope: VideoConferenceScope.Course,
				});

				expect(module.getVideoConferenceInfo).toEqual(state);
			});
		});

		describe("when the api returns an error", () => {
			const setup = () => {
				const { apiMock } = mockApi();

				const error = new AxiosError();

				apiMock.videoConferenceControllerInfo.mockRejectedValue(error);

				return {
					error,
				};
			};

			it("should update the stores error", async () => {
				const { error } = setup();

				await module.fetchVideoConferenceInfo({
					scopeId: "scopeId",
					scope: VideoConferenceScope.Course,
				});

				expect(module.getError).toEqual(error);
			});
		});
	});
});
