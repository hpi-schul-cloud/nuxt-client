import { useBoardApi } from "./BoardApi.composable";
import { AnyContentElement } from "@/types/board/ContentElement";
import { mockApi } from "@@/tests/test-utils";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import * as serverApi from "@api-server";
import {
	ContentElementType,
	DrawingElementResponse,
	ExternalToolElementResponse,
	H5pElementResponse,
} from "@api-server";
import { ApplicationError } from "@data-app";
import { Mocked } from "vitest";

let boardApi: Mocked<serverApi.BoardApiInterface>;
let cardApi: Mocked<serverApi.BoardCardApiInterface>;
let elementApi: Mocked<serverApi.BoardElementApiInterface>;
let roomsApi: Mocked<serverApi.CourseRoomsApiInterface>;

describe("BoardApi.composable", () => {
	beforeEach(() => {
		boardApi = mockApi<serverApi.BoardApiInterface>();
		cardApi = mockApi<serverApi.BoardCardApiInterface>();
		elementApi = mockApi<serverApi.BoardElementApiInterface>();
		roomsApi = mockApi<serverApi.CourseRoomsApiInterface>();

		vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);
		vi.spyOn(serverApi, "BoardCardApiFactory").mockReturnValue(cardApi);
		vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(elementApi);
		vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(roomsApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchBoardCall", () => {
		it("should call boardControllerGetBoardSkeleton api", async () => {
			const { fetchBoardCall } = useBoardApi();
			const boardId = "test-board-id";

			await fetchBoardCall(boardId);

			expect(boardApi.boardControllerGetBoardSkeleton).toHaveBeenCalledWith(boardId);
		});

		it("should throw an application error on failure", async () => {
			const { fetchBoardCall } = useBoardApi();
			const boardId = "test-board-id";

			boardApi.boardControllerGetBoardSkeleton.mockRejectedValue(new Error());

			await expect(fetchBoardCall(boardId)).rejects.toThrow(ApplicationError);
		});
	});

	describe("updateElementTitleCall", () => {
		it("should call elementControllerUpdateElement api with RichtTextElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "richt-text-element-id",
				type: ContentElementType.RICH_TEXT,
				content: {
					text: "content-text",
					inputFormat: "input-format",
				},

				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.RICH_TEXT,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with FileElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "file-element-id",
				type: ContentElementType.FILE,
				content: {
					caption: "caption",
					alternativeText: "alternative text",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.FILE,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with FileFolderElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload = {
				id: "file-folder-element-id",
				type: ContentElementType.FILE_FOLDER,
				content: {
					title: "New Folder",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.FILE_FOLDER,
			};

			await updateElementCall(payload);
			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with ExternalToolElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: ExternalToolElementResponse = {
				id: "external-tool-element-id",
				type: ContentElementType.EXTERNAL_TOOL,
				content: {
					contextExternalToolId: "context-external-tool-id",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.EXTERNAL_TOOL,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with DrawingToolElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: DrawingElementResponse = {
				id: "drawing-tool-element-id",
				type: ContentElementType.DRAWING,
				content: {
					description: "Some description",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.DRAWING,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with VideoConferenceElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: serverApi.VideoConferenceElementResponse = {
				id: "video-conference-element-id",
				type: ContentElementType.VIDEO_CONFERENCE,
				content: {
					title: "Some title",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.VIDEO_CONFERENCE,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
		});

		it("should call elementControllerUpdateElement api with H5pElement", async () => {
			const { updateElementCall } = useBoardApi();
			const payload: H5pElementResponse = {
				id: "external-tool-element-id",
				type: ContentElementType.H5P,
				content: {
					contentId: "context-external-tool-id",
				},
				timestamps: timestampsResponseFactory.build(),
			};
			const data = {
				content: payload.content,
				type: ContentElementType.H5P,
			};

			await updateElementCall(payload);

			expect(elementApi.elementControllerUpdateElement).toHaveBeenCalledWith(payload.id, { data });
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
				type: ContentElementType.RICH_TEXT,
			});
			expect(cardApi.cardControllerCreateElement).toHaveBeenCalledWith(payload, { type: ContentElementType.RICH_TEXT });
		});
	});

	describe("getContextInfo", () => {
		it("should call boardControllerGetBoardContext api", async () => {
			const { getContextInfo } = useBoardApi();
			const payload = {
				boardId: "myid123",
			};

			await getContextInfo(payload.boardId);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(payload.boardId);
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

			boardApi.boardControllerGetBoardContext = vi.fn().mockResolvedValueOnce(FAKE_RESPONSE);

			await getContextInfo(FAKE_BOARD_ID);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(FAKE_BOARD_ID);

			expect(roomsApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalledWith(FAKE_RESPONSE.data.id);
		});

		it("should return id and name of the parent course/room", async () => {
			const { getContextInfo } = useBoardApi();

			const FAKE_BOARD_ID = "MY_BOARD_ID123";
			const FAKE_CONTEXT_RESPONSE = {
				status: 200,
				data: {
					id: "someid",
					type: "course",
				},
			};

			const FAKE_ROOM_RESPONSE = {
				status: 200,
				data: {
					roomId: "abc123",
					title: "my greate course",
				},
			};

			boardApi.boardControllerGetBoardContext = vi.fn().mockResolvedValueOnce(FAKE_CONTEXT_RESPONSE);
			roomsApi.courseRoomsControllerGetRoomBoard = vi.fn().mockResolvedValueOnce(FAKE_ROOM_RESPONSE);

			const result = await getContextInfo(FAKE_BOARD_ID);

			expect(boardApi.boardControllerGetBoardContext).toHaveBeenCalledWith(FAKE_BOARD_ID);

			expect(roomsApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalledWith(FAKE_CONTEXT_RESPONSE.data.id);

			expect(result).toEqual(
				expect.objectContaining({
					id: FAKE_CONTEXT_RESPONSE.data.id,
					type: FAKE_CONTEXT_RESPONSE.data.type,
					name: FAKE_ROOM_RESPONSE.data.title,
				})
			);
		});
	});

	describe("getElementWithParentHierarchyCall", () => {
		it("should call elementControllerGetElementWithParentHierarchy api", async () => {
			const { getElementWithParentHierarchyCall } = useBoardApi();

			await getElementWithParentHierarchyCall("element-id");

			expect(elementApi.elementControllerGetElementWithParentHierarchy).toHaveBeenCalledWith("element-id");
		});
	});
});
