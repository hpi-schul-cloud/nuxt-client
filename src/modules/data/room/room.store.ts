import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { RoomCreateParams, RoomItem } from "@/types/room/Room";
import { $axios } from "@/utils/api";
import { MoveItemBodyParams, RoomApiFactory, RoomArchivedItemResponse } from "@api-server";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRoomStore = defineStore("room-store", () => {
	const PLURAL_COUNT = 2;
	const { t } = useI18nGlobal();
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const rooms = ref<RoomItem[]>([]);
	const archivedRooms = ref<RoomArchivedItemResponse[]>([]);
	const isEmpty = computed(() => rooms.value.length === 0);

	const { execute, isRunning: isLoading } = useSafeAxiosTask();

	const fetchRoomsPlain = async () => {
		const { result } = await execute(
			roomApi.roomControllerGetRooms,
			t("common.notifications.errors.notLoaded", { type: t("common.labels.room", PLURAL_COUNT) }, PLURAL_COUNT)
		);
		return result;
	};

	const fetchRooms = async () => {
		const result = await fetchRoomsPlain();
		if (result) {
			rooms.value = result?.data.data;
		}
	};
	const fetchArchivedRooms = async () => {
		const { result } = await execute(
			roomApi.roomControllerGetArchivedRooms,
			t("common.notifications.errors.notLoaded", { type: t("common.labels.room", PLURAL_COUNT) }, PLURAL_COUNT)
		);
		if (result) archivedRooms.value = result.data.data;
	};

	const createRoom = async (params: RoomCreateParams) =>
		await execute(
			() => roomApi.roomControllerCreateRoom(params),
			t("common.notifications.errors.notCreated", { type: t("common.labels.room") })
		);

	const moveRoom = async (params: MoveItemBodyParams) =>
		await execute(
			() => roomApi.roomControllerMoveRoom(params),
			t("common.notifications.errors.notMoved", { type: t("common.labels.room") })
		);

	const deleteRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerDeleteRoom(roomId),
			t("common.notifications.errors.notDeleted", { type: t("common.labels.room") })
		);

	const copyRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerCopyRoom(roomId),
			t("common.notifications.errors.notDuplicated", { type: t("common.labels.room") })
		);

	const leaveRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerLeaveRoom(roomId),
			t("common.notifications.errors.notExited", { type: t("common.labels.room") })
		);

	const archiveRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerArchiveRoom(roomId),
			t("common.notifications.errors.notArchived", { type: t("common.labels.room") })
		);

	const unarchiveRoom = async (roomId: string) =>
		await execute(
			() => roomApi.roomControllerUnarchiveRoom(roomId),
			t("common.notifications.errors.notRestored", { type: t("common.labels.room") })
		);

	return {
		rooms,
		archivedRooms,
		isLoading,
		isEmpty,
		fetchRooms,
		fetchArchivedRooms,
		fetchRoomsPlain,
		createRoom,
		copyRoom,
		moveRoom,
		deleteRoom,
		leaveRoom,
		archiveRoom,
		unarchiveRoom,
	};
});
