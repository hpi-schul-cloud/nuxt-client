import { BoardExternalReferenceType } from "@/serverApi/v3";
import { useSharedBoardPageInformation } from "@data-board";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import {
	ComputedRef,
	MaybeRefOrGetter,
	ref,
	ShallowRef,
	toValue,
	watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import { SidebarSingleItem } from "../types";

export const useSidebarSelection = (
	sidebarItem:
		| ComputedRef<SidebarSingleItem>
		| MaybeRefOrGetter<SidebarSingleItem>
		| ShallowRef<SidebarSingleItem>
) => {
	const route = useRoute();
	const { roomVariant } = storeToRefs(useRoomDetailsStore());
	const { contextType } = useSharedBoardPageInformation();

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
			return (
				(item.to === "/rooms/courses-overview" &&
					contextType.value === BoardExternalReferenceType.Course) ||
				(item.to === "/rooms" &&
					contextType.value === BoardExternalReferenceType.Room)
			);
		}

		// Folder
		if (route.name === "folder-id") {
			const itemLinksToCourseOverview = item.to === "/rooms/courses-overview";
			const itemLinksToRoomsOverview = item.to === "/rooms";

			const contextOfFolderIsCourse =
				contextType.value === BoardExternalReferenceType.Course;
			const contextOfFolderIsRoom =
				contextType.value === BoardExternalReferenceType.Room;

			return (
				(itemLinksToCourseOverview && contextOfFolderIsCourse) ||
				(itemLinksToRoomsOverview && contextOfFolderIsRoom)
			);
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
