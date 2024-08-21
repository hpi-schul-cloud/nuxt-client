import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { computed, ref } from "vue";

// TODO replace with API call
const roomsData: Room[] = [
	{
		id: "0000dcfbfb5c7a3f00bf21cd",
		title: "Room #1",
	},
	{
		id: "0000dcfbfb5c7a3f00bf21ce",
		title: "Room #2",
	},
	{
		id: "0000dcfbfb5c7a3f00bf21cf",
		title: "Room #3",
	},
];

export const useRoomsState = () => {
	const rooms = ref<Room[]>([]);
	const isLoading = ref(true);

	const fetchRooms = async () => {
		await delay(2000);
		// TODO call API
		rooms.value = roomsData;
		isLoading.value = false;
	};

	const isEmpty = computed(() => {
		return rooms.value.length === 0;
	});

	return { rooms, isLoading, isEmpty, fetchRooms };
};
