import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { ref } from "vue";
import { roomsData } from "./rooms-mock-data";
import { defineStore } from "pinia";

export enum RoomVariant {
	ROOM = "room",
	COURSE_ROOM = "courseRoom",
}

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const isLoading = ref(true);
	const room = ref<Room>();
	const roomVariant = ref<RoomVariant>();

	const fetchRoom = async (id: string) => {
		await delay(100);
		// TODO call API
		room.value = roomsData.find((r) => r.id === id);
		roomVariant.value =
			room.value != null ? RoomVariant.ROOM : RoomVariant.COURSE_ROOM;
		isLoading.value = false;
	};

	const resetState = () => {
		isLoading.value = true;
		room.value = undefined;
	};

	const deactivateRoom = () => {
		resetState();
		isLoading.value = false;
	};

	return {
		deactivateRoom,
		fetchRoom,
		isLoading,
		resetState,
		room,
		roomVariant,
	};
});
