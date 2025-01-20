import { RoomApiFactory } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem, RoomColorEnum } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { ref } from "vue";

export const useRoomCreateState = () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const roomData = ref<RoomCreateParams>({
		name: "",
		color: RoomColorEnum.BlueGrey,
		startDate: undefined,
		endDate: undefined,
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
