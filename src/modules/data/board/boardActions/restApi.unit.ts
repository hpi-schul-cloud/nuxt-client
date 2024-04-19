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
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

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
			const cards = cardSkeletonResponseFactory.buildList(3);
			const firstColumn = columnResponseFactory.build({ cards });
			const secondColumn = columnResponseFactory.build({});
			const testBoard = boardResponseFactory.build({
				columns: [firstColumn, secondColumn],
			});
			boardStore.board = testBoard;
		}
		return { boardStore };
	};

	describe("createCardRequest", () => {
		it("should not dispatch when board is undefined", async () => {
			const { boardStore } = setup(false);
			const { createCardRequest } = useBoardRestApi();
			boardStore.board = undefined;

			await createCardRequest(
				BoardActions.createCardRequest({ columnId: "columnId" })
			);

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
		it("should not dispatch when board is undefined", async () => {
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
		it("should not dispatch when board is undefined", async () => {
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
		const createCardPayload = ({
			cardId,
			oldIndex,
			newIndex,
			fromColumnId,
			toColumnId,
			columnDelta,
		}: {
			cardId: string;
			oldIndex?: number;
			newIndex?: number;
			fromColumnId: string;
			toColumnId?: string;
			columnDelta?: number;
		}) => {
			const cardPayload: CardMove = {
				cardId,
				oldIndex: oldIndex ?? 0,
				newIndex: newIndex ?? 0,
				fromColumnId,
				toColumnId,
				columnDelta,
			};
			return cardPayload;
		};
		it("should not dispatch when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { moveCardRequest } = useBoardRestApi();

			const cardPayload = createCardPayload({
				cardId: "cardId",
				fromColumnId: "columnId",
			});

			await moveCardRequest(boardActions.moveCardRequest(cardPayload));

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		describe("when move is invalid", () => {
			it("should not call moveCardCall if card is moved to the same position", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					fromColumnId: firstColumn.id,
					toColumnId: firstColumn.id,
				});

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if first card is moved to the first position", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const firstCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: firstCard.cardId,
					newIndex: -1,
					fromColumnId: firstColumn.id,
					toColumnId: firstColumn.id,
				});

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if last card is moved to the last position", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const column1 = boardStore.board!.columns[0];
				const lastCard = column1.cards[2];

				const cardPayload = createCardPayload({
					cardId: lastCard.cardId,
					oldIndex: 2,
					newIndex: 3,
					fromColumnId: column1.id,
					toColumnId: column1.id,
				});

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		describe("when move is valid", () => {
			it("should dispatch moveCardSuccess if card is moved inside same column and Api call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 2,
					fromColumnId: firstColumn.id,
					toColumnId: firstColumn.id,
				});

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(boardStore.dispatch).toHaveBeenCalledWith(
					boardActions.moveCardSuccess(cardPayload)
				);
			});

			it("should dispatch moveCardSuccess if card is moved beyond last column and the API call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					fromColumnId: firstColumn.id,
					columnDelta: 2,
				});

				const newColumn = columnResponseFactory.build();

				mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
					movingCard.cardId,
					newColumn.id,
					0
				);

				expect(boardStore.dispatch).toHaveBeenCalledWith(
					boardActions.moveCardSuccess({
						cardId: movingCard.cardId,
						oldIndex: 0,
						newIndex: 0,
						fromColumnId: firstColumn.id,
						toColumnId: newColumn.id,
						columnDelta: 2,
						forceNextTick: undefined,
					})
				);
			});

			it("should dispatch moveCardSuccess if card is moved to another columm and the API call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const secondColumn = boardStore.board!.columns[1];
				const movingCard = firstColumn.cards[1];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					oldIndex: 1,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					toColumnId: secondColumn.id,
				});

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(boardStore.dispatch).toHaveBeenCalledWith(
					boardActions.moveCardSuccess(cardPayload)
				);
			});
			it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 2,
					fromColumnId: firstColumn.id,
					toColumnId: firstColumn.id,
				});

				const expectedError = new Error("moveCardCall error");
				mockedBoardApiCalls.moveCardCall.mockRejectedValue(expectedError);

				await moveCardRequest(boardActions.moveCardRequest(cardPayload));

				expect(boardStore.dispatch).toHaveBeenCalledWith(
					BoardActions.notifyWithTemplateAndReload({
						error: expectedError,
						errorType: "notUpdated",
						httpStatus: HttpStatusCode.NotFound,
						boardObjectType: "boardCard",
					})
				);
			});
		});
	});

	describe("moveColumnRequest", () => {
		it("should not dispatch when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { moveColumnRequest } = useBoardRestApi();

			const columnMove = { addedIndex: 1, columnId: "columnId" };
			await moveColumnRequest(
				boardActions.moveColumnRequest({ columnMove, byKeyboard: false })
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch moveColumnSuccess if the API call is successful", async () => {
			const { boardStore } = setup();
			const { moveColumnRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];

			const columnMove: ColumnMove = {
				removedIndex: 0,
				addedIndex: 1,
				columnId: firstColumn.id,
			};

			await moveColumnRequest(
				boardActions.moveColumnRequest({ columnMove, byKeyboard: false })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.moveColumnSuccess({ columnMove, byKeyboard: false })
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { moveColumnRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];

			const columnMove: ColumnMove = {
				removedIndex: 0,
				addedIndex: 1,
				columnId: firstColumn.id,
			};
			const expectedError = new Error("moveColumnCall error");
			mockedBoardApiCalls.moveColumnCall.mockRejectedValue(expectedError);

			await moveColumnRequest(
				boardActions.moveColumnRequest({ columnMove, byKeyboard: false })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		});
	});

	describe("updateColumnTitleRequest", () => {
		it("should not dispatch when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateColumnTitleRequest } = useBoardRestApi();

			await updateColumnTitleRequest(
				boardActions.updateColumnTitleRequest({
					columnId: "columnId",
					newTitle: "newTitle",
				})
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch updateColumnTitleSuccess if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateColumnTitleRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];
			const payload = { columnId: firstColumn.id, newTitle: "newTitle" };

			await updateColumnTitleRequest(
				boardActions.updateColumnTitleRequest(payload)
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.updateColumnTitleSuccess(payload)
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { updateColumnTitleRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];
			const payload = { columnId: firstColumn.id, newTitle: "newTitle" };

			const expectedError = new Error("updateColumnTitleCall error");
			mockedBoardApiCalls.updateColumnTitleCall.mockRejectedValue(
				expectedError
			);

			await updateColumnTitleRequest(
				boardActions.updateColumnTitleRequest(payload)
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should not dispatch when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateBoardTitleRequest } = useBoardRestApi();

			await updateBoardTitleRequest(
				boardActions.updateBoardTitleRequest({ newTitle: "newTitle" })
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch updateBoardTitleSuccess if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateBoardTitleRequest } = useBoardRestApi();

			const newTitle = "newTitle";

			await updateBoardTitleRequest(
				boardActions.updateBoardTitleRequest({ newTitle })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.updateBoardTitleSuccess({ newTitle })
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { updateBoardTitleRequest } = useBoardRestApi();

			const newTitle = "newTitle";

			const expectedError = new Error("updateBoardTitleCall error");
			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue(expectedError);

			await updateBoardTitleRequest(
				boardActions.updateBoardTitleRequest({ newTitle })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReload({
					error: expectedError,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should not dispatch when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			await updateBoardVisibilityRequest(
				boardActions.updateBoardVisibilityRequest({ newVisibility: true })
			);

			expect(boardStore.dispatch).not.toHaveBeenCalled();
		});

		it("should dispatch updateBoardVisibilitySuccess if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			const newVisibility = true;

			await updateBoardVisibilityRequest(
				boardActions.updateBoardVisibilityRequest({ newVisibility })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.updateBoardVisibilitySuccess({ newVisibility })
			);
		});

		it("should dispatch notifyWithTemplateAndReload action if the API call fails", async () => {
			const { boardStore } = setup();
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			const expectedError = new Error("updateBoardVisibilityCall error");
			mockedBoardApiCalls.updateBoardVisibilityCall.mockRejectedValue(
				expectedError
			);

			await updateBoardVisibilityRequest(
				boardActions.updateBoardVisibilityRequest({ newVisibility: true })
			);

			expect(boardStore.dispatch).toHaveBeenCalledWith(
				BoardActions.notifyWithTemplateAndReloadRequest({
					error: expectedError,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		});
	});

	describe("reloadBoard", () => {
		it("should not fetch when board value is undefined", async () => {
			setup(false);
			const { reloadBoard } = useBoardRestApi();

			await reloadBoard();

			expect(mockedBoardApiCalls.fetchBoardCall).not.toHaveBeenCalled();
		});

		it("should fetch the board", async () => {
			const { boardStore } = setup();
			const { reloadBoard } = useBoardRestApi();

			await reloadBoard();

			expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalledWith(
				boardStore.board!.id
			);
		});
	});
});
