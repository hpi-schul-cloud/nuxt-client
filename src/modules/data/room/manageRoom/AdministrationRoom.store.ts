import { defineStore } from "pinia";
import { ref } from "vue";
import { RoomApiFactory, RoomStatsItemResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { schoolsModule } from "@/store/store-accessor";

export const useAdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		const roomApi = RoomApiFactory(undefined, "/v3", $axios);
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();
		const isLoading = ref(true);
		const roomList = ref<RoomStatsItemResponse[]>([]);
		const isEmptyList = ref(false);
		const userSchoolName = schoolsModule.getSchool.name;
		const userSchoolId = schoolsModule.getSchool.id;

		const sortAndFormatList = (list: RoomStatsItemResponse[]) => {
			return list
				.map((room) => ({
					...room,
					createdAt: printFromStringUtcToFullDate(room.createdAt),
				}))
				.sort((a, b) => {
					if (!a.owner && b.owner) return -1;
					if (a.owner && !b.owner) return 1;

					if (
						a.schoolName === userSchoolName &&
						b.schoolName !== userSchoolName
					)
						return -1;
					if (
						a.schoolName !== userSchoolName &&
						b.schoolName === userSchoolName
					)
						return 1;

					return (
						a.schoolName.localeCompare(b.schoolName) ||
						a.name.localeCompare(b.name)
					);
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
				showFailure(t("pages.rooms.administration.error.load"));
				isEmptyList.value = true;
			} finally {
				isLoading.value = false;
			}
		};

		const deleteRoom = async (roomId: string) => {
			try {
				isLoading.value = true;
				await roomApi.roomControllerDeleteRoom(roomId);
				roomList.value = roomList.value.filter(
					(room) => room.roomId !== roomId
				);
			} catch {
				showFailure(t("pages.rooms.administration.error.delete"));
			} finally {
				isLoading.value = false;
			}
		};

		return {
			isLoading,
			isEmptyList,
			roomList,
			deleteRoom,
			fetchRooms,
			userSchoolId,
		};
	}
);
