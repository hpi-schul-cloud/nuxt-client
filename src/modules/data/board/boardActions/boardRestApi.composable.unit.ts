import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { ref } from "vue";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useSocketConnection, useBoardStore } from "@data-board";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import { ColumnMove } from "@/types/board/DragAndDrop";
import { MoveCardRequestPayload } from "./boardActionPayload";

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("../BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

describe("boardRestApi", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

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
		const boardStore = mockedPiniaStoreTyping(useBoardStore);
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
		it("should not call createCardSuccess action when board is undefined", async () => {
			const { boardStore } = setup(false);
			const { createCardRequest } = useBoardRestApi();
			boardStore.board = undefined;

			await createCardRequest({ columnId: "columnId" });

			expect(boardStore.createCardSuccess).not.toHaveBeenCalled();
		});

		it("should call createCardSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { createCardRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			const newCard = cardResponseFactory.build();
			mockedBoardApiCalls.createCardCall.mockResolvedValue(newCard);

			await createCardRequest({ columnId: columnId });

			expect(boardStore.createCardSuccess).toHaveBeenCalledWith({
				newCard: newCard,
				columnId: columnId,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { boardStore } = setup();
			const { createCardRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			mockedBoardApiCalls.createCardCall.mockRejectedValue({});

			await createCardRequest({ columnId: columnId });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("fetchBoard", () => {
		it("should fetch and set the board", async () => {
			const { boardStore } = setup();
			const { fetchBoardRequest } = useBoardRestApi();

			const mockfetchBoard = boardResponseFactory.build();
			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(mockfetchBoard);

			await fetchBoardRequest({ boardId: boardStore.board!.id });

			expect(boardStore.fetchBoardSuccess).toHaveBeenCalledWith(mockfetchBoard);
		});

		it("should set loading state correct", async () => {
			const { boardStore } = setup();
			const { fetchBoardRequest } = useBoardRestApi();

			const board = boardStore.board!;

			mockedBoardApiCalls.fetchBoardCall.mockResolvedValue(board);

			const fetchPromise = fetchBoardRequest({ boardId: board.id });

			expect(boardStore.setLoading).toHaveBeenLastCalledWith(true);
			await fetchPromise;
			expect(boardStore.setLoading).toHaveBeenLastCalledWith(false);
		});

		it("should call handleError if the fetch fails", async () => {
			const { boardStore } = setup();
			const { fetchBoardRequest } = useBoardRestApi();

			mockedBoardApiCalls.fetchBoardCall.mockRejectedValue({});

			await fetchBoardRequest({ boardId: boardStore.board!.id });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("createColumnRequest", () => {
		it("should not call createColumnSuccess action when board is undefined", async () => {
			const { boardStore } = setup(false);
			const { createColumnRequest } = useBoardRestApi();

			await createColumnRequest();

			expect(boardStore.createColumnSuccess).not.toHaveBeenCalled();
		});

		it("should call createColumnSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { createColumnRequest } = useBoardRestApi();
			const { setEditModeId } = useSharedEditMode();

			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

			const result = await createColumnRequest();

			expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
			expect(boardStore.createColumnSuccess).toHaveBeenCalledWith({
				newColumn,
			});
			expect(result).toEqual(newColumn);
		});

		it("should call handleError if the API call fails", async () => {
			setup();
			const { createColumnRequest } = useBoardRestApi();

			mockedBoardApiCalls.createColumnCall.mockRejectedValue({});

			await createColumnRequest();

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("deleteColumnRequest", () => {
		it("should not call deleteColumnSuccess return if board is undefined", async () => {
			const { boardStore } = setup(false);
			const { deleteColumnRequest } = useBoardRestApi();

			await deleteColumnRequest({ columnId: "columnId" });

			expect(boardStore.deleteColumnSuccess).not.toHaveBeenCalled();
		});

		it("should call deleteColumnSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { deleteColumnRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			await deleteColumnRequest({ columnId });

			expect(boardStore.deleteColumnSuccess).toHaveBeenCalledWith({ columnId });
		});

		it("should call handleError if the API call fails", async () => {
			const { boardStore } = setup();
			const { deleteColumnRequest } = useBoardRestApi();
			const columnId = boardStore.board!.columns[0].id;

			mockedBoardApiCalls.deleteColumnCall.mockRejectedValue({});

			await deleteColumnRequest({ columnId });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
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

		it("should not call moveCardSuccess when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { moveCardRequest } = useBoardRestApi();

			const cardPayload = createCardPayload({
				cardId: "cardId",
				fromColumnId: "columnId",
			});

			await moveCardRequest(cardPayload);

			expect(boardStore.moveCardSuccess).not.toHaveBeenCalled();
		});

		describe("when move is invalid", () => {
			it("should not call moveCardCall if first card is moved to the left with columnDelta", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					fromColumnId: firstColumn.id,
					columnDelta: -1,
				});

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

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

				await moveCardRequest(cardPayload);

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

				await moveCardRequest(cardPayload);

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

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});
		});

		describe("when move is valid", () => {
			it("should call moveCardSuccess action if card is moved inside same column and Api call is successful", async () => {
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

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith(cardPayload);
			});

			it("should call moveCardSuccess action if card is moved beyond last column and the API call is successful", async () => {
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

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
					movingCard.cardId,
					newColumn.id,
					0
				);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith({
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					toColumnId: newColumn.id,
					columnDelta: 2,
					forceNextTick: undefined,
				});
			});

			it("should call moveCardSuccess action if card is moved to another columm and the API call is successful", async () => {
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

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith(cardPayload);
			});

			it("should call moveCardSuccess action if card is moved to another columm with columnDelta and the API call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const secondColumn = boardStore.board!.columns[1];
				const movingCard = firstColumn.cards[1];

				const cardPayload = createCardPayload({
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					columnDelta: 1,
				});

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith({
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					toColumnId: secondColumn.id,
					columnDelta: 1,
					forceNextTick: undefined,
				});
			});

			it("should call handleError if the API call fails", async () => {
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

				mockedBoardApiCalls.moveCardCall.mockRejectedValue({});

				await moveCardRequest(cardPayload);

				expect(mockedErrorHandler.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("moveColumnRequest", () => {
		it("should not call moveColumnSuccess action when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { moveColumnRequest } = useBoardRestApi();

			const columnMove: ColumnMove = { addedIndex: 1, columnId: "columnId" };
			await moveColumnRequest({ columnMove, byKeyboard: false });

			expect(boardStore.moveColumnSuccess).not.toHaveBeenCalled();
		});

		it("should call moveColumnSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { moveColumnRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];

			const columnMove: ColumnMove = {
				removedIndex: 0,
				addedIndex: 1,
				columnId: firstColumn.id,
			};

			await moveColumnRequest({ columnMove, byKeyboard: false });

			expect(boardStore.moveColumnSuccess).toHaveBeenCalledWith({
				columnMove,
				byKeyboard: false,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { boardStore } = setup();
			const { moveColumnRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];

			const columnMove: ColumnMove = {
				removedIndex: 0,
				addedIndex: 1,
				columnId: firstColumn.id,
			};

			mockedBoardApiCalls.moveColumnCall.mockRejectedValue({});

			await moveColumnRequest({ columnMove, byKeyboard: false });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateColumnTitleRequest", () => {
		it("should not call updateColumnTitleSuccess action when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateColumnTitleRequest } = useBoardRestApi();

			await updateColumnTitleRequest({
				columnId: "columnId",
				newTitle: "newTitle",
			});

			expect(boardStore.updateColumnTitleSuccess).not.toHaveBeenCalled();
		});

		it("should call updateColumnTitleSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateColumnTitleRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];
			const payload = { columnId: firstColumn.id, newTitle: "newTitle" };

			await updateColumnTitleRequest(payload);

			expect(boardStore.updateColumnTitleSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call handleError if the API call fails", async () => {
			const { boardStore } = setup();
			const { updateColumnTitleRequest } = useBoardRestApi();

			const firstColumn = boardStore.board!.columns[0];
			const payload = { columnId: firstColumn.id, newTitle: "newTitle" };

			mockedBoardApiCalls.updateColumnTitleCall.mockRejectedValue({});

			await updateColumnTitleRequest(payload);

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should not call success updateBoardTitleSuccess action when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateBoardTitleRequest } = useBoardRestApi();

			await updateBoardTitleRequest({
				boardId: "boardId",
				newTitle: "newTitle",
			});

			expect(boardStore.updateBoardTitleSuccess).not.toHaveBeenCalled();
		});

		it("should call updateBoardTitleSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateBoardTitleRequest } = useBoardRestApi();

			const newTitle = "newTitle";

			await updateBoardTitleRequest({ boardId: "boardId", newTitle });

			expect(boardStore.updateBoardTitleSuccess).toHaveBeenCalledWith({
				boardId: "boardId",
				newTitle,
			});
		});

		it("should call handleError if the API call fails", async () => {
			setup();
			const { updateBoardTitleRequest } = useBoardRestApi();

			const newTitle = "newTitle";

			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue({});

			await updateBoardTitleRequest({ boardId: "boardId", newTitle });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should not call updateBoardVisibilitySuccess action when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			await updateBoardVisibilityRequest({
				boardId: "boardId",
				isVisible: true,
			});

			expect(boardStore.updateBoardVisibilitySuccess).not.toHaveBeenCalled();
		});

		it("should call updateBoardVisibilitySuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			const isVisible = true;

			await updateBoardVisibilityRequest({ boardId: "boardId", isVisible });

			expect(boardStore.updateBoardVisibilitySuccess).toHaveBeenCalledWith({
				boardId: "boardId",
				isVisible,
			});
		});

		it("should call handleError if the API call fails", async () => {
			setup();
			const { updateBoardVisibilityRequest } = useBoardRestApi();

			mockedBoardApiCalls.updateBoardVisibilityCall.mockRejectedValue({});

			await updateBoardVisibilityRequest({
				boardId: "boardId",
				isVisible: true,
			});

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("notifyWithTemplateAndReload", () => {
		/**
		 * Simulates actually calling the error handling function for a 404 error.
		 * (otherwise the handler function would not be called on the mock)
		 */
		const executeErrorHandler = () => {
			mockedErrorHandler.handleError.mock.calls[0]?.[1]?.[404]?.();
		};

		it("should not notify when board value is undefined", async () => {
			setup(false);
			const { updateBoardTitleRequest } = useBoardRestApi();

			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue({});
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(jest.fn());

			await updateBoardTitleRequest({
				boardId: "boardId",
				newTitle: "newTitlte",
			});

			executeErrorHandler();
			expect(mockedErrorHandler.notifyWithTemplate).not.toHaveBeenCalled();
		});

		it("should notify with template", async () => {
			setup();
			const { updateBoardTitleRequest } = useBoardRestApi();

			mockedBoardApiCalls.updateBoardTitleCall.mockRejectedValue({});
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(jest.fn());

			await updateBoardTitleRequest({
				boardId: "boardId",
				newTitle: "newTitlte",
			});

			executeErrorHandler();
			expect(mockedErrorHandler.notifyWithTemplate).toHaveBeenCalledWith(
				"notUpdated",
				"board"
			);

			expect(setEditModeId).toHaveBeenCalledWith(undefined);
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
