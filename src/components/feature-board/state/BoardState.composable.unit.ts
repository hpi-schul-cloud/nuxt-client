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
import { CardMove } from "../types/DragAndDrop";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../shared/EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../shared/BoardNotifications.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("BoardState.composable", () => {
	let mockServerApi: any;
	let mockedBoardNotifierCalls: Partial<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: Partial<ReturnType<typeof useBoardApi>>;
	let setEditModeId: jest.Mock;

	const card = cardSkeletonResponseFactory.build();
	const column = columnResponseFactory.build({ cards: [card] });
	let testBoard: Board;

	const setup = (boardId = "123123") => {
		return mountComposable(() => useBoardState(boardId), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			notifierModule,
		});
	};

	beforeEach(() => {
		testBoard = boardResponseFactory.build({ columns: [column] });
		const boardControllerGetBoardSkeleton = jest
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
		it("should generate and show error when newColumn id is undefined", async () => {
			const { createColumnWithCard, board } = setup();
			board.value = testBoard;

			await createColumnWithCard();
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardColumn"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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

		test.todo("should generate and show error when there is an error code");
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

		test.todo("should generate and show error when there is an error code");
	});

	describe("moveColumn", () => {
		test.todo("should call moveColumnCall");
		test.todo("should not call moveColumnCall when board value is undefined");
		test.todo("should generate and show error when there is an error code");
	});

	describe("updateColumnTitle", () => {
		it("should not call updateColumnTitleCall when board value is undefined", async () => {
			const { updateColumnTitle, board } = setup();
			board.value = undefined;

			await updateColumnTitle(column.id, "newTitle");
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).not.toHaveBeenCalled();
		});

		it("should call updateColumnTitleCall", async () => {
			const { updateColumnTitle, board } = setup();
			const newTitle = "newTitle";
			board.value = testBoard;

			await updateColumnTitle(column.id, newTitle);
			await nextTick();

			expect(mockedBoardApiCalls.updateColumnTitleCall).toHaveBeenCalledWith(
				column.id,
				newTitle
			);
		});

		it("should generate and show error when there is an error code", async () => {
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const { updateColumnTitle, board } = setup();
			board.value = testBoard;

			await updateColumnTitle(column.id, "newTitle");
			await nextTick();

			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("addCard", () => {
		test.todo("should add card");
	});

	describe("getColumnId", () => {
		test.todo("should get column id");
	});

	describe("getColumnIndex", () => {
		test.todo("should get column index");
	});

	describe("showErrorAndReload", () => {
		test.todo("should not show failure when board value undefined");
		test.todo("should show failure and fetch board");
	});
});
