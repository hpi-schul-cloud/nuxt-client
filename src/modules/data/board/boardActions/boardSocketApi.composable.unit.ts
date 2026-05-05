import * as CardActions from "../cardActions/cardActions";
import {
	MoveCardRequestPayload,
	UpdateBoardLayoutFailurePayload,
	UpdateBoardLayoutSuccessPayload,
} from "./boardActionPayload.types";
import * as BoardActions from "./boardActions";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useBoardSocketApi } from "./boardSocketApi.composable";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import {
	boardResponseFactory,
	cardResponseFactory,
	columnFullResponseFactory,
	columnResponseFactory,
	mockComposable,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import { BoardLayout, MoveCardResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { useBoardStore, useForceRender, useSocketConnection } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedLastCreatedElement } from "@util-board";
import { useErrorHandler } from "@util-error-handling";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("../socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("../fixSamePositionDnD.composable");
const mockedUseForceRender = vi.mocked(useForceRender);

vi.mock("./boardRestApi.composable");
const mockedUseBoardRestApi = vi.mocked(useBoardRestApi);

vi.mock("@util-board/LastCreatedElement.composable");
const mockedSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

vi.mock("@util-error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("vue-i18n", () => ({
	useI18n: () => ({ t: (key: string) => key }),
}));

