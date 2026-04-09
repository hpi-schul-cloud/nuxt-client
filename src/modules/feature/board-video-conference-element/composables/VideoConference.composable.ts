import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { VideoConferenceInfo, VideoConferenceOptions, VideoConferenceState } from "@/store/types/video-conference";
import { $axios } from "@/utils/api";
import { VideoConferenceApiFactory, VideoConferenceScope, VideoConferenceStateResponse } from "@api-server";
import { computed, ref } from "vue";

const videoConferenceStateMapping: Partial<Record<VideoConferenceStateResponse, VideoConferenceState>> = {
	[VideoConferenceStateResponse.RUNNING]: VideoConferenceState.RUNNING,
	[VideoConferenceStateResponse.NOT_STARTED]: VideoConferenceState.NOT_STARTED,
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

	const { execute: execFetch, isRunning: isFetching, error: fetchError } = useSafeAxiosTask();

	const { execute: execStart, isRunning: isStarting, error: startError } = useSafeAxiosTask();

	const { execute: execJoin, isRunning: isJoining, error: joinError } = useSafeAxiosTask();

	const isConferenceRunning = computed(() => videoConferenceInfo.value.state === VideoConferenceState.RUNNING);
	const isWaitingRoomActive = computed(() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests);

	// not sure yet if needed
	const loading = computed(() => isFetching.value || isStarting.value || isJoining.value);

	const fetchVideoConferenceInfo = async () => {
		const { result, success } = await execFetch(
			() => videoConferenceApi.videoConferenceControllerInfo(scope, scopeId),
			"error.fetch-video-conference"
		);
		if (success && result) {
			videoConferenceInfo.value = {
				state: videoConferenceStateMapping[result.data.state] ?? VideoConferenceState.UNKNOWN,
				options: result.data.options,
			};
		}
	};

	const startVideoConference = async (options: VideoConferenceOptions) => {
		const { success } = await execStart(
			() => videoConferenceApi.videoConferenceControllerStart(scope, scopeId, { ...options }),
			"error.start-video-conference"
		);
		if (success) {
			videoConferenceInfo.value = { state: VideoConferenceState.RUNNING, options };
		}
	};

	const joinVideoConference = async (): Promise<string | undefined> => {
		const { result, success } = await execJoin(
			() => videoConferenceApi.videoConferenceControllerJoin(scope, scopeId),
			"error.join-video-conference"
		);
		if (success && result) {
			return result.data.url;
		}
	};

	return {
		videoConferenceInfo,
		loading,
		isFetching,
		isStarting,
		isJoining,
		fetchError,
		startError,
		joinError,
		isConferenceRunning,
		isWaitingRoomActive,
		fetchVideoConferenceInfo,
		startVideoConference,
		joinVideoConference,
	};
};
