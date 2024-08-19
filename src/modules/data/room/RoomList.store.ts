import { Room } from "@/types/room/Room";
import { delay } from "@/utils/helpers";
import { ref } from "vue";

// TODO replace with API call
const roomListData: Room[] = [
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

export const useRoomListStore = () => {
	const roomList = ref<Room[]>([]);
	const isLoading = ref(true);

	const fetchRoomList = async () => {
		await delay(2000);
		// TODO call API
		roomList.value = roomListData;
		isLoading.value = false;
	};

	return { roomList, isLoading, fetchRoomList };
};
