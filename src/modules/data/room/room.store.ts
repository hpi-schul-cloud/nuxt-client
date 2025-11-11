import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomApiFactory } from "@/serverApi/v3";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios } from "@/utils/api";
import { notifyError } from "@data-app";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomStore = defineStore("room-store", () => {
	const PLURAL_COUNT = 2;
	const { t } = useI18n();
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const rooms = ref<RoomItem[]>([]);
	const isEmpty = computed(() => rooms.value.length === 0);

	const { execute, isRunning: isLoading } = useSafeTask();

	const fetchRooms = async () => {
		const { result, error } = await execute(roomApi.roomControllerGetRooms);
		if (error) {
			notifyError(
				t("common.notifications.errors.notLoaded", { type: t("common.labels.room", PLURAL_COUNT) }, PLURAL_COUNT)
			);
			return;
		}
		rooms.value = result.data.data;
	};

	const createRoom = async (params: RoomCreateParams) =>
		await execute(
			() => roomApi.roomControllerCreateRoom(params),
			t("common.notifications.errors.notCreated", { type: t("common.labels.room") })
		);

	const deleteRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerDeleteRoom(roomId),
			t("common.notifications.errors.notDeleted", { type: t("common.labels.room") })
		);

	const leaveRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerLeaveRoom(roomId),
			t("common.notifications.errors.notExited", { type: t("common.labels.room") })
		);

	// TODO: copy room is currently not used via store, but directly in RoomCopyFlow.vue

	return {
		rooms,
		isLoading,
		isEmpty,
		fetchRooms,
		createRoom,
		deleteRoom,
		leaveRoom,
	};
});
