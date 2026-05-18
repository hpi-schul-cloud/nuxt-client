import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { RoomBoardItem, RoomDetails, RoomUpdateParams } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils";
import { BoardApiFactory, BoardLayout, BoardParentType, CreateBoardBodyParams, RoomApiFactory } from "@api-server";
import { useAppStore } from "@data-app";
import { defineStore } from "pinia";
import { ref } from "vue";

export enum RoomVariant {
	ROOM = "room",
	COURSE_ROOM = "courseRoom",
}

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const { t } = useI18nGlobal();
	const PLURAL_COUNT = 2;
	const isLoading = ref(true);
	const room = ref<RoomDetails>();
	const roomVariant = ref<RoomVariant>();
	const roomBoards = ref<RoomBoardItem[]>([]);

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();

	const fetchRoom = async (id: string, config = { loadBoards: false }) => {
		try {
			roomVariant.value = RoomVariant.ROOM;
			room.value = (await roomApi.roomControllerGetRoomDetails(id)).data;
			if (config.loadBoards) {
				roomBoards.value = (await roomApi.roomControllerGetRoomBoards(id)).data.data;
			}
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			if (responseError.code === 404) {
				roomVariant.value = RoomVariant.COURSE_ROOM;
			} else if (responseError.code === 403 && responseError.type === "LOCKED_ROOM") {
				return { isLocked: true, lockedRoomName: responseError.message };
			} else {
				useAppStore().handleApplicationError(responseError.code);
			}
		} finally {
			isLoading.value = false;
		}
	};

	const fetchRoomAndBoards = async (id: string) => await fetchRoom(id, { loadBoards: true });

	const fetchBoardsOfRoom = async (roomId: string) => {
		const { result, error } = await execute(
			() => roomApi.roomControllerGetRoomBoards(roomId),
			t("common.notifications.errors.notLoaded", { type: t("common.words.board", PLURAL_COUNT) }, PLURAL_COUNT)
		);
		return { boards: result?.data.data, error };
	};

	const createBoard = async (roomId: string, layout: BoardLayout, title: string) => {
		const params: CreateBoardBodyParams = {
			title: title,
			parentId: roomId,
			parentType: BoardParentType.ROOM,
			layout,
		};
		const boardId = (await boardApi.boardControllerCreateBoard(params)).data.id;

		return boardId;
	};

	const moveBoard = async (roomId: string, boardId: string, toPosition: number) => {
		await roomApi.roomControllerMoveBoard(roomId, { id: boardId, toPosition });
	};

	/**
	 * @throws ApiResponseError | ApiValidationError
	 */
	const updateRoom = async (id: string, params: RoomUpdateParams) => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerUpdateRoom(id, params);
		} catch (error) {
			throw mapAxiosErrorToResponseError(error);
		} finally {
			isLoading.value = false;
		}
	};

	const deleteBoard = async (boardId: string, boardTitle: string) => {
		const shouldDelete = await askDeletionForItem(boardTitle, "common.words.board");
		if (!shouldDelete) return { success: false };

		return await execute(
			() => boardApi.boardControllerDeleteBoard(boardId),
			t("common.notifications.errors.notDeleted", { type: t("common.words.board") })
		);
	};

	const updateBoardVisibility = async (boardId: string, isVisible: boolean) =>
		await execute(
			() => boardApi.boardControllerUpdateVisibility(boardId, { isVisible }),
			t("components.board.notifications.errors.notUpdated")
		);

	const resetState = () => {
		isLoading.value = true;
		room.value = undefined;
	};

	return {
		fetchRoomAndBoards,
		fetchBoardsOfRoom,
		fetchRoom,
		createBoard,
		deleteBoard,
		moveBoard,
		updateBoardVisibility,
		isLoading,
		resetState,
		room,
		roomVariant,
		roomBoards,
		updateRoom,
	};
});
