import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosPromise } from "axios";
import * as serverApi from "@/serverApi/v3/api";
import { useVideoConference } from "./VideoConference.composable";
import {
	VideoConferenceInfoResponse,
	// VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3/api";
import { VideoConferenceState } from "@/store/types/video-conference";

let videoConferenceApi: DeepMocked<serverApi.VideoConferenceApiInterface>;

describe("VideoConferenceComposable", () => {
	beforeEach(() => {
		videoConferenceApi = createMock<serverApi.VideoConferenceApiInterface>();

		jest
			.spyOn(serverApi, "VideoConferenceApiFactory")
			.mockReturnValue(videoConferenceApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchVideoConferenceInfo", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";

			const FAKE_RESPONSE = {
				state: VideoConferenceStateResponse.Running,
				options: {
					everyAttendeeJoinsMuted: true,
					everybodyJoinsAsModerator: false,
					moderatorMustApproveJoinRequests: true,
				},
			};
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<VideoConferenceInfoResponse>
			);

			const { fetchVideoConferenceInfo, error, videoConferenceInfo } =
				useVideoConference(scope, scopeId);

			return {
				scope,
				scopeId,
				FAKE_RESPONSE,
				fetchVideoConferenceInfo,
				error,
				videoConferenceInfo,
			};
		};

		it("should call videoConferenceControllerInfo api with params", async () => {
			const { scope, scopeId, fetchVideoConferenceInfo } = setup();

			await fetchVideoConferenceInfo();

			expect(
				videoConferenceApi.videoConferenceControllerInfo
			).toHaveBeenCalledWith(scope, scopeId);
		});

		it("should update videoConferenceInfo state with the response data", async () => {
			const { fetchVideoConferenceInfo, videoConferenceInfo, FAKE_RESPONSE } =
				setup();

			await fetchVideoConferenceInfo();

			expect(videoConferenceInfo.value.state).toBe(
				VideoConferenceState.RUNNING
			);
			expect(videoConferenceInfo.value.options).toEqual(FAKE_RESPONSE.options);
		});

		it("should set state to unknown if the response state is not recognized", async () => {
			const { fetchVideoConferenceInfo, videoConferenceInfo } = setup();
			const FAKE_RESPONSE = {
				status: 200,
				data: {
					state: "bla-bla",
					options: {
						everyAttendeeJoinsMuted: true,
						everybodyJoinsAsModerator: false,
						moderatorMustApproveJoinRequests: true,
					},
				},
			};
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<VideoConferenceInfoResponse>
			);

			await fetchVideoConferenceInfo();

			expect(videoConferenceInfo.value.state).toBe(
				VideoConferenceState.UNKNOWN
			);
		});

		it("should set error if the API call fails", async () => {
			const { scope, scopeId, fetchVideoConferenceInfo, error } = setup();

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerInfo.mockRejectedValueOnce(
				mockError
			);

			await fetchVideoConferenceInfo();

			expect(
				videoConferenceApi.videoConferenceControllerInfo
			).toHaveBeenCalledWith(scope, scopeId);
			expect(error.value).toBe(mockError);
		});
	});

	describe("startVideoConference", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { startVideoConference, videoConferenceInfo, error } =
				useVideoConference(scope, scopeId);
			const url = "https://example.com";
			const logoutUrl = "https://logout.url";
			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					url,
				},
			};
			videoConferenceApi.videoConferenceControllerStart.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise
			);
			return {
				scope,
				scopeId,
				startVideoConference,
				videoConferenceInfo,
				error,
				url,
				logoutUrl,
				options,
			};
		};

		it("should call videoConferenceControllerStart api", async () => {
			const { scope, scopeId, startVideoConference, logoutUrl, options } =
				setup();

			await startVideoConference(options, logoutUrl);

			expect(
				videoConferenceApi.videoConferenceControllerStart
			).toHaveBeenCalledWith(scope, scopeId, {
				...options,
				logoutUrl,
			});
		});
		it("should update videoConferenceInfo", async () => {
			const { startVideoConference, videoConferenceInfo, logoutUrl } = setup();
			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			await startVideoConference(options, logoutUrl);

			expect(videoConferenceInfo.value.state).toBe(
				VideoConferenceState.RUNNING
			);
			expect(videoConferenceInfo.value.options).toEqual(options);
		});
		it("should set error to null", async () => {
			const { startVideoConference, error, logoutUrl } = setup();

			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			await startVideoConference(options, logoutUrl);

			expect(error.value).toBeNull();
		});
		it("should set error if the API call fails", async () => {
			const { startVideoConference, error, logoutUrl } = setup();

			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerStart.mockRejectedValueOnce(
				mockError
			);

			await startVideoConference(options, logoutUrl);

			expect(error.value).toBe(mockError);
		});
	});

	describe("joinVideoConference", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const url = "https://example.com";

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					url,
				},
			};
			videoConferenceApi.videoConferenceControllerJoin.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<VideoConferenceJoinResponse>
			);

			const { joinVideoConference, error } = useVideoConference(scope, scopeId);

			return {
				scope,
				scopeId,
				joinVideoConference,
				error,
				url,
			};
		};
		it("should call videoConferenceControllerJoin api with params", async () => {
			const { scope, scopeId, joinVideoConference } = setup();

			await joinVideoConference();

			expect(
				videoConferenceApi.videoConferenceControllerJoin
			).toHaveBeenCalledWith(scope, scopeId);
		});
		it("should return the URL", async () => {
			const { joinVideoConference, url } = setup();

			const returnUrl = await joinVideoConference();

			expect(url).toBe(returnUrl);
		});
		it("should set error to null", async () => {
			const { joinVideoConference, error } = setup();

			await joinVideoConference();

			expect(error.value).toBeNull();
		});
		it("should set error if the API call fails", async () => {
			const { scope, scopeId } = setup();
			const { joinVideoConference, error } = useVideoConference(scope, scopeId);

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerJoin.mockRejectedValueOnce(
				mockError
			);

			const url = await joinVideoConference();

			expect(url).toBeUndefined();
			expect(error.value).toBe(mockError);
		});
	});

	describe("resetError", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { error, resetError } = useVideoConference(scope, scopeId);

			error.value = new Error("Test error");

			return {
				error,
				resetError,
			};
		};
		it("should set error to null", () => {
			const { error, resetError } = setup();

			resetError();
			expect(error.value).toBeNull();
		});
	});
});
