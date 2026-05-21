import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { formatUtc } from "@/utils/date-time.utils";
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
			const { data } = (await roomApi.roomControllerGetRoomStats()).data;

			if (data && data.length === 0) {
				isEmptyList.value = true;
				return;
			}

			isEmptyList.value = false;
			roomList.value = sortAndFormatList(data);
		} catch {
			notifyError(t("pages.rooms.administration.error.load"));
			isEmptyList.value = true;
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
