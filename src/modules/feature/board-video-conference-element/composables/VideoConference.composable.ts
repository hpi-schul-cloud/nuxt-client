import {
	VideoConferenceApiFactory,
	VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3";
import { VideoConferenceInfo, VideoConferenceOptions, VideoConferenceState } from "@/store/types/video-conference";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { computed, ref } from "vue";

const videoConferenceStateMapping: Partial<Record<VideoConferenceStateResponse, VideoConferenceState>> = {
	[VideoConferenceStateResponse.Running]: VideoConferenceState.RUNNING,
	[VideoConferenceStateResponse.NotStarted]: VideoConferenceState.NOT_STARTED,
};

export const useVideoConference = (scope: VideoConferenceScope, scopeId: string) => {
	const videoConferenceApi = VideoConferenceApiFactory(undefined, "v3", $axios);

	const videoConferenceInfo = ref<VideoConferenceInfo>({
		state: VideoConferenceState.NOT_STARTED,
		options: {
			everyAttendeeJoinsMuted: false,
			everybodyJoinsAsModerator: false,
			moderatorMustApproveJoinRequests: true,
		},
	});

	const loading = ref(false);
	const error = ref<unknown | null>(null);

	const isRunning = computed(() => videoConferenceInfo.value.state === VideoConferenceState.RUNNING);
	const isWaitingRoomActive = computed(() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests);

	const fetchVideoConferenceInfo = async () => {
		loading.value = true;
		try {
			const response: AxiosResponse<VideoConferenceInfoResponse> =
				await videoConferenceApi.videoConferenceControllerInfo(scope, scopeId);
			videoConferenceInfo.value = {
				state: videoConferenceStateMapping[response.data.state] ?? VideoConferenceState.UNKNOWN,
				options: response.data.options,
			};
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	const startVideoConference = async (options: VideoConferenceOptions, logoutUrl?: string) => {
		loading.value = true;
		try {
			await videoConferenceApi.videoConferenceControllerStart(scope, scopeId, {
				...options,
				logoutUrl,
			});

			videoConferenceInfo.value = {
				state: VideoConferenceState.RUNNING,
				options,
			};
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	const joinVideoConference = async (): Promise<string | undefined> => {
		loading.value = true;
		try {
			const response: AxiosResponse<VideoConferenceJoinResponse> =
				await videoConferenceApi.videoConferenceControllerJoin(scope, scopeId);
			return response.data.url;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	const resetError = () => {
		error.value = null;
	};

	return {
		videoConferenceInfo,
		loading,
		error,
		isRunning,
		isWaitingRoomActive,
		fetchVideoConferenceInfo,
		startVideoConference,
		joinVideoConference,
		resetError,
	};
};
