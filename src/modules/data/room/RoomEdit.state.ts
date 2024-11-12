import { RoomApiFactory, RoomColor } from "@/serverApi/v3";
import { RoomDetails, RoomUpdateParams } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomEditState = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const mapToParams = (room: RoomDetails): RoomUpdateParams => {
		return {
			name: room.name,
			color: room.color,
			startDate: room.startDate,
			endDate: room.endDate,
		};
	};

	const roomData = ref<RoomUpdateParams>({
		name: "",
		color: RoomColor.BlueGrey,
		startDate: undefined,
		endDate: undefined,
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

	const updateRoom = async (
		id: string,
		params: RoomUpdateParams
	): Promise<RoomDetails | undefined> => {
		isLoading.value = true;
		try {
			const room = (await roomApi.roomControllerUpdateRoom(id, params)).data;

			return room;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			if (responseError.type === "API_VALIDATION_ERROR") {
				notifierModule.show({
					text: t("components.roomForm.validation.generalSaveError"),
					status: "error",
				});
			} else {
				throw createApplicationError(responseError.code);
			}
		} finally {
			isLoading.value = false;
		}
	};

	return { fetchRoom, isLoading, roomData, updateRoom };
};
