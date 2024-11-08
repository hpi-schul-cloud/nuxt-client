import { RoomBoardItem, RoomDetails } from "@/types/room/Room";
import { ref } from "vue";
import { defineStore } from "pinia";
import { RoomApiFactory } from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";

export enum RoomVariant {
	ROOM = "room",
	COURSE_ROOM = "courseRoom",
}

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const isLoading = ref(true);
	const room = ref<RoomDetails>();
	const roomVariant = ref<RoomVariant>();
	const roomBoards = ref<RoomBoardItem[]>([]);

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const fetchRoom = async (id: string) => {
		try {
			room.value = (await roomApi.roomControllerGetRoomDetails(id)).data;
			roomVariant.value = RoomVariant.ROOM;
			roomBoards.value = (
				await roomApi.roomControllerGetRoomBoards(id)
			).data.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			if (responseError.code === 404) {
				roomVariant.value = RoomVariant.COURSE_ROOM;
			} else {
				throw createApplicationError(responseError.code);
			}
		} finally {
			isLoading.value = false;
		}
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
		roomBoards,
	};
});
