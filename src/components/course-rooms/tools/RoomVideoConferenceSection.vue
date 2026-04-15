<template>
	<div>
		<RoomVideoConferenceCard
			:has-permission="hasPermission"
			:can-start="canStart"
			:is-running="isConferenceRunning"
			:is-refreshing="isLoading"
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
			@cancel="errorDismissed = true"
		/>
		<VideoConferenceConfigurationDialog
			v-model:is-open="isConfigurationDialogOpen"
			:options="videoConferenceInfo.options"
			@start-video-conference="startVideoConferenceAndJoin"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { Permission, VideoConferenceScope, VideoConferenceStateResponse } from "@api-server";
import { useVideoConference } from "@data-access";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { SvsDialog } from "@ui-dialog";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, ref, toRef } from "vue";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { hasPermission: hasAuthPermission } = useAppStore();
const { isExternalPerson, userRoles } = useAppStoreRefs();
const roomId = toRef(props, "roomId");

const {
	videoConferenceInfo,
	isLoading,
	fetchError,
	startError,
	joinError,
	isConferenceRunning,
	isWaitingRoomActive,
	fetchVideoConferenceInfo,
	startVideoConference,
	joinVideoConference,
} = useVideoConference(VideoConferenceScope.COURSE, roomId.value);

const canJoinMeeting = hasAuthPermission(Permission.JOIN_MEETING);
const canStart = hasAuthPermission(Permission.START_MEETING);
const canJoin = computed(
	() => canJoinMeeting.value && (!isExternalPerson.value || userRoles.value.length > 1 || isWaitingRoomActive.value)
);
const hasPermission = computed(() => canJoin.value || canStart.value);

const errorDismissed = ref(false);

const isErrorDialogOpen = computed(
	() => (!!fetchError.value || !!startError.value || !!joinError.value) && !errorDismissed.value
);

const isConfigurationDialogOpen = ref(false);

const onRefresh = async () => {
	if (isLoading.value) return;
	errorDismissed.value = false;
	await fetchVideoConferenceInfo();
};

const onClick = async () => {
	if (videoConferenceInfo.value.state === VideoConferenceStateResponse.NOT_STARTED && canStart.value) {
		isConfigurationDialogOpen.value = true;
	}
	if (videoConferenceInfo.value.state === VideoConferenceStateResponse.RUNNING && canJoin.value) {
		await doJoinVideoConference();
	}
};

const startVideoConferenceAndJoin = async () => {
	isConfigurationDialogOpen.value = false;
	errorDismissed.value = false;
	await startVideoConference(videoConferenceInfo.value.options);

	if (!startError.value) {
		await doJoinVideoConference();
	}
};

const doJoinVideoConference = async () => {
	const joinTaskResult = await joinVideoConference();
	const videoConferenceUrl = joinTaskResult?.result?.data.url;
	if (videoConferenceUrl) {
		window.open(videoConferenceUrl, "_self");
	}
};
</script>
