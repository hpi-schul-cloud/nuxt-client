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
		<VDialog
			ref="vDialog"
			v-model="isErrorDialogOpen"
			:max-width="480"
			data-testid="error-dialog"
			@click:outside="onCloseErrorDialog"
			@keydown.esc="onCloseErrorDialog"
		>
			<VCard :ripple="false">
				<VCardTitle data-testid="dialog-title" class="dialog-title px-6 pt-4">
					<h2 class="my-2 text-break-word">
						{{ t("error.generic") }}
					</h2>
				</VCardTitle>
				<VCardActions class="action-buttons px-6">
					<div class="button-section button-right">
						<VBtn data-testid="dialog-close" variant="outlined" @click="onCloseErrorDialog">
							{{ t("common.labels.close") }}
						</VBtn>
					</div>
				</VCardActions>
			</VCard>
		</VDialog>
		<VideoConferenceConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:options="videoConferenceInfo.options"
			@close="onCloseConfigurationDialog"
			@start-video-conference="startVideoConferenceAndJoin"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { Permission, VideoConferenceScope, VideoConferenceStateResponse } from "@api-server";
import { useVideoConference } from "@data-access";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
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

const onCloseErrorDialog = () => {
	errorDismissed.value = true;
};

const isConfigurationDialogOpen = ref(false);

const onRefresh = async () => {
	if (isLoading.value) return;
	errorDismissed.value = false;
	await fetchVideoConferenceInfo();
};

const onClick = async () => {
	if (videoConferenceInfo.value.state === VideoConferenceStateResponse.NOT_STARTED && canStart.value) {
		openConfigurationDialog();
	}
	if (videoConferenceInfo.value.state === VideoConferenceStateResponse.RUNNING && canJoin.value) {
		await doJoinVideoConference();
	}
};

const openConfigurationDialog = () => {
	isConfigurationDialogOpen.value = true;
};

const onCloseConfigurationDialog = () => {
	isConfigurationDialogOpen.value = false;
};

const startVideoConferenceAndJoin = async () => {
	onCloseConfigurationDialog();
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
