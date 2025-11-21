import { useI18nGlobal } from "@/plugins/i18n";
import { ColumnResponse, Permission, RoomBoardItemResponse } from "@/serverApi/v3";
import { RoomItem } from "@/types/room/Room";
import { useBoardApi } from "@data-board";
import { useRoomDetailsStore, useRoomStore } from "@data-room";
import { sortBy } from "lodash-es";
import { computed, onBeforeMount, ref, watch } from "vue";

export const useCardDialogData = (initialRoomId?: string) => {
	const { t } = useI18nGlobal();
	const selectedRoomId = ref<string>();
	const selectedBoardId = ref<string>();
	const selectedColumnId = ref<string>();

	const rooms = ref<RoomItem[]>();
	const boards = ref<RoomBoardItemResponse[]>();
	const columns = ref<ColumnResponse[]>();

	const selectedBoard = computed(() => boards.value?.find((board) => board.id === selectedBoardId.value));
	const selectedColumn = computed(() => columns.value?.find((col) => col.id === selectedColumnId.value));

	const resetBoardSelection = () => {
		selectedColumnId.value = undefined;
		selectedBoardId.value = undefined;
	};

	onBeforeMount(async () => {
		const result = await useRoomStore().fetchRoomsPlain();

		rooms.value = sortBy(
			result?.data?.data.filter((room) => room.permissions.includes(Permission.RoomEditContent)),
			(r) => r.name
		);

		if (initialRoomId && rooms.value?.find((r) => r.id === initialRoomId)) {
			selectedRoomId.value = initialRoomId;
		} else {
			selectedRoomId.value = undefined;
		}
	});

	watch(selectedRoomId, async (newRoomId) => {
		if (!newRoomId) return;
		boards.value = (await useRoomDetailsStore().fetchBoardsOfRoom(newRoomId)).boards;
	});

	watch(selectedBoardId, async (newBoardId) => {
		if (!newBoardId) return;
		columns.value = (await useBoardApi().fetchBoardCall(newBoardId)).columns?.map((b, idx) => ({
			...b,
			title: b.title || `${t("components.boardColumn")} ${idx + 1}`,
		}));
	});

	return {
		selectedRoomId,
		selectedBoardId,
		selectedColumnId,
		rooms,
		boards,
		columns,
		selectedBoard,
		selectedColumn,
		resetBoardSelection,
	};
};
