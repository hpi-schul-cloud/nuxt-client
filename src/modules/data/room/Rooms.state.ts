import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { computed, ref } from "vue";
import { roomsData } from "./rooms-mock-data";

export const useRoomsState = () => {
	const rooms = ref<Room[]>([]);
	const isLoading = ref(true);

	const fetchRooms = async () => {
		await delay(500);
		// TODO call API + do sorting there
		rooms.value = roomsData.sort((r1, r2) => (r1.title > r2.title ? 1 : -1));
		isLoading.value = false;
	};

	const isEmpty = computed(() => {
		return rooms.value.length === 0;
	});

	return { rooms, isLoading, isEmpty, fetchRooms };
};
