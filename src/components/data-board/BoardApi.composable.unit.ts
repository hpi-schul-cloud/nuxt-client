import { ContentElementType } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { CardResponse } from "@/serverApi/v3/api";
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
					alternativeText: "alternative text",
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

		it("should call elementControllerUpdateElement api with SubmissionContainerElement", async () => {
			const { updateElementCall } = useBoardApi();
			const PAYLOAD = {
				id: "file-element-id",
				type: ContentElementType.SubmissionContainer,
				content: {
					dueDate: new Date().toISOString(),
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: PAYLOAD.content,
				type: ContentElementType.SubmissionContainer,
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

			const FAKE_RESPONSE = {
				status: 200,
				data: {
					id: "my-little-fake-id",
				},
			};

			columnApi.columnControllerCreateCard.mockResolvedValueOnce(
				FAKE_RESPONSE as unknown as AxiosPromise<CardResponse>
			);

			const PAYLOAD = "column-id";
			const INITIAL_ELEMENTS = {
				requiredEmptyElements: [
					serverApi.CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
				],
			};

			const result = await createCardCall(PAYLOAD);

			expect(columnApi.columnControllerCreateCard).toHaveBeenCalledWith(
				PAYLOAD,
				INITIAL_ELEMENTS
			);

			expect(result).toBe(FAKE_RESPONSE.data);
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

	describe("getContextInfo", () => {
		it("should call boardControllerGetBoardContext api", async () => {
			const { getContextInfo } = useBoardApi();
			const PAYLOAD = {
				boardId: "myid123",
			};

			await getContextInfo(PAYLOAD.boardId);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(
				PAYLOAD.boardId
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
