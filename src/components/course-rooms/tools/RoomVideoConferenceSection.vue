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
		<SvsDialog
			:model-value="isErrorDialogOpen"
			title="error.generic"
			data-testid="error-dialog"
			no-confirm
			cancel-btn-lang-key="common.labels.close"
			@cancel="videoConferenceModule.resetError"
		/>
		<VideoConferenceConfigurationDialog
			v-model:is-open="isConfigurationDialogOpen"
			:options="videoConferenceOptions"
			@start-video-conference="startVideoConference"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { VideoConferenceState } from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import { injectStrict, VIDEO_CONFERENCE_MODULE_KEY } from "@/utils/inject";
import { Permission, VideoConferenceJoinResponse, VideoConferenceScope } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { SvsDialog } from "@ui-dialog";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, onMounted, ref } from "vue";

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

const canJoinMeeting = hasAuthPermission(Permission.JOIN_MEETING);
const canStart = hasAuthPermission(Permission.START_MEETING);
const canJoin = computed(
	() => canJoinMeeting.value && (!isExternalPerson.value || userRoles.value.length > 1 || isWaitingRoomActive.value)
);

const hasPermission = computed(() => canJoin.value || canStart.value);

const isConfigurationDialogOpen = ref(false);

const videoConferenceOptions = computed(() => videoConferenceModule.getVideoConferenceInfo.options);

onMounted(async () => {
	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.COURSE,
		scopeId: props.roomId,
	});
});

const onRefresh = async () => {
	if (isRefreshing.value) {
		return;
	}

	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.COURSE,
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
	await videoConferenceModule.startVideoConference({
		scope: VideoConferenceScope.COURSE,
		scopeId: props.roomId,
		videoConferenceOptions: videoConferenceOptions.value,
	});

	await joinVideoConference();
};

const joinVideoConference = async () => {
	const videoConferenceUrl: VideoConferenceJoinResponse | undefined = await videoConferenceModule.joinVideoConference({
		scope: VideoConferenceScope.COURSE,
		scopeId: props.roomId,
	});

	if (videoConferenceUrl) {
		window.open(videoConferenceUrl.url, "_self");
	}
};

const isErrorDialogOpen = computed(() => videoConferenceModule.getError !== null);
</script>
