import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { formatUtc } from "@/utils/date-time.utils";
import { RoomApiFactory, RoomStatsItemResponse } from "@api-server";
import { notifyError, useSchoolStoreRefs } from "@data-app";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const DEFAULT_ROOM_STATS_LIMIT = 50;

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
		return list
			.map((room) => ({
				...room,
				createdAt: formatUtc(room.createdAt, "date") ?? room.createdAt,
			}))
			.sort((a, b) => {
				if (!a.owner && b.owner) return -1;
				if (a.owner && !b.owner) return 1;

				if (a.schoolName === userSchoolName && b.schoolName !== userSchoolName) return -1;
				if (a.schoolName !== userSchoolName && b.schoolName === userSchoolName) return 1;

				return a.schoolName.localeCompare(b.schoolName) || a.name.localeCompare(b.name);
			});
	};

	const fetchRooms = async () => {
		try {
			isLoading.value = true;
			const rooms: RoomStatsItemResponse[] = [];
			let skip = 0;
			let total = 0;
			let limit = DEFAULT_ROOM_STATS_LIMIT;

			// this is a workaround. Proper (server-based) pagination should be implemented across all our tables in future
			do {
				const response = (await roomApi.roomControllerGetRoomStats(skip, limit)).data;
				const { data, total: nextTotal, limit: nextLimit } = response;

				total = nextTotal;
limit = nextLimit > 0 ? nextLimit : DEFAULT_ROOM_STATS_LIMIT;
				rooms.push(...data);

				if (data.length === 0) {
					break;
				}

				skip += data.length;
			} while (rooms.length < total);

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
