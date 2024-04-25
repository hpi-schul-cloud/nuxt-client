import { useSocketApi } from "./socketApi";
import { useBoardSocketApi, useBoardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CardMove } from "@/types/board/DragAndDrop";
import { useBoardRestApi } from "./restApi";

jest.mock("../BoardStore");
const mockedUseBoardStore = jest.mocked(useBoardStore);

jest.mock("../socket/socket");
const mockedUseSocketApi = jest.mocked(useBoardSocketApi);
jest.mock("./restApi");
const mockedUseRestApi = jest.mocked(useBoardRestApi);

describe("useSocketApi", () => {
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mockedRestApiHandler: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedBoardStore: DeepMocked<ReturnType<typeof useBoardStore>>;

	beforeEach(() => {
		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);
		mockedRestApiHandler = createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseRestApi.mockReturnValue(mockedRestApiHandler);
		mockedBoardStore = createMock<ReturnType<typeof useBoardStore>>();
		mockedUseBoardStore.mockReturnValue(mockedBoardStore);
	});
	it("should be defined", () => {
		expect(useSocketApi).toBeDefined();
	});

	describe("createCardRequest", () => {
		it("should call action with correct parameters", () => {
			const { createCardRequest } = useSocketApi();
			createCardRequest({
				type: "create-card-request",
				payload: { columnId: "test" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-card-request",
				{ columnId: "test" }
			);
		});
	});

	describe("createColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { createColumnRequest } = useSocketApi();
			createColumnRequest({
				type: "create-column-request",
				payload: { columnId: "test" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-column-request",
				{ columnId: "test" }
			);
		});
	});

	describe("deleteCardRequest", () => {
		it("should call action with correct parameters", async () => {
			const { deleteCardRequest } = useSocketApi();
			await deleteCardRequest({
				type: "delete-card-request",
				payload: { cardId: "test" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-card-request",
				{ cardId: "test" }
			);
		});
	});

	describe("deleteColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { deleteColumnRequest } = useSocketApi();
			deleteColumnRequest({
				type: "delete-column-request",
				payload: { columnId: "test" },
			});
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
				type: "move-card-request",
				payload: { cardId: "test" } as CardMove,
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-card-request",
				{ cardId: "test" }
			);
		});
	});

	describe("moveColumnRequest", () => {
		it("should call action with correct parameters", () => {
			const { moveColumnRequest } = useSocketApi();
			moveColumnRequest({
				type: "move-column-request",
				payload: {
					columnMove: {
						addedIndex: 1,
						removedIndex: 0,
						columnId: "testColumnId",
					},
					byKeyboard: false,
				},
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
			updateColumnTitleRequest({
				type: "update-column-title-request",
				payload: { columnId: "test", newTitle: "newTitle" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-column-title-request",
				{ columnId: "test", newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardTitleRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardTitleRequest } = useSocketApi();
			updateBoardTitleRequest({
				type: "update-board-title-request",
				payload: { newTitle: "newTitle" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-title-request",
				{ newTitle: "newTitle" }
			);
		});
	});

	describe("updateBoardVisibilityRequest", () => {
		it("should call action with correct parameters", () => {
			const { updateBoardVisibilityRequest } = useSocketApi();
			updateBoardVisibilityRequest({
				type: "update-board-visibility-request",
				payload: { newVisibility: true },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-board-visibility-request",
				{ newVisibility: true }
			);
		});
	});

	describe("reloadBoard", () => {
		it("should call action with correct parameters", () => {
			const { reloadBoard } = useSocketApi();
			reloadBoard({
				type: "reload-board-request",
				payload: { id: "test" },
			});
			expect(mockedSocketApiHandler.emitOnSocket).toHaveBeenCalledWith(
				"reload-board-request",
				{ id: "test" }
			);
		});
	});

	describe("reloadBoardSuccess", () => {
		it("should call action with correct parameters", () => {
			const { reloadBoardSuccess } = useSocketApi();
			reloadBoardSuccess({
				type: "reload-board-success",
				payload: { id: "test" },
			});
			expect(mockedBoardStore.dispatch).toHaveBeenCalledWith({
				type: "fetch-board-request",
				payload: { id: "test" },
			});
		});
	});
});
