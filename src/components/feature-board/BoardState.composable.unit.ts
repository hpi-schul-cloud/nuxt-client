import { nextTick } from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import * as serverApi from "../../serverApi/v3/api";
import { useBoardState } from "./BoardState.composable";

let wrapper: Wrapper<Vue>;

const mountComposable = <R>(composable: () => R): R => {
	const TestComponent = {
		template: "<div></div>",
	};

	wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
	});

	//@ts-ignore
	return wrapper.vm.result;
};

describe("BoardState composable", () => {
	let mockApi: any;
	beforeEach(() => {
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: {} });
		mockApi = { boardControllerGetBoardSkeleton };

		jest.spyOn(serverApi, "BoardsApiFactory").mockReturnValue(mockApi);
	});

	it("should fetch board on mount", async () => {
		const boardId1 = "123124";
		mountComposable(() => useBoardState(boardId1));

		expect(mockApi.boardControllerGetBoardSkeleton).toHaveBeenCalledWith(
			boardId1
		);
	});

	it("should return fetch function that updates board and loading state", async () => {
		const boardId1 = "123124";
		const boardId2 = "a1b1c1";
		const { fetchBoard, board, isLoading } = mountComposable(() =>
			useBoardState(boardId1)
		);

		await fetchBoard(boardId2);
		await nextTick();

		expect(mockApi.boardControllerGetBoardSkeleton).toHaveBeenLastCalledWith(
			boardId2
		);
		expect(board.value?.id).toBe(boardId2);
		expect(isLoading.value).toBe(false);
	});
});
