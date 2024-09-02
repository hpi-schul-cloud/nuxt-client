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
import { RoomDetails } from "@feature-room";
import { useRoomDetailsState } from "@data-room";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchRoom, isLoading, isRoom, room } = useRoomDetailsState();

watch(
	() => route.params.id,
	async () => {
		await fetchRoom(route.params.id as string);
	},
	{ immediate: true }
);
</script>
