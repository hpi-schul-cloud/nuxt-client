import type { Mock } from "vitest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { applicationErrorModule, envConfigModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { ColumnMove } from "@/types/board/DragAndDrop";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import { useCardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import {
	useBoardNotifier,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { createPinia, setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { BoardLayout } from "@/serverApi/v3/api";
import { useBoardStore } from "./Board.store";
import { UpdateBoardLayoutRequestPayload } from "./boardActions/boardActionPayload.types";
import { useBoardRestApi } from "./boardActions/boardRestApi.composable";
import { useBoardSocketApi } from "./boardActions/boardSocketApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";

vi.mock("./boardActions/boardSocketApi.composable");
const mockedUseBoardSocketApi = vi.mocked(useBoardSocketApi);

vi.mock("./boardActions/boardRestApi.composable");
const mockedUseBoardRestApi = vi.mocked(useBoardRestApi);

vi.mock("@util-board");
const mockedSharedEditMode = vi.mocked(useSharedEditMode);
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("@data-board/socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("./cardActions/cardSocketApi.composable");
const mockedUseCardSocketApi = vi.mocked(useCardSocketApi);

vi.mock("./BoardFocusHandler.composable");
const mockedBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("vue-i18n", () => {
	return {
		useI18n: () => ({ t: vi.fn().mockImplementation((key) => key) }),
	};
});

describe("BoardStore", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedSocketApiActions: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mockedBoardRestApiActions: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedCardSocketApiActions: DeepMocked<
		ReturnType<typeof useCardSocketApi>
	>;
	let setEditModeId: Mock;
	let mockedBoardFocusCalls: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;

	beforeEach(() => {
		setActivePinia(createPinia());
		setupStores({
			envConfigModule: EnvConfigModule,
			applicationErrorModule: ApplicationErrorModule,
		});

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedSocketApiActions = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseBoardSocketApi.mockReturnValue(mockedSocketApiActions);

		mockedBoardRestApiActions =
			createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiActions);

		mockedCardSocketApiActions = createMock<
			ReturnType<typeof useCardSocketApi>
		>({
			dispatch: vi.fn().mockResolvedValue(undefined),
			fetchCardRequest: vi.fn(),
			createElementRequest: vi.fn(),
			deleteElementRequest: vi.fn(),
			updateElementRequest: vi.fn(),
			moveElementRequest: vi.fn(),
			deleteCardRequest: vi.fn(),
			updateCardTitleRequest: vi.fn(),
			updateCardHeightRequest: vi.fn(),
			disconnectSocketRequest: vi.fn(),
		});
		mockedUseCardSocketApi.mockReturnValue(mockedCardSocketApiActions);

		setEditModeId = vi.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
			isInEditMode: computed(() => true),
		});

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: vi.fn(),
		});

		mockedBoardFocusCalls =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		mockedBoardFocusHandler.mockReturnValue(mockedBoardFocusCalls);

		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	const setup = (options?: { createBoard?: boolean; socketFlag?: boolean }) => {
		const { createBoard, socketFlag } = {
			createBoard: true,
			socketFlag: false,
			...options,
		};

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

		mockedPiniaStoreTyping(useCardStore);

		return { boardStore, board, firstColumn, secondColumn, cards };
	};

	const focusSetup = (id: string) => {
		const focusedId = ref<string | undefined>(id);
		const mockSetFocus = vi.fn().mockImplementation((id: string) => {
			focusedId.value = id;
		});
		const mockForceFocus = vi.fn();
		mockedBoardFocusHandler.mockReturnValue({
			setFocus: mockSetFocus,
			forceFocus: mockForceFocus,
			focusedId,
		});

		return { setFocus: mockSetFocus, forceFocus: mockForceFocus };
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getLastColumnIndex", () => {
		it("should return last column index", () => {
			const { boardStore } = setup();

			const lastColumnIndex = boardStore.getLastColumnIndex();

			expect(lastColumnIndex).toEqual(1);
		});
	});

	describe("getColumnIndex", () => {
		it("should return -1 when columnId is undefined", () => {
			const { boardStore } = setup();

			const columnIndex = boardStore.getColumnIndex(undefined);

			expect(columnIndex).toEqual(-1);
		});

		it("should return -1 when board is undefined", () => {
			const { boardStore } = setup({ createBoard: false });

			const columnIndex = boardStore.getColumnIndex("columnId");

			expect(columnIndex).toEqual(-1);
		});

		it("should return column index of first column", () => {
			const { boardStore, firstColumn } = setup();

			const columnIndex = boardStore.getColumnIndex(firstColumn.id);

			expect(columnIndex).toEqual(0);
		});
	});

	describe("getColumnId", () => {
		it("should return undefined when board is undefined", () => {
			const { boardStore } = setup({ createBoard: false });

			const columnId = boardStore.getColumnId(0);

			expect(columnId).toBeUndefined();
		});

		it("should return undefined when columnIndex is undefined", () => {
			const { boardStore } = setup();

			//@ts-expect-error - Testing edge case of impossible undefined value
			const columnId = boardStore.getColumnId(undefined);

			expect(columnId).toBeUndefined();
		});

		it("should return undefined when columnIndex is negative", () => {
			const { boardStore } = setup();

			const columnId = boardStore.getColumnId(-1);

			expect(columnId).toBeUndefined();
		});

		it("should return undefined when columnIndex is greater than columns length", () => {
			const { boardStore } = setup();

			const columnId = boardStore.getColumnId(2);

			expect(columnId).toBeUndefined();
		});

		it("should return column id of first column", () => {
			const { boardStore, firstColumn } = setup();

			const columnId = boardStore.getColumnId(0);

			expect(columnId).toEqual(firstColumn.id);
		});
	});

	describe("setBoard", () => {
		it("should set board", () => {
			const { boardStore } = setup();

			const newBoard = boardResponseFactory.build();

			boardStore.setBoard(newBoard);

			expect(boardStore.board).toEqual(newBoard);
		});
	});

	describe("setLoading", () => {
		it("should set loading", () => {
			const { boardStore } = setup();

			boardStore.setLoading(true);

			expect(boardStore.isLoading).toBe(true);
		});
	});

	describe("createCardSuccess", () => {
		const NEW_CARD = cardResponseFactory.build();

		it("should not create a card when board is not loaded (= has no state)", () => {
			const { boardStore, firstColumn } = setup({ createBoard: false });

			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should create a card", () => {
			const { boardStore, firstColumn } = setup();

			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns[0].cards[3]).toEqual({
				cardId: NEW_CARD.id,
				height: NEW_CARD.height,
			});
		});

		it("should call setEditModeId", () => {
			const { boardStore, firstColumn } = setup();

			boardStore.createCardRequest({ columnId: firstColumn.id });
			boardStore.createCardSuccess({
				newCard: NEW_CARD,
				columnId: firstColumn.id,
				isOwnAction: true,
			});

			expect(setEditModeId).toHaveBeenCalled();
		});
	});

	describe("createColumnSuccess", () => {
		const NEW_COLUMN = columnResponseFactory.build();
		it("should not create Column when board value is undefined", () => {
			const { boardStore } = setup({ createBoard: false });

			boardStore.createColumnSuccess({
				newColumn: NEW_COLUMN,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should create a column", () => {
			const { boardStore } = setup();

			boardStore.createColumnSuccess({
				newColumn: NEW_COLUMN,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns[2]).toEqual(NEW_COLUMN);
		});

		it("should set focus if user initiated create column", () => {
			const { boardStore } = setup();

			boardStore.createColumnSuccess({
				newColumn: NEW_COLUMN,
				isOwnAction: true,
			});

			expect(setEditModeId).toHaveBeenCalledWith(NEW_COLUMN.id);
		});
	});

	describe("deleteCardSuccess", () => {
		it("should not delete a card when a board is undefined", () => {
			const { boardStore, cards } = setup({ createBoard: false });

			boardStore.deleteCardSuccess({
				cardId: cards[0].cardId,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a card if cardId does not exists", () => {
			const { boardStore } = setup();

			boardStore.deleteCardSuccess({
				cardId: "unknown cardId",
				isOwnAction: true,
			});

			expect(boardStore.board?.columns[0].cards.length).toEqual(3);
		});

		it("should delete a card", () => {
			const { boardStore, cards } = setup();

			const firstCardId = cards[0].cardId;
			const secondCardId = cards[1].cardId;

			boardStore.deleteCardSuccess({ cardId: firstCardId, isOwnAction: true });

			const firstCardIdAfterDeletion =
				boardStore.board?.columns[0].cards[0].cardId;

			expect(firstCardIdAfterDeletion).not.toEqual(firstCardId);
			expect(firstCardIdAfterDeletion).toEqual(secondCardId);
		});

		describe("when previous card needs to be focused", () => {
			afterEach(() => {
				vi.resetAllMocks();
			});
			describe("when the card is first element", () => {
				it('should call "forceFocus" if already focused card is deleted', async () => {
					const { boardStore, cards, firstColumn } = setup();
					const firstCardId = cards[0].cardId;

					const { setFocus } = focusSetup(firstCardId);
					setFocus(firstCardId);

					boardStore.deleteCardSuccess({
						cardId: firstCardId,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(
						firstColumn.id
					);
				});
			});

			describe("when the card is not the first element", () => {
				it('should call "forceFocus" if already focused card is deleted', async () => {
					const { boardStore, cards } = setup();
					const firstCardId = cards[0].cardId;
					const secondCardId = cards[1].cardId;

					const { setFocus } = focusSetup(secondCardId);
					setFocus(secondCardId);

					boardStore.deleteCardSuccess({
						cardId: secondCardId,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(
						firstCardId
					);
				});
			});
		});
	});

	describe("deleteColumnSuccess", () => {
		it("should not delete a column when board value is undefined", () => {
			const { boardStore, firstColumn } = setup({ createBoard: false });

			boardStore.deleteColumnSuccess({
				columnId: firstColumn.id,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should not delete a column when column id is unkown", () => {
			const { boardStore } = setup();

			boardStore.deleteColumnSuccess({
				columnId: "unknownId",
				isOwnAction: true,
			});

			expect(boardStore.board?.columns.length).toEqual(2);
		});

		it("should delete a column", () => {
			const { boardStore, firstColumn, secondColumn } = setup();

			boardStore.deleteColumnSuccess({
				columnId: firstColumn.id,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns[0]).not.toEqual(firstColumn);
			expect(boardStore.board?.columns[0]).toEqual(secondColumn);
			expect(boardStore.board?.columns.length).toEqual(1);
		});

		describe("when previous column needs to be focused", () => {
			afterEach(() => {
				vi.resetAllMocks();
			});
			describe("when the column is the first element", () => {
				it('should call "forceFocus" if already focused column is deleted', async () => {
					const { boardStore, firstColumn } = setup();

					const { setFocus } = focusSetup(firstColumn.id);

					setFocus(firstColumn.id);

					boardStore.deleteColumnSuccess({
						columnId: firstColumn.id,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(
						boardStore.board?.id
					);
				});
			});

			describe("when the column is not the first element", () => {
				it('should call "forceFocus" if already focused column is deleted', async () => {
					const { boardStore, firstColumn, secondColumn } = setup();

					const { setFocus } = focusSetup(secondColumn.id);
					setFocus(secondColumn.id);

					boardStore.deleteColumnSuccess({
						columnId: secondColumn.id,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(
						firstColumn.id
					);
				});
			});

			it("should not call forceFocus if column is not focused", async () => {
				const { boardStore, firstColumn } = setup();

				const { setFocus, forceFocus } = focusSetup("unknownId");

				setFocus("unknownId");

				boardStore.deleteColumnSuccess({
					columnId: firstColumn.id,
					isOwnAction: true,
				});

				expect(forceFocus).not.toHaveBeenCalledWith(firstColumn.id);
			});
		});
	});

	describe("updateBoardTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update board title when board value is undefined", () => {
			const { boardStore } = setup({ createBoard: false });

			boardStore.updateBoardTitleSuccess({
				boardId: "boardId",
				newTitle: NEW_TITLE,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should update board title", () => {
			const { boardStore } = setup();

			boardStore.updateBoardTitleSuccess({
				boardId: "boardId",
				newTitle: NEW_TITLE,
				isOwnAction: true,
			});

			expect(boardStore.board?.title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateColumnTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update column title when board value is undefined", () => {
			const { boardStore, firstColumn } = setup({ createBoard: false });

			boardStore.updateColumnTitleSuccess({
				columnId: firstColumn.id,
				newTitle: NEW_TITLE,
				isOwnAction: true,
			});

			expect(boardStore.board).toBe(undefined);
		});

		it("should update column title", () => {
			const { boardStore, firstColumn } = setup();

			boardStore.updateColumnTitleSuccess({
				columnId: firstColumn.id,
				newTitle: NEW_TITLE,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns[0].title).toStrictEqual(NEW_TITLE);
		});
	});

	describe("updateBoardVisibilitySuccess", () => {
		it("should not update board title when board value is undefined", () => {
			const { boardStore } = setup({ createBoard: false });

			boardStore.updateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: true,
				isOwnAction: true,
			});
			expect(boardStore.board).toBe(undefined);
		});
		it("should update board visibility", () => {
			const { boardStore } = setup();

			boardStore.updateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: true,
				isOwnAction: true,
			});

			expect(boardStore.board?.isVisible).toStrictEqual(true);
		});
	});

	describe("@updateReaderCanEditSuccess", () => {
		const payload = {
			boardId: "boardId",
			readersCanEdit: true,
		};

		it("should not update readersCanEdit when board value is undefined", () => {
			const { boardStore } = setup({ createBoard: false });
			boardStore.updateReaderCanEditSuccess({ ...payload, isOwnAction: true });
			expect(boardStore.board).toBe(undefined);
		});

		describe("when socket connection is not established", () => {
			it("should update readersCanEdit", () => {
				const { boardStore } = setup({ socketFlag: false });
				boardStore.updateReaderCanEditSuccess({
					...payload,
					isOwnAction: true,
				});
				expect(boardStore.board?.readersCanEdit).toBe(true);
				expect(
					mockedBoardRestApiActions.fetchBoardRequest
				).not.toHaveBeenCalled();
			});

			describe("when isOwnAction is false", () => {
				it("should fetch board", () => {
					const { boardStore } = setup({ socketFlag: false });
					boardStore.updateReaderCanEditSuccess({
						...payload,
						isOwnAction: false,
					});
					expect(
						mockedBoardRestApiActions.fetchBoardRequest
					).toHaveBeenCalled();
				});
			});
		});

		describe("when socket connection is established", () => {
			it("should update readersCanEdit", () => {
				const { boardStore } = setup({ socketFlag: true });
				boardStore.updateReaderCanEditSuccess({
					...payload,
					isOwnAction: true,
				});
				expect(boardStore.board?.readersCanEdit).toBe(true);
				expect(mockedSocketApiActions.fetchBoardRequest).not.toHaveBeenCalled();
			});

			describe("when isOwnAction is false", () => {
				it("should fetch board", () => {
					const { boardStore } = setup({ socketFlag: true });
					boardStore.updateReaderCanEditSuccess({
						...payload,
						isOwnAction: false,
					});
					expect(mockedSocketApiActions.fetchBoardRequest).toHaveBeenCalled();
				});
			});
		});
	});

	describe("updateBoardLayoutSuccess", () => {
		describe("when board value is undefined", () => {
			it("should not update the board layout", () => {
				const { boardStore } = setup({ createBoard: false });

				boardStore.updateBoardLayoutSuccess({
					boardId: "boardId",
					layout: BoardLayout.Columns,
					isOwnAction: true,
				});

				expect(boardStore.board).toBe(undefined);
			});
		});

		describe("when board is defined", () => {
			it("should update the board layout", () => {
				const { boardStore } = setup();

				boardStore.updateBoardLayoutSuccess({
					boardId: "boardId",
					layout: BoardLayout.List,
					isOwnAction: true,
				});

				expect(boardStore.board?.layout).toStrictEqual(BoardLayout.List);
			});
		});
	});

	describe("moveColumnSuccess", () => {
		it("should not move a column when board value is undefined", async () => {
			const { boardStore, firstColumn } = setup({ createBoard: false });

			const columnMove: ColumnMove = {
				addedIndex: 0,
				removedIndex: 0,
				columnId: firstColumn.id,
			};

			await boardStore.moveColumnSuccess({
				columnMove,
				byKeyboard: false,
				isOwnAction: true,
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

			await boardStore.moveColumnSuccess({
				columnMove,
				byKeyboard: false,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns).toEqual([secondColumn, firstColumn]);
		});

		it("should move a column by Keyboard", async () => {
			const { boardStore, firstColumn, secondColumn } = setup();

			const columnMove: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				columnId: secondColumn.id,
			};

			await boardStore.moveColumnSuccess({
				columnMove,
				byKeyboard: true,
				isOwnAction: true,
			});

			expect(boardStore.board?.columns).toEqual([secondColumn, firstColumn]);
		});
	});

	describe("moveCardToNewColumn", () => {
		it("should not call moveCardRequest when board value is undefined", async () => {
			const { boardStore } = setup({ createBoard: false });

			await boardStore.moveCardToNewColumn("cardId");

			expect(mockedBoardRestApiActions.moveCardRequest).not.toHaveBeenCalled();
		});

		it("should not call moveCardRequest when card ID is undefined", async () => {
			const { boardStore } = setup();

			await boardStore.moveCardToNewColumn("cardId");

			expect(mockedBoardRestApiActions.moveCardRequest).not.toHaveBeenCalled();
		});

		it("should call moveCardRequest from rest api if feature flag is disabled", async () => {
			const { boardStore, firstColumn } = setup({ socketFlag: false });

			const cardId = firstColumn.cards[0].cardId;

			await boardStore.moveCardToNewColumn(cardId);

			expect(mockedBoardRestApiActions.moveCardRequest).toHaveBeenCalledWith({
				cardId,
				fromColumnId: firstColumn.id,
				fromColumnIndex: 0,
				oldIndex: 0,
				newIndex: 0,
			});
		});

		it("should call moveCardRequest from socket api if feature flag is enabled", async () => {
			const { boardStore, firstColumn } = setup({ socketFlag: true });

			const cardId = firstColumn.cards[0].cardId;

			await boardStore.moveCardToNewColumn(cardId);

			expect(mockedSocketApiActions.moveCardRequest).toHaveBeenCalledWith({
				cardId,
				fromColumnId: firstColumn.id,
				fromColumnIndex: 0,
				oldIndex: 0,
				newIndex: 0,
			});
		});
	});

	describe("moveCardSuccess", () => {
		it("should not move Card when board value is undefined", async () => {
			const { boardStore } = setup({ createBoard: false });

			const cardPayload = {
				cardId: "cardId",
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: "columnId",
				fromColumnIndex: 0,
				toColumnId: "columnId",
				toColumnIndex: 0,
				isOwnAction: true,
			};

			await boardStore.moveCardSuccess(cardPayload);

			expect(boardStore.board).toBe(undefined);
		});

		it("should move a card in the same column", async () => {
			const { boardStore, firstColumn, cards } = setup();

			const [firstCardId, secondCardId, thirdCardId] = cards.map(
				(card) => card.cardId
			);
			const firstColumnId = firstColumn.id;

			const cardPayload = {
				cardId: firstCardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: firstColumnId,
				fromColumnIndex: 0,
				toColumnId: firstColumnId,
				toColumnIndex: 0,
				isOwnAction: true,
			};

			await boardStore.moveCardSuccess(cardPayload);

			const firstColumnCardsAfterMove = boardStore.board?.columns[0].cards;

			expect(firstColumnCardsAfterMove?.map((card) => card.cardId)).toEqual([
				secondCardId,
				firstCardId,
				thirdCardId,
			]);
		});

		it("should move a card in the same column when forceNextTick is true", async () => {
			const { boardStore, firstColumn, cards } = setup();

			const [firstCardId, secondCardId, thirdCardId] = cards.map(
				(card) => card.cardId
			);
			const firstColumnId = firstColumn.id;

			const cardPayload = {
				cardId: firstCardId,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: firstColumnId,
				fromColumnIndex: 0,
				toColumnId: firstColumnId,
				toColumnIndex: 0,
				forceNextTick: true,
				isOwnAction: true,
			};

			await boardStore.moveCardSuccess(cardPayload);

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

			const cardPayload = {
				cardId: secondCardId,
				oldIndex: 1,
				newIndex: 0,
				fromColumnId: firstColumn.id,
				fromColumnIndex: 0,
				toColumnId: secondColumn.id,
				toColumnIndex: 1,
			};

			await boardStore.moveCardSuccess({ ...cardPayload, isOwnAction: true });

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

	describe("fetchBoardSuccess", () => {
		it("should fetch board", () => {
			const { boardStore } = setup();

			const newBoard = boardResponseFactory.build();
			boardStore.fetchBoardSuccess(newBoard);

			expect(boardStore.board).toEqual(newBoard);
		});
	});

	describe("@FEATURE_COLUMN_BOARD_SOCKET_ENABLED", () => {
		describe("@createCardRequest", () => {
			const payload = { columnId: "testColumnId" };

			it("should call socketApi.createCardRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.createCardRequest(payload);

				expect(mockedSocketApiActions.createCardRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.createCardRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.createCardRequest(payload);

				expect(
					mockedBoardRestApiActions.createCardRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@createColumnRequest", () => {
			it("should call socketApi.createColumnRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });
				const payload = { boardId: "testBoardId" };

				await boardStore.createColumnRequest(payload);

				expect(mockedSocketApiActions.createColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.createColumnRequest when feature flag is set false", async () => {
				const { boardStore } = setup();
				const payload = { boardId: boardStore.board?.id ?? "boardId" };

				await boardStore.createColumnRequest(payload);

				expect(
					mockedBoardRestApiActions.createColumnRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@deleteColumnRequest", () => {
			const payload = { columnId: "testId" };

			it("should call socketApi.deleteColumnRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.deleteColumnRequest(payload);

				expect(mockedSocketApiActions.deleteColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.deleteColumnRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.deleteColumnRequest(payload);

				expect(
					mockedBoardRestApiActions.deleteColumnRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@updateBoardTitleRequest", () => {
			const payload = { boardId: "boardId", newTitle: "newTitle" };

			it("should call socketApi.updateBoardTitleRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.updateBoardTitleRequest(payload);

				expect(
					mockedSocketApiActions.updateBoardTitleRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateColumnTitleRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.updateBoardTitleRequest(payload);

				expect(
					mockedBoardRestApiActions.updateBoardTitleRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@updateColumnTitleRequest", () => {
			const payload = { columnId: "columnId", newTitle: "newTitle" };

			it("should call socketApi.updateColumnTitleRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.updateColumnTitleRequest(payload);

				expect(
					mockedSocketApiActions.updateColumnTitleRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateColumnTitleRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.updateColumnTitleRequest(payload);

				expect(
					mockedBoardRestApiActions.updateColumnTitleRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@updateBoardVisibilityRequest", () => {
			const payload = { boardId: "boardId", isVisible: true };

			it("should call socketApi.updateBoardVisibilityRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.updateBoardVisibilityRequest(payload);

				expect(
					mockedSocketApiActions.updateBoardVisibilityRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateBoardVisibilityRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.updateBoardVisibilityRequest(payload);

				expect(
					mockedBoardRestApiActions.updateBoardVisibilityRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@updateReadersRequest", () => {
			const payload = { boardId: "boardId", readersCanEdit: true };
			it("should call socketApi.updateReaderCanEditRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.updateReaderCanEditRequest(payload);

				expect(
					mockedSocketApiActions.updateReaderCanEditRequest
				).toHaveBeenCalledWith(payload);
			});
			it("should call restApi.updateReaderCanEditRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.updateReaderCanEditRequest(payload);

				expect(
					mockedBoardRestApiActions.updateReaderCanEditRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@updateBoardLayoutRequest", () => {
			const payload: UpdateBoardLayoutRequestPayload = {
				boardId: "boardId",
				layout: BoardLayout.Columns,
			};

			it("should call socketApi.updateBoardLayoutRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.updateBoardLayoutRequest(payload);

				expect(
					mockedSocketApiActions.updateBoardLayoutRequest
				).toHaveBeenCalledWith(payload);
			});

			it("should call restApi.updateBoardLayoutRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.updateBoardLayoutRequest(payload);

				expect(
					mockedBoardRestApiActions.updateBoardLayoutRequest
				).toHaveBeenCalledWith(payload);
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

			it("should call socketApi.moveColumnRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.moveColumnRequest(payload);

				expect(mockedSocketApiActions.moveColumnRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.moveColumnRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.moveColumnRequest(payload);

				expect(
					mockedBoardRestApiActions.moveColumnRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@moveCardRequest", () => {
			it("should call socketApi.moveCardRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				const payload = {
					cardId: boardStore.board?.columns[0].cards[0].cardId ?? "cardId",
					oldIndex: 0,
					newIndex: 1,
					fromColumnId: boardStore.board?.columns[0].id ?? "columnId",
					fromColumnIndex: 0,
					toColumnId: boardStore.board?.columns[0].id ?? "columnId",
					toColumnIndex: 0,
					forceNextTick: false,
				};

				await boardStore.moveCardRequest(payload);

				expect(mockedSocketApiActions.moveCardRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.moveCardRequest when feature flag is set false", async () => {
				const { boardStore } = setup();
				const payload = {
					cardId: boardStore.board?.columns[0].cards[0].cardId ?? "cardId",
					oldIndex: 0,
					newIndex: 1,
					fromColumnId: boardStore.board?.columns[0].id ?? "columnId",
					fromColumnIndex: 0,
					toColumnId: boardStore.board?.columns[0].id ?? "columnId",
					toColumnIndex: 0,
					columnDelta: 0,
					forceNextTick: false,
				};

				await boardStore.moveCardRequest(payload);

				expect(mockedBoardRestApiActions.moveCardRequest).toHaveBeenCalledWith(
					payload
				);
			});
		});

		describe("@fetchBoardRequest", () => {
			const payload = { boardId: "boardId" };
			it("should call socketApi.fetchBoardRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.fetchBoardRequest(payload);
				expect(mockedSocketApiActions.fetchBoardRequest).toHaveBeenCalledWith(
					payload
				);
			});

			it("should call restApi.fetchBoardRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.fetchBoardRequest(payload);
				expect(
					mockedBoardRestApiActions.fetchBoardRequest
				).toHaveBeenCalledWith(payload);
			});
		});

		describe("@disconnectSocketRequest", () => {
			it("should call socketApi.disconnectSocketRequest when feature flag is set true", () => {
				const { boardStore } = setup({ socketFlag: true });

				boardStore.disconnectSocketRequest();

				expect(
					mockedSocketApiActions.disconnectSocketRequest
				).toHaveBeenCalled();
			});

			it("should call restApi.disconnectSocketRequest when feature flag is set false", () => {
				const { boardStore } = setup();

				boardStore.disconnectSocketRequest();

				expect(
					mockedBoardRestApiActions.disconnectSocketRequest
				).toHaveBeenCalled();
			});
		});

		describe("@reloadBoard", () => {
			it.each([true, false])(
				"should not reload board when board value is undefined and socketFlag is %s",
				async (socketFlag) => {
					const { boardStore } = setup({ createBoard: false, socketFlag });

					await boardStore.reloadBoard();

					if (socketFlag) {
						expect(
							mockedSocketApiActions.fetchBoardRequest
						).not.toHaveBeenCalled();
					} else {
						expect(
							mockedBoardRestApiActions.fetchBoardRequest
						).not.toHaveBeenCalled();
					}
				}
			);

			it("should call socketApi.fetchBoardRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.reloadBoard();

				expect(mockedSocketApiActions.fetchBoardRequest).toHaveBeenCalledWith({
					boardId: boardStore.board?.id,
				});
			});

			it("should call restApi.fetchBoardRequest when feature flag is set true", async () => {
				const { boardStore } = setup();

				await boardStore.reloadBoard();

				expect(
					mockedBoardRestApiActions.fetchBoardRequest
				).toHaveBeenCalledWith({ boardId: boardStore.board?.id });
			});
		});

		describe("@deleteBoardRequest", () => {
			it("should call socketApi.deleteBoardRequest when feature flag is set true", async () => {
				const { boardStore } = setup({ socketFlag: true });

				await boardStore.deleteBoardRequest({ boardId: "boardId" }, "roomId");

				expect(mockedSocketApiActions.deleteBoardRequest).toHaveBeenCalledWith({
					boardId: "boardId",
				});
				expect(
					mockedBoardRestApiActions.deleteBoardRequest
				).not.toHaveBeenCalled();
			});

			it("should call restApi.deleteBoardRequest when feature flag is set false", async () => {
				const { boardStore } = setup();

				await boardStore.deleteBoardRequest({ boardId: "boardId" }, "roomId");

				expect(
					mockedBoardRestApiActions.deleteBoardRequest
				).toHaveBeenCalledWith({ boardId: "boardId" });
				expect(
					mockedSocketApiActions.deleteBoardRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("@deleteBoardSuccess", () => {
			it("should redirect to page if 'isOwnAction' is true", async () => {
				const { boardStore } = setup({ socketFlag: true });
				await boardStore.deleteBoardRequest({ boardId: "boardId" }, "roomId");

				boardStore.deleteBoardSuccess({
					boardId: "boardId",
					isOwnAction: true,
				});

				expect(router.replace).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: "roomId" },
				});
			});

			it('should call applicationErrorModule.showError if "isOwnAction" is false', async () => {
				const setErrorSpy = vi.spyOn(applicationErrorModule, "setError");
				const { boardStore } = setup({ socketFlag: true });
				await boardStore.deleteBoardRequest({ boardId: "boardId" }, "roomId");

				boardStore.deleteBoardSuccess({
					boardId: "boardId",
					isOwnAction: false,
				});

				expect(setErrorSpy).toHaveBeenCalledWith(
					createApplicationError(
						HttpStatusCode.NotFound,
						"components.board.error.404"
					)
				);
			});
		});
	});
});
