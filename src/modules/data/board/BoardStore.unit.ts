import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse } from "@/serverApi/v3";
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
import { setActivePinia, createPinia, storeToRefs } from "pinia";

import { useI18n } from "vue-i18n";
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

describe("BoardState.composable", () => {
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

	const setup = () => {
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		const board = storeToRefs(useBoardStore());
		const { dispatch, actions, isLoading } = useBoardStore();
		return { ...board, actions, dispatch, isLoading };
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
				const { board, actions } = setup();

				const payloadAction = {
					type: "create-card" as const,
					payload: { columnId: column.id },
				};

				board.value = undefined;

				await actions.createCard(payloadAction);
				await nextTick();

				expect(mockedBoardApiCalls.createCardCall).not.toHaveBeenCalled();
			});

			it("should call createCardCall", async () => {
				const { board, actions } = setup();
				const { createCard } = actions;
				board.value = testBoard;

				const payloadAction = {
					type: "create-card" as const,
					payload: { columnId: column.id },
				};

				createCard(payloadAction);

				expect(mockedBoardApiCalls.createCardCall).toHaveBeenCalledWith(
					column.id
				);
			});

			it("should call setEditModeId", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				const newCardId = "newCardId1234";
				mockedBoardApiCalls.createCardCall.mockResolvedValue({
					id: newCardId,
				} as CardResponse);

				const payloadAction = {
					type: "create-card" as const,
					payload: { columnId: column.id },
				};

				await actions.createCard(payloadAction);
				await nextTick();

				expect(setEditModeId).toHaveBeenCalledWith(newCardId);
			});
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.createCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				const payloadAction = {
					type: "create-card" as const,
					payload: { columnId: column.id },
				};

				await actions.createCard(payloadAction);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("createColumn", () => {
		it("should not call createCardCall when board value is undefined", async () => {
			const { actions, board } = setup();
			board.value = undefined;
			await actions.createColumn();
			await nextTick();
			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should call createColumnCall", async () => {
			const { actions, board } = setup();
			board.value = testBoard;
			await actions.createColumn();
			await nextTick();
			expect(mockedBoardApiCalls.createColumnCall).toHaveBeenCalledWith(
				board.value.id
			);
		});

		it("should call setEditModeId and return new column", async () => {
			const { actions, board } = setup();
			board.value = testBoard;
			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);
			const result = await actions.createColumn();
			await nextTick();
			expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
			expect(result).toEqual(newColumn);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.createColumnCall.mockRejectedValue(
					setupErrorResponse()
				);
				await actions.createColumn();
				await nextTick();
				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteCard", () => {
		it("should not call deleteCardCall when board value is undefined", async () => {
			const { actions, board } = setup();
			board.value = undefined;
			const payloadAction = {
				type: "delete-card" as const,
				payload: { cardId: card.cardId },
			};

			await actions.deleteCard(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
		});

		it("should delete card", async () => {
			const { actions, board } = setup();
			board.value = testBoard;
			const payloadAction = {
				type: "delete-card" as const,
				payload: { cardId: card.cardId },
			};

			await actions.deleteCard(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				card.cardId
			);
			expect(board.value.columns[0].cards).toEqual([]);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.deleteCardCall.mockRejectedValue(
					setupErrorResponse()
				);

				const payloadAction = {
					type: "delete-card" as const,
					payload: { cardId: card.cardId },
				};

				mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

				await actions.deleteCard(payloadAction);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("deleteColumn", () => {
		it("should not call deleteColumnCall when board value is undefined", async () => {
			const { actions, board } = setup();
			board.value = undefined;

			const payloadAction = {
				type: "delete-column" as const,
				payload: { columnId: column.id },
			};

			await actions.deleteColumn(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
		});

		it("should not call deleteColumnCall when column id is unkown", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "delete-column" as const,
				payload: { columnId: "unknown" },
			};

			await actions.deleteColumn(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
		});

		it("should delete column", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "delete-column" as const,
				payload: { columnId: column.id },
			};

			await actions.deleteColumn(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).toHaveBeenCalledWith(
				column.id
			);
			expect(board.value.columns).toEqual([]);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.deleteColumnCall.mockRejectedValue(
					setupErrorResponse()
				);

				const payloadAction = {
					type: "delete-column" as const,
					payload: { columnId: column.id },
				};

				await actions.deleteColumn(payloadAction);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("fetchBoard", () => {
		// it("should fetch board on mount", async () => {
		// 	const boardId = "123124";
		// 	setup();

		// 	expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalledWith(boardId);
		// });

		it("should return fetch function that updates board", async () => {
			const { actions, board } = setup();

			const payloadAction = {
				type: "fetch-board" as const,
				payload: { id: testBoard.id },
			};

			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
			await actions.fetchBoard(payloadAction);

			expect(board.value).toEqual(testBoard);
		});

		it("should return isLoading which reflects pending api calls", async () => {
			const { isLoading, actions } = setup();

			const payloadAction = {
				type: "fetch-board" as const,
				payload: { id: testBoard.id },
			};

			setTimeout(() => {
				actions.fetchBoard(payloadAction);
				expect(isLoading).toStrictEqual(true);
			}, 10);

			expect(isLoading).toStrictEqual(false);
		});

		describe("when api returns an error", () => {
			it("should use the error handler to react", async () => {
				const { actions } = setup();

				const payloadAction = {
					type: "fetch-board" as const,
					payload: { id: testBoard.id },
				};

				mockedBoardApiCalls.fetchBoardCall.mockRejectedValue(
					setupErrorResponse()
				);
				await actions.fetchBoard(payloadAction);

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("reloadBoard", () => {
		it("should return undefined if board is not set", async () => {
			const { actions, board } = setup();
			board.value = undefined;

			const result = await actions.reloadBoard();
			await nextTick();

			expect(result).toEqual(undefined);
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
			const cardPayload = createCardPayload({ newIndex: 1 });
			const { actions, board } = setup();
			board.value = undefined;

			const payloadAction = {
				type: "move-card" as const,
				payload: cardPayload,
			};

			await actions.moveCard(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
		});

		describe("when column id is same as the card's column id", () => {
			it("should not call moveCardCall", async () => {
				const cardPayload = createCardPayload({
					columnId: column.id,
				});
				const { actions, board } = setup();
				board.value = testBoard;

				const payloadAction = {
					type: "move-card" as const,
					payload: cardPayload,
				};

				await actions.moveCard(payloadAction);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		describe("when column id is unknown", () => {
			it("should not call moveCardCall", async () => {
				const cardPayload = createCardPayload({
					columnId: "59a3e4a4a2049554a93fec93",
				});

				const { actions, board } = setup();
				board.value = testBoard;

				const payloadAction = {
					type: "move-card" as const,
					payload: cardPayload,
				};

				await actions.moveCard(payloadAction);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		it.each([-1, 1])(
			"should not call moveCardCall when new index is %s",
			async (newIndex) => {
				const cardPayload = createCardPayload({ newIndex });
				const { actions, board } = setup();
				board.value = testBoard;

				const payloadAction = {
					type: "move-card" as const,
					payload: cardPayload,
				};

				await actions.moveCard(payloadAction);
				await nextTick();

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			}
		);

		it("should handle error when api returns an error code", async () => {
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const { actions, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.moveCardCall.mockRejectedValue(setupErrorResponse());

			const cardPayload: CardMove = {
				cardId: card.cardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: column.id,
				toColumnId: column.id,
			};

			const payloadAction = {
				type: "move-card" as const,
				payload: cardPayload,
			};

			await actions.moveCard(payloadAction);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move card", async () => {
			const card2 = cardSkeletonResponseFactory.build();
			column.cards.push(card2);
			const cardPayload: CardMove = {
				cardId: card.cardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: column.id,
				toColumnId: column.id,
			};

			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "move-card" as const,
				payload: cardPayload,
			};

			await actions.moveCard(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				card.cardId,
				cardPayload.toColumnId,
				cardPayload.newIndex
			);
			expect(board.value.columns[0].cards).toEqual([card2, card]);
		});
	});

	describe("moveColumn", () => {
		it("should not call moveColumnCall when board value is undefined", async () => {
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				columnId: column.id,
			};
			const { actions, board } = setup();
			board.value = undefined;

			const payloadAction = {
				type: "move-column" as const,
				payload: { columnMove: payload, byKeyboard: false },
			};

			await actions.moveColumn(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).not.toHaveBeenCalled();
		});

		it("should handle error when api returns an error code", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			mockedBoardApiCalls.moveColumnCall.mockRejectedValue(
				setupErrorResponse()
			);

			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: movingColumn.id,
			};

			const payloadAction = {
				type: "move-column" as const,
				payload: { columnMove: payload, byKeyboard: false },
			};

			await actions.moveColumn(payloadAction);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should move column", async () => {
			const column2 = columnResponseFactory.build();
			testBoard.columns.push(column2);
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: column2.id,
			};
			const { actions, board } = setup();
			board.value = testBoard;
			const payloadAction = {
				type: "move-column" as const,
				payload: { columnMove: payload, byKeyboard: false },
			};

			await actions.moveColumn(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).toHaveBeenCalledWith(
				payload.columnId,
				board.value.id,
				payload.addedIndex
			);

			expect(board.value.columns).toEqual([column2, column]);
		});
	});

	describe("updateColumnTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not call updateColumnTitleCall when board value is undefined", async () => {
			const { actions, board } = setup();
			board.value = undefined;

			const payloadAction = {
				type: "update-column-title" as const,
				payload: { columnId: column.id, newTitle: NEW_TITLE },
			};

			await actions.updateColumnTitle(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).not.toHaveBeenCalled();
		});

		it("shouldhandle error when api returns an error code", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-column-title" as const,
				payload: { columnId: column.id, newTitle: NEW_TITLE },
			};

			mockedBoardApiCalls.updateColumnTitleCall.mockRejectedValue(
				setupErrorResponse()
			);

			await actions.updateColumnTitle(payloadAction);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should update column title", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-column-title" as const,
				payload: { columnId: column.id, newTitle: NEW_TITLE },
			};

			await actions.updateColumnTitle(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).toHaveBeenCalledWith(
				column.id,
				NEW_TITLE
			);

			const boardColumn = board.value.columns.find((c) => c.id === column.id);
			expect(boardColumn?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateBoardTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not call updateBoardTitleCall when board value is undefined", async () => {
			const { actions, board } = setup();
			board.value = undefined;

			const payloadAction = {
				type: "update-board-title" as const,
				payload: { newTitle: NEW_TITLE },
			};

			await actions.updateBoardTitle(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.updateBoardTitleCall).not.toHaveBeenCalled();
		});

		it("shouldhandle error when api returns an error code", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-board-title" as const,
				payload: { newTitle: NEW_TITLE },
			};

			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue(
				setupErrorResponse()
			);

			await actions.updateBoardTitle(payloadAction);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});

		it("should update board title", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-board-title" as const,
				payload: { newTitle: NEW_TITLE },
			};

			await actions.updateBoardTitle(payloadAction);
			await nextTick();

			expect(mockedBoardApiCalls.updateBoardTitleCall).toHaveBeenCalledWith(
				board.value.id,
				NEW_TITLE
			);

			expect(board.value.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("notifyWithTemplateAndReload", () => {
		describe("when is called", () => {
			it("should call notifyWithTemplate", async () => {
				const { actions, board } = setup();
				board.value = testBoard;
				mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(testBoard);
				mockedErrorHandlerCalls.notifyWithTemplate.mockImplementation(() =>
					jest.fn()
				);

				const handler = actions.notifyWithTemplateAndReload("notLoaded");
				handler();
				await nextTick();

				expect(mockedErrorHandlerCalls.notifyWithTemplate).toHaveBeenCalled();
				expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalled();
			});
		});
	});

	describe("updateBoardVisibility", () => {
		it("should update board visibility", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-board-visibility" as const,
				payload: { newVisibility: true },
			};

			await actions.updateBoardVisibility(payloadAction);
			await nextTick();

			expect(
				mockedBoardApiCalls.updateBoardVisibilityCall
			).toHaveBeenCalledWith(board.value.id, true);

			expect(board.value.isVisible).toStrictEqual(true);
		});

		it("should handle error when api returns an error code", async () => {
			const { actions, board } = setup();
			board.value = testBoard;

			const payloadAction = {
				type: "update-board-visibility" as const,
				payload: { newVisibility: false },
			};

			mockedBoardApiCalls.updateBoardVisibilityCall.mockRejectedValue(
				setupErrorResponse()
			);

			await actions.updateBoardVisibility(payloadAction);
			await nextTick();

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});
	});
});
