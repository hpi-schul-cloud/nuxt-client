import { useBoardSocketApi } from "./boardSocketApi.composable";
import { useSocketConnection, useBoardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CardMove } from "@/types/board/DragAndDrop";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import {
	CreateCardFailurePayload,
	CreateColumnFailurePayload,
	DeleteColumnFailurePayload,
	DisconnectSocketRequestPayload,
	MoveCardFailurePayload,
	MoveColumnFailurePayload,
	UpdateBoardTitleFailurePayload,
	UpdateBoardVisibilityFailurePayload,
	UpdateColumnTitleFailurePayload,
} from "./boardActionPayload";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import * as BoardActions from "./boardActions";
import * as CardActions from "../cardActions/cardActions";
import {
	boardResponseFactory,
	cardResponseFactory,
	columnResponseFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

import {
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteCardSuccessPayload,
} from "../cardActions/cardActionPayload";

jest.mock("../Board.store");
const mockedUseBoardStore = jest.mocked(useBoardStore);

jest.mock("../socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("./boardRestApi.composable");
const mockedUseBoardRestApi = jest.mocked(useBoardRestApi);

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

describe("useBoardSocketApi", () => {
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedBoardRestApiHandler: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedBoardStore: DeepMocked<ReturnType<typeof useBoardStore>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedBoardRestApiHandler =
			createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiHandler);

		mockedBoardStore = createMock<ReturnType<typeof useBoardStore>>();
		mockedUseBoardStore.mockReturnValue(mockedBoardStore);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	});

	it("should be defined", () => {
		expect(useBoardSocketApi).toBeDefined();
	});

	describe("dispatch", () => {
		beforeEach(() => {
			setActivePinia(createTestingPinia({}));
		});

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
			};
			dispatch(BoardActions.createCardSuccess(payload));

			expect(boardStore.createCardSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call createColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				newColumn: columnResponseFactory.build(),
			};
			dispatch(BoardActions.createColumnSuccess(payload));

			expect(boardStore.createColumnSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call deleteCardSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				cardId: "cardId",
			};

			dispatch(CardActions.deleteCardSuccess(payload));

			expect(boardStore.deleteCardSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call deleteColumnSuccess for corresponding action", () => {
			const boardStore = mockedPiniaStoreTyping(useBoardStore);
			const { dispatch } = useBoardSocketApi();

			const payload = {
				columnId: "columnId",
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
			};
			dispatch(BoardActions.updateBoardVisibilitySuccess(payload));

			expect(boardStore.updateBoardVisibilitySuccess).toHaveBeenCalledWith(
				payload
			);
		});

		it("should call notifySocketError for createCard action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: CreateCardFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardCard",
			};
			dispatch(BoardActions.createCardFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for createColumnFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: CreateColumnFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardColumn",
			};
			dispatch(BoardActions.createColumnFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for deleteCardFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: DeleteCardFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardCard",
			};
			dispatch(CardActions.deleteCardFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for deleteColumnFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: DeleteColumnFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardColumn",
			};

			dispatch(BoardActions.deleteColumnFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for moveCardFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: MoveCardFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardCard",
			};

			dispatch(BoardActions.moveCardFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for moveColumnFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: MoveColumnFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardColumn",
			};

			dispatch(BoardActions.moveColumnFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for updateColumnTitleFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: UpdateColumnTitleFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardColumn",
			};

			dispatch(BoardActions.updateColumnTitleFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for updateBoardTitleFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: UpdateBoardTitleFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardColumn",
			};

			dispatch(BoardActions.updateBoardTitleFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for updateBoardVisibilityFailure action", () => {
			const { dispatch } = useBoardSocketApi();

			const payload: UpdateBoardVisibilityFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "board",
			};

			dispatch(BoardActions.updateBoardVisibilityFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
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

	describe("createColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { createColumnRequest } = useBoardSocketApi();

			createColumnRequest({ boardId: "test" });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-column-request",
				{ boardId: "test" }
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
			} as CardMove);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-card-request",
				{ cardId: "test", toColumnId: "testColumnId" }
			);
		});
	});

	describe("moveColumnRequest", () => {
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
