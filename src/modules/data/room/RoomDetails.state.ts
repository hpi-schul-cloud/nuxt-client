import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { ref } from "vue";
import { roomsData } from "./rooms-mock-data";

export const useRoomDetailsState = () => {
	const room = ref<Room | undefined>();
	const isLoading = ref(true);
	const isRoom = ref(false);

	const fetchRoom = async (id: string) => {
		await delay(100);
		// TODO call API
		room.value = roomsData.find((r) => r.id === id);
		isRoom.value = room.value != null;
		isLoading.value = false;
	};

	return {
		fetchRoom,
		isLoading,
		isRoom,
		room,
	};
};
