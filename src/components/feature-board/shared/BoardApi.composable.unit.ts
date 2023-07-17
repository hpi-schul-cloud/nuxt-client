import { ContentElementType } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { ApplicationError } from "@/store/types/application-error";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AnyContentElement } from "../types/ContentElement";
import { useBoardApi } from "./BoardApi.composable";

let boardApi: DeepMocked<serverApi.BoardApiInterface>;
let columnApi: DeepMocked<serverApi.BoardColumnApiInterface>;
let cardApi: DeepMocked<serverApi.BoardCardApiInterface>;
let elementApi: DeepMocked<serverApi.BoardElementApiInterface>;

describe("BoardApi.composable", () => {
	beforeEach(() => {
		boardApi = createMock<serverApi.BoardApiInterface>();
		columnApi = createMock<serverApi.BoardColumnApiInterface>();
		cardApi = createMock<serverApi.BoardCardApiInterface>();
		elementApi = createMock<serverApi.BoardElementApiInterface>();

		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);
		jest.spyOn(serverApi, "BoardColumnApiFactory").mockReturnValue(columnApi);
		jest.spyOn(serverApi, "BoardCardApiFactory").mockReturnValue(cardApi);
		jest.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(elementApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("createColumnCall", () => {
		it("should call boardControllerCreateColumn api", async () => {
			const { createColumnCall } = useBoardApi();
			const boardId = "test-board-id";

			await createColumnCall(boardId);
			expect(boardApi.boardControllerCreateColumn).toHaveBeenCalledWith(
				boardId
			);
		});
	});

	describe("fetchBoardCall", () => {
		it("should call boardControllerGetBoardSkeleton api", async () => {
			const { fetchBoardCall } = useBoardApi();
			const boardId = "test-board-id";

			await fetchBoardCall(boardId);

			expect(boardApi.boardControllerGetBoardSkeleton).toHaveBeenCalledWith(
				boardId
			);
		});

		it("should throw an application error on failure", async () => {
			const { fetchBoardCall } = useBoardApi();
			const boardId = "test-board-id";

			boardApi.boardControllerGetBoardSkeleton.mockRejectedValue(new Error());

			await expect(fetchBoardCall(boardId)).rejects.toThrow(ApplicationError);
		});
	});

	describe("updateCardHeight", () => {
		it("should call cardControllerUpdateCardHeight api", async () => {
			const { updateCardHeightCall } = useBoardApi();
			const PAYLOAD = {
				id: "update-card-id",
				height: 200,
			};

			await updateCardHeightCall(PAYLOAD.id, PAYLOAD.height);
			expect(cardApi.cardControllerUpdateCardHeight).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ height: PAYLOAD.height }
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
			expect(cardApi.cardControllerUpdateCardTitle).toHaveBeenCalledWith(
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
			expect(columnApi.columnControllerUpdateColumnTitle).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ title: PAYLOAD.title }
			);
		});
	});

	describe("updateElementTitleCall", () => {
		it("should call elementControllerUpdateElement api with RichtTextElement", async () => {
			const { updateElementCall } = useBoardApi();
			const PAYLOAD = {
				id: "richt-text-element-id",
				type: ContentElementType.RichText,
				content: {
					text: "content-text",
					inputFormat: "input-format",
				},

				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: PAYLOAD.content,
				type: ContentElementType.RichText,
			};

			await updateElementCall(PAYLOAD);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ data }
			);
		});

		it("should call elementControllerUpdateElement api with FileElement", async () => {
			const { updateElementCall } = useBoardApi();
			const PAYLOAD = {
				id: "file-element-id",
				type: ContentElementType.File,
				content: {
					caption: "caption",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: PAYLOAD.content,
				type: ContentElementType.File,
			};

			await updateElementCall(PAYLOAD);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				PAYLOAD.id,
				{ data }
			);
		});

		it("should throw error for unkown element type", async () => {
			const { updateElementCall } = useBoardApi();
			const PAYLOAD = {
				type: "unkown" as ContentElementType,
			} as AnyContentElement;

			await expect(updateElementCall(PAYLOAD)).rejects.toThrow(
				new Error("element.type mapping is undefined for updateElementCall")
			);
		});
	});

	describe("createElementCall", () => {
		it("should call cardControllerCreateElement api", async () => {
			const { createElementCall } = useBoardApi();
			const PAYLOAD = "card-id";

			await createElementCall(PAYLOAD, {
				type: ContentElementType.RichText,
			});
			expect(cardApi.cardControllerCreateElement).toHaveBeenCalledWith(
				PAYLOAD,
				{ type: ContentElementType.RichText }
			);
		});
	});

	describe("deleteCardCall", () => {
		it("should call cardControllerDeleteCard api", async () => {
			const { deleteCardCall } = useBoardApi();
			const PAYLOAD = "card-id";

			await deleteCardCall(PAYLOAD);
			expect(cardApi.cardControllerDeleteCard).toHaveBeenCalledWith(PAYLOAD);
		});
	});

	describe("deleteColumnCall", () => {
		it("should call columnControllerDeleteColumn api", async () => {
			const { deleteColumnCall } = useBoardApi();
			const PAYLOAD = "column-id";

			await deleteColumnCall(PAYLOAD);
			expect(columnApi.columnControllerDeleteColumn).toHaveBeenCalledWith(
				PAYLOAD
			);
		});
	});

	describe("deleteElementCall", () => {
		it("should call elementControllerDeleteElement api", async () => {
			const { deleteElementCall } = useBoardApi();
			const PAYLOAD = "element-id";

			await deleteElementCall(PAYLOAD);
			expect(elementApi.elementControllerDeleteElement).toHaveBeenCalledWith(
				PAYLOAD
			);
		});
	});

	describe("createCardCall", () => {
		it("should call columnControllerCreateCard api", async () => {
			const { createCardCall } = useBoardApi();
			const PAYLOAD = "column-id";
			const INITIAL_ELEMENTS = {
				requiredEmptyElements: [
					serverApi.CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
				],
			};

			await createCardCall(PAYLOAD);
			expect(columnApi.columnControllerCreateCard).toHaveBeenCalledWith(
				PAYLOAD,
				INITIAL_ELEMENTS
			);
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
			expect(cardApi.cardControllerMoveCard).toHaveBeenCalledWith(
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
			expect(columnApi.columnControllerMoveColumn).toHaveBeenCalledWith(
				PAYLOAD.columnId,
				{
					...PAYLOAD.position,
				}
			);
		});
	});

	describe("moveElementCall", () => {
		it("should call elementControllerMoveElement api", async () => {
			const { moveElementCall } = useBoardApi();
			const PAYLOAD = {
				elementId: "element-id",
				position: {
					toCardId: "card-id",
					toPosition: 3,
				},
			};

			await moveElementCall(
				PAYLOAD.elementId,
				PAYLOAD.position.toCardId,
				PAYLOAD.position.toPosition
			);
			expect(elementApi.elementControllerMoveElement).toHaveBeenCalledWith(
				PAYLOAD.elementId,
				{
					...PAYLOAD.position,
				}
			);
		});
	});
});
