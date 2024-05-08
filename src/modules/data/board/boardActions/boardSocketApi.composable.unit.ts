import { useSocketApi } from "./boardSocketApi.composable";
import { useBoardSocketApi, useBoardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CardMove } from "@/types/board/DragAndDrop";
import { useBoardRestApi } from "./boardRestApi.composable";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";

jest.mock("../Board.store");
const mockedUseBoardStore = jest.mocked(useBoardStore);

jest.mock("../socket/socket");
const mockedUseSocketApi = jest.mocked(useBoardSocketApi);

jest.mock("./boardRestApi.composable");
const mockedUseBoardRestApi = jest.mocked(useBoardRestApi);

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useBoardSocketApi", () => {
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mockedBoardRestApiHandler: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedBoardStore: DeepMocked<ReturnType<typeof useBoardStore>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);

		mockedBoardRestApiHandler =
			createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiHandler);

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
