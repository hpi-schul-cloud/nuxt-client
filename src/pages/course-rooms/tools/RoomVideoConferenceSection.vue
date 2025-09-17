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
						<VBtn
							data-testid="dialog-close"
							variant="outlined"
							@click="onCloseErrorDialog"
						>
							{{ t("common.labels.close") }}
						</VBtn>
					</div>
				</VCardActions>
			</VCard>
		</VDialog>
		<VideoConferenceConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:options="videoConferenceOptions"
			@close="onCloseConfigurationDialog"
			@start-video-conference="startVideoConference"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomVideoConferenceCard from "@/components/rooms/RoomVideoConferenceCard.vue";

import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import {
	VideoConferenceJoinResponse,
	VideoConferenceScope,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import {
	VideoConferenceInfo,
	VideoConferenceOptions,
	VideoConferenceState,
} from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";
import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const videoConferenceModule: VideoConferenceModule = injectStrict(
	VIDEO_CONFERENCE_MODULE_KEY
);

const videoConferenceInfo: ComputedRef<VideoConferenceInfo> = computed(
	() => videoConferenceModule.getVideoConferenceInfo
);

const isWaitingRoomActive: ComputedRef<boolean> = computed(
	() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests
);

const isRunning: ComputedRef<boolean> = computed(
	() => videoConferenceInfo.value.state === VideoConferenceState.RUNNING
);

const isRefreshing: ComputedRef<boolean> = computed(
	() => videoConferenceModule.getLoading
);

const canJoin: ComputedRef<boolean> = computed(
	() =>
		authModule.getUserPermissions.includes("join_meeting") &&
		(!authModule.getUserRoles.includes("expert") ||
			authModule.getUserRoles.length > 1 ||
			isWaitingRoomActive.value)
);

const canStart: ComputedRef<boolean> = computed(() =>
	authModule.getUserPermissions.includes("start_meeting")
);

const hasPermission: ComputedRef<boolean> = computed(() => {
	return canJoin.value || canStart.value;
});

const isConfigurationDialogOpen: Ref<boolean> = ref(false);

const videoConferenceOptions: ComputedRef<VideoConferenceOptions> = computed(
	() => {
		return videoConferenceModule.getVideoConferenceInfo.options;
	}
);

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
	if (
		videoConferenceInfo.value.state === VideoConferenceState.NOT_STARTED &&
		canStart.value
	) {
		openConfigurationDiaolog();
	}

	if (
		videoConferenceInfo.value.state === VideoConferenceState.RUNNING &&
		canJoin.value
	) {
		await joinVideoConference();
	}
};

const openConfigurationDiaolog = () => {
	isConfigurationDialogOpen.value = true;
};

const onCloseConfigurationDialog = () => {
	isConfigurationDialogOpen.value = false;
};

const startVideoConference = async () => {
	onCloseConfigurationDialog();

	const logoutUrl: URL = new URL(
		`/rooms/${props.roomId}`,
		window.location.origin
	);
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
	const videoConferenceUrl: VideoConferenceJoinResponse | undefined =
		await videoConferenceModule.joinVideoConference({
			scope: VideoConferenceScope.Course,
			scopeId: props.roomId,
		});

	if (videoConferenceUrl) {
		window.open(videoConferenceUrl.url, "_self");
	}
};

const isErrorDialogOpen: ComputedRef<boolean> = computed(
	() => videoConferenceModule.getError !== null
);

const onCloseErrorDialog = () => {
	videoConferenceModule.resetError();
};
</script>
