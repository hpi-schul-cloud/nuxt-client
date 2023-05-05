import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import * as serverApi from "../../../serverApi/v3/api";
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
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};

describe("BoardState composable", () => {
	let mockApi: any;
	beforeEach(() => {
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: {} });
		mockApi = { boardControllerGetBoardSkeleton };

		jest.useFakeTimers();
		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(mockApi);
	});

	it("should fetch board on mount", async () => {
		const boardId = "123124";
		mountComposable(() => useBoardState(boardId));

		jest.runAllTimers();

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
		jest.runAllTimers();
		await fetchPromise;

		expect(board.value).toBeDefined();
		expect(board.value?.id).toBe(boardId2);
	});

	it("should return isLoading which reflects pending api calls", async () => {
		const boardId1 = "123124";
		const { isLoading } = mountComposable(() => useBoardState(boardId1));

		expect(isLoading.value).toStrictEqual(true);

		jest.runAllTimers();
		await nextTick();
		await nextTick();

		expect(isLoading.value).toStrictEqual(false);
	});
});
