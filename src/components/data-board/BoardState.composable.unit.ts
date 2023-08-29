import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { Board, BoardColumn, BoardSkeletonCard } from "@/types/board/Board";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import { I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { axiosErrorFactory } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardState } from "./BoardState.composable";
import { useSharedEditMode } from "./EditMode.composable";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
	const expectedPayload = apiResponseErrorFactory.build({
		message,
		code,
	});
	const errorResponse = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return errorResponse;
};

describe("BoardState.composable", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let setEditModeId: jest.Mock;

	let testBoard: Board;
	let column: BoardColumn;
	let card: BoardSkeletonCard;

	const setup = (boardId = testBoard.id) => {
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		return mountComposable(() => useBoardState(boardId), {
			[I18N_KEY.valueOf()]: { t: (key: string) => key },
			notifierModule,
		});
	};

	beforeEach(() => {
		card = cardSkeletonResponseFactory.build();
		column = columnResponseFactory.build({ cards: [card] });
		testBoard = boardResponseFactory.build({ columns: [column] });

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("createCard", () => {
		describe("when board is not loaded (= has no state)", () => {
			it("should not call createCardCall", async () => {
				const { createCard, board } = setup();
				board.value = undefined;

				await createCard(column.id);
				await nextTick();

				expect(mockedBoardApiCalls.createCardCall).not.toHaveBeenCalled();
			});

			it("should call createCardCall", async () => {
				const { createCard, board } = setup();
				board.value = testBoard;

				await createCard(column.id);
				await nextTick();

				expect(mockedBoardApiCalls.createCardCall).toHaveBeenCalledWith(
					column.id
				);
			});

			it("should call setEditModeId", async () => {
				const { createCard, board } = setup();
				board.value = testBoard;
				const newCardId = "newCardId1234";
				mockedBoardApiCalls.createCardCall.mockResolvedValue({
					id: newCardId,
				} as CardResponse);

				await createCard(column.id);
				await nextTick();

				expect(setEditModeId).toHaveBeenCalledWith(newCardId);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { createCard, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.createCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				await createCard(column.id);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("createColumn", () => {
		describe("when everything works as expected", () => {
			it("should not call createCardCall when board value is undefined", async () => {
				const { createColumn, board } = setup();
				board.value = undefined;

				await createColumn();
				await nextTick();

				expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
			});

			it("should call createColumnCall", async () => {
				const { createColumn, board } = setup();
				board.value = testBoard;

				await createColumn();
				await nextTick();

				expect(mockedBoardApiCalls.createColumnCall).toHaveBeenCalledWith(
					board.value.id
				);
			});

			it("should call setEditModeId and return new column", async () => {
				const { createColumn, board } = setup();
				board.value = testBoard;
				const newColumn = columnResponseFactory.build();
				mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

				const result = await createColumn();
				await nextTick();

				expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
				expect(result).toEqual(newColumn);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { createColumn, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.createColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				await createColumn();
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("createColumnWithCard", () => {
		describe("when everything works as expected", () => {
			it("should not call createColumnCall when board value is undefined", async () => {
				const { createColumnWithCard, board } = setup();
				board.value = undefined;

				await createColumnWithCard(card.cardId);
				await nextTick();

				expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
			});

			it("should create new column with card", async () => {
				const { createColumnWithCard, board } = setup();
				board.value = testBoard;
				const newColumn = columnResponseFactory.build();
				mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

				await createColumnWithCard(card.cardId);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
					card.cardId,
					newColumn.id,
					0
				);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { createColumnWithCard, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.createColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				await createColumnWithCard("any-id");
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteCard", () => {
		describe("when everything works as expected", () => {
			it("should not call deleteCardCall when board value is undefined", async () => {
				const { deleteCard, board } = setup();
				board.value = undefined;

				await deleteCard(card.cardId);
				await nextTick();

				expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
			});

			it("should delete card", async () => {
				const { deleteCard, board } = setup();
				board.value = testBoard;

				await deleteCard(card.cardId);
				await nextTick();

				expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
					card.cardId
				);
				expect(board.value.columns[0].cards).toEqual([]);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { deleteCard, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.deleteCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

				await deleteCard(card.cardId);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteColumn", () => {
		describe("when everything works as expected", () => {
			it("should not call deleteColumnCall when board value is undefined", async () => {
				const { deleteColumn, board } = setup();
				board.value = undefined;

				await deleteColumn(card.cardId);
				await nextTick();

				expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
			});

			it("should not call deleteColumnCall when column id is unkown", async () => {
				const { deleteColumn, board } = setup();
				board.value = testBoard;

				await deleteColumn("unkown");
				await nextTick();

				expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
			});

			it("should delete column", async () => {
				const { deleteColumn, board } = setup();
				board.value = testBoard;

				await deleteColumn(column.id);
				await nextTick();

				expect(mockedBoardApiCalls.deleteColumnCall).toHaveBeenCalledWith(
					column.id
				);
				expect(board.value.columns).toEqual([]);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { deleteColumn, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.deleteColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				await deleteColumn(column.id);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("extractCard", () => {
		it("should return undefined if board is not set", async () => {
			const { extractCard, board } = setup();
			board.value = undefined;

			const result = await extractCard(card.cardId);
			await nextTick();

			expect(result).toEqual(undefined);
		});

		it("should extract card and return extracted card", async () => {
			const { extractCard, board } = setup();
			board.value = testBoard;

			const result = await extractCard(card.cardId);
			await nextTick();

			expect(board.value.columns[0].cards).not.toContain(card);
			expect(result).toEqual(card);
		});
	});

	describe("fetchBoard", () => {
		it("should fetch board on mount", async () => {
			const boardId = "123124";
			setup(boardId);

			expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalledWith(boardId);
		});

		it("should return fetch function that updates board", async () => {
			const { fetchBoard, board } = setup();

			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
			await fetchBoard(testBoard.id);

			expect(board.value).toEqual(testBoard);
		});

		it("should return isLoading which reflects pending api calls", async () => {
			const { isLoading } = setup();

			expect(isLoading.value).toStrictEqual(true);

			await nextTick();
			await nextTick();

			expect(isLoading.value).toStrictEqual(false);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { fetchBoard } = setup();

				mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(
					setupErrorResponse()
				);
				await fetchBoard(testBoard.id);

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("reloadBoard", () => {
		it("should return undefined if board is not set", async () => {
			const { reloadBoard, board } = setup();
			board.value = undefined;

			const result = await reloadBoard();
			await nextTick();

			expect(result).toEqual(undefined);
		});
	});

	describe("moveCard", () => {
		const createCardPayload = ({
			addedIndex,
			columnIndex,
		}: {
			addedIndex: number | null;
			columnIndex?: number;
		}) => {
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex,
				payload: card,
				columnId: column.id,
				columnIndex,
			};
			return cardPayload;
		};

		it("should not call moveCardCall when board value is undefined", async () => {
			const cardPayload = createCardPayload({ addedIndex: 1 });
			const { moveCard, board } = setup();
			board.value = undefined;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
		});

		it.each([-1, 1])(
			"should not call moveCardCall when column index is %s",
			async (columnIndex) => {
				const cardPayload = createCardPayload({ addedIndex: 0, columnIndex });

				const { moveCard, board } = setup();
				board.value = testBoard;

				await moveCard(cardPayload);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it.each([-1, 1])(
			"should not call moveCardCall when added index is %s",
			async (addedIndex) => {
				const cardPayload = createCardPayload({ addedIndex, columnIndex: 0 });
				const { moveCard, board } = setup();
				board.value = testBoard;

				await moveCard(cardPayload);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it("should handle error when api returns an error code", async () => {
			const { moveCard, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.moveCardCall.mockRejectedValue(setupErrorResponse());

			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
			};

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move card", async () => {
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const cardPayload = createCardPayload({ addedIndex: 1, columnIndex: 0 });

			const { moveCard, board } = setup();
			board.value = testBoard;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				card.cardId,
				cardPayload.columnId,
				cardPayload.addedIndex
			);
			expect(board.value.columns[0].cards).toEqual([card2, card]);
		});
	});

	describe("moveColumn", () => {
		it("should not call moveColumnCall when board value is undefined", async () => {
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				payload: column.id,
			};
			const { moveColumn, board } = setup();
			board.value = undefined;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).not.toHaveBeenCalled();
		});

		it("should handle error when api returns an error code", async () => {
			const { moveColumn, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.moveColumnCall.mockRejectedValue(
				setupErrorResponse()
			);

			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: movingColumn.id,
			};

			await moveColumn(payload);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move column", async () => {
			const column2 = columnResponseFactory.build();
			testBoard.columns.push(column2);
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: column2.id,
			};
			const { moveColumn, board } = setup();
			board.value = testBoard;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).toHaveBeenCalledWith(
				payload.payload,
				board.value.id,
				payload.addedIndex
			);

			expect(board.value.columns).toEqual([column2, column]);
		});
	});

	describe("updateColumnTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not call updateColumnTitleCall when board value is undefined", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = undefined;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).not.toHaveBeenCalled();
		});

		it("shouldhandle error when api returns an error code", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.updateColumnTitleCall.mockRejectedValue(
				setupErrorResponse()
			);

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should update column title", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).toHaveBeenCalledWith(
				column.id,
				NEW_TITLE
			);

			const boardColumn = board.value.columns.find((c) => c.id === column.id);
			expect(boardColumn?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("notifyWithTemplateAndReload", () => {
		describe("when is called", () => {
			it("should call notifyWithTemplate", async () => {
				const { notifyWithTemplateAndReload, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
				mockedErrorHandlerCalls.notifyWithTemplate.mockImplementation(() =>
					jest.fn()
				);

				const handler = notifyWithTemplateAndReload("notLoaded");
				handler();
				await nextTick();

				expect(mockedErrorHandlerCalls.notifyWithTemplate).toHaveBeenCalled();
				expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalled();
			});
		});
	});

	describe("getColumnId", () => {
		it("should get column id", () => {
			const { getColumnId, board } = setup();
			board.value = testBoard;

			const result = getColumnId(0);

			expect(result).toEqual(column.id);
		});

		it("should return undefined if board is not set", () => {
			const { getColumnId, board } = setup();
			board.value = undefined;

			const result = getColumnId(0);

			expect(result).toEqual(undefined);
		});
	});
});
