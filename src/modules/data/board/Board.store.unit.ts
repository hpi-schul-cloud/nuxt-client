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
import { useBoardStore } from "./Board.store";
import { useSharedEditMode } from "./EditMode.composable";
import { setActivePinia, createPinia } from "pinia";

import { useI18n } from "vue-i18n";
import { useBoardSocketApi } from "@data-board";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { MoveCardRequestPayload } from "@/modules/data/board/boardActions/boardActionPayload";
import { useSocketApi } from "./boardActions/socketApi.composable";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./boardActions/socketApi.composable");
const mockedUseSocketApiActions = jest.mocked(useSocketApi);

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
	});

	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mocketSocketApiActions: DeepMocked<ReturnType<typeof useSocketApi>>;
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

		mocketSocketApiActions = createMock<ReturnType<typeof useSocketApi>>();
		mockedUseSocketApiActions.mockReturnValue(mocketSocketApiActions);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = (createBoard = true, socketFlag = false) => {
		const cards = cardSkeletonResponseFactory.buildList(3);
		const firstColumn = columnResponseFactory.build({ cards });
		const secondColumn = columnResponseFactory.build({});
		const board = boardResponseFactory.build({
			columns: [firstColumn, secondColumn],
		});

		if (socketFlag) {
			const envs = envsFactory.build({
				FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		}

		const boardStore = useBoardStore();
		if (createBoard) {
			boardStore.board = board;
		}

		return { boardStore, board, firstColumn, secondColumn, cards };
	};

	afterEach(() => {
		jest.resetAllMocks();
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

	describe("updateBoardTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update board title when board value is undefined", async () => {
			const { boardStore } = setup(false);

			boardStore.updateBoardTitleSuccess({
				boardId: "boardId",
				newTitle: NEW_TITLE,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should update board title", async () => {
			const { boardStore } = setup();

			boardStore.updateBoardTitleSuccess({
				boardId: "boardId",
				newTitle: NEW_TITLE,
			});

			expect(boardStore.board?.title).toStrictEqual(NEW_TITLE);
		});
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

	describe("updateBoardVisibilitySuccess", () => {
		it("should not update board title when board value is undefined", async () => {
			const { boardStore } = setup(false);

			boardStore.updateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: true,
			});
			expect(boardStore.board).toBe(undefined);
		});
		it("should update board visibility", async () => {
			const { boardStore } = setup();

			boardStore.updateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: true,
			});

			expect(boardStore.board?.isVisible).toStrictEqual(true);
		});
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
	describe("@FEATURE_COLUMN_BOARD_SOCKET_ENABLED", () => {
		describe("@createCardRequest", () => {
			const payload = { columnId: "testColumnId" };

			it("should call socketApi.createCardRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.createCardRequest(payload);
				expect(mocketSocketApiActions.createCardRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.createCardCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.createCardRequest(payload);
				expect(mockedBoardApiCalls.createCardCall).toHaveBeenCalledWith(
					"testColumnId"
				);
			});
		});

		describe("@createColumnRequest", () => {
			it("should call socketApi.createColumnRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				const payload = { boardId: "testBoardId" };
				boardStore.createColumnRequest(payload);
				expect(mocketSocketApiActions.createColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.createColumnCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				const payload = { boardId: boardStore.board?.id ?? "boardId" };
				boardStore.createColumnRequest(payload);
				expect(mockedBoardApiCalls.createColumnCall).toHaveBeenCalledWith(
					payload.boardId
				);
			});
		});

		describe("@deleteCardRequest", () => {
			const payload = { cardId: "testId" };
			it("should call socketApi.deleteCardRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.deleteCardRequest(payload);
				expect(mocketSocketApiActions.deleteCardRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.deleteCardCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.deleteCardRequest(payload);
				expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
					payload.cardId
				);
			});
		});

		describe("@deleteColumnRequest", () => {
			const payload = { columnId: "testId" };

			it("should call socketApi.deleteColumnRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.deleteColumnRequest(payload);
				expect(mocketSocketApiActions.deleteColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.deleteColumnCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.deleteColumnRequest(payload);
				expect(mockedBoardApiCalls.deleteColumnCall).toHaveBeenCalledWith(
					payload.columnId
				);
			});
		});

		describe("@updateBoardTitleRequest", () => {
			const payload = { boardId: "boardId", newTitle: "newTitle" };

			it("should call socketApi.updateBoardTitleRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.updateBoardTitleRequest(payload);
				expect(
					mocketSocketApiActions.updateBoardTitleRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateBoardTitleCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.updateBoardTitleRequest(payload);

				expect(
					mockedBoardApiCalls.updateBoardTitleCall.mock.calls[0][1]
				).toStrictEqual(payload.newTitle);
			});
		});

		describe("@updateColumnTitleRequest", () => {
			const payload = { columnId: "columnId", newTitle: "newTitle" };

			it("should call socketApi.updateColumnTitleRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.updateColumnTitleRequest(payload);
				expect(
					mocketSocketApiActions.updateColumnTitleRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateColumnTitleRequest when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.updateColumnTitleRequest(payload);

				expect(
					mockedBoardApiCalls.updateColumnTitleCall.mock.calls[0][1]
				).toStrictEqual(payload.newTitle);
			});
		});

		describe("@updateBoardVisibilityRequest", () => {
			const payload = { boardId: "boardId", isVisible: true };

			it("should call socketApi.updateBoardVisibilityRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.updateBoardVisibilityRequest(payload);
				expect(
					mocketSocketApiActions.updateBoardVisibilityRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateBoardVisibilityCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.updateBoardVisibilityRequest(payload);
				expect(
					mockedBoardApiCalls.updateBoardVisibilityCall.mock.calls[0][1]
				).toStrictEqual(payload.isVisible);
			});
		});

		describe("@moveColumnRequest", () => {
			const payload = {
				columnMove: {
					addedIndex: 1,
					removedIndex: 0,
					columnId: "testColumnId",
				},
				targetBoardId: "testBoardId",
				byKeyboard: false,
			};

			it("should call socketApi.moveColumnRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);
				boardStore.moveColumnRequest(payload);
				expect(mocketSocketApiActions.moveColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.moveColumnCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				boardStore.moveColumnRequest(payload);
				expect(mockedBoardApiCalls.moveColumnCall).toHaveBeenCalled();
			});
		});

		describe("@moveCardRequest", () => {
			it("should call socketApi.moveCardRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);

				const payload = {
					cardId: boardStore.board?.columns[0].cards[0].cardId ?? "cardId",
					oldIndex: 0,
					newIndex: 1,
					fromColumnId: boardStore.board?.columns[0].id ?? "columnId",
					toColumnId: boardStore.board?.columns[0].id ?? "columnId",
					columnDelta: 0,
					forceNextTick: false,
				};
				boardStore.moveCardRequest(payload);
				expect(mocketSocketApiActions.moveCardRequest).toHaveBeenCalled();
			});

			it("should call restApi.moveCardCall when feature flag is set false", () => {
				const { boardStore } = setup(true, false);
				const payload = {
					cardId: boardStore.board?.columns[0].cards[0].cardId ?? "cardId",
					oldIndex: 0,
					newIndex: 1,
					fromColumnId: boardStore.board?.columns[0].id ?? "columnId",
					toColumnId: boardStore.board?.columns[0].id ?? "columnId",
					columnDelta: 0,
					forceNextTick: false,
				};
				boardStore.moveCardRequest(payload);
				expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalled();
			});
		});

		describe("@fetchBoardRequest", () => {
			const payload = { boardId: "boardId" };
			it("should call socketApi.fetchBoardRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);

				boardStore.fetchBoardRequest(payload);
				expect(mocketSocketApiActions.fetchBoardRequest).toHaveBeenCalled();
			});

			it("should call restApi.fetchBoardRequest when feature flag is set false", () => {
				const { boardStore } = setup(true, false);

				boardStore.fetchBoardRequest(payload);
				expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalled();
			});
		});

		describe("@disconnectSocketRequest", () => {
			it("should call socketApi.disconnectSocketRequest when feature flag is set true", () => {
				const { boardStore } = setup(true, true);

				boardStore.disconnectSocketRequest({});
				expect(
					mocketSocketApiActions.disconnectSocketRequest
				).toHaveBeenCalled();
			});
		});
	});
});
