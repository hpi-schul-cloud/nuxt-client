import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { computed, ref } from "vue";
import { roomsData } from "./rooms-mock-data";

export const useRoomDetailsState = () => {
	const room = ref<Room | undefined>();
	const isLoading = ref(true);

	const fetchRoom = async (id: string) => {
		await delay(100);
		// TODO call API
		room.value = roomsData.find((r) => r.id === id);
		isLoading.value = false;
	};

	const isRoom = computed(() => room.value != null);

	return {
		fetchRoom,
		isLoading,
		isRoom,
		room,
	};
};
