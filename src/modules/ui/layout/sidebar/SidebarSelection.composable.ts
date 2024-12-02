import { useRoute } from "vue-router";
import { SidebarSingleItem } from "../types";
import {
	ComputedRef,
	MaybeRefOrGetter,
	ref,
	ShallowRef,
	toValue,
	watchEffect,
} from "vue";
import { storeToRefs } from "pinia";
import { RoomVariant, useRoomDetailsStore } from "@data-room";

export const useSidebarSelection = (
	sidebarItem:
		| ComputedRef<SidebarSingleItem>
		| MaybeRefOrGetter<SidebarSingleItem>
		| ShallowRef<SidebarSingleItem>
) => {
	const route = useRoute();
	const { roomVariant } = storeToRefs(useRoomDetailsStore());

	const isActive = ref(false);

	const isActiveForRoute = (item: SidebarSingleItem) => {
		// Rooms
		if (route.name === "rooms") {
			return item.to === "/rooms";
		}

		// RoomDetails, CourseRoomDetails
		if (route.name === "room-details") {
			if (roomVariant.value === RoomVariant.ROOM) {
				return item.to === "/rooms";
			} else if (roomVariant.value === RoomVariant.COURSE_ROOM) {
				return item.to === "/rooms/courses-overview";
			} else {
				return false;
			}
		}

		// Courses
		if (
			route.name === "course-room-list" ||
			route.name === "course-room-overview"
		) {
			return item.to === "/rooms/courses-overview";
		}

		// Board
		if (route.name === "boards-id") {
			if (roomVariant.value === RoomVariant.ROOM) {
				return item.to === "/rooms";
			} else if (roomVariant.value === RoomVariant.COURSE_ROOM) {
				return item.to === "/rooms/courses-overview";
			} else {
				return false;
			}
		}

		return (
			route.path.startsWith(item.to as string) ||
			route.path.startsWith(item.href as string)
		);
	};

	watchEffect(() => {
		isActive.value = isActiveForRoute(toValue(sidebarItem));
	});

	return {
		isActive,
	};
};
