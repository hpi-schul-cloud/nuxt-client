import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosPromise, AxiosResponse } from "axios";
import * as serverApi from "@/serverApi/v3/api";
import { useVideoConference } from "./VideoConference.composable";
import {
	VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3/api";

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
		it("should call videoConferenceControllerInfo api with params", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { fetchVideoConferenceInfo } = useVideoConference(scope, scopeId);

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
			videoConferenceApi.videoConferenceControllerStart.mockResolvedValue(
				FAKE_RESPONSE as unknown as AxiosPromise
			);

			await fetchVideoConferenceInfo();
			expect(
				videoConferenceApi.videoConferenceControllerInfo
			).toHaveBeenCalledWith(scope, scopeId);
		});

		it("should set error if the API call fails", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { fetchVideoConferenceInfo, error } = useVideoConference(
				scope,
				scopeId
			);

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerInfo.mockRejectedValue(
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
		it("should call videoConferenceControllerStart api and update videoConferenceInfo", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { startVideoConference, videoConferenceInfo, error } =
				useVideoConference(scope, scopeId);

			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					url: "https://example.com",
				},
			};
			videoConferenceApi.videoConferenceControllerStart.mockResolvedValue(
				FAKE_RESPONSE as unknown as AxiosPromise
			);

			await startVideoConference(options, "https://logout.url");

			expect(
				videoConferenceApi.videoConferenceControllerStart
			).toHaveBeenCalledWith(scope, scopeId, {
				...options,
				logoutUrl: "https://logout.url",
			});
			expect(videoConferenceInfo.value.state).toBe("RUNNING");
			expect(videoConferenceInfo.value.options).toEqual(options);
			expect(error.value).toBeNull();
		});

		it("should set error if the API call fails", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { startVideoConference, error } = useVideoConference(
				scope,
				scopeId
			);

			const options = {
				everyAttendeeJoinsMuted: true,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			};

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerStart.mockRejectedValue(
				mockError
			);

			await startVideoConference(options, "https://logout.url");

			expect(
				videoConferenceApi.videoConferenceControllerStart
			).toHaveBeenCalledWith(scope, scopeId, {
				...options,
				logoutUrl: "https://logout.url",
			});
			expect(error.value).toBe(mockError);
		});
	});

	describe("joinVideoConference", () => {
		it("should call videoConferenceControllerJoin api and return the URL", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { joinVideoConference, error } = useVideoConference(scope, scopeId);

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					url: "https://example.com",
				},
			};
			videoConferenceApi.videoConferenceControllerJoin.mockResolvedValue(
				FAKE_RESPONSE as unknown as AxiosPromise<VideoConferenceJoinResponse>
			);

			const url = await joinVideoConference();
			expect(
				videoConferenceApi.videoConferenceControllerJoin
			).toHaveBeenCalledWith(scope, scopeId);
			expect(url).toBe("https://example.com");
			expect(error.value).toBeNull();
		});

		it("should set error if the API call fails", async () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { joinVideoConference, error } = useVideoConference(scope, scopeId);

			const mockError = new Error("API call failed");
			videoConferenceApi.videoConferenceControllerJoin.mockRejectedValue(
				mockError
			);

			const url = await joinVideoConference();
			expect(
				videoConferenceApi.videoConferenceControllerJoin
			).toHaveBeenCalledWith(scope, scopeId);
			expect(url).toBeUndefined();
			expect(error.value).toBe(mockError);
		});
	});

	describe("resetError", () => {
		it("should set error to null", () => {
			const scope = VideoConferenceScope.Room;
			const scopeId = "123124";
			const { error, resetError } = useVideoConference(scope, scopeId);

			error.value = new Error("Test error");
			resetError();
			expect(error.value).toBeNull();
		});
	});
});
