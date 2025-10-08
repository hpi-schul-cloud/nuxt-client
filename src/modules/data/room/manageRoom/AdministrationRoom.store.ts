import { printFromStringUtcToFullDate } from "@/plugins/datetime";
import { RoomApiFactory, RoomStatsItemResponse } from "@/serverApi/v3";
import { schoolsModule } from "@/store/store-accessor";
import { $axios } from "@/utils/api";
import { notifyError } from "@data-app";
import { useRoomMembersStore } from "@data-room";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useAdministrationRoomStore = defineStore("administrationRoomStore", () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const { t } = useI18n();
	const isLoading = ref(true);
	const roomList = ref<RoomStatsItemResponse[]>([]);
	const isEmptyList = ref(false);
	const selectedRoom = ref<{ roomId: string; roomName: string } | null>(null);
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

				if (a.schoolName === currentUserSchoolName && b.schoolName !== currentUserSchoolName) return -1;
				if (a.schoolName !== currentUserSchoolName && b.schoolName === currentUserSchoolName) return 1;

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

	const selectRoomAndLoadMembers = async (roomId: string) => {
		selectedRoom.value = null;
		await fetchMembers(roomId);

		if (roomList.value.length === 0) {
			await fetchRooms();
		}

		const room = roomList.value.find((r) => r.roomId === roomId);

		if (room) {
			selectedRoom.value = {
				roomId: room?.roomId,
				roomName: room.name,
			};
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
		selectedRoom,
		userSchoolId,
		deleteRoom,
		fetchRooms,
		selectRoomAndLoadMembers,
	};
});
