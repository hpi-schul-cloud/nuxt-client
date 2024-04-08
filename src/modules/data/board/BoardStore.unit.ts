import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { Board, BoardColumn, BoardSkeletonCard } from "@/types/board/Board";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import { axiosErrorFactory } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardStore } from "./BoardStore";
import { useSharedEditMode } from "./EditMode.composable";
import { setActivePinia, createPinia } from "pinia";

import { useI18n } from "vue-i18n";
import { boardActions } from "@data-board";
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

describe("BoardStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
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

		const boardStore = useBoardStore();
		boardStore.board = board;
		return boardStore;
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
				const boardStore = setup();

				boardStore.dispatch(boardActions.createCard({ columnId: column.id }));
				await nextTick();

				expect(mockedBoardApiCalls.createCardCall).not.toHaveBeenCalled();
			});

			it("should call createCardCall", async () => {
				const boardStore = setup(testBoard);

				boardStore.dispatch(boardActions.createCard({ columnId: column.id }));
				await nextTick();

				expect(mockedBoardApiCalls.createCardCall).toHaveBeenCalledWith(
					column.id
				);
			});

			it("should call setEditModeId", async () => {
				const boardStore = setup(testBoard);

				boardStore.dispatch(boardActions.createCard({ columnId: column.id }));
				await nextTick();

				expect(setEditModeId).toHaveBeenCalled();
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const boardStore = setup(testBoard);
				mockedBoardApiCalls.createCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				boardStore.dispatch(boardActions.createCard({ columnId: column.id }));
				await new Promise((resolve) => setTimeout(resolve, 5));

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("createColumn", () => {
		it("should not call createCardCall when board value is undefined", async () => {
			const boardStore = setup();

			boardStore.dispatch(boardActions.createColumn({}));
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should call createColumnCall", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(boardActions.createColumn({}));
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).toHaveBeenCalledWith(
				boardStore.board?.id
			);
		});

		it("should call setEditModeId and return new column", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(boardActions.createColumn({}));
			await nextTick();

			expect(setEditModeId).toHaveBeenCalled();
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const boardStore = setup(testBoard);
				mockedBoardApiCalls.createColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				boardStore.dispatch(boardActions.createColumn({}));
				await new Promise((resolve) => setTimeout(resolve, 5));

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteCard", () => {
		it("should not call deleteCardCall when board value is undefined", async () => {
			const boardStore = setup();

			boardStore.dispatch(boardActions.deleteCard({ cardId: card.cardId }));
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
		});

		it("should delete card", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(boardActions.deleteCard({ cardId: card.cardId }));
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				card.cardId
			);
			expect(boardStore.board?.columns[0].cards).toEqual([]);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const boardStore = setup(testBoard);
				mockedBoardApiCalls.deleteCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				boardStore.dispatch(boardActions.deleteCard({ cardId: card.cardId }));
				await new Promise((resolve) => setTimeout(resolve, 5));

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteColumn", () => {
		it("should not call deleteColumnCall when board value is undefined", async () => {
			const boardStore = setup();

			boardStore.dispatch(boardActions.deleteColumn({ columnId: column.id }));
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
		});

		it("should not call deleteColumnCall when column id is unkown", async () => {
			const boardStore = setup();

			boardStore.dispatch(boardActions.deleteColumn({ columnId: "unknownId" }));
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
		});

		it("should delete column", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(boardActions.deleteColumn({ columnId: column.id }));

			expect(mockedBoardApiCalls.deleteColumnCall).toHaveBeenCalledWith(
				column.id
			);
			expect(boardStore.board?.columns).toEqual([]);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const boardStore = setup(testBoard);
				mockedBoardApiCalls.deleteColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				boardStore.dispatch(boardActions.deleteColumn({ columnId: column.id }));
				await new Promise((resolve) => setTimeout(resolve, 5));

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("fetchBoard", () => {
		it("should return fetch function that updates board", async () => {
			const boardStore = setup();
			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);

			boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(boardStore.board).toEqual(testBoard);
		});

		it("should return isLoading which reflects pending api calls", async () => {
			const boardStore = setup();
			mockedBoardApiCalls.fetchBoardCall.mockImplementation(async () => {
				await new Promise((resolve) => setTimeout(resolve, 5));
				return testBoard;
			});

			boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
			expect(boardStore.isLoading).toStrictEqual(true);

			await new Promise((resolve) => setTimeout(resolve, 5));
			expect(boardStore.isLoading).toStrictEqual(false);

			expect(boardStore.board).toEqual(testBoard);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const boardStore = setup(testBoard);
				mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(
					setupErrorResponse()
				);

				boardStore.dispatch(boardActions.fetchBoard({ id: testBoard.id }));
				await new Promise((resolve) => setTimeout(resolve, 5));

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("reloadBoard", () => {
		it("should return undefined if board is not set", async () => {
			const boardStore = setup();

			boardStore.dispatch(boardActions.reloadBoard({}));
			await nextTick();

			expect(boardStore.board).toEqual(undefined);
		});
	});

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

		it("should not call moveCardCall when board value is undefined", async () => {
			const boardStore = setup();

			const cardPayload = createCardPayload({ newIndex: 1 });
			boardStore.dispatch(boardActions.moveCard(cardPayload));
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
		});

		describe("when column id is same as the card's column id", () => {
			it("should not call moveCardCall", async () => {
				const boardStore = setup(testBoard);

				const cardPayload = createCardPayload({ columnId: column.id });
				boardStore.dispatch(boardActions.moveCard(cardPayload));
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		describe("when column id is unknown", () => {
			it("should not call moveCardCall", async () => {
				const boardStore = setup(testBoard);

				const cardPayload = createCardPayload({ columnId: "unknownId" });
				boardStore.dispatch(boardActions.moveCard(cardPayload));
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		it.each([-1, 1])(
			"should not call moveCardCall when new index is %s",
			async (newIndex) => {
				const boardStore = setup(testBoard);

				const cardPayload = createCardPayload({ newIndex });
				boardStore.dispatch(boardActions.moveCard(cardPayload));
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it("should handle error when api returns an error code", async () => {
			const boardStore = setup(testBoard);
			mockedBoardApiCalls.moveCardCall.mockRejectedValue(setupErrorResponse());

			const cardPayload = createCardPayload({ newIndex: 1 });
			boardStore.dispatch(boardActions.moveCard(cardPayload));
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move card", async () => {
			const boardStore = setup(testBoard);
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const cardPayload: CardMove = {
				cardId: card.cardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: column.id,
				toColumnId: column.id,
			};

			boardStore.dispatch(boardActions.moveCard(cardPayload));
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
		it("should not call moveColumnCall when board value is undefined", async () => {
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				columnId: column.id,
			};
			const boardStore = setup();

			boardStore.dispatch(
				boardActions.moveColumn({ columnMove: payload, byKeyboard: false })
			);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).not.toHaveBeenCalled();
		});

		it("should handle error when api returns an error code", async () => {
			const boardStore = setup(testBoard);
			mockedBoardApiCalls.moveColumnCall.mockRejectedValue(
				setupErrorResponse()
			);

			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: movingColumn.id,
			};
			boardStore.dispatch(
				boardActions.moveColumn({ columnMove: payload, byKeyboard: false })
			);
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move column", async () => {
			const boardStore = setup(testBoard);

			const column2 = columnResponseFactory.build();
			testBoard.columns.push(column2);
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: column2.id,
			};
			boardStore.dispatch(
				boardActions.moveColumn({ columnMove: payload, byKeyboard: false })
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
		it("should not call updateColumnTitleCall when board value is undefined", async () => {
			const boardStore = setup();

			boardStore.dispatch(
				boardActions.updateColumnTitle({
					columnId: column.id,
					newTitle: NEW_TITLE,
				})
			);

			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).not.toHaveBeenCalled();
		});

		it("shouldhandle error when api returns an error code", async () => {
			const boardStore = setup(testBoard);

			mockedBoardApiCalls.updateColumnTitleCall.mockRejectedValue(
				setupErrorResponse()
			);

			boardStore.dispatch(
				boardActions.updateColumnTitle({
					columnId: column.id,
					newTitle: NEW_TITLE,
				})
			);
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should update column title", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateColumnTitle({
					columnId: column.id,
					newTitle: NEW_TITLE,
				})
			);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).toHaveBeenCalledWith(
				column.id,
				NEW_TITLE
			);

			const boardColumn = boardStore.board?.columns.find(
				(c) => c.id === column.id
			);
			expect(boardColumn?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateBoardTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not call updateBoardTitleCall when board value is undefined", async () => {
			const boardStore = setup();

			boardStore.dispatch(
				boardActions.updateBoardTitle({ newTitle: NEW_TITLE })
			);

			await nextTick();

			expect(mockedBoardApiCalls.updateBoardTitleCall).not.toHaveBeenCalled();
		});

		it("shouldhandle error when api returns an error code", async () => {
			const boardStore = setup(testBoard);

			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue(
				setupErrorResponse()
			);

			boardStore.dispatch(
				boardActions.updateBoardTitle({ newTitle: NEW_TITLE })
			);
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should update board title", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateBoardTitle({ newTitle: NEW_TITLE })
			);
			await nextTick();

			expect(mockedBoardApiCalls.updateBoardTitleCall).toHaveBeenCalledWith(
				boardStore.board?.id,
				NEW_TITLE
			);

			expect(boardStore.board?.title).toStrictEqual(NEW_TITLE);
		});
	});

	// describe("notifyWithTemplateAndReload", () => {
	// 	describe("when is called", () => {
	// 		it("should call notifyWithTemplate", async () => {
	// 			const boardStore = setup(testBoard);

	// 			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
	// 			mockedErrorHandlerCalls.notifyWithTemplate.mockImplementation(() =>
	// 				jest.fn()
	// 			);

	// 			boardActions.notifyWithTemplateAndReload({ errorType: "notLoaded" });

	// 			await new Promise((resolve) => setTimeout(resolve, 5));
	// 			await nextTick();

	// 			expect(mockedErrorHandlerCalls.notifyWithTemplate).toHaveBeenCalled();
	// 			expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalled();
	// 		});
	// 	});
	// });

	describe("updateBoardVisibility", () => {
		it("should update board visibility", async () => {
			const boardStore = setup(testBoard);

			boardStore.dispatch(
				boardActions.updateBoardVisibility({ newVisibility: true })
			);
			await nextTick();

			expect(
				mockedBoardApiCalls.updateBoardVisibilityCall
			).toHaveBeenCalledWith(boardStore.board?.id, true);

			expect(boardStore.board?.isVisible).toStrictEqual(true);
		});

		it("should handle error when api returns an error code", async () => {
			const boardStore = setup(testBoard);
			mockedBoardApiCalls.updateBoardVisibilityCall.mockRejectedValue(
				setupErrorResponse()
			);

			boardStore.dispatch(
				boardActions.updateBoardVisibility({ newVisibility: true })
			);
			await new Promise((resolve) => setTimeout(resolve, 5));

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});
	});
});
