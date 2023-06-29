<template>
	<room-video-conference-card
		:has-permission="hasPermission"
		:is-running="isRunning"
		:is-refreshing="isRefreshing"
		@click="onClick"
		@refresh="onRefresh"
	></room-video-conference-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import RoomVideoConferenceCard from "@/components/rooms/RoomVideoConferenceCard.vue";
import { AUTH_MODULE, injectStrict } from "@/utils/inject";
import { delay } from "@/utils/helpers";
import AuthModule from "@/store/auth";

export default defineComponent({
	components: { RoomVideoConferenceCard },
	setup() {
		const authModule: AuthModule = injectStrict(AUTH_MODULE);

		const hasPermission: ComputedRef<boolean> = computed(
			() =>
				(authModule.getUserPermissions.includes("start_meeting") ||
					authModule.getUserPermissions.includes("join_meeting")) &&
				!authModule.getUserRoles.includes("guest")
		);

		const isRunning: Ref<boolean> = ref(false);

		const isRefreshing: Ref<boolean> = ref(false);

		const onRefresh = async () => {
			if (isRefreshing.value) {
				return;
			}

			console.log("refresh");

			isRefreshing.value = true;

			await delay(3000);

			isRunning.value = true;
			isRefreshing.value = false;
		};

		const onClick = () => {
			console.log("click");
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
