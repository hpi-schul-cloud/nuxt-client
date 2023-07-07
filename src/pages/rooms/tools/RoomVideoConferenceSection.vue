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
	</div>
</template>

<script lang="ts">
import RoomVideoConferenceCard from "@/components/rooms/RoomVideoConferenceCard.vue";
import { VideoConferenceScope } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import {
	VideoConferenceInfo,
	VideoConferenceState,
} from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	AUTH_MODULE,
	injectStrict,
	VIDEO_CONFERENCE_MODULE,
} from "@/utils/inject";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";

export default defineComponent({
	name: "RoomVideoConferenceSection",
	components: { RoomVideoConferenceCard },
	props: {
		roomId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const authModule: AuthModule = injectStrict(AUTH_MODULE);
		const videoConferenceModule: VideoConferenceModule = injectStrict(
			VIDEO_CONFERENCE_MODULE
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

		const onClick = () => {
			if (
				videoConferenceInfo.value.state === VideoConferenceState.NOT_STARTED &&
				canStart.value
			) {
				// TODO N21-882: open start dialog
				return;
			}

			if (
				videoConferenceInfo.value.state === VideoConferenceState.RUNNING &&
				canJoin.value
			) {
				// TODO N21-942: join meeting
				return;
			}
		};

		return {
			hasPermission,
			isRunning,
			isRefreshing,
			onClick,
			onRefresh,
		};
	},
});
</script>
