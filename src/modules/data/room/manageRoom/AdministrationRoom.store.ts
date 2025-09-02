import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RoomApiFactory, RoomStatsItemResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { schoolsModule } from "@/store/store-accessor";
import { useRoomMembersStore } from "@data-room";

export const useAdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		const roomApi = RoomApiFactory(undefined, "/v3", $axios);
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();
		const isLoading = ref(true);
		const roomList = ref<RoomStatsItemResponse[]>([]);
		const isEmptyList = ref(false);
		const userSchoolName = computed(() => schoolsModule.getSchool.name);
		const userSchoolId = computed(() => schoolsModule.getSchool.id);
		const { fetchMembers } = useRoomMembersStore();

		const sortAndFormatList = (list: RoomStatsItemResponse[]) => {
			const currentUserSchoolName = userSchoolName.value;
			return list
				.map((room) => ({
					...room,
					createdAt: printFromStringUtcToFullDate(room.createdAt),
				}))
				.sort((a, b) => {
					if (!a.owner && b.owner) return -1;
					if (a.owner && !b.owner) return 1;

					if (
						a.schoolName === currentUserSchoolName &&
						b.schoolName !== currentUserSchoolName
					)
						return -1;
					if (
						a.schoolName !== currentUserSchoolName &&
						b.schoolName === currentUserSchoolName
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

		const selectRoomAndLoadMembers = async () => {
			if (roomList.value.length === 0) {
				await fetchRooms();
			}
			await fetchMembers();
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
			userSchoolId,
			deleteRoom,
			fetchRooms,
			selectRoomAndLoadMembers,
		};
	}
);
