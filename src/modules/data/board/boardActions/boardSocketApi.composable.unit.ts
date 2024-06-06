import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import {
	boardResponseFactory,
	cardResponseFactory,
	columnResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";
import { DeleteCardFailurePayload } from "../cardActions/cardActionPayload";
import * as CardActions from "../cardActions/cardActions";
import {
	CreateCardFailurePayload,
	CreateColumnFailurePayload,
	DeleteColumnFailurePayload,
	DisconnectSocketRequestPayload,
	MoveCardFailurePayload,
	MoveCardRequestPayload,
	MoveColumnFailurePayload,
	UpdateBoardTitleFailurePayload,
	UpdateBoardVisibilityFailurePayload,
	UpdateColumnTitleFailurePayload,
} from "./boardActionPayload";
import * as BoardActions from "./boardActions";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useBoardSocketApi } from "./boardSocketApi.composable";

jest.mock("../socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("./boardRestApi.composable");
const mockedUseBoardRestApi = jest.mocked(useBoardRestApi);

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockedSharedLastCreatedElement = jest.mocked(useSharedLastCreatedElement);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

describe("useBoardSocketApi", () => {
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedBoardRestApiHandler: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSharedLastCreatedElementActions: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		setupStores({ envConfigModule: EnvConfigModule });

		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedBoardRestApiHandler =
			createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiHandler);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedSharedLastCreatedElementActions =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(
			mockedSharedLastCreatedElementActions
		);
	});

	it("should be defined", () => {
		expect(useBoardSocketApi).toBeDefined();
	});

	describe("dispatch", () => {
		it("should call disconnectSocket for corresponding action", () => {
			const { dispatch } = useBoardSocketApi();

			dispatch(BoardActions.disconnectSocket({}));

			expect(mockedSocketConnectionHandler.disconnectSocket).toHaveBeenCalled();
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

			expect(boardStore.updateBoardVisibilitySuccess).toHaveBeenCalledWith(
				payload
			);
		});

		describe("failure actions", () => {
			it("should call notifySocketError for createCardFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: CreateCardFailurePayload = { columnId: "test" };
				dispatch(BoardActions.createCardFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notCreated",
					"boardCard"
				);
			});

			it("should call notifySocketError for createColumnFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: CreateColumnFailurePayload = { boardId: "test" };
				dispatch(BoardActions.createColumnFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notCreated",
					"boardColumn"
				);
			});

			it("should call notifySocketError for deleteCardFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: DeleteCardFailurePayload = { cardId: "test" };
				dispatch(CardActions.deleteCardFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notDeleted",
					"boardCard"
				);
			});

			it("should call notifySocketError for deleteColumnFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: DeleteColumnFailurePayload = { columnId: "test" };

				dispatch(BoardActions.deleteColumnFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notDeleted",
					"boardColumn"
				);
			});

			it("should call notifySocketError for moveCardFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: MoveCardFailurePayload = {
					cardId: "test",
					oldIndex: 0,
					newIndex: 0,
					fromColumnId: "fromColumnId",
					fromColumnIndex: 0,
					toColumnId: "toColumnId",
					toColumnIndex: 0,
				};

				dispatch(BoardActions.moveCardFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardCard"
				);
			});

			it("should call notifySocketError for moveColumnFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: MoveColumnFailurePayload = {
					columnMove: { addedIndex: 1, columnId: "testColumnId" },
					byKeyboard: false,
				};

				dispatch(BoardActions.moveColumnFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardColumn"
				);
			});

			it("should call notifySocketError for updateColumnTitleFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: UpdateColumnTitleFailurePayload = {
					columnId: "test",
					newTitle: "newTitle",
				};

				dispatch(BoardActions.updateColumnTitleFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardColumn"
				);
			});

			it("should call notifySocketError for updateBoardTitleFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: UpdateBoardTitleFailurePayload = {
					boardId: "test",
					newTitle: "newTitle",
				};

				dispatch(BoardActions.updateBoardTitleFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"board"
				);
			});

			it("should call notifySocketError for updateBoardVisibilityFailure action", () => {
				const { dispatch } = useBoardSocketApi();

				const payload: UpdateBoardVisibilityFailurePayload = {
					boardId: "test",
					isVisible: true,
				};

				dispatch(BoardActions.updateBoardVisibilityFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"board"
				);
			});
		});
	});

	describe("disconnectSocketRequest", () => {
		const payload: DisconnectSocketRequestPayload = {};

		it("should call disconnectSocket", () => {
			const { disconnectSocketRequest } = useBoardSocketApi();

			disconnectSocketRequest(payload);

			expect(mockedSocketConnectionHandler.disconnectSocket).toHaveBeenCalled();
		});
	});

	describe("createCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { createCardRequest } = useBoardSocketApi();

			createCardRequest({ columnId: "test" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-card-request",
				{ columnId: "test" }
			);
		});
	});

	describe("fetchBoardRequest", () => {
		it("should call action with correct parameters and call setLoading with true", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { fetchBoardRequest } = useBoardSocketApi();

			fetchBoardRequest({ boardId: "boardId" });

			expect(boardStore.setLoading).toHaveBeenCalledWith(true);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"fetch-board-request",
				{ boardId: "boardId" }
			);
		});
	});

	describe("createColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { createColumnRequest } = useBoardSocketApi();

			createColumnRequest({ boardId: "boardId" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-column-request",
				{ boardId: "boardId" }
			);
		});
	});

	describe("deleteColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { deleteColumnRequest } = useBoardSocketApi();

			deleteColumnRequest({ columnId: "test" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-column-request",
				{ columnId: "test" }
			);
		});
	});

	describe("moveCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { moveCardRequest } = useBoardSocketApi();

			moveCardRequest({
				cardId: "test",
				toColumnId: "testColumnId",
			} as MoveCardRequestPayload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-card-request",
				{ cardId: "test", toColumnId: "testColumnId" }
			);
		});

		it("should call action with correct parameters when toColumnId is undefined", async () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const board = boardResponseFactory.build();
			boardStore.board = board;

			const { moveCardRequest } = useBoardSocketApi();

			const newColumn = columnResponseFactory.build();
			mockedSocketConnectionHandler.emitWithAck.mockResolvedValue({
				newColumn,
			});

			await moveCardRequest({
				cardId: "cardId",
				toColumnId: undefined,
			} as MoveCardRequestPayload);

			expect(mockedSocketConnectionHandler.emitWithAck).toHaveBeenCalledWith(
				"create-column-request",
				{ boardId: board.id }
			);
			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-card-request",
				{ cardId: "cardId", toColumnId: newColumn.id }
			);
		});

		it("should call onFailure when moved to a new column which cannot be created", async () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const board = boardResponseFactory.build();
			boardStore.board = board;

			const { moveCardRequest } = useBoardSocketApi();

			mockedSocketConnectionHandler.emitWithAck.mockRejectedValue({
				type: "move-card-failure",
			});

			await moveCardRequest({
				cardId: "cardId",
				toColumnId: undefined,
			} as MoveCardRequestPayload);

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				"notUpdated",
				"boardCard"
			);
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

			expect(mockedSocketConnectionHandler.emitOnSocket).not.toHaveBeenCalled();
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

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-column-request",
				{
					columnMove: {
						addedIndex: 1,
						removedIndex: 0,
						columnId: "testColumnId",
					},
					byKeyboard: false,
				}
			);
		});
	});

	describe("updateColumnTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateColumnTitleRequest } = useBoardSocketApi();

			updateColumnTitleRequest({ columnId: "test", newTitle: "newTitle" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-column-title-request",
				{ columnId: "test", newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardTitleRequest } = useBoardSocketApi();

			updateBoardTitleRequest({ boardId: "boardId", newTitle: "newTitle" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-title-request",
				{ boardId: "boardId", newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardVisibilityRequest } = useBoardSocketApi();

			updateBoardVisibilityRequest({ boardId: "boardId", isVisible: true });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-visibility-request",
				{ boardId: "boardId", isVisible: true }
			);
		});
	});
});
