import { RoomApiFactory, RoomColor } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomCreateState = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const isLoading = ref(true);

	const roomData = ref<RoomCreateParams>({
		name: "",
		color: RoomColor.BlueGrey,
		startDate: undefined,
		endDate: undefined,
	});

	const createRoom = async (
		params: RoomCreateParams
	): Promise<RoomItem | undefined> => {
		isLoading.value = true;
		try {
			const room = (await roomApi.roomControllerCreateRoom(params)).data;

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

	return { createRoom, isLoading, roomData };
};
