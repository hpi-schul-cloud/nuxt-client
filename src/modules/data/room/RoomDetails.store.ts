import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { ref } from "vue";
import { roomsData } from "./rooms-mock-data";
import { defineStore } from "pinia";

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const isLoading = ref(true);
	const isRoom = ref(false);
	const isCourseRoom = ref(false);
	const room = ref<Room | undefined>();

	const fetchRoom = async (id: string) => {
		await delay(100);
		// TODO call API
		room.value = roomsData.find((r) => r.id === id);
		isRoom.value = room.value != null;
		isCourseRoom.value = !isRoom.value;
		isLoading.value = false;
	};

	const resetState = () => {
		isLoading.value = true;
		isRoom.value = false;
		isCourseRoom.value = false;
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
		isRoom,
		isCourseRoom,
		resetState,
		room,
	};
});
