<template>
	<div>
		<room-video-conference-card
			:has-permission="hasPermission"
			:is-running="isRunning"
			:is-refreshing="isRefreshing"
			data-testid="video-conference-card"
			@click="onClick"
			@refresh="onRefresh"
		></room-video-conference-card>

		<v-custom-dialog
			:is-open="isErrorDialogOpen"
			:has-buttons="true"
			:buttons="['close']"
			data-testId="error-dialog"
			@dialog-closed="onCloseErrorDialog"
		>
			<h2 slot="title" class="text-h4 my-2 text-break-word">
				{{ $t("error.generic") }}
			</h2>
		</v-custom-dialog>

		<v-dialog
			v-model="isConfigurationDialogOpen"
			max-width="480"
			data-testId="videoconference-config-dialog"
		>
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{
							$t(
								"pages.rooms.tools.configureVideoconferenceDialog.title",
								roomName
							)
						}}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<div class="d-flex justify-space-between">
						<RenderHTML
							class="text-md mt-1 mr-4"
							:html="
								$t(
									'pages.rooms.tools.configureVideoconferenceDialog.text.mute'
								).toString()
							"
							component="p"
						/>
						<v-switch
							v-model="videoConferenceOptions.everyAttendeeJoinsMuted"
							data-testId="everyAttendeeJoinsMuted"
							class="my-0"
							inset
							dense
						></v-switch>
					</div>
					<div class="d-flex justify-space-between">
						<RenderHTML
							class="text-md mt-1 mr-4"
							:html="
								$t(
									'pages.rooms.tools.configureVideoconferenceDialog.text.waitingRoom'
								).toString()
							"
							component="p"
						/>
						<v-switch
							v-model="videoConferenceOptions.moderatorMustApproveJoinRequests"
							data-testId="moderatorMustApproveJoinRequests"
							class="my-0"
							inset
							dense
						></v-switch>
					</div>
					<div class="d-flex justify-space-between">
						<RenderHTML
							class="text-md mt-1 mr-4"
							:html="
								$t(
									'pages.rooms.tools.configureVideoconferenceDialog.text.allModeratorPermission'
								).toString()
							"
							component="p"
						/>
						<v-switch
							v-model="videoConferenceOptions.everybodyJoinsAsModerator"
							data-testId="everybodyJoinsAsModerator"
							class="my-0"
							inset
							dense
						></v-switch>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						depressed
						text
						@click="onCloseConfigurationDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-create"
						class="px-6"
						color="primary"
						depressed
						@click="startVideoConference"
					>
						{{ $t("common.actions.create") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import RoomVideoConferenceCard from "@/components/rooms/RoomVideoConferenceCard.vue";
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
	AUTH_MODULE,
	injectStrict,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
} from "vue";
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";

export default defineComponent({
	name: "RoomVideoConferenceSection",
	components: { RenderHTML, RoomVideoConferenceCard, VCustomDialog },
	props: {
		roomId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const authModule: AuthModule = injectStrict(AUTH_MODULE);
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
					isWaitingRoomActive.value)
		);

		const canStart: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("start_meeting")
		);

		const hasPermission: ComputedRef<boolean> = computed(() => {
			return canJoin.value || canStart.value;
		});

		const isConfigurationDialogOpen: Ref<boolean> = ref(false);

		const videoConferenceOptions: Ref<VideoConferenceOptions> = ref({
			everyAttendeeJoinsMuted: false,
			moderatorMustApproveJoinRequests: true,
			everybodyJoinsAsModerator: false,
		});

		// TODO: get the roomName
		const roomName = "RoomName";

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
				// TODO N21-882: open start dialog
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
			await videoConferenceModule.startVideoConference({
				scope: VideoConferenceScope.Course,
				scopeId: props.roomId,
				videoConferenceOptions: videoConferenceOptions.value,
			});
			await joinVideoConference();

			onCloseConfigurationDialog();
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

		return {
			videoConferenceInfo,
			videoConferenceOptions,
			hasPermission,
			isRunning,
			isRefreshing,
			roomName,
			onClick,
			onRefresh,
			isConfigurationDialogOpen,
			onCloseConfigurationDialog,
			startVideoConference,
			isErrorDialogOpen,
			onCloseErrorDialog,
		};
	},
});
</script>
