import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick, ref } from "vue";
import { useBoardState } from "./BoardState.composable";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { useBoardApi } from "../shared/BoardApi.composable";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { Board, BoardColumn, BoardSkeletonCard } from "../types/Board";
import { CardMove, ColumnMove } from "../types/DragAndDrop";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../shared/EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../shared/BoardNotifications.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("BoardState.composable", () => {
	let mockedBoardNotifierCalls: Partial<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let setEditModeId: jest.Mock;

	let testBoard: Board;
	let column: BoardColumn;
	let card: BoardSkeletonCard;

	const setup = (boardId = testBoard.id) => {
		return mountComposable(() => useBoardState(boardId), {
			[I18N_KEY.valueOf()]: { t: (key: string) => key },
			notifierModule,
		});
	};

	beforeEach(() => {
		card = cardSkeletonResponseFactory.build();
		column = columnResponseFactory.build({ cards: [card] });
		testBoard = boardResponseFactory.build({ columns: [column] });

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);

		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls = {
			generateErrorText: jest.fn(),
			showFailure: jest.fn(),
			isErrorCode: jest.fn(),
		};
		mockedUseBoardNotifier.mockReturnValue(
			mockedBoardNotifierCalls as ReturnType<typeof useBoardNotifier>
		);

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
		it("should not call createCardCall when board value is undefined", async () => {
			const { createCard, board } = setup();
			board.value = undefined;

			await createCard(column.id);
			await nextTick();

			expect(mockedBoardApiCalls.createCardCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newCardId is undefined", async () => {
			const { createCard, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.createCardCall.mockResolvedValue(undefined);

			await createCard(column.id);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardCard"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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
			const newCardId = "newCardId1234";
			mockedBoardApiCalls.createCardCall = jest
				.fn()
				.mockResolvedValue(newCardId);

			const { createCard, board } = setup();
			board.value = testBoard;

			await createCard(column.id);
			await nextTick();

			expect(setEditModeId).toHaveBeenCalledWith(newCardId);
		});
	});

	describe("createColumn", () => {
		it("should not call createCardCall when board value is undefined", async () => {
			const { createColumn, board } = setup();
			board.value = undefined;

			await createColumn();
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newColumn id is undefined", async () => {
			mockedBoardApiCalls.createColumnCall = jest.fn().mockReturnValue({});
			const { createColumn, board } = setup();
			board.value = testBoard;

			await createColumn();
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardColumn"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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
			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall = jest
				.fn()
				.mockResolvedValue(newColumn);

			const { createColumn, board } = setup();
			board.value = testBoard;

			const result = await createColumn();
			await nextTick();

			expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
			expect(result).toEqual(newColumn);
		});
	});

	describe("createColumnWithCard", () => {
		it("should not call createColumnCall when board value is undefined", async () => {
			const { createColumnWithCard, board } = setup();
			board.value = undefined;

			await createColumnWithCard(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newColumn id is undefined", async () => {
			mockedBoardApiCalls.createColumnCall = jest.fn().mockReturnValue({});
			const { createColumnWithCard, board } = setup();
			board.value = testBoard;

			await createColumnWithCard(card.cardId);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardColumn"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});

		it("should create new column with card", async () => {
			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall = jest
				.fn()
				.mockResolvedValue(newColumn);

			const { createColumnWithCard, board } = setup();
			board.value = testBoard;

			await createColumnWithCard(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				card.cardId,
				newColumn.id,
				0
			);
		});
	});

	describe("deleteCard", () => {
		it("should not call deleteCardCall when board value is undefined", async () => {
			const { deleteCard, board } = setup();
			board.value = undefined;

			await deleteCard(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { deleteCard, board } = setup();
			board.value = testBoard;

			await deleteCard(card.cardId);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"delete",
				"boardCard"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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

	describe("deleteColumn", () => {
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

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { deleteColumn, board } = setup();
			board.value = testBoard;

			await deleteColumn(column.id);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"delete",
				"boardColumn"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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
	});

	describe("moveCard", () => {
		it("should not call moveCardCall when board value is undefined", async () => {
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
			};
			const { moveCard, board } = setup();
			board.value = undefined;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
		});

		it.each([-1, 1])(
			"should not call moveCardCall when column index is %s",
			async (columnIndex) => {
				const cardPayload: CardMove = {
					removedIndex: 2,
					addedIndex: 0,
					payload: card,
					columnId: column.id,
					columnIndex,
				};
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
				const cardPayload: CardMove = {
					removedIndex: 2,
					addedIndex,
					payload: card,
					columnId: column.id,
					columnIndex: 0,
				};
				const { moveCard, board } = setup();
				board.value = testBoard;

				await moveCard(cardPayload);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
			};

			const { moveCard, board } = setup();
			board.value = testBoard;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});

		it("should move card", async () => {
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const cardPayload: CardMove = {
				removedIndex: 0,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
				columnIndex: 0,
			};

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

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: movingColumn.id,
			};
			const { moveColumn, board } = setup();
			board.value = testBoard;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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
			expect(board.value.columns[0].title).toEqual(NEW_TITLE);
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
