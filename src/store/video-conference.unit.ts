import * as serverApi from "@/serverApi/v3/api";
import {
	VideoConferenceApiInterface,
	VideoConferenceScope,
	VideoConferenceStateResponse,
	VideoConferenceJoinResponse,
} from "@/serverApi/v3/api";
import {
	videoConferenceInfoFactory,
	videoConferenceInfoResponseFactory,
	videoConferenceJoinResponseFactory,
} from "@@/tests/test-utils/factory";
import { AxiosError } from "axios";
import {
	VideoConferenceInfo,
	VideoConferenceOptions,
	VideoConferenceState,
} from "./types/video-conference";
import VideoConferenceModule from "./video-conference";
import { createMock } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";

describe("VideoConferenceModule", () => {
	let module: VideoConferenceModule;

	beforeEach(() => {
		module = new VideoConferenceModule({});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockApi = () => {
		const videoconferenceApi = createMock<VideoConferenceApiInterface>();
		videoconferenceApi.videoConferenceControllerInfo.mockResolvedValue(
			mockApiResponse({
				data: videoConferenceInfoResponseFactory.build(),
			})
		);

		jest
			.spyOn(serverApi, "VideoConferenceApiFactory")
			.mockReturnValue(
				videoconferenceApi as unknown as VideoConferenceApiInterface
			);

		return {
			videoconferenceApi,
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

			describe("when reseting an error", () => {
				it("should reset the error", () => {
					const error = new Error();
					module.setError(error);

					module.resetError();

					expect(module.getError).toBeNull();
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
							moderatorMustApproveJoinRequests: true,
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
				const { videoconferenceApi } = mockApi();

				const response = videoConferenceInfoResponseFactory.build({
					state: VideoConferenceStateResponse.Running,
				});
				const state = videoConferenceInfoFactory.build({
					state: VideoConferenceState.RUNNING,
				});

				videoconferenceApi.videoConferenceControllerInfo.mockResolvedValue(
					mockApiResponse({ data: response })
				);

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
				const { videoconferenceApi } = mockApi();

				const error = new AxiosError();

				videoconferenceApi.videoConferenceControllerInfo.mockRejectedValue(
					error
				);

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

	describe("joinVideoConference", () => {
		describe("when the api returns a response", () => {
			const setup = () => {
				const { videoconferenceApi } = mockApi();

				const mockResponse: VideoConferenceJoinResponse =
					videoConferenceJoinResponseFactory.build({
						url: "VideoConferenceUrl",
					});

				videoconferenceApi.videoConferenceControllerJoin.mockResolvedValue(
					mockApiResponse({ data: mockResponse })
				);

				return {
					mockResponse,
				};
			};

			it("should return a response", async () => {
				const { mockResponse } = setup();

				const response: VideoConferenceJoinResponse | undefined =
					await module.joinVideoConference({
						scopeId: "scopeId",
						scope: VideoConferenceScope.Course,
					});

				expect(response).toEqual(mockResponse);
			});
		});

		describe("when the api returns an error", () => {
			const setup = () => {
				const { videoconferenceApi } = mockApi();

				const error = new AxiosError();

				videoconferenceApi.videoConferenceControllerJoin.mockRejectedValue(
					error
				);

				return {
					error,
				};
			};

			it("should update the stores error", async () => {
				const { error } = setup();

				await module.joinVideoConference({
					scopeId: "scopeId",
					scope: VideoConferenceScope.Course,
				});

				expect(module.getError).toEqual(error);
			});
		});
	});

	describe("startVideoConference", () => {
		describe("when the api is called", () => {
			const setup = () => {
				const { videoconferenceApi } = mockApi();

				const videoConferenceOptions: VideoConferenceOptions = {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: true,
					everybodyJoinsAsModerator: false,
				};

				videoconferenceApi.videoConferenceControllerStart.mockImplementation();

				return {
					videoconferenceApi,
					videoConferenceOptions,
				};
			};

			it("should call apiMock.videoConferenceControllerStart", async () => {
				const { videoConferenceOptions, videoconferenceApi } = setup();

				await module.startVideoConference({
					scopeId: "scopeId",
					scope: VideoConferenceScope.Course,
					videoConferenceOptions,
				});

				expect(
					videoconferenceApi.videoConferenceControllerStart
				).toHaveBeenCalledWith(
					VideoConferenceScope.Course,
					"scopeId",
					videoConferenceOptions
				);
			});
		});

		describe("when the api returns an error", () => {
			const setup = () => {
				const { videoconferenceApi } = mockApi();

				const error = new AxiosError();

				const videoConferenceOptions: VideoConferenceOptions = {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: true,
					everybodyJoinsAsModerator: false,
				};

				videoconferenceApi.videoConferenceControllerStart.mockRejectedValue(
					error
				);

				return {
					error,
					videoConferenceOptions,
				};
			};

			it("should update the stores error", async () => {
				const { error, videoConferenceOptions } = setup();

				await module.startVideoConference({
					scopeId: "scopeId",
					scope: VideoConferenceScope.Course,
					videoConferenceOptions,
				});

				expect(module.getError).toEqual(error);
			});
		});
	});
});
