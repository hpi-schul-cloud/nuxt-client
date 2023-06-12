import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick } from "vue";
import * as serverApi from "../../../serverApi/v3/api";
import { useBoardState } from "./BoardState.composable";

describe("BoardState composable", () => {
	let mockApi: any;
	beforeEach(() => {
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: { id: "board-id" } });
		mockApi = { boardControllerGetBoardSkeleton };

		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(mockApi);
	});

	it("should fetch board on mount", async () => {
		const boardId = "123124";
		mountComposable(() => useBoardState(boardId), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
		});

		expect(mockApi.boardControllerGetBoardSkeleton).toHaveBeenCalledWith(
			boardId
		);
	});

	it("should return fetch function that updates board", async () => {
		const boardId1 = "123124";
		const boardId2 = "a1b1c1";
		const { fetchBoard, board } = mountComposable(() =>
			useBoardState(boardId1)
		);

		const fetchPromise = fetchBoard(boardId2);
		await fetchPromise;

		expect(board.value).toBeDefined();
		expect(board.value?.id).toBe(boardId2);
	});

	it("should return isLoading which reflects pending api calls", async () => {
		const boardId1 = "123124";
		const { isLoading } = mountComposable(() => useBoardState(boardId1));

		expect(isLoading.value).toStrictEqual(true);

		await nextTick();
		await nextTick();

		expect(isLoading.value).toStrictEqual(false);
	});
});
