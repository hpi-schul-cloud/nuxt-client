import { BoardApiFactory, BoardLayout, BoardParentType, CreateBoardBodyParams, RoomApiFactory } from "@/serverApi/v3";
import { RoomBoardItem, RoomDetails, RoomUpdateParams } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { defineStore } from "pinia";
import { ref } from "vue";

export enum RoomVariant {
	ROOM = "room",
	COURSE_ROOM = "courseRoom",
}

export const useRoomDetailsStore = defineStore("roomDetailsStore", () => {
	const isLoading = ref(true);
	const room = ref<RoomDetails>();
	const roomVariant = ref<RoomVariant>();
	const roomBoards = ref<RoomBoardItem[]>([]);
	const lockedRoomName = ref<string | undefined>();

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);

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
				lockedRoomName.value = responseError.message;
			} else {
				throw createApplicationError(responseError.code);
			}
		} finally {
			isLoading.value = false;
		}
	};

	const fetchRoomAndBoards = async (id: string) => {
		await fetchRoom(id, { loadBoards: true });
	};

	const createBoard = async (roomId: string, layout: BoardLayout, title: string) => {
		const params: CreateBoardBodyParams = {
			title: title,
			parentId: roomId,
			parentType: BoardParentType.Room,
			layout,
		};
		const boardId = (await boardApi.boardControllerCreateBoard(params)).data.id;

		return boardId;
	};

	/**
	 * @throws ApiResponseError | ApiValidationError
	 */
	const updateRoom = async (id: string, params: RoomUpdateParams): Promise<void> => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerUpdateRoom(id, params);
		} catch (error) {
			throw mapAxiosErrorToResponseError(error);
		} finally {
			isLoading.value = false;
		}
	};

	const resetState = () => {
		isLoading.value = true;
		room.value = undefined;
	};

	return {
		fetchRoomAndBoards,
		fetchRoom,
		createBoard,
		isLoading,
		resetState,
		room,
		roomVariant,
		roomBoards,
		updateRoom,
		lockedRoomName,
	};
});
