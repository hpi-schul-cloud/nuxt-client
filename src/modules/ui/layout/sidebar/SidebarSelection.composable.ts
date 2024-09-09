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
import { useRoomDetailsStore } from "@data-room";
import { useSharedBoardPageInformation } from "@data-board";
import { BoardExternalReferenceType } from "@/serverApi/v3";

export const useSidebarSelection = (
	sidebarItem:
		| ComputedRef<SidebarSingleItem>
		| MaybeRefOrGetter<SidebarSingleItem>
		| ShallowRef<SidebarSingleItem>
) => {
	const route = useRoute();
	const { isCourseRoom, isRoom } = storeToRefs(useRoomDetailsStore());
	const { contextType } = useSharedBoardPageInformation();

	const isActive = ref(false);

	const isActiveForRoute = (item: SidebarSingleItem) => {
		// Rooms
		if (route.name === "rooms") {
			return item.to === "/rooms";
		}

		// RoomDetails, CourseRoomDetails
		if (route.name === "rooms-id") {
			if (isRoom.value === true) {
				return item.to === "/rooms";
			}
			if (isCourseRoom.value === true) {
				return item.to === "/rooms/courses-overview";
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
			return (
				item.to === "/rooms/courses-overview" &&
				contextType.value === BoardExternalReferenceType.Course
			);
		}

		return (
			route.path.includes(item.to as string) ||
			route.path.includes(item.href as string)
		);
	};

	watchEffect(() => {
		isActive.value = isActiveForRoute(toValue(sidebarItem));
	});

	return {
		isActive,
	};
};
