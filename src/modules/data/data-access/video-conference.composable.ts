import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import {
	VideoConferenceApiFactory,
	VideoConferenceInfoResponse,
	VideoConferenceOptionsResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@api-server";
import { computed, onMounted, ref } from "vue";

export const useVideoConference = (scope: VideoConferenceScope, scopeId: string, fetchImmediate = true) => {
	const { t } = useI18nGlobal();
	const videoConferenceApi = VideoConferenceApiFactory(undefined, "v3", $axios);

	const videoConferenceInfo = ref<VideoConferenceInfoResponse>({
		state: VideoConferenceStateResponse.NOT_STARTED,
		options: {
			everyAttendeeJoinsMuted: false,
			everybodyJoinsAsModerator: false,
			moderatorMustApproveJoinRequests: true,
		},
	});

	const { execute: execFetch, isRunning: isFetching, error: fetchError } = useSafeAxiosTask();

	const { execute: execStart, isRunning: isStarting, error: startError } = useSafeAxiosTask();

	const { execute: execJoin, isRunning: isJoining, error: joinError } = useSafeAxiosTask();

	const isConferenceRunning = computed(() => videoConferenceInfo.value.state === VideoConferenceStateResponse.RUNNING);
	const isWaitingRoomActive = computed(() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests);

	const isLoading = computed(() => isFetching.value || isStarting.value || isJoining.value);

	const fetchVideoConferenceInfo = async () => {
		const { result, success } = await execFetch(
			() => videoConferenceApi.videoConferenceControllerInfo(scope, scopeId),
			t("common.notification.error.videoConference.notFetched")
		);
		if (success && result) {
			videoConferenceInfo.value = {
				state: result.data.state,
				options: result.data.options,
			};
			return result;
		}
	};

	const startVideoConference = async (options: VideoConferenceOptionsResponse) => {
		const { success } = await execStart(
			() => videoConferenceApi.videoConferenceControllerStart(scope, scopeId, { ...options }),
			t("common.notification.error.videoConference.notStarted")
		);
		if (success) {
			videoConferenceInfo.value = { state: VideoConferenceStateResponse.RUNNING, options };
		}
	};

	const joinVideoConference = async () =>
		await execJoin(
			() => videoConferenceApi.videoConferenceControllerJoin(scope, scopeId),
			t("common.notification.error.videoConference.notJoined")
		);

	if (fetchImmediate) {
		onMounted(fetchVideoConferenceInfo);
	}

	return {
		videoConferenceInfo,
		isLoading,
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
