import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick, ref } from "vue";
import * as serverApi from "../../../serverApi/v3/api";
import { useBoardState } from "./BoardState.composable";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { useBoardApi } from "../shared/BoardApi.composable";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { Board } from "../types/Board";
import { CardMove, ColumnMove } from "../types/DragAndDrop";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../shared/EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../shared/BoardNotifications.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("BoardState.composable", () => {
	let mockServerApi: any;
	let boardControllerGetBoardSkeleton: any;
	let mockedBoardNotifierCalls: Partial<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: Partial<ReturnType<typeof useBoardApi>>;
	let setEditModeId: jest.Mock;

	const card = cardSkeletonResponseFactory.build();
	const column = columnResponseFactory.build({ cards: [card] });
	let testBoard: Board;

	const setup = (boardId = testBoard.id) => {
		return mountComposable(() => useBoardState(boardId), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			notifierModule,
		});
	};

	beforeEach(() => {
		testBoard = boardResponseFactory.build({ columns: [column] });
		boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: testBoard });
		mockServerApi = { boardControllerGetBoardSkeleton };
		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(mockServerApi);

		mockedBoardApiCalls = {
			createCardCall: jest.fn(),
			createColumnCall: jest.fn(),
			deleteCardCall: jest.fn(),
			deleteColumnCall: jest.fn(),
			moveCardCall: jest.fn(),
			moveColumnCall: jest.fn(),
			updateColumnTitleCall: jest.fn(),
		};
		mockedUseBoardApi.mockReturnValue(
			mockedBoardApiCalls as ReturnType<typeof useBoardApi>
		);

		mockedBoardNotifierCalls = {
			generateErrorText: jest.fn(),
			showFailure: jest.fn(),
			isErrorCode: jest.fn(),
		};
		mockedUseBoardNotifier.mockReturnValue(
			mockedBoardNotifierCalls as ReturnType<typeof useBoardNotifier>
		);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	describe("createCard", () => {
		it("should call createCardCall", async () => {
			const { createCard, board } = setup();
			board.value = testBoard;

			await createCard(column.id);
			await nextTick();

			expect(mockedBoardApiCalls.createCardCall).toHaveBeenCalledWith(
				column.id
			);
		});

		it("should not call createCardCall when board value is undefined", async () => {
			const { createCard, board } = setup();
			board.value = undefined;

			await createCard(column.id);
			await nextTick();

			expect(mockedBoardApiCalls.createCardCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newCardId is undefined", async () => {
			const { createCard, board } = setup();
			board.value = testBoard;

			await createCard(column.id);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardCard"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});

		it("should call setEditModeId", async () => {
			const newCardId = "newCardId1234";
			mockedBoardApiCalls.createCardCall = jest
				.fn()
				.mockResolvedValue(newCardId);

			const { createCard, board } = setup();
			board.value = testBoard;

			await createCard(column.id);
			await nextTick();

			expect(setEditModeId).toHaveBeenCalledWith(newCardId);
		});
	});

	describe("createColumn", () => {
		it("should call createColumnCall", async () => {
			const { createColumn, board } = setup();
			board.value = testBoard;

			await createColumn();
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).toHaveBeenCalledWith(
				board.value.id
			);
		});

		it("should not call createCardCall when board value is undefined", async () => {
			const { createColumn, board } = setup();
			board.value = undefined;

			await createColumn();
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newColumn id is undefined", async () => {
			const { createColumn, board } = setup();
			board.value = testBoard;

			await createColumn();
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardColumn"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});

		it("should call setEditModeId and return new column", async () => {
			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall = jest
				.fn()
				.mockResolvedValue(newColumn);

			const { createColumn, board } = setup();
			board.value = testBoard;

			const result = await createColumn();
			await nextTick();

			expect(setEditModeId).toHaveBeenCalledWith(newColumn.id);
			expect(result).toEqual(newColumn);
		});
	});

	describe("createColumnWithCard", () => {
		it("should not call createColumnCall when board value is undefined", async () => {
			const movingCard = cardSkeletonResponseFactory.build();
			const { createColumnWithCard, board } = setup();
			board.value = undefined;

			await createColumnWithCard(movingCard.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.createColumnCall).not.toHaveBeenCalled();
		});

		it("should generate and show error when newColumn id is undefined", async () => {
			const movingCard = cardSkeletonResponseFactory.build();
			const { createColumnWithCard, board } = setup();
			board.value = testBoard;

			await createColumnWithCard(movingCard.cardId);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardColumn"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});

		it("should call moveCardCall", async () => {
			const movingCard = cardSkeletonResponseFactory.build();
			const newColumn = columnResponseFactory.build();
			mockedBoardApiCalls.createColumnCall = jest
				.fn()
				.mockResolvedValue(newColumn);

			const { createColumnWithCard, board } = setup();
			board.value = testBoard;

			await createColumnWithCard(movingCard.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				movingCard.cardId,
				newColumn.id,
				0
			);
		});
	});

	describe("deleteCard", () => {
		it("should not call deleteCardCall when board value is undefined", async () => {
			const { deleteCard, board } = setup();
			board.value = undefined;

			await deleteCard(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
		});

		it("should call deleteCardCall", async () => {
			const { deleteCard, board } = setup();
			board.value = testBoard;

			await deleteCard(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				card.cardId
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { deleteCard, board } = setup();
			board.value = testBoard;

			await deleteCard(card.cardId);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"delete",
				"boardCard"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("deleteColumn", () => {
		it("should not call deleteColumnCall when board value is undefined", async () => {
			const { deleteColumn, board } = setup();
			board.value = undefined;

			await deleteColumn(card.cardId);
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).not.toHaveBeenCalled();
		});

		it("should call deleteColumnCall", async () => {
			const { deleteColumn, board } = setup();
			board.value = testBoard;

			await deleteColumn(column.id);
			await nextTick();

			expect(mockedBoardApiCalls.deleteColumnCall).toHaveBeenCalledWith(
				column.id
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { deleteColumn, board } = setup();
			board.value = testBoard;

			await deleteColumn(column.id);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"delete",
				"boardColumn"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("extractCard", () => {
		test.todo("should extract card");
	});

	describe("fetchBoard", () => {
		it("should fetch board on mount", async () => {
			const boardId = "123124";
			setup(boardId);

			expect(
				mockServerApi.boardControllerGetBoardSkeleton
			).toHaveBeenCalledWith(boardId);
		});

		it("should return fetch function that updates board", async () => {
			const boardId2 = "a1b1c1";
			const { fetchBoard, board } = setup();

			const fetchPromise = fetchBoard(boardId2);
			await fetchPromise;

			expect(board.value).toBeDefined();
			expect(board.value?.id).toBe(boardId2);
		});

		it("should return isLoading which reflects pending api calls", async () => {
			const { isLoading } = setup();

			expect(isLoading.value).toStrictEqual(true);

			await nextTick();
			await nextTick();

			expect(isLoading.value).toStrictEqual(false);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			boardControllerGetBoardSkeleton.mockResolvedValue({ data: undefined });

			const { fetchBoard } = setup();

			await fetchBoard(testBoard.id);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"read",
				"board"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("moveCard", () => {
		it("should not call moveCardCall when board value is undefined", async () => {
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
			};
			const { moveCard, board } = setup();
			board.value = undefined;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).not.toHaveBeenCalled();
		});

		it("should call moveCardCall ", async () => {
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
			};

			const { moveCard, board } = setup();
			board.value = testBoard;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardApiCalls.moveCardCall).toHaveBeenCalledWith(
				card.cardId,
				cardPayload.columnId,
				cardPayload.addedIndex
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const cardPayload: CardMove = {
				removedIndex: 2,
				addedIndex: 1,
				payload: card,
				columnId: column.id,
			};

			const { moveCard, board } = setup();
			board.value = testBoard;

			await moveCard(cardPayload);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("moveColumn", () => {
		it("should not call moveColumnCall when board value is undefined", async () => {
			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: movingColumn.id,
			};
			const { moveColumn, board } = setup();
			board.value = undefined;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).not.toHaveBeenCalled();
		});

		it("should call moveColumnCall", async () => {
			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: movingColumn.id,
			};
			const { moveColumn, board } = setup();
			board.value = testBoard;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardApiCalls.moveColumnCall).toHaveBeenCalledWith(
				payload.payload,
				board.value.id,
				payload.addedIndex
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const movingColumn = columnResponseFactory.build();
			const payload: ColumnMove = {
				addedIndex: 0,
				removedIndex: 1,
				payload: movingColumn.id,
			};
			const { moveColumn, board } = setup();
			board.value = testBoard;

			await moveColumn(payload);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("updateColumnTitle", () => {
		const NEW_TITLE = "newTitle";
		it("should not call updateColumnTitleCall when board value is undefined", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = undefined;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).not.toHaveBeenCalled();
		});

		it("should call updateColumnTitleCall", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).toHaveBeenCalledWith(
				column.id,
				NEW_TITLE
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			await updateColumnTitle(column.id, NEW_TITLE);
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("getColumnId", () => {
		it("should get column id", () => {
			const { getColumnId, board } = setup();
			board.value = testBoard;

			const result = getColumnId(0);

			expect(result).toEqual(column.id);
		});

		it("should return undefined if board is not set", () => {
			const { getColumnId, board } = setup();
			board.value = undefined;

			const result = getColumnId(0);

			expect(result).toEqual(undefined);
		});
	});
});
