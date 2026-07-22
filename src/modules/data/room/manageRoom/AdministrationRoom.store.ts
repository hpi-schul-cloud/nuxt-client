import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { RoomApiFactory, RoomStatsItemResponse } from "@api-server";
import { notifyError, useSchoolStoreRefs } from "@data-app";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAdministrationRoomStore = defineStore("administrationRoomStore", () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const { t } = useI18nGlobal();
	const isLoading = ref(true);
	const roomList = ref<RoomStatsItemResponse[]>([]);
	const isEmptyList = ref(false);
	const { schoolDetails } = useSchoolStoreRefs();
	const userSchoolId = computed(() => schoolDetails.value.id);

	const sortAndFormatList = (list: RoomStatsItemResponse[]) => {
		const userSchoolName = schoolDetails.value.name;
		return list.sort((a, b) => {
			if (!a.owner && b.owner) return -1;
			if (a.owner && !b.owner) return 1;

			if (a.schoolName === userSchoolName && b.schoolName !== userSchoolName) return -1;
			if (a.schoolName !== userSchoolName && b.schoolName === userSchoolName) return 1;

			return a.schoolName.localeCompare(b.schoolName) || a.name.localeCompare(b.name);
		});
	};

	const fetchAllRoomPages = async (batchSize = 500) => {
		const rooms: RoomStatsItemResponse[] = [];

		const firstBatch = (await roomApi.roomControllerGetRoomStats(0, batchSize)).data;
		rooms.push(...firstBatch.data);

		if (firstBatch.total > batchSize) {
			for (let skip = batchSize; skip < firstBatch.total; skip += batchSize) {
				const nextBatch = (await roomApi.roomControllerGetRoomStats(skip, batchSize)).data;
				rooms.push(...nextBatch.data);
			}
		}

		return rooms;
	};

	const fetchRooms = async () => {
		try {
			isLoading.value = true;
			const rooms: RoomStatsItemResponse[] = await fetchAllRoomPages();

			if (rooms.length === 0) {
				isEmptyList.value = true;
				roomList.value = [];
				return;
			}

			isEmptyList.value = false;
			roomList.value = sortAndFormatList(rooms);
		} catch {
			notifyError(t("pages.rooms.administration.error.load"));
			isEmptyList.value = true;
			roomList.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	const deleteRoom = async (roomId: string) => {
		try {
			isLoading.value = true;
			await roomApi.roomControllerDeleteRoom(roomId);
			roomList.value = roomList.value.filter((room) => room.roomId !== roomId);
		} catch {
			notifyError(t("pages.rooms.administration.error.delete"));
		} finally {
			isLoading.value = false;
		}
	};

	return {
		isLoading,
		isEmptyList,
		roomList,
		userSchoolId,
		deleteRoom,
		fetchRooms,
	};
});
