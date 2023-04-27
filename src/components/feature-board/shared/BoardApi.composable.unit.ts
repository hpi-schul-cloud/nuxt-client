import { useBoardApi } from "./BoardApi.composable";
import * as serverApi from "../../../serverApi/v3/api";
import * as axios from "axios";
import { initializeAxios } from "@/utils/api";

jest.mock("axios");

const createColumnResponseMock = {
	id: "columnId",
	title: "columnTitle",
	cards: [],
	timestamps: {
		lastUpdatedAt: "",
		createdAt: "",
		deletedAt: "",
	},
};
const mockApi = {
	boardControllerCreateColumn: jest
		.fn()
		.mockImplementation(() => createColumnResponseMock),
	cardControllerUpdateCardTitle: jest.fn(),
	columnControllerUpdateColumnTitle: jest.fn(),
	cardControllerCreateElement: jest.fn(),
	cardControllerDeleteCard: jest.fn(),
	columnControllerDeleteColumn: jest.fn(),
	columnControllerCreateCard: jest
		.fn()
		.mockImplementation(() => ({ data: { ...createColumnResponseMock } })),
	cardControllerMoveCard: jest.fn(),
	columnControllerMoveColumn: jest.fn(),
};

jest
	.spyOn(serverApi, "BoardApiFactory")
	.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);
jest
	.spyOn(serverApi, "BoardCardApiFactory")
	.mockReturnValue(mockApi as unknown as serverApi.BoardCardApiInterface);
jest
	.spyOn(serverApi, "BoardColumnApiFactory")
	.mockReturnValue(mockApi as unknown as serverApi.BoardColumnApiInterface);

initializeAxios({
	request: async (path: string) => ({
		data: "some data",
	}),
} as axios.AxiosInstance);

describe("BoardApi.composable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("createColumnCall", () => {
		it("should call boardControllerCreateColumn api", async () => {
			const { createColumnCall } = useBoardApi();
			const BOARD_ID = "test-board-id";

			await createColumnCall(BOARD_ID);
			expect(mockApi.boardControllerCreateColumn).toHaveBeenCalledWith(
				BOARD_ID
			);
		});
	});

	describe("updateCardTitle", () => {
		it("should call cardControllerUpdateCardTitle api", async () => {
			const { updateCardTitle } = useBoardApi();
			const PAYLOAD = {
				id: "update-card-id",
				title: "update-title",
			};

			await updateCardTitle(PAYLOAD.id, PAYLOAD.title);
			expect(mockApi.cardControllerUpdateCardTitle).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ title: PAYLOAD.title }
			);
		});
	});

	describe("updateColumnTitleCall", () => {
		it("should call columnControllerUpdateColumnTitle api", async () => {
			const { updateColumnTitleCall } = useBoardApi();
			const PAYLOAD = {
				id: "update-column-id",
				title: "update-title",
			};

			await updateColumnTitleCall(PAYLOAD.id, PAYLOAD.title);
			expect(mockApi.columnControllerUpdateColumnTitle).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ title: PAYLOAD.title }
			);
		});
	});

	describe("createElement", () => {
		it("should call cardControllerCreateElement api", async () => {
			const { createElement } = useBoardApi();
			const PAYLOAD = "card-id";

			await createElement(PAYLOAD);
			expect(mockApi.cardControllerCreateElement).toHaveBeenCalledWith(PAYLOAD);
		});
	});

	describe("deleteCardCall", () => {
		it("should call cardControllerDeleteCard api", async () => {
			const { deleteCardCall } = useBoardApi();
			const PAYLOAD = "card-id";

			await deleteCardCall(PAYLOAD);
			expect(mockApi.cardControllerDeleteCard).toHaveBeenCalledWith(PAYLOAD);
		});
	});

	describe("deleteColumnCall", () => {
		it("should call columnControllerDeleteColumn api", async () => {
			const { deleteColumnCall } = useBoardApi();
			const PAYLOAD = "column-id";

			await deleteColumnCall(PAYLOAD);
			expect(mockApi.columnControllerDeleteColumn).toHaveBeenCalledWith(
				PAYLOAD
			);
		});
	});

	describe("createCardCall", () => {
		it("should call columnControllerDeleteColumn api", async () => {
			const { createCardCall } = useBoardApi();
			const PAYLOAD = "column-id";

			await createCardCall(PAYLOAD);
			expect(mockApi.columnControllerCreateCard).toHaveBeenCalledWith(PAYLOAD);
		});
	});

	describe("moveCardCall", () => {
		it("should call cardControllerMoveCard api", async () => {
			const { moveCardCall } = useBoardApi();
			const PAYLOAD = {
				cardId: "card-id",
				position: {
					toColumnId: "col-id",
					toPosition: 3,
				},
			};

			await moveCardCall(
				PAYLOAD.cardId,
				PAYLOAD.position.toColumnId,
				PAYLOAD.position.toPosition
			);
			expect(mockApi.cardControllerMoveCard).toHaveBeenCalledWith(
				PAYLOAD.cardId,
				{
					...PAYLOAD.position,
				}
			);
		});
	});

	describe("moveColumnCall", () => {
		it("should call columnControllerMoveColumn api", async () => {
			const { moveColumnCall } = useBoardApi();
			const PAYLOAD = {
				columnId: "column-id",
				position: {
					toBoardId: "board-id",
					toPosition: 3,
				},
			};

			await moveColumnCall(
				PAYLOAD.columnId,
				PAYLOAD.position.toBoardId,
				PAYLOAD.position.toPosition
			);
			expect(mockApi.columnControllerMoveColumn).toHaveBeenCalledWith(
				PAYLOAD.columnId,
				{
					...PAYLOAD.position,
				}
			);
		});
	});
});
