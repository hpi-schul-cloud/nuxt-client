import { defineStore } from "pinia";
import { ref } from "vue";
import { RoomApiFactory, RoomStatsItemResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";

export const useAdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		const roomApi = RoomApiFactory(undefined, "/v3", $axios);
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();

		const isLoading = ref(true);
		const roomList = ref<RoomStatsItemResponse[]>([]);
		const selectedIds = ref<string[]>([]);
		const isEmptyList = ref(false);

		const userSchoolName = "Paul-Gerhardt-Gymnasium";

		const sortAndFormatList = (list: RoomStatsItemResponse[]) => {
			list.forEach((room) => {
				room.createdAt = printFromStringUtcToFullDate(room.createdAt);
			});
			return list
				.sort((a, b) => {
					return a.schoolName.localeCompare(b.schoolName);
				})
				.sort((a, b) => {
					return a.schoolName === userSchoolName
						? -1
						: b.schoolName === userSchoolName
							? 1
							: 0;
				})
				.sort((a, b) => {
					return a.owner === undefined ? -1 : b.owner === undefined ? 1 : 0;
				});
		};

		const fetchRooms = async () => {
			try {
				isLoading.value = true;
				const { data } = (await roomApi.roomControllerGetRoomStats()).data;

				if (data && data.length !== 0) {
					isEmptyList.value = false;
					roomList.value = sortAndFormatList(data);
					return;
				}
				isEmptyList.value = false;
			} catch {
				showFailure(t("pages.rooms.administration.error.load"));
				isEmptyList.value = true;
			} finally {
				isLoading.value = false;
			}
		};

		return {
			isLoading,
			isEmptyList,
			roomList,
			selectedIds,
			fetchRooms,
		};
	}
);
