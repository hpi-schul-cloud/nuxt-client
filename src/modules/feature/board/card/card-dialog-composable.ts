import { useI18nGlobal } from "@/plugins/i18n";
import { ColumnResponse, RoomBoardItemResponse } from "@/serverApi/v3";
import { useBoardApi } from "@data-board";
import { useRoomDetailsStore } from "@data-room";
import { computed, ref, watch } from "vue";

export const useCardDialogData = () => {
	const { t } = useI18nGlobal();
	const selectedRoomId = ref<string>();
	const selectedBoardId = ref<string>();
	const selectedColumnId = ref<string>();

	const boards = ref<RoomBoardItemResponse[]>();
	const columns = ref<ColumnResponse[]>();

	const selectedBoard = computed(() => boards.value?.find((board) => board.id === selectedBoardId.value));
	const selectedColumn = computed(() => columns.value?.find((col) => col.id === selectedColumnId.value));

	const resetBoardSelection = () => {
		selectedColumnId.value = undefined;
		selectedBoardId.value = undefined;
	};

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
		boards,
		columns,
		selectedBoard,
		selectedColumn,
		resetBoardSelection,
	};
};
