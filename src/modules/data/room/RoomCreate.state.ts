import { RoomApiFactory, RoomColor } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { ref } from "vue";

export const useRoomCreateState = () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const roomData = ref<RoomCreateParams>({
		name: "",
		color: RoomColor.BlueGrey,
		startDate: undefined,
		endDate: undefined,
	});

	const createRoom = async (params: RoomCreateParams): Promise<RoomItem> => {
		isLoading.value = true;
		try {
			const room = (await roomApi.roomControllerCreateRoom(params)).data;
			return room;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	return { createRoom, isLoading, roomData };
};
