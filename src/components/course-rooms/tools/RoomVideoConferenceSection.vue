<template>
	<div>
		<RoomVideoConferenceCard
			:has-permission="hasPermission"
			:can-start="canStart"
			:is-running="isConferenceRunning"
			:is-refreshing="isFetching"
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
// TODO: move composable to shared position
import { useVideoConference } from "@/modules/feature/board-video-conference-element/composables/VideoConference.composable";
import { VideoConferenceState } from "@/store/types/video-conference";
import { Permission, VideoConferenceScope } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, onMounted, Ref, ref, toRef } from "vue";
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
	isFetching,
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

const isRefreshing = isFetching;

const errorDismissed = ref(false);

const isErrorDialogOpen = computed(
	() => (!!fetchError.value || !!startError.value || !!joinError.value) && !errorDismissed.value
);

const onCloseErrorDialog = () => {
	errorDismissed.value = true;
};

const isConfigurationDialogOpen: Ref<boolean> = ref(false);

onMounted(async () => {
	await fetchVideoConferenceInfo();
});

const onRefresh = async () => {
	if (isRefreshing.value) return;
	errorDismissed.value = false;
	await fetchVideoConferenceInfo();
};

const onClick = async () => {
	if (videoConferenceInfo.value.state === VideoConferenceState.NOT_STARTED && canStart.value) {
		openConfigurationDialog();
	}
	if (videoConferenceInfo.value.state === VideoConferenceState.RUNNING && canJoin.value) {
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
	const videoConferenceUrl = await joinVideoConference();
	if (videoConferenceUrl) {
		window.open(videoConferenceUrl, "_self");
	}
};
</script>
