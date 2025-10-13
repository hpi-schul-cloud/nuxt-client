import { RoomApiFactory } from "@/serverApi/v3";
import { RoomColor, RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { ref } from "vue";

export const useRoomCreateState = () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const roomData = ref<RoomCreateParams>({
		name: "",
		color: RoomColor.BlueGrey,
		features: [],
	});

	/**
	 * @throws ApiResponseError | ApiValidationError
	 */
	const createRoom = async (params: RoomCreateParams): Promise<RoomItem> => {
		isLoading.value = true;
		try {
			const room = (await roomApi.roomControllerCreateRoom(params)).data;

			return room;
		} catch (error) {
			throw mapAxiosErrorToResponseError(error);
		} finally {
			isLoading.value = false;
		}
	};

	return { createRoom, isLoading, roomData };
};
