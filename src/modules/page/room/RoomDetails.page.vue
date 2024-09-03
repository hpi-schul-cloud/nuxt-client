<template>
	<div v-if="isLoading" />
	<template v-else>
		<template v-if="isRoom">
			<RoomDetails :room="room" />
		</template>
		<template v-else>
			<CourseRoomDetailsPage />
		</template>
	</template>
</template>

<script setup lang="ts">
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useRoomDetailsStore } from "@data-room";
import { RoomDetails } from "@feature-room";
import { storeToRefs } from "pinia";
import { onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const route = useRoute();
const roomDetailsStore = useRoomDetailsStore();
const { isLoading, isRoom, room } = storeToRefs(roomDetailsStore);
const { deactivateRoom, fetchRoom, resetState } = roomDetailsStore;

watch(
	() => route.params.id,
	async () => {
		if (envConfigModule.getEnv["FEATURE_ROOMS_ENABLED"]) {
			await fetchRoom(route.params.id as string);
		} else {
			deactivateRoom();
		}
	},
	{ immediate: true }
);

onUnmounted(() => {
	resetState();
});
</script>
