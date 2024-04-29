import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardStore } from "./BoardStore";
import { useSharedEditMode } from "./EditMode.composable";
import { setActivePinia, createPinia } from "pinia";

import { useI18n } from "vue-i18n";
import { useBoardSocketApi } from "@data-board";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { MoveCardRequestPayload } from "@/modules/data/board/boardActions/boardActionPayload";

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
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);
	});

	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = (createBoard = true) => {
		const cards = cardSkeletonResponseFactory.buildList(3);
		const firstColumn = columnResponseFactory.build({ cards });
		const secondColumn = columnResponseFactory.build({});
		const board = boardResponseFactory.build({
			columns: [firstColumn, secondColumn],
		});

		const boardStore = useBoardStore();
		if (createBoard) {
			boardStore.board = board;
		}

		return { boardStore, board, firstColumn, secondColumn, cards };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("createCardRequest", () => {
		it.todo("should call createCardRequest");
	});

	describe("createCardSuccess", () => {
		const NEW_CARD = cardResponseFactory.build();

		it("should not create a card when board is not loaded (= has no state)", async () => {
			const { boardStore, firstColumn } = setup(false);

			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should create a card", async () => {
			const { boardStore, firstColumn } = setup();

			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
			});

			expect(boardStore.board?.columns[0].cards[3]).toEqual({
				cardId: NEW_CARD.id,
				height: NEW_CARD.height,
			});
		});

		it("should call setEditModeId", async () => {
			const { boardStore, firstColumn } = setup();

			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
			});

			expect(setEditModeId).toHaveBeenCalled();
		});
	});

	describe("createColumnRequest", () => {
		it.todo("should call createColumnRequest");
	});

	describe("createColumnSuccess", () => {
		const NEW_COLUMN = columnResponseFactory.build();
		it("should not create Column when board value is undefined", async () => {
			const { boardStore } = setup(false);

			boardStore.createColumnSuccess({ newColumn: NEW_COLUMN });

			expect(boardStore.board).toBe(undefined);
		});

		it("should create a column", async () => {
			const { boardStore } = setup();

			boardStore.createColumnSuccess({ newColumn: NEW_COLUMN });

			expect(boardStore.board?.columns[2]).toEqual(NEW_COLUMN);
		});
	});

	describe("deleteCardRequest", () => {
		it.todo("should call deleteCardRequest");
	});

	describe("deleteCardSuccess", () => {
		it("should not delete a card when a board is undefined", async () => {
			const { boardStore, cards } = setup(false);

			boardStore.deleteCardSuccess({ cardId: cards[0].cardId });

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a card if cardId does not exists", async () => {
			const { boardStore } = setup();

			boardStore.deleteCardSuccess({ cardId: "unknown cardId" });

			expect(boardStore.board?.columns[0].cards.length).toEqual(3);
		});

		it("should delete a card", async () => {
			const { boardStore, cards } = setup();

			const firstCardId = cards[0].cardId;
			const secondCardId = cards[1].cardId;

			boardStore.deleteCardSuccess({ cardId: firstCardId });

			const firstCardIdAfterDeletion =
				boardStore.board?.columns[0].cards[0].cardId;

			expect(firstCardIdAfterDeletion).not.toEqual(firstCardId);
			expect(firstCardIdAfterDeletion).toEqual(secondCardId);
		});
	});

	describe("deleteColumnRequest", () => {
		it.todo("should call deleteColumnRequest");
	});
	describe("deleteColumnSuccess", () => {
		it("should not delete a column when board value is undefined", async () => {
			const { boardStore, firstColumn } = setup(false);

			boardStore.deleteColumnSuccess({ columnId: firstColumn.id });

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a column when column id is unkown", async () => {
			const { boardStore } = setup();

			boardStore.deleteColumnSuccess({ columnId: "unknownId" });

			expect(boardStore.board?.columns.length).toEqual(2);
		});

		it("should delete a column", async () => {
			const { boardStore, firstColumn, secondColumn } = setup();

			boardStore.deleteColumnSuccess({ columnId: firstColumn.id });

			expect(boardStore.board?.columns[0]).not.toEqual(firstColumn);
			expect(boardStore.board?.columns[0]).toEqual(secondColumn);
			expect(boardStore.board?.columns.length).toEqual(1);
		});
	});

	describe("updateBoardTitleRequest", () => {
		it.todo("should call updateBoardTitleRequest");
	});

	describe("updateBoardTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update board title when board value is undefined", async () => {
			const { boardStore } = setup(false);

			boardStore.updateBoardTitleSuccess({ newTitle: NEW_TITLE });

			expect(boardStore.board).toBe(undefined);
		});

		it("should update board title", async () => {
			const { boardStore } = setup();

			boardStore.updateBoardTitleSuccess({ newTitle: NEW_TITLE });

			expect(boardStore.board?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateColumnTitleRequest", () => {
		it.todo("should call updateColumnTitleRequest");
	});

	describe("updateColumnTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update column title when board value is undefined", async () => {
			const { boardStore, firstColumn } = setup(false);

			boardStore.updateColumnTitleSuccess({
				columnId: firstColumn.id,
				newTitle: NEW_TITLE,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should update column title", async () => {
			const { boardStore, firstColumn } = setup();

			boardStore.updateColumnTitleSuccess({
				columnId: firstColumn.id,
				newTitle: NEW_TITLE,
			});

			expect(boardStore.board?.columns[0].title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it.todo("should call updateBoardVisibilityRequest");
	});

	describe("updateBoardVisibilitySuccess", () => {
		it("should not update board title when board value is undefined", async () => {
			const { boardStore } = setup(false);

			boardStore.updateBoardVisibilitySuccess({ newVisibility: true });
			expect(boardStore.board).toBe(undefined);
		});
		it("should update board visibility", async () => {
			const { boardStore } = setup();

			boardStore.updateBoardVisibilitySuccess({ newVisibility: true });

			expect(boardStore.board?.isVisible).toStrictEqual(true);
		});
	});

	describe("moveColumnRequest", () => {
		it.todo("should call moveColumnRequest");
	});

	describe("moveColumnSuccess", () => {
		it("should not move a column when board value is undefined", async () => {
			const { boardStore, firstColumn } = setup(false);

			const columnMove: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				columnId: firstColumn.id,
			};

			boardStore.moveColumnSuccess({
				columnMove,
				byKeyboard: false,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should move a column", async () => {
			const { boardStore, firstColumn, secondColumn } = setup();

			const columnMove: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: secondColumn.id,
			};
			boardStore.moveColumnSuccess({
				columnMove,
				byKeyboard: false,
			});

			expect(boardStore.board?.columns).toEqual([secondColumn, firstColumn]);
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

	describe("moveCardSuccess", () => {
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
			const cardPayload: MoveCardRequestPayload = {
				cardId,
				oldIndex: oldIndex ?? 0,
				newIndex: newIndex ?? 0,
				fromColumnId,
				toColumnId,
				columnDelta,
			};
			return cardPayload;
		};

		it("should not move Card when board value is undefined", async () => {
			const { boardStore } = setup(false);

			const cardPayload = createCardPayload({
				cardId: "cardId",
				fromColumnId: "columnId",
			});

			boardStore.moveCardSuccess(cardPayload);

			expect(boardStore.board).toBe(undefined);
		});

		describe("when move is invalid", () => {
			it("should not move card if card is moved to the same position", async () => {
				const { boardStore, firstColumn, cards } = setup();

				const firstColumnId = firstColumn.id;
				const movingCardId = cards[1].cardId;

				const cardPayload = createCardPayload({
					cardId: movingCardId,
					fromColumnId: firstColumnId,
					toColumnId: firstColumnId,
				});
				boardStore.moveCardSuccess(cardPayload);

				expect(boardStore.board?.columns[0].cards[1].cardId).toEqual(
					movingCardId
				);
			});

			it("should not move card if first card is moved to the first position", async () => {
				const { boardStore, firstColumn, cards } = setup();

				const firstColumnId = firstColumn.id;
				const firstCardId = cards[0].cardId;

				const cardPayload = createCardPayload({
					cardId: firstCardId,
					newIndex: -1,
					fromColumnId: firstColumnId,
					toColumnId: firstColumnId,
				});
				boardStore.moveCardSuccess(cardPayload);

				expect(boardStore.board?.columns[0].cards[0].cardId).toEqual(
					firstCardId
				);
			});

			it("should not move card if if last card is moved to the last position", async () => {
				const { boardStore, firstColumn, cards } = setup();

				const firstColumnId = firstColumn.id;
				const lastCardId = cards[2].cardId;

				const cardPayload = createCardPayload({
					cardId: lastCardId,
					oldIndex: 2,
					newIndex: 3,
					fromColumnId: firstColumnId,
					toColumnId: firstColumnId,
				});
				boardStore.moveCardSuccess(cardPayload);

				expect(boardStore.board?.columns[0].cards[2].cardId).toEqual(
					lastCardId
				);
			});

			// TODO , fix test
			it.skip("should not move a card when when column id is unknown", async () => {
				const { boardStore, cards, firstColumn } = setup();

				const movingCardId = cards[0].cardId;

				const cardPayload = createCardPayload({
					cardId: movingCardId,
					fromColumnId: firstColumn.id,
					toColumnId: "unknownId",
				});
				boardStore.moveCardSuccess(cardPayload);

				expect(boardStore.board?.columns[0].cards[0].cardId).toEqual(
					movingCardId
				);
			});
		});

		describe("when move is valid", () => {
			it("should move a card in the same column", async () => {
				const { boardStore, firstColumn, cards } = setup();

				const [firstCardId, secondCardId, thirdCardId] = cards.map(
					(card) => card.cardId
				);
				const firstColumnId = firstColumn.id;

				const cardPayload = createCardPayload({
					cardId: firstCardId,
					oldIndex: 0,
					newIndex: 1,
					fromColumnId: firstColumnId,
					toColumnId: firstColumnId,
				});

				boardStore.moveCardSuccess(cardPayload);

				const firstColumnCardsAfterMove = boardStore.board?.columns[0].cards;

				expect(firstColumnCardsAfterMove?.map((card) => card.cardId)).toEqual([
					secondCardId,
					firstCardId,
					thirdCardId,
				]);
			});

			it("should move a card to another column", async () => {
				const { boardStore, firstColumn, secondColumn, cards } = setup();

				const [firstCardId, secondCardId, thirdCardId] = cards.map(
					(card) => card.cardId
				);

				const cardPayload: CardMove = {
					cardId: secondCardId,
					oldIndex: 1,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					toColumnId: secondColumn.id,
				};

				boardStore.moveCardSuccess(cardPayload);

				const firstColumnCardsAfterMove = boardStore.board?.columns[0].cards;
				const secondColumnCardsAfterMove = boardStore.board?.columns[1].cards;

				expect(secondColumnCardsAfterMove?.map((card) => card.cardId)).toEqual([
					secondCardId,
				]);

				expect(firstColumnCardsAfterMove?.map((card) => card.cardId)).toEqual([
					firstCardId,
					thirdCardId,
				]);
			});
		});
	});
});
