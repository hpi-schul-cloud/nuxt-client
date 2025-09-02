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
		<RoomLockedPage v-if="isRoom && lockedRoomName" :title="lockedRoomName" />
		<RoomDetailsPage v-else-if="isRoom && room" :room="room" />
		<CourseRoomDetailsPage v-else />
	</template>
</template>

<script setup lang="ts">
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import { RoomDetailsPage, RoomLockedPage } from "@page-room";
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
const { isLoading, roomVariant, room, lockedRoomName } =
	storeToRefs(roomDetailsStore);
const { deactivateRoom, fetchRoomAndBoards, resetState } = roomDetailsStore;
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
			await fetchRoomAndBoards(route.params.id as string);
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
