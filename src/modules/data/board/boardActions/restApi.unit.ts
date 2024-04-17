import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { boardActions, useBoardStore } from "@data-board";
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
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { CardMove } from "@/types/board/DragAndDrop";

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

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = (createBoard = true) => {
		const boardStore = useBoardStore();
		if (createBoard) {
			const card = cardSkeletonResponseFactory.build();
			const column = columnResponseFactory.build({ cards: [card] });
			const testBoard = boardResponseFactory.build({ columns: [column] });
			boardStore.board = testBoard;
		}
		return { boardStore };
	};

	describe("createCardRequest", () => {
		it("should return if board is undefined", async () => {
			const { boardStore } = setup(false);
			boardStore.board = undefined;

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch createCardSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { createCardRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			const newCard = cardResponseFactory.build();
			mockedBoardApiCalls.createCardCall.mockResolvedValue(newCard);

			await createCardRequest(
				BoardActions.createCardRequest({ columnId: columnId })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.createCardSuccess({
					newCard: newCard,
					columnId: columnId,
				})
			);
		});

		it("should dispatch createCardFailure action if the API call fails", async () => {
			const { boardStore } = setup();
			const { createCardRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			mockedBoardApiCalls.createCardCall.mockRejectedValue({});

			await createCardRequest(
				BoardActions.createCardRequest({ columnId: columnId })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.createCardFailure({
					errorMessage: "unable to create card",
					errorData: { columnId: columnId },
				})
			);
		});
	});

	describe("fetchBoard", () => {
		it("should fetch and set the board", async () => {
			const { boardStore } = setup();
			const { fetchBoard } = useBoardRestApi();

			const mockfetchBoard = boardResponseFactory.build();
			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(mockfetchBoard);

			await fetchBoard(BoardActions.fetchBoard({ id: boardStore.board!.id }));

			expect(boardStore.setBoard).toHaveBeenCalledWith(mockfetchBoard);
		});

		it("should set loading state correct", async () => {
			const { boardStore } = setup();
			const { fetchBoard } = useBoardRestApi();

			const board = boardStore.board!;

			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(board);

			const fetchPromise = fetchBoard(
				BoardActions.fetchBoard({ id: board.id })
			);

			expect(boardStore.setLoading).toHaveBeenLastCalledWith(true);
			await fetchPromise;
			expect(boardStore.setLoading).toHaveBeenLastCalledWith(false);
		});

		it("should dispatch an error if the fetch fails", async () => {
			const { boardStore } = setup();
			const { fetchBoard } = useBoardRestApi();

			const expectedError = new Error("fetchBoard error");
			mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(expectedError);

			await fetchBoard(BoardActions.fetchBoard({ id: boardStore.board!.id }));

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

	describe("createColumnRequest", () => {
		it("should return if board is undefined", async () => {
			const { boardStore } = setup(false);
			const { createColumnRequest } = useBoardRestApi();

			await createColumnRequest();

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch createColumnSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { createColumnRequest } = useBoardRestApi();
			const { setEditModeId } = useSharedEditMode();

			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

			const result = await createColumnRequest();

			expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.createColumnSuccess({ newColumn })
			);
			expect(result).toEqual(newColumn);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { createColumnRequest } = useBoardRestApi();

			const expectedError = new Error("createColumnCall error");
			mockedBoardApiCalls.createColumnCall.mockRejectedValue(expectedError);

			await createColumnRequest();

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notCreated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		});
	});

	describe("deleteCardRequest", () => {
		it("should return if board is undefined", async () => {
			const { boardStore } = setup(false);
			const { deleteCardRequest } = useBoardRestApi();

			await deleteCardRequest(
				boardActions.deleteCardRequest({ cardId: "cardId" })
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch deleteCardSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { deleteCardRequest } = useBoardRestApi();
			const cardId = boardStore.board!.columns[0].cards[0].cardId;

			await deleteCardRequest(boardActions.deleteCardRequest({ cardId }));

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.deleteCardSuccess({ cardId })
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { deleteCardRequest } = useBoardRestApi();
			const cardId = boardStore.board!.columns[0].cards[0].cardId;

			const expectedError = new Error("deleteCardCall error");
			mockedBoardApiCalls.deleteCardCall.mockRejectedValue(expectedError);

			await deleteCardRequest(boardActions.deleteCardRequest({ cardId }));

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notDeleted",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardCard",
				})
			);
		});
	});

	describe("deleteColumnRequest", () => {
		it("should return if board is undefined", async () => {
			const { boardStore } = setup(false);
			const { deleteColumnRequest } = useBoardRestApi();

			await deleteColumnRequest(
				boardActions.deleteColumnRequest({ columnId: "columnId" })
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch deleteColumnSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { deleteColumnRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			await deleteColumnRequest(boardActions.deleteColumnRequest({ columnId }));

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.deleteColumnSuccess({ columnId })
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { deleteColumnRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			const expectedError = new Error("deleteColumnCall error");
			mockedBoardApiCalls.deleteColumnCall.mockRejectedValue(expectedError);

			await deleteColumnRequest(boardActions.deleteColumnRequest({ columnId }));

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notDeleted",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		});
	});

	describe("moveCardRequest", () => {
		test.todo("should return if board is undefined");
		test.todo(
			"should dispatch moveCardSuccess action if the API call is successful"
		);
		test.todo(
			"should dispatch notifyWithTemplateAndReload action if the API call fails"
		);
		describe("move is invalid", () => {
			it("should not call moveCardCall if card is moved to the same position", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();
				const card = boardStore.board!.columns[0].cards[0];

				const cardMove: CardMove = {
					cardId: card.cardId,
					oldIndex: 1,
					newIndex: 1,
					fromColumnId: boardStore.board!.columns[0].id,
					toColumnId: boardStore.board!.columns[0].id,
				};

				await moveCardRequest(boardActions.moveCardRequest(cardMove));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			test.todo(
				"should not call moveCardCall if first card is moved to the first position"
			);
			test.todo(
				"should not call moveCardCall if last card is moved to the last position"
			);
		});
	});
});
