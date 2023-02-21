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
		jest.useFakeTimers();
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: {} });
		mockApi = { boardControllerGetBoardSkeleton };

		jest.spyOn(serverApi, "BoardsApiFactory").mockReturnValue(mockApi);
	});

	it("should fetch board on mount", async () => {
		mountComposable(() => useBoardState("123124"));

		jest.advanceTimersByTime(1000);
		await nextTick();

		expect(mockApi.boardControllerGetBoardSkeleton).toHaveBeenCalledWith(
			"123124"
		);
	});

	it("should return fetch function that updates board and loading state", async () => {
		const { fetchBoard, board, isLoading } = mountComposable(() =>
			useBoardState("123124")
		);

		const fetchPromise = fetchBoard("123");
		jest.advanceTimersByTime(1000);
		await fetchPromise;

		expect(mockApi.boardControllerGetBoardSkeleton).toHaveBeenLastCalledWith(
			"123"
		);
		expect(board.value?.id).toBe("123");
		expect(isLoading.value).toBe(false);
	});
});
