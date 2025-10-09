import { useBoardApi } from "../BoardApi.composable";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { BoardLayout } from "@/serverApi/v3/api";
import { courseRoomDetailsModule } from "@/store";
import CourseRoomDetailsModule from "@/store/course-room-details";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { ColumnMove } from "@/types/board/DragAndDrop";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import { useAppStore } from "@data-app";
import { useBoardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useSharedEditMode } from "@util-board";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed, ref } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("../BoardApi.composable");
const mockedUseBoardApi = vi.mocked(useBoardApi);

vi.mock("@util-board/editMode.composable");
const mockedSharedEditMode = vi.mocked(useSharedEditMode);

vi.mock("../socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("boardRestApi", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedSocketConnectionHandler: DeepMocked<ReturnType<typeof useSocketConnection>>;
	let setEditModeId: Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		mockedSocketConnectionHandler = createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		setEditModeId = vi.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
			isInEditMode: computed(() => true),
		});

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	const setup = (createBoard = true) => {
		setupStores({
			courseRoomDetailsModule: CourseRoomDetailsModule,
		});

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
				isOwnAction: true,
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

		it("should call handleApplicationError if the fetch fails", async () => {
			const { boardStore } = setup();
			const { fetchBoardRequest } = useBoardRestApi();

			mockedBoardApiCalls.fetchBoardCall.mockRejectedValue({});

			await fetchBoardRequest({ boardId: boardStore.board!.id });

			expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(
				HttpStatusCode.NotFound,
				"components.board.error.404"
			);
		});
	});

	describe("@deleteBoardRequest", () => {
		it("should call 'deleteBoardSuccess'", async () => {
			const deleteBoardMock = vi.fn();
			const { boardStore } = setup();
			const { deleteBoardRequest } = useBoardRestApi();
			const boardId = boardStore.board!.id;

			courseRoomDetailsModule.deleteBoard = deleteBoardMock;

			await deleteBoardRequest({ boardId });

			expect(deleteBoardMock).toHaveBeenCalledWith(boardId);
			expect(boardStore.deleteBoardSuccess).toHaveBeenCalledWith({
				boardId,
				isOwnAction: true,
			});
		});
		it("should call handleError if the API call fails", async () => {
			const deleteBoardMock = vi.fn().mockRejectedValue({});
			const { boardStore } = setup();
			const { deleteBoardRequest } = useBoardRestApi();
			const boardId = boardStore.board!.id;
			courseRoomDetailsModule.deleteBoard = deleteBoardMock;

			await deleteBoardRequest({ boardId });

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

			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

			const result = await createColumnRequest();

			expect(boardStore.createColumnSuccess).toHaveBeenCalledWith({
				newColumn,
				isOwnAction: true,
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

			expect(boardStore.deleteColumnSuccess).toHaveBeenCalledWith({
				columnId,
				isOwnAction: true,
			});
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
		describe("when move is invalid", () => {
			it("should not call moveCardSuccess when board value is undefined", async () => {
				const { boardStore } = setup(false);
				const { moveCardRequest } = useBoardRestApi();

				const cardPayload = {
					oldIndex: 0,
					newIndex: 1,
					cardId: "cardId",
					fromColumnId: "columnId",
					fromColumnIndex: 0,
				};

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if card is moved to the same position", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = {
					cardId: movingCard.cardId,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: firstColumn.id,
					toColumnIndex: 0,
					oldIndex: 0,
					newIndex: 0,
				};

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if a card in the first column is moved to the left", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = {
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnIndex: -1,
				};

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if first card is moved to the top", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const firstCard = firstColumn.cards[0];

				const cardPayload = {
					cardId: firstCard.cardId,
					oldIndex: 0,
					newIndex: -1,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: firstColumn.id,
				};

				await moveCardRequest(cardPayload);

				expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
			});

			it("should not call moveCardCall if last card is moved down", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const lastCard = firstColumn.cards[2];

				const cardPayload = {
					cardId: lastCard.cardId,
					oldIndex: 2,
					newIndex: 3,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: firstColumn.id,
				};

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

				const cardPayload = {
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 2,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: firstColumn.id,
					toColumnIndex: 0,
				};

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith({
					...cardPayload,
					isOwnAction: true,
				});
			});

			it("should call moveCardSuccess action if card is moved to another columm and the API call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const secondColumn = boardStore.board!.columns[1];
				const movingCard = firstColumn.cards[1];

				const cardPayload = {
					cardId: movingCard.cardId,
					oldIndex: 1,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: secondColumn.id,
					toColumnIndex: 1,
				};

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith({
					...cardPayload,
					isOwnAction: true,
				});
			});

			it("should call moveCardSuccess action if card is moved to a new column and the API call is successful", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const newColumn = columnResponseFactory.build();
				mockedBoardApiCalls.createColumnCall.mockResolvedValue(newColumn);

				boardStore.getLastColumnIndex.mockReturnValue(1);

				const cardPayload = {
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
				};

				await moveCardRequest(cardPayload);

				expect(boardStore.moveCardSuccess).toHaveBeenCalledWith({
					...cardPayload,
					toColumnId: newColumn.id,
					toColumnIndex: 1,
					isOwnAction: true,
				});
			});

			it("should call handleError if the API call fails", async () => {
				const { boardStore } = setup();
				const { moveCardRequest } = useBoardRestApi();

				const firstColumn = boardStore.board!.columns[0];
				const movingCard = firstColumn.cards[0];

				const cardPayload = {
					cardId: movingCard.cardId,
					oldIndex: 0,
					newIndex: 2,
					fromColumnId: firstColumn.id,
					fromColumnIndex: 0,
					toColumnId: firstColumn.id,
					toColumnIndex: 0,
				};

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
				isOwnAction: true,
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

			expect(boardStore.updateColumnTitleSuccess).toHaveBeenCalledWith({
				...payload,
				isOwnAction: true,
			});
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
				isOwnAction: true,
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
				isOwnAction: true,
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

	describe("@updateReadersCanEditRequest", () => {
		it("should not call updateReadersCanEditSuccess action when board value is undefined", async () => {
			const payload = { boardId: "boardId", readersCanEdit: true };
			const { boardStore } = setup(false);
			const { updateReaderCanEditRequest } = useBoardRestApi();
			await updateReaderCanEditRequest(payload);

			expect(boardStore.updateReaderCanEditSuccess).not.toHaveBeenCalled();
		});

		it("should call updateReadersCanEditSuccess action if the API call is successful", async () => {
			const payload = { boardId: "boardId", readersCanEdit: true };
			const { boardStore } = setup();
			const { updateReaderCanEditRequest } = useBoardRestApi();
			await updateReaderCanEditRequest(payload);

			expect(boardStore.updateReaderCanEditSuccess).toHaveBeenCalledWith({
				...payload,
				isOwnAction: true,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const payload = { boardId: "boardId", readersCanEdit: true };
			setup();
			const { updateReaderCanEditRequest } = useBoardRestApi();

			mockedBoardApiCalls.updateReadersCanEditCall.mockRejectedValue({});

			await updateReaderCanEditRequest(payload);

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateBoardLayoutRequest", () => {
		it("should not call updateBoardLayoutSuccess action when board value is undefined", async () => {
			const { boardStore } = setup(false);
			const { updateBoardLayoutRequest } = useBoardRestApi();

			await updateBoardLayoutRequest({
				boardId: "boardId",
				layout: BoardLayout.Columns,
			});

			expect(boardStore.updateBoardLayoutSuccess).not.toHaveBeenCalled();
		});

		it("should call updateBoardLayoutSuccess action if the API call is successful", async () => {
			const { boardStore } = setup();
			const { updateBoardLayoutRequest } = useBoardRestApi();

			await updateBoardLayoutRequest({
				boardId: "boardId",
				layout: BoardLayout.Columns,
			});

			expect(boardStore.updateBoardLayoutSuccess).toHaveBeenCalledWith({
				boardId: "boardId",
				layout: BoardLayout.Columns,
				isOwnAction: true,
			});
		});

		it("should call handleError if the API call fails", async () => {
			setup();
			const { updateBoardLayoutRequest } = useBoardRestApi();

			mockedBoardApiCalls.updateBoardLayoutCall.mockRejectedValue({});

			await updateBoardLayoutRequest({
				boardId: "boardId",
				layout: BoardLayout.Columns,
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
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(vi.fn());

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
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(vi.fn());

			await updateBoardTitleRequest({
				boardId: "boardId",
				newTitle: "newTitlte",
			});

			executeErrorHandler();
			expect(mockedErrorHandler.notifyWithTemplate).toHaveBeenCalledWith("notUpdated", "board");

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

			expect(mockedBoardApiCalls.fetchBoardCall).toHaveBeenCalledWith(boardStore.board!.id);
		});
	});
});