describe("useBoardSocketApi", () => {
	let socketMock: Mocked<ReturnType<typeof useSocketConnection>>;
	let mockedBoardRestApiHandler: Mocked<ReturnType<typeof useBoardRestApi>>;
	let mockedErrorHandler: Mocked<ReturnType<typeof useErrorHandler>>;
	let mockedSharedLastCreatedElementActions: Mocked<ReturnType<typeof useSharedLastCreatedElement>>;
	let mockedUseForceRenderHandler: ReturnType<typeof useForceRender>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		socketMock = mockComposable(useSocketConnection);
		mockedUseSocketConnection.mockReturnValue(socketMock);

		mockedBoardRestApiHandler = mockComposable(useBoardRestApi);
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiHandler);

		mockedErrorHandler = mockComposable(useErrorHandler);
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedSharedLastCreatedElementActions = mockComposable(useSharedLastCreatedElement);
		mockedSharedLastCreatedElement.mockReturnValue(mockedSharedLastCreatedElementActions);

		mockedUseForceRenderHandler = mockComposable(useForceRender);
		mockedUseForceRender.mockReturnValue(mockedUseForceRenderHandler);

		injectRouterMock(createRouterMock());
		mountComposable(useBoardSocketApi);
	});

	it("should be defined", () => {
		expect(useBoardSocketApi).toBeDefined();
	});

	describe("dispatch", () => {
		const setupWithFakeBoard = () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			boardStore.board = {
				id: "someid",
				title: "sometitle",
				columns: [],
				isVisible: true,
				layout: BoardLayout.COLUMNS,
				timestamps: {
					createdAt: new Date().toISOString(),
					lastUpdatedAt: new Date().toISOString(),
					deletedAt: undefined,
				},
				readersCanEdit: false,
				features: [],
			};
			const { dispatch } = useBoardSocketApi();
			return { dispatch };
		};

		it("should call disconnectSocket for corresponding action", () => {
			const { dispatch } = useBoardSocketApi();

			dispatch(BoardActions.disconnectSocket({}));

			expect(socketMock.disconnectSocket).toHaveBeenCalled();
		});

		it("should call createCardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				newCard: cardResponseFactory.build(),
				columnId: "columnId",
				isOwnAction: true,
			};
			dispatch(BoardActions.createCardSuccess(payload));

			expect(boardStore.createCardSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call createColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				newColumn: columnResponseFactory.build(),
				isOwnAction: true,
			};
			dispatch(BoardActions.createColumnSuccess(payload));

			expect(boardStore.createColumnSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call deleteCardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				cardId: "cardId",
				isOwnAction: true,
			};

			dispatch(CardActions.deleteCardSuccess(payload));

			expect(boardStore.deleteCardSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call deleteColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				columnId: "columnId",
				isOwnAction: true,
			};
			dispatch(BoardActions.deleteColumnSuccess(payload));

			expect(boardStore.deleteColumnSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call moveCardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				cardId: "cardId",
				oldIndex: 0,
				newIndex: 0,
				fromColumnId: "fromColumnId",
				fromColumnIndex: 0,
				toColumnId: "toColumnId",
				toColumnIndex: 0,
				isOwnAction: true,
			};

			dispatch(BoardActions.moveCardSuccess(payload));

			expect(boardStore.moveCardSuccess).toHaveBeenCalledWith(payload);
			expect(mockedUseForceRenderHandler.generateRenderKey).toHaveBeenCalled();
		});

		it("should call moveCardToBoardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();
			const cardPayload: MoveCardResponse = {
				card: {
					cardId: "cardId",
					height: 100,
				},
				fromColumn: {
					id: "1",
					title: "fromColumnId",
				},
				toColumn: {
					id: "2",
					title: "toColumnId",
				},
				fromBoard: {
					id: "3",
					title: "toBoardId",
				},
				toBoard: {
					id: "4",
					title: "toBoardId",
				},
			};

			dispatch(BoardActions.moveCardToBoardSuccess(cardPayload));
			expect(boardStore.moveCardToBoardSuccess).toHaveBeenCalledWith(cardPayload);
		});

		it("should call moveColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				columnMove: { addedIndex: 1, columnId: "testColumnId" },
				byKeyboard: false,
				isOwnAction: true,
			};

			dispatch(BoardActions.moveColumnSuccess(payload));

			expect(boardStore.moveColumnSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call fetchBoardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const board = boardResponseFactory.build();

			dispatch(BoardActions.fetchBoardSuccess(board));

			expect(boardStore.fetchBoardSuccess).toHaveBeenCalledWith(board);
		});

		it("should call updateColumnTitleSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				columnId: "cardId",
				newTitle: "newTitle",
				isOwnAction: true,
			};
			dispatch(BoardActions.updateColumnTitleSuccess(payload));

			expect(boardStore.updateColumnTitleSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call updateBoardTitleSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				boardId: "cardId",
				newTitle: "newTitle",
				isOwnAction: true,
			};
			dispatch(BoardActions.updateBoardTitleSuccess(payload));

			expect(boardStore.updateBoardTitleSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call updateBoardVisibilitySuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				boardId: "cardId",
				isVisible: true,
				isOwnAction: true,
			};
			dispatch(BoardActions.updateBoardVisibilitySuccess(payload));

			expect(boardStore.updateBoardVisibilitySuccess).toHaveBeenCalledWith(payload);
		});

		it("should call updateBoardLayoutSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload: UpdateBoardLayoutSuccessPayload = {
				boardId: "cardId",
				layout: BoardLayout.COLUMNS,
				isOwnAction: true,
			};
			dispatch(BoardActions.updateBoardLayoutSuccess(payload));

			expect(boardStore.updateBoardLayoutSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call duplicateColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				columnId: "columnId",
				duplicatedColumn: columnFullResponseFactory.build(),
				isOwnAction: true,
			};
			dispatch(BoardActions.duplicateColumnSuccess(payload));

			expect(boardStore.duplicateColumnSuccess).toHaveBeenCalledWith(payload);
		});

		describe("failure actions", () => {
			it("should call handleApplicationError for fetchBoardFailure action", () => {
				const { dispatch } = useBoardSocketApi();
				dispatch(BoardActions.fetchBoardFailure({ boardId: "test" }));

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(
					HttpStatusCode.NotFound,
					"components.board.error.404"
				);
			});

			it("should reload the board for createCardFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(BoardActions.createCardFailure({ columnId: "test" }));

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for createColumnFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(BoardActions.createColumnFailure({ boardId: "test" }));

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for deleteCardFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(CardActions.deleteCardFailure({ cardId: "test" }));

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for deleteColumnFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(BoardActions.deleteColumnFailure({ columnId: "test" }));

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for moveCardFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.moveCardFailure({
						cardId: "test",
						oldIndex: 0,
						newIndex: 0,
						fromColumnId: "fromColumnId",
						fromColumnIndex: 0,
						toColumnId: "toColumnId",
						toColumnIndex: 0,
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for moveColumnFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.moveColumnFailure({
						columnMove: { addedIndex: 1, columnId: "testColumnId" },
						byKeyboard: false,
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for updateColumnTitleFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.updateColumnTitleFailure({
						columnId: "test",
						newTitle: "newTitle",
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for updateBoardTitleFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.updateColumnTitleFailure({
						columnId: "test",
						newTitle: "newTitle",
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for updateBoardVisibilityFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.updateBoardVisibilityFailure({
						boardId: "test",
						isVisible: true,
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for updateBoardLayoutFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.updateBoardLayoutFailure({
						boardId: "test",
						layout: BoardLayout.COLUMNS,
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});

			it("should reload the board for duplicateColumnFailure action", () => {
				const { dispatch } = setupWithFakeBoard();

				dispatch(
					BoardActions.duplicateColumnFailure({
						columnId: "test",
					})
				);

				expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", expect.anything());
			});
		});
	});

	describe("disconnectSocketRequest", () => {
		it("should call disconnectSocket", () => {
			const { disconnectSocketRequest } = useBoardSocketApi();

			disconnectSocketRequest();

			expect(socketMock.disconnectSocket).toHaveBeenCalled();
		});
	});

	describe("createCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { createCardRequest } = useBoardSocketApi();

			createCardRequest({ columnId: "test" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("create-card-request", {
				columnId: "test",
				requiredEmptyElements: ["richText"],
			});
		});
	});

	describe("fetchBoardRequest", () => {
		it("should call action with correct parameters and call setLoading with true", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { fetchBoardRequest } = useBoardSocketApi();

			fetchBoardRequest({ boardId: "boardId" });

			expect(boardStore.setLoading).toHaveBeenCalledWith(true);

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-board-request", { boardId: "boardId" });
		});
	});

	describe("deleteBoardRequest", () => {
		it("should call action with correct parameters", () => {
			const { deleteBoardRequest } = useBoardSocketApi();

			deleteBoardRequest({ boardId: "test" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("delete-board-request", { boardId: "test" });
		});
	});

	describe("createColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { createColumnRequest } = useBoardSocketApi();

			createColumnRequest({ boardId: "boardId" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("create-column-request", { boardId: "boardId" });
		});
	});

	describe("deleteColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { deleteColumnRequest } = useBoardSocketApi();

			deleteColumnRequest({ columnId: "test" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("delete-column-request", { columnId: "test" });
		});
	});

	describe("moveCardRequest", () => {
		it("should not call action when card is in the same position and same column", () => {
			const { moveCardRequest } = useBoardSocketApi();

			moveCardRequest({
				cardId: "test",
				toColumnId: "fromColumnId",
				oldIndex: 1,
				newIndex: 1,
				fromColumnId: "fromColumnId",
				fromColumnIndex: 1,
			});

			expect(socketMock.emitOnSocket).not.toHaveBeenCalled();
		});
		it("should call action with correct parameters", () => {
			const { moveCardRequest } = useBoardSocketApi();

			moveCardRequest({
				cardId: "test",
				toColumnId: "testColumnId",
			} as MoveCardRequestPayload);

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("move-card-request", {
				cardId: "test",
				toColumnId: "testColumnId",
			});
		});

		it("should call action with correct parameters when toColumnId is undefined", async () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const board = boardResponseFactory.build();
			boardStore.board = board;

			const { moveCardRequest } = useBoardSocketApi();

			const newColumn = columnResponseFactory.build();
			socketMock.emitWithAck.mockResolvedValue({
				newColumn,
			});

			const moveCardPayload = {
				cardId: "cardId",
				toColumnId: undefined,
				oldIndex: 0,
				newIndex: 0,
				fromColumnId: "ColumnId",
				fromColumnIndex: 1,
			};

			await moveCardRequest(moveCardPayload);

			expect(socketMock.emitWithAck).toHaveBeenCalledWith("create-column-request", { boardId: board.id });
			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("move-card-request", {
				...moveCardPayload,
				toColumnId: newColumn.id,
			});
		});
	});

	describe("moveColumnRequest", () => {
		it("should not call action when addedIndex is equal to removedIndex", () => {
			const { moveColumnRequest } = useBoardSocketApi();

			moveColumnRequest({
				columnMove: {
					addedIndex: 1,
					removedIndex: 1,
					columnId: "testColumnId",
				},
				byKeyboard: false,
			});

			expect(socketMock.emitOnSocket).not.toHaveBeenCalled();
		});

		it("should call action with correct parameters", () => {
			const { moveColumnRequest } = useBoardSocketApi();

			moveColumnRequest({
				columnMove: {
					addedIndex: 1,
					removedIndex: 0,
					columnId: "testColumnId",
				},
				byKeyboard: false,
			});

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("move-column-request", {
				columnMove: {
					addedIndex: 1,
					removedIndex: 0,
					columnId: "testColumnId",
				},
				byKeyboard: false,
			});
		});
	});

	describe("updateColumnTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateColumnTitleRequest } = useBoardSocketApi();

			updateColumnTitleRequest({ columnId: "test", newTitle: "newTitle" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-column-title-request", {
				columnId: "test",
				newTitle: "newTitle",
			});
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardTitleRequest } = useBoardSocketApi();

			updateBoardTitleRequest({ boardId: "boardId", newTitle: "newTitle" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-board-title-request", {
				boardId: "boardId",
				newTitle: "newTitle",
			});
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardVisibilityRequest } = useBoardSocketApi();

			updateBoardVisibilityRequest({ boardId: "boardId", isVisible: true });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-board-visibility-request", {
				boardId: "boardId",
				isVisible: true,
			});
		});
	});

	describe("updateReaderCanEditRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateReaderCanEditRequest } = useBoardSocketApi();

			updateReaderCanEditRequest({
				boardId: "boardId",
				readersCanEdit: true,
			});

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-readers-can-edit-request", {
				boardId: "boardId",
				readersCanEdit: true,
			});
		});
	});

	describe("updateBoardLayoutRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardLayoutRequest } = useBoardSocketApi();

			updateBoardLayoutRequest({
				boardId: "boardId",
				layout: BoardLayout.COLUMNS,
			});

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith<[string, UpdateBoardLayoutFailurePayload]>(
				"update-board-layout-request",
				{
					boardId: "boardId",
					layout: BoardLayout.COLUMNS,
				}
			);
		});
	});

	describe("duplicateColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { duplicateColumnRequest } = useBoardSocketApi();

			duplicateColumnRequest({ columnId: "columnId" });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("duplicate-column-request", {
				columnId: "columnId",
			});
		});
	});
});
