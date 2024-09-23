import { Room } from "@/types/room/Room";
import { ref } from "vue";
import { defineStore } from "pinia";
import { RoomApiFactory, RoomDetailsResponse } from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";

export enum RoomVariant {
	ROOM = "room",
	COURSE_ROOM = "courseRoom",
}

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const isLoading = ref(true);
	const room = ref<Room>();
	const roomVariant = ref<RoomVariant>();

	const roomApi = RoomApiFactory(undefined, "v3", $axios);

	const fetchRoom = async (id: string): Promise<RoomDetailsResponse> => {
		try {
			const response = await roomApi.roomControllerGetRoomDetails(id);
			roomVariant.value = RoomVariant.ROOM;
			isLoading.value = false;
			return response.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);
			roomVariant.value = RoomVariant.COURSE_ROOM;
			isLoading.value = false;

			throw createApplicationError(responseError.code);
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
	};
});
