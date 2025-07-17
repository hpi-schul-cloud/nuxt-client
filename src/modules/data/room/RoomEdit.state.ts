import { RoomApiFactory } from "@/serverApi/v3";
import { RoomDetails, RoomUpdateParams, RoomColor } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { ref } from "vue";

export const useRoomEditState = () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const mapToParams = (room: RoomDetails): RoomUpdateParams => {
		return {
			name: room.name,
			color: room.color,
			startDate: room.startDate,
			endDate: room.endDate,
			features: room.features,
		};
	};

	const roomData = ref<RoomUpdateParams>({
		name: "",
		color: RoomColor.BlueGrey,
		startDate: undefined,
		endDate: undefined,
		features: [],
	});

	const fetchRoom = async (id: string) => {
		try {
			const room = (await roomApi.roomControllerGetRoomDetails(id)).data;
			roomData.value = mapToParams(room);
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	/**
	 * @throws ApiResponseError | ApiValidationError
	 */
	const updateRoom = async (
		id: string,
		params: RoomUpdateParams
	): Promise<void> => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerUpdateRoom(id, params);
		} catch (error) {
			throw mapAxiosErrorToResponseError(error);
		} finally {
			isLoading.value = false;
		}
	};

	return { fetchRoom, isLoading, roomData, updateRoom };
};
