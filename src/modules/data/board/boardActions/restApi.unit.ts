import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { setActivePinia } from "pinia";
import { useBoardRestApi } from "./restApi";
import * as BoardActions from "./actions";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import { ref } from "vue";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { BoardResponse, CardResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("../BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

describe("restApi", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let setEditModeId: jest.Mock;
	let mockNewCard: CardResponse;

	beforeEach(() => {
		mockNewCard = cardResponseFactory.build();
		setActivePinia(createTestingPinia());

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedBoardApiCalls.createCardCall.mockResolvedValue(mockNewCard);

		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	describe("createCardRequest", () => {
		it("should return if board is undefined", async () => {
			const boardStore = useBoardStore();
			boardStore.board = undefined;

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch createCardSuccess action if the API call is successful", async () => {
			const boardStore = useBoardStore();
			const { createCardRequest } = useBoardRestApi();

			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;

			await createCardRequest(
				BoardActions.createCardRequest({ columnId: column.id })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.createCardSuccess({
					newCard: mockNewCard,
					columnId: column.id,
				})
			);
		});

		it("should dispatch createCardFailure action if the API call fails", async () => {
			const boardStore = useBoardStore();
			const { createCardRequest } = useBoardRestApi();

			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;

			mockedBoardApiCalls.createCardCall.mockRejectedValue({});

			await createCardRequest(
				BoardActions.createCardRequest({ columnId: column.id })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.createCardFailure({
					errorMessage: "unable to create card",
					errorData: { columnId: column.id },
				})
			);
		});
	});

	describe("fetchBoard", () => {
		it("should fetch and set the board", async () => {
			const boardStore = useBoardStore();
			const { fetchBoard } = useBoardRestApi();

			const mockfetchBoard = boardResponseFactory.build();
			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(mockfetchBoard);

			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;

			await fetchBoard(BoardActions.fetchBoard({ id: testBoard.id }));

			expect(boardStore.setBoard).toHaveBeenCalledWith(mockfetchBoard);
		});

		it("should set loading state correct", async () => {
			const boardStore = useBoardStore();
			const { fetchBoard } = useBoardRestApi();

			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;

			const promise = new Promise<BoardResponse>((resolve) => {
				resolve(testBoard);
			});
			mockedBoardApiCalls.fetchBoardCall.mockReturnValue(promise);

			await fetchBoard(BoardActions.fetchBoard({ id: testBoard.id }));

			expect(boardStore.setLoading).toHaveBeenCalledWith(true);
		});

		it("should dispatch an error if the fetch fails", async () => {
			const boardStore = useBoardStore();
			const { fetchBoard } = useBoardRestApi();

			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;

			const expectedError = new Error("fetchBoard error");
			mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(expectedError);

			await fetchBoard(BoardActions.fetchBoard({ id: testBoard.id }));

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplate({
					error: expectedError,
					errorType: "notLoaded",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		});
	});
});
