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
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";

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

	const column = columnResponseFactory.build();
	const testBoard = boardResponseFactory.build({ columns: [column] });

	const setup = (boardId = "123123") => {
		return mountComposable(() => useBoardState(boardId), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			notifierModule,
		});
	};

	beforeEach(() => {
		const boardControllerGetBoardSkeleton = jest
			.fn()
			.mockResolvedValue({ data: testBoard });
		mockServerApi = { boardControllerGetBoardSkeleton };
		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(mockServerApi);

		mockedBoardApiCalls = {
			createCardCall: jest.fn(),
			createColumnCall: jest.fn(),
		};
		mockedUseBoardApi.mockReturnValue(
			mockedBoardApiCalls as ReturnType<typeof useBoardApi>
		);

		mockedBoardNotifierCalls = {
			generateErrorText: jest.fn(),
			showFailure: jest.fn(),
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

	describe("createColumnWithCard", () => {});
	describe("deleteCard", () => {});
	describe("deleteColumn", () => {});
	describe("extractCard", () => {});

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
	});

	describe("moveCard", () => {});
	describe("moveColumn", () => {});
	describe("updateColumnTitle", () => {});
	describe("addCard", () => {});
	describe("extractCard", () => {});
	describe("getColumnId", () => {});
	describe("getColumnIndex", () => {});
	describe("showErrorAndReload", () => {});
});
