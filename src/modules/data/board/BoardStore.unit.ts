import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { Board, BoardColumn, BoardSkeletonCard } from "@/types/board/Board";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
// import { axiosErrorFactory } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
// import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardStore } from "./BoardStore";
import { useSharedEditMode } from "./EditMode.composable";
import { setActivePinia, createPinia } from "pinia";

import { useI18n } from "vue-i18n";
import { boardActions, useBoardSocketApi } from "@data-board";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@data-board/socket/socket");
const mockedUseSocketApi = jest.mocked(useBoardSocketApi);

// const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
// 	const expectedPayload = apiResponseErrorFactory.build({
// 		message,
// 		code,
// 	});
// 	const errorResponse = axiosErrorFactory.build({
// 		response: { data: expectedPayload },
// 	});

// 	return errorResponse;
// };

describe("BoardStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let setEditModeId: jest.Mock;

	let testBoard: Board;
	let column: BoardColumn;
	let card: BoardSkeletonCard;

	const setup = (board: Board | undefined = undefined) => {
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);

		const boardStore = useBoardStore();
		boardStore.board = board;
		return { boardStore };
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
		const NEW_CARD = cardResponseFactory.build();
		describe("when board is not loaded (= has no state)", () => {
			it("should not create a card", async () => {
				const { boardStore } = setup();

				boardStore.dispatch(
					boardActions.createCardSuccess({
						newCard: NEW_CARD,
						columnId: column.id,
					})
				);

				expect(boardStore.board).toBe(undefined);
			});
		});

		it("should create a card", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.createCardSuccess({
					newCard: NEW_CARD,
					columnId: column.id,
				})
			);

			expect(boardStore.board?.columns[0].cards[1]).toEqual({
				cardId: NEW_CARD.id,
				height: NEW_CARD.height,
			});
		});

		it("should call setEditModeId", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.createCardSuccess({
					newCard: NEW_CARD,
					columnId: column.id,
				})
			);

			expect(setEditModeId).toHaveBeenCalled();
		});
	});

	describe("createColumn", () => {
		const NEW_COLUMN = columnResponseFactory.build();
		it("should not create Column when board value is undefined", async () => {
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.createColumnSuccess({ newColumn: NEW_COLUMN })
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should create a column", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.createColumnSuccess({ newColumn: NEW_COLUMN })
			);

			expect(boardStore.board?.columns[1]).toEqual(NEW_COLUMN);
		});
	});

	describe("deleteCard", () => {
		it("should not delete a card when a board is undefined", async () => {
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.deleteCardSuccess({ cardId: card.cardId })
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a card if cardId does not exists", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.deleteCardSuccess({ cardId: "unknown cardId" })
			);

			expect(boardStore.board?.columns).toEqual(testBoard.columns);
		});

		it("should delete a card", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.deleteCardSuccess({ cardId: card.cardId })
			);

			expect(boardStore.board?.columns[0].cards).toEqual([]);
		});
	});

	describe("deleteColumn", () => {
		it("should not delete a column when board value is undefined", async () => {
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.deleteColumnSuccess({ columnId: column.id })
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a column when column id is unkown", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.deleteColumnSuccess({ columnId: "unknownId" })
			);

			expect(boardStore.board?.columns).not.toEqual([]);
		});

		it("should delete a column", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.deleteColumnSuccess({ columnId: column.id })
			);

			expect(boardStore.board?.columns).toEqual([]);
		});
	});

	// describe("fetchBoard", () => {
	// 	it("should return fetch function that updates board", async () => {
	// 		const { boardStore } = setup();
	// 		mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);

	// 		boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
	// 		await new Promise((resolve) => setTimeout(resolve, 5));

	// 		expect(boardStore.board).toEqual(testBoard);
	// 	});

	// 	it("should return isLoading which reflects pending api calls", async () => {
	// 		const { boardStore } = setup(testBoard);
	// 		mockedBoardApiCalls.fetchBoardCall.mockImplementation(async () => {
	// 			await new Promise((resolve) => setTimeout(resolve, 5));
	// 			return testBoard;
	// 		});

	// 		boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
	// 		expect(boardStore.isLoading).toStrictEqual(true);

	// 		await new Promise((resolve) => setTimeout(resolve, 5));
	// 		expect(boardStore.isLoading).toStrictEqual(false);

	// 		expect(boardStore.board).toEqual(testBoard);
	// 	});

	// 	describe("when api returns an error", () => {
	// 		it("should use the error handler to react", async () => {
	// 			const { boardStore } = setup();
	// 			mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(
	// 				setupErrorResponse()
	// 			);

	// 			boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
	// 			await new Promise((resolve) => setTimeout(resolve, 5));

	// 			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
	// 		});
	// 	});
	// });

	// describe("reloadBoard", () => {
	// 	it("should return undefined if board is not set", async () => {
	// 		const { boardStore } = setup();

	// 		boardStore.dispatch(boardActions.reloadBoard({}));
	// 		await nextTick();

	// 		expect(boardStore.board).toEqual(undefined);
	// 	});
	// });

	describe("moveCard", () => {
		const createCardPayload = ({
			newIndex,
			columnId,
		}: {
			newIndex?: number;
			columnId?: string;
		}) => {
			const cardPayload: CardMove = {
				cardId: card.cardId,
				oldIndex: 2,
				newIndex: newIndex ?? 2,
				fromColumnId: column.id,
				toColumnId: columnId,
			};
			return cardPayload;
		};

		it("should not move Card when board value is undefined", async () => {
			const { boardStore } = setup();

			const cardPayload = createCardPayload({ newIndex: 1 });
			boardStore.dispatch(boardActions.moveCardSuccess(cardPayload));

			expect(boardStore.board).toBe(undefined);
		});

		describe("when column id is same as the card's column id", () => {
			it("should not call moveCardCall", async () => {
				const { boardStore } = setup(testBoard);

				const cardPayload = createCardPayload({ columnId: column.id });
				boardStore.dispatch(boardActions.moveCardSuccess(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		describe("when column id is unknown", () => {
			it("should not move a card", async () => {
				const { boardStore } = setup(testBoard);

				const cardPayload = createCardPayload({ columnId: "unknownId" });
				boardStore.dispatch(boardActions.moveCardSuccess(cardPayload));

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		it.each([-1, 1])(
			"should not call moveCardCall when new index is %s",
			async (newIndex) => {
				const { boardStore } = setup(testBoard);

				const cardPayload = createCardPayload({ newIndex });
				boardStore.dispatch(boardActions.moveCardSuccess(cardPayload));
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it("should move a card", async () => {
			const { boardStore } = setup(testBoard);
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const cardPayload: CardMove = {
				cardId: card.cardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: column.id,
				toColumnId: column.id,
			};

			boardStore.dispatch(boardActions.moveCardSuccess(cardPayload));
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				card.cardId,
				cardPayload.toColumnId,
				cardPayload.newIndex
			);
			expect(boardStore.board?.columns[0].cards).toEqual([card2, card]);
		});
	});

	describe("moveColumn", () => {
		it("should not move a column when board value is undefined", async () => {
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				columnId: column.id,
			};
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.moveColumnSuccess({
					columnMove: payload,
					byKeyboard: false,
				})
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should move a column", async () => {
			const { boardStore } = setup(testBoard);

			const column2 = columnResponseFactory.build();
			testBoard.columns.push(column2);
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: column2.id,
			};
			boardStore.dispatch(
				boardActions.moveColumnSuccess({
					columnMove: payload,
					byKeyboard: false,
				})
			);

			expect(mockedBoardApiCalls.moveColumnCall).toHaveBeenCalledWith(
				payload.columnId,
				testBoard.id,
				payload.addedIndex
			);

			expect(boardStore.board?.columns).toEqual([column2, column]);
		});
	});

	describe("updateColumnTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not update column title when board value is undefined", async () => {
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.updateColumnTitleSuccess({
					columnId: column.id,
					newTitle: NEW_TITLE,
				})
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should update column title", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateColumnTitleSuccess({
					columnId: column.id,
					newTitle: NEW_TITLE,
				})
			);

			const boardColumn = boardStore.board?.columns.find(
				(c) => c.id === column.id
			);
			expect(boardColumn?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateBoardTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not update board title when board value is undefined", async () => {
			const { boardStore } = setup();

			boardStore.dispatch(
				boardActions.updateBoardTitleSuccess({ newTitle: NEW_TITLE })
			);

			expect(boardStore.board).toBe(undefined);
		});

		it("should update board title", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateBoardTitleSuccess({ newTitle: NEW_TITLE })
			);

			expect(boardStore.board?.title).toStrictEqual(NEW_TITLE);
		});
	});

	// describe("notifyWithTemplateAndReload", () => {
	// 	describe("when is called", () => {
	// 		it("should call notifyWithTemplate", async () => {
	// 			const { boardStore } = setup(testBoard);
	// 			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
	// 			mockedErrorHandlerCalls.notifyWithTemplate.mockImplementation(() =>
	// 				jest.fn()
	// 			);

	// 			boardStore.notifyWithTemplateAndReload("notLoaded");
	// 			await new Promise((resolve) => setTimeout(resolve, 5));
	// 			await nextTick();

	// 			expect(mockedErrorHandlerCalls.notifyWithTemplate).toHaveBeenCalled();
	// 			expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalled();
	// 		});
	// 	});
	// });

	describe("updateBoardVisibility", () => {
		it("should update board visibility", async () => {
			const { boardStore } = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateBoardVisibilitySuccess({ newVisibility: true })
			);

			expect(boardStore.board?.isVisible).toStrictEqual(true);
		});
	});
});
