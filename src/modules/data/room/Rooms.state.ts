import { RoomItem } from "@/types/room/Room";
import { computed, ref } from "vue";
import { RoomApiFactory } from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";

export const useRoomsState = () => {
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
			const { id } = response.data;
			return id;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const isEmpty = computed(() => {
		return rooms.value.length === 0;
	});

	return {
		rooms,
		isLoading,
		isEmpty,
		fetchRooms,
		deleteRoom,
		leaveRoom,
		copyRoom,
	};
};
