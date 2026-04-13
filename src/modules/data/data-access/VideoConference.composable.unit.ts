import { useVideoConference } from "./VideoConference.composable";
import { VideoConferenceState } from "@/store/types/video-conference";
import { mockApi } from "@@/tests/test-utils/mockApiFactory";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import * as serverApi from "@api-server";
import {
	VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

let videoConferenceApi: Mocked<serverApi.VideoConferenceApiInterface>;

describe("VideoConferenceComposable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		videoConferenceApi = mockApi<serverApi.VideoConferenceApiInterface>();
		vi.spyOn(serverApi, "VideoConferenceApiFactory").mockReturnValue(videoConferenceApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchVideoConferenceInfo", () => {
		const setup = () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";

			const FAKE_RESPONSE = mockApiResponse<VideoConferenceInfoResponse>({
				status: 200,
				data: {
					state: VideoConferenceStateResponse.RUNNING,
					options: {
						everyAttendeeJoinsMuted: true,
						everybodyJoinsAsModerator: false,
						moderatorMustApproveJoinRequests: true,
					},
				},
			});

			const { fetchVideoConferenceInfo, fetchError, videoConferenceInfo } = useVideoConference(scope, scopeId);

			return { scope, scopeId, FAKE_RESPONSE, fetchVideoConferenceInfo, fetchError, videoConferenceInfo };
		};

		it("should call videoConferenceControllerInfo api with params", async () => {
			const { scope, scopeId, fetchVideoConferenceInfo } = setup();

			await fetchVideoConferenceInfo();

			expect(videoConferenceApi.videoConferenceControllerInfo).toHaveBeenCalledWith(scope, scopeId);
		});

		it("should update videoConferenceInfo state with the response data", async () => {
			const { fetchVideoConferenceInfo, videoConferenceInfo, FAKE_RESPONSE } = setup();
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(FAKE_RESPONSE);

			await fetchVideoConferenceInfo();

			expect(videoConferenceInfo.value.state).toBe(VideoConferenceState.RUNNING);
			expect(videoConferenceInfo.value.options).toEqual(FAKE_RESPONSE.data.options);
		});

		it("should set state to unknown if the response state is not recognized", async () => {
			const { fetchVideoConferenceInfo, videoConferenceInfo } = setup();
			const FAKE_RESPONSE = mockApiResponse<VideoConferenceInfoResponse>({
				status: 200,
				data: {
					state: "bla-bla" as VideoConferenceStateResponse,
					options: {
						everyAttendeeJoinsMuted: true,
						everybodyJoinsAsModerator: false,
						moderatorMustApproveJoinRequests: true,
					},
				},
			});
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(FAKE_RESPONSE);

			await fetchVideoConferenceInfo();

			expect(videoConferenceInfo.value.state).toBe(VideoConferenceState.UNKNOWN);
		});

		it("should set fetchError if the API call fails", async () => {
			const { fetchVideoConferenceInfo, fetchError } = setup();
			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerInfo.mockRejectedValueOnce(mockError);

			await fetchVideoConferenceInfo();

			expect(fetchError.value).toBe(mockError);
		});

		it("should have no fetchError after a successful call", async () => {
			const { fetchVideoConferenceInfo, fetchError, FAKE_RESPONSE } = setup();
			videoConferenceApi.videoConferenceControllerInfo.mockResolvedValueOnce(FAKE_RESPONSE);

			await fetchVideoConferenceInfo();

			expect(fetchError.value).toBeUndefined();
		});
	});

	describe("startVideoConference", () => {
		const setup = () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";
			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};
			const { startVideoConference, videoConferenceInfo, startError } = useVideoConference(scope, scopeId);

			return { scope, scopeId, startVideoConference, videoConferenceInfo, startError, options };
		};

		it("should call videoConferenceControllerStart api with params", async () => {
			const { scope, scopeId, startVideoConference, options } = setup();

			await startVideoConference(options);

			expect(videoConferenceApi.videoConferenceControllerStart).toHaveBeenCalledWith(scope, scopeId, { ...options });
		});

		it("should update videoConferenceInfo on success", async () => {
			const { startVideoConference, videoConferenceInfo, options } = setup();

			await startVideoConference(options);

			expect(videoConferenceInfo.value.state).toBe(VideoConferenceState.RUNNING);
			expect(videoConferenceInfo.value.options).toEqual(options);
		});

		it("should have no startError after a successful call", async () => {
			const { startVideoConference, startError, options } = setup();

			await startVideoConference(options);

			expect(startError.value).toBeUndefined();
		});

		it("should set startError if the API call fails", async () => {
			const { startVideoConference, startError, options } = setup();
			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerStart.mockRejectedValueOnce(mockError);

			await startVideoConference(options);

			expect(startError.value).toBe(mockError);
		});

		it("should not update videoConferenceInfo if the API call fails", async () => {
			const { startVideoConference, videoConferenceInfo, options } = setup();
			videoConferenceApi.videoConferenceControllerStart.mockRejectedValueOnce(new Error());
			const stateBefore = videoConferenceInfo.value.state;

			await startVideoConference(options);

			expect(videoConferenceInfo.value.state).toBe(stateBefore);
		});
	});

	describe("joinVideoConference", () => {
		const setup = () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";
			const url = "https://example.com";

			const FAKE_RESPONSE = mockApiResponse<VideoConferenceJoinResponse>({
				status: 200,
				data: { url },
			});

			videoConferenceApi.videoConferenceControllerJoin.mockResolvedValueOnce(FAKE_RESPONSE);

			const { joinVideoConference, joinError } = useVideoConference(scope, scopeId);

			return { scope, scopeId, joinVideoConference, joinError, url };
		};

		it("should call videoConferenceControllerJoin api with params", async () => {
			const { scope, scopeId, joinVideoConference } = setup();

			await joinVideoConference();

			expect(videoConferenceApi.videoConferenceControllerJoin).toHaveBeenCalledWith(scope, scopeId);
		});

		it("should return the URL on success", async () => {
			const { joinVideoConference, url } = setup();

			const taskResult = await joinVideoConference();
			const returnUrl = taskResult.result?.data.url;

			expect(returnUrl).toBe(url);
		});

		it("should have no joinError after a successful call", async () => {
			const { joinVideoConference, joinError } = setup();

			await joinVideoConference();

			expect(joinError.value).toBeUndefined();
		});

		it("should set joinError and return undefined if the API call fails", async () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";
			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerJoin.mockRejectedValueOnce(mockError);

			const { joinVideoConference, joinError } = useVideoConference(scope, scopeId);
			const taskResult = await joinVideoConference();
			const url = taskResult.result?.data.url;

			expect(url).toBeUndefined();
			expect(joinError.value).toBe(mockError);
		});
	});

	describe("isConferenceRunning", () => {
		const setup = () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";
			const { isConferenceRunning, videoConferenceInfo } = useVideoConference(scope, scopeId);

			return { isConferenceRunning, videoConferenceInfo };
		};

		it("should return true when video conference state is RUNNING", () => {
			const { isConferenceRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.RUNNING;

			expect(isConferenceRunning.value).toBe(true);
		});

		it("should return false when video conference state is NOT_STARTED", () => {
			const { isConferenceRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.NOT_STARTED;

			expect(isConferenceRunning.value).toBe(false);
		});

		it("should return false when video conference state is UNKNOWN", () => {
			const { isConferenceRunning, videoConferenceInfo } = setup();
			videoConferenceInfo.value.state = VideoConferenceState.UNKNOWN;

			expect(isConferenceRunning.value).toBe(false);
		});
	});

	describe("isWaitingRoomActive", () => {
		const setup = () => {
			const scope = VideoConferenceScope.ROOM;
			const scopeId = "123124";
			const { isWaitingRoomActive, videoConferenceInfo } = useVideoConference(scope, scopeId);

			return { isWaitingRoomActive, videoConferenceInfo };
		};

		it("should return true when moderatorMustApproveJoinRequests is true", () => {
			const { isWaitingRoomActive, videoConferenceInfo } = setup();
			videoConferenceInfo.value.options.moderatorMustApproveJoinRequests = true;

			expect(isWaitingRoomActive.value).toBe(true);
		});

		it("should return false when moderatorMustApproveJoinRequests is false", () => {
			const { isWaitingRoomActive, videoConferenceInfo } = setup();
			videoConferenceInfo.value.options.moderatorMustApproveJoinRequests = false;

			expect(isWaitingRoomActive.value).toBe(false);
		});
	});
});
