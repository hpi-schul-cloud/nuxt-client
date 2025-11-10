import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomApiFactory } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios } from "@/utils/api";
import { notifyError } from "@data-app";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomStore = defineStore("room-store", () => {
	const { t } = useI18n();
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const rooms = ref<RoomItem[]>([]);
	const isEmpty = computed(() => rooms.value.length === 0);

	const { execute, isRunning: isLoading } = useSafeTask();

	const fetchRooms = async () => {
		const { result, success } = await execute(roomApi.roomControllerGetRooms);
		if (success) {
			rooms.value = result.data.data;
		} else {
			notifyError(t("common.notifications.errors.notLoaded", { type: t("pages.rooms.title") }));
		}
	};

	const deleteRoom = async (roomId: string) => {
		await roomApi.roomControllerDeleteRoom(roomId);
	};

	const leaveRoom = async (roomId: string) => {
		await roomApi.roomControllerLeaveRoom(roomId);
	};

	const copyRoom = async (roomId: string) => {
		const response = await roomApi.roomControllerCopyRoom(roomId);
	};

	const createRoom = async (params: RoomCreateParams) => {
		const response = (await roomApi.roomControllerCreateRoom(params)).data;
	};

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
