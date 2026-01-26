<template>
	<div>
		<RoomVideoConferenceCard
			:has-permission="hasPermission"
			:can-start="canStart"
			:is-running="isRunning"
			:is-refreshing="isRefreshing"
			data-testid="video-conference-card"
			@click="onClick"
			@refresh="onRefresh"
		/>
		<Dialog
			:model-value="isErrorDialogOpen"
			no-confirm
			title="error.generic"
			cancel-btn-lang-key="common.labels.close"
			data-testid="error-dialog"
			@cancel="onCloseErrorDialog"
		/>
		<VideoConferenceConfigurationDialog
			v-model="isConfigurationDialogOpen"
			:options="videoConferenceOptions"
			@start-video-conference="startVideoConference"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { Permission, VideoConferenceJoinResponse, VideoConferenceScope } from "@/serverApi/v3";
import { VideoConferenceState } from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import { injectStrict, VIDEO_CONFERENCE_MODULE_KEY } from "@/utils/inject";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { Dialog } from "@ui-dialog";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, ComputedRef, onMounted, ref } from "vue";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { hasPermission: hasAuthPermission } = useAppStore();
const { isExternalPerson, userRoles } = useAppStoreRefs();

const videoConferenceModule: VideoConferenceModule = injectStrict(VIDEO_CONFERENCE_MODULE_KEY);

const videoConferenceInfo = computed(() => videoConferenceModule.getVideoConferenceInfo);

const isWaitingRoomActive = computed(() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests);

const isRunning = computed(() => videoConferenceInfo.value.state === VideoConferenceState.RUNNING);

const isRefreshing = computed(() => videoConferenceModule.getLoading);

const canJoinMeeting = hasAuthPermission(Permission.JoinMeeting);
const canStart = hasAuthPermission(Permission.StartMeeting);
const canJoin = computed(
	() => canJoinMeeting.value && (!isExternalPerson.value || userRoles.value.length > 1 || isWaitingRoomActive.value)
);

const hasPermission = computed(() => canJoin.value || canStart.value);

const isConfigurationDialogOpen = ref(false);

const videoConferenceOptions = computed(() => videoConferenceModule.getVideoConferenceInfo.options);

onMounted(async () => {
	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.Course,
		scopeId: props.roomId,
	});
});

const onRefresh = async () => {
	if (isRefreshing.value) {
		return;
	}

	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.Course,
		scopeId: props.roomId,
	});
};

const onClick = async () => {
	if (videoConferenceInfo.value.state === VideoConferenceState.NOT_STARTED && canStart.value) {
		isConfigurationDialogOpen.value = true;
	}

	if (videoConferenceInfo.value.state === VideoConferenceState.RUNNING && canJoin.value) {
		await joinVideoConference();
	}
};

const startVideoConference = async () => {
	const logoutUrl: URL = new URL(`/rooms/${props.roomId}`, window.location.origin);
	logoutUrl.searchParams.append("tab", "tools");

	await videoConferenceModule.startVideoConference({
		scope: VideoConferenceScope.Course,
		scopeId: props.roomId,
		videoConferenceOptions: videoConferenceOptions.value,
		logoutUrl: logoutUrl.toString(),
	});

	await joinVideoConference();
};

const joinVideoConference = async () => {
	const videoConferenceUrl: VideoConferenceJoinResponse | undefined = await videoConferenceModule.joinVideoConference({
		scope: VideoConferenceScope.Course,
		scopeId: props.roomId,
	});

	if (videoConferenceUrl) {
		window.open(videoConferenceUrl.url, "_self");
	}
};

const isErrorDialogOpen: ComputedRef<boolean> = computed(() => videoConferenceModule.getError !== null);

const onCloseErrorDialog = () => {
	videoConferenceModule.resetError();
};
</script>
