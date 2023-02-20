import { defineComponent, provide } from "vue";
import { shallowMount } from "@vue/test-utils";
import * as serverApi from "../../serverApi/v3/api";
import { useBoardState } from "./BoardState.composable";

export interface MountOptions {
	provider?: () => void;
}

describe("BoardState composable", () => {
	const setup = () => {
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: {} });
		const useBoardStateMock = { boardControllerGetBoardSkeleton };
		jest
			.spyOn(serverApi, "BoardsApiFactory")
			.mockReturnValue(
				useBoardStateMock as unknown as serverApi.BoardsApiInterface
			);
		return { boardControllerGetBoardSkeleton };
	};

	it("should return createApplicationError", async () => {
		const MOCKED_BOARD_ID = "abc";
		const { boardControllerGetBoardSkeleton } = setup();
		const { fetchBoard } = useBoardState(MOCKED_BOARD_ID);

		expect(fetchBoard).toBeTruthy();
		expect(typeof fetchBoard).toBe("function");

		await fetchBoard(MOCKED_BOARD_ID);
		expect(boardControllerGetBoardSkeleton).toHaveBeenCalledWith(
			MOCKED_BOARD_ID
		);
	});
});
