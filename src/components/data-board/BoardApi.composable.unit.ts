import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { CardResponse, DrawingElementResponse } from "@/serverApi/v3/api";
import { ApplicationError } from "@/store/types/application-error";
import { AnyContentElement } from "@/types/board/ContentElement";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosPromise } from "axios";
import { useBoardApi } from "./BoardApi.composable";

let boardApi: DeepMocked<serverApi.BoardApiInterface>;
let columnApi: DeepMocked<serverApi.BoardColumnApiInterface>;
let cardApi: DeepMocked<serverApi.BoardCardApiInterface>;
let elementApi: DeepMocked<serverApi.BoardElementApiInterface>;
let roomsApi: DeepMocked<serverApi.RoomsApiInterface>;

describe("BoardApi.composable", () => {
	beforeEach(() => {
		boardApi = createMock<serverApi.BoardApiInterface>();
		columnApi = createMock<serverApi.BoardColumnApiInterface>();
		cardApi = createMock<serverApi.BoardCardApiInterface>();
		elementApi = createMock<serverApi.BoardElementApiInterface>();
		roomsApi = createMock<serverApi.RoomsApiInterface>();

		jest.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);
		jest.spyOn(serverApi, "BoardColumnApiFactory").mockReturnValue(columnApi);
		jest.spyOn(serverApi, "BoardCardApiFactory").mockReturnValue(cardApi);
		jest.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(elementApi);
		jest.spyOn(serverApi, "RoomsApiFactory").mockReturnValue(roomsApi);
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
			const payload = {
				id: "update-card-id",
				height: 200,
			};

			await updateCardHeightCall(payload.id, payload.height);
			expect(cardApi.cardControllerUpdateCardHeight).toHaveBeenCalledWith(
				payload.id,
				{ height: payload.height }
			);
		});
	});

	describe("updateCardTitle", () => {
		it("should call cardControllerUpdateCardTitle api", async () => {
			const { updateCardTitle } = useBoardApi();
			const payload = {
				id: "update-card-id",
				title: "update-title",
			};

			await updateCardTitle(payload.id, payload.title);
			expect(cardApi.cardControllerUpdateCardTitle).toHaveBeenCalledWith(
				payload.id,
				{ title: payload.title }
			);
		});
	});

	describe("updateColumnTitleCall", () => {
		it("should call columnControllerUpdateColumnTitle api", async () => {
			const { updateColumnTitleCall } = useBoardApi();
			const payload = {
				id: "update-column-id",
				title: "update-title",
			};

			await updateColumnTitleCall(payload.id, payload.title);
			expect(columnApi.columnControllerUpdateColumnTitle).toHaveBeenCalledWith(
				payload.id,
				{ title: payload.title }
			);
		});
	});

	describe("updateElementTitleCall", () => {
		it("should call elementControllerUpdateElement api with RichtTextElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "richt-text-element-id",
				type: ContentElementType.RichText,
				content: {
					text: "content-text",
					inputFormat: "input-format",
				},

				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.RichText,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				payload.id,
				{ data }
			);
		});

		it("should call elementControllerUpdateElement api with FileElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "file-element-id",
				type: ContentElementType.File,
				content: {
					caption: "caption",
					alternativeText: "alternative text",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.File,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				payload.id,
				{ data }
			);
		});

		it("should call elementControllerUpdateElement api with SubmissionContainerElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "file-element-id",
				type: ContentElementType.SubmissionContainer,
				content: {
					dueDate: new Date().toISOString(),
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.SubmissionContainer,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				payload.id,
				{ data }
			);
		});

		it("should call elementControllerUpdateElement api with ExternalToolElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: ExternalToolElementResponse = {
				id: "external-tool-element-id",
				type: ContentElementType.ExternalTool,
				content: {
					contextExternalToolId: "context-external-tool-id",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.ExternalTool,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				payload.id,
				{ data }
			);
		});

		it("should call elementControllerUpdateElement api with DrawingToolElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: DrawingElementResponse = {
				id: "drawing-tool-element-id",
				type: ContentElementType.Drawing,
				content: {
					description: "Some description",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.Drawing,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(
				payload.id,
				{ data }
			);
		});

		it("should throw error for unkown element type", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				type: "unkown" as ContentElementType,
			} as AnyContentElement;

			await expect(updateElementCall(payload)).rejects.toThrow(
				new Error("element.type mapping is undefined for updateElementCall")
			);
		});
	});

	describe("createElementCall", () => {
		it("should call cardControllerCreateElement api", async () => {
			const { createElementCall } = useBoardApi();
			const payload = "card-id";

			await createElementCall(payload, {
				type: ContentElementType.RichText,
			});
			expect(cardApi.cardControllerCreateElement).toHaveBeenCalledWith(
				payload,
				{ type: ContentElementType.RichText }
			);
		});
	});

	describe("deleteCardCall", () => {
		it("should call cardControllerDeleteCard api", async () => {
			const { deleteCardCall } = useBoardApi();
			const payload = "card-id";

			await deleteCardCall(payload);
			expect(cardApi.cardControllerDeleteCard).toHaveBeenCalledWith(payload);
		});
	});

	describe("deleteColumnCall", () => {
		it("should call columnControllerDeleteColumn api", async () => {
			const { deleteColumnCall } = useBoardApi();
			const payload = "column-id";

			await deleteColumnCall(payload);
			expect(columnApi.columnControllerDeleteColumn).toHaveBeenCalledWith(
				payload
			);
		});
	});

	describe("deleteElementCall", () => {
		it("should call elementControllerDeleteElement api", async () => {
			const { deleteElementCall } = useBoardApi();
			const payload = "element-id";

			await deleteElementCall(payload);
			expect(elementApi.elementControllerDeleteElement).toHaveBeenCalledWith(
				payload
			);
		});
	});

	describe("createCardCall", () => {
		it("should call columnControllerCreateCard api", async () => {
			const { createCardCall } = useBoardApi();

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					id: "my-little-fake-id",
				},
			};

			columnApi.columnControllerCreateCard.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<CardResponse>
			);

			const payload = "column-id";
			const INITIAL_ELEMENTS = {
				requiredEmptyElements: [
					serverApi.CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
				],
			};

			const result = await createCardCall(payload);

			expect(columnApi.columnControllerCreateCard).toHaveBeenCalledWith(
				payload,
				INITIAL_ELEMENTS
			);

			expect(result).toBe(FAKE_RESPONSE.data);
		});
	});

	describe("moveCardCall", () => {
		it("should call cardControllerMoveCard api", async () => {
			const { moveCardCall } = useBoardApi();
			const payload = {
				cardId: "card-id",
				position: {
					toColumnId: "col-id",
					toPosition: 3,
				},
			};

			await moveCardCall(
				payload.cardId,
				payload.position.toColumnId,
				payload.position.toPosition
			);
			expect(cardApi.cardControllerMoveCard).toHaveBeenCalledWith(
				payload.cardId,
				{
					...payload.position,
				}
			);
		});
	});

	describe("moveColumnCall", () => {
		it("should call columnControllerMoveColumn api", async () => {
			const { moveColumnCall } = useBoardApi();
			const payload = {
				columnId: "column-id",
				position: {
					toBoardId: "board-id",
					toPosition: 3,
				},
			};

			await moveColumnCall(
				payload.columnId,
				payload.position.toBoardId,
				payload.position.toPosition
			);
			expect(columnApi.columnControllerMoveColumn).toHaveBeenCalledWith(
				payload.columnId,
				{
					...payload.position,
				}
			);
		});
	});

	describe("moveElementCall", () => {
		it("should call elementControllerMoveElement api", async () => {
			const { moveElementCall } = useBoardApi();
			const payload = {
				elementId: "element-id",
				position: {
					toCardId: "card-id",
					toPosition: 3,
				},
			};

			await moveElementCall(
				payload.elementId,
				payload.position.toCardId,
				payload.position.toPosition
			);
			expect(elementApi.elementControllerMoveElement).toHaveBeenCalledWith(
				payload.elementId,
				{
					...payload.position,
				}
			);
		});
	});

	describe("getContextInfo", () => {
		it("should call boardControllerGetBoardContext api", async () => {
			const { getContextInfo } = useBoardApi();
			const payload = {
				boardId: "myid123",
			};

			await getContextInfo(payload.boardId);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(
				payload.boardId
			);
		});

		it("should call roomsControllerGetRoomBoard api", async () => {
			const { getContextInfo } = useBoardApi();

			const FAKE_BOARD_ID = "MY_BOARD_ID123";
			const FAKE_RESPONSE = {
				status: 200,
				data: {
					id: "abc123",
				},
			};

			boardApi.boardControllerGetBoardContext = jest
				.fn()
				.mockResolvedValueOnce(FAKE_RESPONSE);

			await getContextInfo(FAKE_BOARD_ID);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(
				FAKE_BOARD_ID
			);

			expect(roomsApi.roomsControllerGetRoomBoard).toHaveBeenCalledWith(
				FAKE_RESPONSE.data.id
			);
		});

		it("should return id and name of the parent course/room", async () => {
			const { getContextInfo } = useBoardApi();

			const FAKE_BOARD_ID = "MY_BOARD_ID123";
			const FAKE_RESPONSE = {
				status: 200,
				data: {
					id: "someid",
				},
			};

			const FAKE_ROOM_RESPONSE = {
				status: 200,
				data: {
					roomId: "abc123",
					title: "my greate course",
				},
			};

			boardApi.boardControllerGetBoardContext = jest
				.fn()
				.mockResolvedValueOnce(FAKE_RESPONSE);
			roomsApi.roomsControllerGetRoomBoard = jest
				.fn()
				.mockResolvedValueOnce(FAKE_ROOM_RESPONSE);

			const result = await getContextInfo(FAKE_BOARD_ID);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(
				FAKE_BOARD_ID
			);

			expect(roomsApi.roomsControllerGetRoomBoard).toHaveBeenCalledWith(
				FAKE_RESPONSE.data.id
			);

			expect(result).toEqual(
				expect.objectContaining({
					id: FAKE_ROOM_RESPONSE.data.roomId,
					name: FAKE_ROOM_RESPONSE.data.title,
				})
			);
		});
	});
});
