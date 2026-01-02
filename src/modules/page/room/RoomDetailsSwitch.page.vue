<template>
	<template v-if="isLoading">
		<div data-testid="loading" class="w-100 text-center">
			<VProgressCircular color="primary" indeterminate :size="51" class="my-10" />
		</div>
	</template>
	<template v-else>
		<RoomLockedPage v-if="isRoom && isLocked" :title="lockedRoomName" />
		<RoomDetailsPage v-else-if="isRoom && room" :room="room" />
		<CourseRoomDetailsPage v-else />
	</template>
</template>

<script setup lang="ts">
import RoomDetailsPage from "./RoomDetails.page.vue";
import RoomLockedPage from "./RoomLocked.page.vue";
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { computed, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const roomDetailsStore = useRoomDetailsStore();
const { roomVariant, room } = storeToRefs(roomDetailsStore);

const { fetchRoomAndBoards, resetState } = roomDetailsStore;

const isLocked = ref(false);
const lockedRoomName = ref("");

const isLoading = ref(true);

watch(
	() => route.params.id,
	async (newRoomId) => {
		isLoading.value = true;
		const result = await fetchRoomAndBoards(newRoomId as string);
		if (result?.isLocked) {
			isLocked.value = result.isLocked;
			lockedRoomName.value = result.lockedRoomName;
		}

		isLoading.value = false;
	},
	{ immediate: true }
);

const isRoom = computed(() => roomVariant.value === RoomVariant.ROOM);

onUnmounted(() => {
	resetState();
});
</script>
