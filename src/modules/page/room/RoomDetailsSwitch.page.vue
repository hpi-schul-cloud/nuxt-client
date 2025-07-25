<template>
	<template v-if="isLoading">
		<div data-testid="loading" class="w-100 text-center">
			<VProgressCircular
				color="primary"
				indeterminate
				:size="51"
				class="my-10"
			/>
		</div>
	</template>
	<template v-else>
		<RoomDetailsPage v-if="isRoom && room" :room="room" />
		<CourseRoomDetailsPage v-else />
	</template>
</template>

<script setup lang="ts">
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import { RoomDetailsPage } from "@page-room";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	RoomVariant,
	useRoomAuthorization,
	useRoomDetailsStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const route = useRoute();

const roomDetailsStore = useRoomDetailsStore();
const { isLoading, roomVariant, room } = storeToRefs(roomDetailsStore);
const { deactivateRoom, fetchRoom, resetState } = roomDetailsStore;
const { canCreateRoom } = useRoomAuthorization();

const canAccessRoom = computed(() => {
	return (
		(envConfigModule.getEnv.FEATURE_ROOMS_ENABLED && canCreateRoom.value) ||
		envConfigModule.getEnv.FEATURE_ROOM_ADD_STUDENTS_ENABLED
	);
});

watch(
	() => route.params.id,
	async () => {
		if (canAccessRoom.value) {
			await fetchRoom(route.params.id as string);
		} else {
			deactivateRoom();
		}
	},
	{ immediate: true }
);

const isRoom = computed(() => roomVariant.value === RoomVariant.ROOM);

onUnmounted(() => {
	resetState();
});
</script>
