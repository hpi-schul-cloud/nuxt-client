import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosPromise } from "axios";
import * as serverApi from "@/serverApi/v3/api";
import { useVideoConference } from "./VideoConference.composable";
import {
	VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3/api";
import { VideoConferenceState } from "@/store/types/video-conference";

let videoConferenceApi: DeepMocked<serverApi.VideoConferenceApiInterface>;

describe("VideoConferenceComposable", () => {
	beforeEach(() => {
		videoConferenceApi = createMock<serverApi.VideoConferenceApiInterface>();

		vi.spyOn(serverApi, "VideoConferenceApiFactory").mockReturnValue(
			videoConferenceApi
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchVideoConferenceInfo", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					state: VideoConferenceStateResponse.Running,
					options: {
						everyAttendeeJoinsMuted: true,
						everybodyJoinsAsModerator: false,
						moderatorMustApproveJoinRequests: true,
					},
				},
			};

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
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<VideoConferenceInfoResponse>
			);

			await fetchVideoConferenceInfo();

			expect(videoConferenceInfo.value.state).toBe(
				VideoConferenceState.RUNNING
			);
			expect(videoConferenceInfo.value.options).toEqual(
				FAKE_RESPONSE.data.options
			);
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
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";

			const { fetchVideoConferenceInfo, error } = useVideoConference(
				scope,
				scopeId
			);

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
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { startVideoConference, error } = useVideoConference(
				scope,
				scopeId
			);
			const logoutUrl = "https://logout.url";
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
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const mockError = new Error("API call failed");

			videoConferenceApi.videoConferenceControllerJoin.mockRejectedValueOnce(
				mockError
			);
			const { joinVideoConference, error } = useVideoConference(scope, scopeId);

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

	describe("isRunning", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";

			const { isRunning, videoConferenceInfo } = useVideoConference(
				scope,
				scopeId
			);

			return {
				isRunning,
				videoConferenceInfo,
			};
		};

		it("should return true when video conference state is RUNNING", () => {
			const { isRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.RUNNING;

			expect(isRunning.value).toBe(true);
		});

		it("should return false when video conference state is NOT_STARTED", () => {
			const { isRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.NOT_STARTED;

			expect(isRunning.value).toBe(false);
		});

		it("should return false when video conference state is UNKNOWN", () => {
			const { isRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.UNKNOWN;

			expect(isRunning.value).toBe(false);
		});
	});

	describe("isWaitingRoomActive", () => {
		const setup = () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";

			const { isWaitingRoomActive, videoConferenceInfo } = useVideoConference(
				scope,
				scopeId
			);

			return {
				isWaitingRoomActive,
				videoConferenceInfo,
			};
		};

		it("should return true when moderatorMustApproveJoinRequests is true", () => {
			const { isWaitingRoomActive, videoConferenceInfo } = setup();
			videoConferenceInfo.value.options.moderatorMustApproveJoinRequests = true;

			expect(isWaitingRoomActive.value).toBe(true);
		});

		it("should return false when moderatorMustApproveJoinRequests is false", () => {
			const { isWaitingRoomActive, videoConferenceInfo } = setup();
			videoConferenceInfo.value.options.moderatorMustApproveJoinRequests =
				false;

			expect(isWaitingRoomActive.value).toBe(false);
		});
	});
});
