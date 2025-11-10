import { RoomApiFactory } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRoomStore = defineStore("room-store", () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const rooms = ref<RoomItem[]>([]);
	const isLoading = ref(true);

	const fetchRooms = async () => {
		isLoading.value = true;
		try {
			rooms.value = (await roomApi.roomControllerGetRooms()).data.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const deleteRoom = async (roomId: string) => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerDeleteRoom(roomId);
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const leaveRoom = async (roomId: string) => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerLeaveRoom(roomId);
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const copyRoom = async (roomId: string) => {
		isLoading.value = true;
		try {
			const response = await roomApi.roomControllerCopyRoom(roomId);
			return response.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const createRoom = async (params: RoomCreateParams): Promise<RoomItem> => {
		isLoading.value = true;
		try {
			return (await roomApi.roomControllerCreateRoom(params)).data;
		} catch (error) {
			throw mapAxiosErrorToResponseError(error);
		} finally {
			isLoading.value = false;
		}
	};

	const isEmpty = computed(() => rooms.value.length === 0);

	return {
		rooms,
		isLoading,
		isEmpty,
		fetchRooms,
		createRoom,
		deleteRoom,
		leaveRoom,
		copyRoom,
	};
});
