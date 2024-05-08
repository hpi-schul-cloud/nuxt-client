import { useSocketApi } from "./socketApi.composable";
import { useBoardSocketApi, useBoardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CardMove } from "@/types/board/DragAndDrop";
import { useBoardRestApi } from "./restApi.composable";
import { useBoardNotifier } from "@util-board";

jest.mock("../Board.store");
const mockedUseBoardStore = jest.mocked(useBoardStore);

jest.mock("../socket/socket");
const mockedUseSocketApi = jest.mocked(useBoardSocketApi);
jest.mock("./restApi.composable");
const mockedUseRestApi = jest.mocked(useBoardRestApi);

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: (key: string) => key,
			tc: (key: string) => key,
			te: (key: string) => key,
		}),
	};
});
jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useSocketApi", () => {
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mockedRestApiHandler: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedBoardStore: DeepMocked<ReturnType<typeof useBoardStore>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);

		mockedRestApiHandler = createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseRestApi.mockReturnValue(mockedRestApiHandler);

		mockedBoardStore = createMock<ReturnType<typeof useBoardStore>>();
		mockedUseBoardStore.mockReturnValue(mockedBoardStore);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	});

	it("should be defined", () => {
		expect(useSocketApi).toBeDefined();
	});

	describe("createCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { createCardRequest } = useSocketApi();

			createCardRequest({ columnId: "test" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-card-request",
				{ columnId: "test" }
			);
		});
	});

	describe("createColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { createColumnRequest } = useSocketApi();

			createColumnRequest({ boardId: "test" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-column-request",
				{ boardId: "test" }
			);
		});
	});

	describe("deleteCardRequest", () => {
		it("should call action with correct parameters", async () => {
			const { deleteCardRequest } = useSocketApi();

			await deleteCardRequest({ cardId: "test" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-card-request",
				{ cardId: "test" }
			);
		});
	});

	describe("deleteColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { deleteColumnRequest } = useSocketApi();

			deleteColumnRequest({ columnId: "test" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-column-request",
				{ columnId: "test" }
			);
		});
	});

	describe("moveCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { moveCardRequest } = useSocketApi();

			moveCardRequest({
				cardId: "test",
				toColumnId: "testColumnId",
			} as CardMove);

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-card-request",
				{ cardId: "test", toColumnId: "testColumnId" }
			);
		});
	});

	describe("moveColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { moveColumnRequest } = useSocketApi();

			moveColumnRequest({
				columnMove: {
					addedIndex: 1,
					removedIndex: 0,
					columnId: "testColumnId",
				},
				byKeyboard: false,
			});

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
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
			const { updateColumnTitleRequest } = useSocketApi();

			updateColumnTitleRequest({ columnId: "test", newTitle: "newTitle" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-column-title-request",
				{ columnId: "test", newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardTitleRequest } = useSocketApi();

			updateBoardTitleRequest({ boardId: "boardId", newTitle: "newTitle" });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-title-request",
				{ boardId: "boardId", newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardVisibilityRequest } = useSocketApi();

			updateBoardVisibilityRequest({ boardId: "boardId", isVisible: true });

			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-visibility-request",
				{ boardId: "boardId", isVisible: true }
			);
		});
	});
});
