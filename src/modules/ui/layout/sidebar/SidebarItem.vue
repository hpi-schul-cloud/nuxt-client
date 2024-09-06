<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		:target="item.target"
		:rel="item.rel"
		color="primary"
		:density="density"
		tabindex="0"
		:active="isActive"
		:data-testid="item.testId"
	>
		<template #prepend>
			<v-icon v-if="hasIcon(item)" :icon="item.icon" class="mr-2" />
		</template>
		<v-list-item-title :title="$t(item.title)">
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { SidebarSingleItem } from "../types";
import { useRoute } from "vue-router";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { useSharedBoardPageInformation } from "@data-board";
import { BoardExternalReferenceType } from "@/serverApi/v3";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarSingleItem>,
		required: true,
	},
});

const route = useRoute();

const isActive = computed(() => {
	const { isLoading, isRoom } = storeToRefs(useRoomDetailsStore());
	const { contextType } = useSharedBoardPageInformation();

	// Rooms
	if (route.name === "rooms") {
		return props.item.to === "/rooms";
	}

	// RoomDetails, CourseRoomDetails
	if (route.name === "rooms-id") {
		if (isRoom.value === true) {
			return props.item.to === "/rooms";
		} else {
			return (
				props.item.to === "/rooms/courses-overview" && isLoading.value === false
			);
		}
	}

	// Courses
	if (
		route.name === "course-room-list" ||
		route.name === "course-room-overview"
	) {
		return props.item.to === "/rooms/courses-overview";
	}

	// Board
	if (route.name === "boards-id") {
		return (
			props.item.to === "/rooms/courses-overview" &&
			contextType.value === BoardExternalReferenceType.Course
		);
	}

	return (
		route.path.includes(props.item.to as string) ||
		route.path.includes(props.item.href as string)
	);
});

const density = computed(() => {
	return props.item.icon ? "default" : "compact";
});

const hasIcon = (item: SidebarSingleItem) => {
	return item.icon !== undefined && item.icon !== "";
};
</script>

<style scoped>
.v-icon {
	opacity: 1 !important;
}
</style>
