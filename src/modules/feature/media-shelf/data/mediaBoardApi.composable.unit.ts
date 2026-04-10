import { useMediaBoardApi } from "./mediaBoardApi.composable";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
	mediaExternalToolElementResponseFactory,
	mediaLineResponseFactory,
	mockApi,
	mockApiResponse,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import {
	BoardLayout,
	CollapsableBodyParams,
	ColorBodyParams,
	CreateMediaElementBodyParams,
	LayoutBodyParams,
	MediaBoardColors,
	MoveColumnBodyParams,
	MoveElementBodyParams,
	RenameBodyParams,
} from "@api-server";
import { Mocked } from "vitest";

describe("mediaBoardApi.composable", () => {
	let mediaBoardApi: Mocked<serverApi.MediaBoardApiInterface>;
	let mediaLineApi: Mocked<serverApi.MediaLineApiInterface>;
	let mediaElementApi: Mocked<serverApi.MediaElementApiInterface>;

	beforeEach(() => {
		mediaBoardApi = mockApi<serverApi.MediaBoardApiInterface>();
		mediaLineApi = mockApi<serverApi.MediaLineApiInterface>();
		mediaElementApi = mockApi<serverApi.MediaElementApiInterface>();

		vi.spyOn(serverApi, "MediaBoardApiFactory").mockReturnValue(mediaBoardApi);
		vi.spyOn(serverApi, "MediaLineApiFactory").mockReturnValue(mediaLineApi);
		vi.spyOn(serverApi, "MediaElementApiFactory").mockReturnValue(mediaElementApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getMediaBoardForUser", () => {
		const setup = () => {
			const mediaBoard = mediaBoardResponseFactory.build();

			mediaBoardApi.mediaBoardControllerGetMediaBoardForUser.mockResolvedValue(mockApiResponse({ data: mediaBoard }));

			return {
				mediaBoard,
			};
		};

		it("should call the api for the users media board", async () => {
			setup();

			await useMediaBoardApi().getMediaBoardForUser();

			expect(mediaBoardApi.mediaBoardControllerGetMediaBoardForUser).toHaveBeenCalled();
		});

		it("should return a media board", async () => {
			const { mediaBoard } = setup();

			const result = await useMediaBoardApi().getMediaBoardForUser();

			expect(result).toEqual(mediaBoard);
		});
	});

	describe("updateBoardLayout", () => {
		it("should call the api to update the media board layout", async () => {
			await useMediaBoardApi().updateBoardLayout("boardId", BoardLayout.LIST);

			expect(mediaBoardApi.mediaBoardControllerSetMediaBoardLayout).toHaveBeenCalledWith<[string, LayoutBodyParams]>(
				"boardId",
				{
					layout: BoardLayout.LIST,
				}
			);
		});
	});

	describe("getAvailableMedia", () => {
		const setup = () => {
			const boardId = "boardId";
			const availableLine = mediaAvailableLineResponseFactory.build();

			mediaBoardApi.mediaBoardControllerGetMediaAvailableLine.mockResolvedValue(
				mockApiResponse({ data: availableLine })
			);

			return {
				boardId,
				availableLine,
			};
		};

		it("should call the api for the available line", async () => {
			const { boardId } = setup();

			await useMediaBoardApi().getAvailableMedia(boardId);

			expect(mediaBoardApi.mediaBoardControllerGetMediaAvailableLine).toHaveBeenCalledWith(boardId);
		});

		it("should return an available line", async () => {
			const { boardId, availableLine } = setup();

			const result = await useMediaBoardApi().getAvailableMedia(boardId);

			expect(result).toEqual(availableLine);
		});
	});

	describe("createLine", () => {
		const setup = () => {
			const boardId = "boardId";
			const mediaLine = mediaLineResponseFactory.build();

			mediaBoardApi.mediaBoardControllerCreateLine.mockResolvedValue(mockApiResponse({ data: mediaLine }));

			return {
				boardId,
				mediaLine,
			};
		};

		it("should call the api to create a line", async () => {
			const { boardId } = setup();

			await useMediaBoardApi().createLine(boardId);

			expect(mediaBoardApi.mediaBoardControllerCreateLine).toHaveBeenCalledWith(boardId);
		});

		it("should return a line", async () => {
			const { boardId, mediaLine } = setup();

			const result = await useMediaBoardApi().createLine(boardId);

			expect(result).toEqual(mediaLine);
		});
	});

	describe("moveLine", () => {
		const setup = () => {
			const boardId = "boardId";
			const lineId = "lineId";

			return {
				boardId,
				lineId,
			};
		};

		it("should call the api to move a line", async () => {
			const { boardId, lineId } = setup();

			await useMediaBoardApi().moveLine(lineId, boardId, 1);

			expect(mediaLineApi.mediaLineControllerMoveLine).toHaveBeenCalledWith<[string, MoveColumnBodyParams]>(lineId, {
				toBoardId: boardId,
				toPosition: 1,
			});
		});
	});

	describe("updateLineTitle", () => {
		const setup = () => {
			const lineId = "lineId";
			const newTitle = "newTitle";

			return {
				lineId,
				newTitle,
			};
		};

		it("should call the api to update a line title", async () => {
			const { lineId, newTitle } = setup();

			await useMediaBoardApi().updateLineTitle(lineId, newTitle);

			expect(mediaLineApi.mediaLineControllerUpdateLineTitle).toHaveBeenCalledWith<[string, RenameBodyParams]>(lineId, {
				title: newTitle,
			});
		});
	});

	describe("updateLineColor", () => {
		it("should call the api to update the line color", async () => {
			await useMediaBoardApi().updateLineColor("lineId", MediaBoardColors.RED);

			expect(mediaLineApi.mediaLineControllerUpdateBackgroundColor).toHaveBeenCalledWith<[string, ColorBodyParams]>(
				"lineId",
				{
					backgroundColor: MediaBoardColors.RED,
				}
			);
		});
	});

	describe("updateAvailableLineColor", () => {
		it("should call the api to update the line color", async () => {
			await useMediaBoardApi().updateAvailableLineColor("boardId", MediaBoardColors.RED);

			expect(mediaBoardApi.mediaBoardControllerUpdateMediaAvailableLineColor).toHaveBeenCalledWith<
				[string, ColorBodyParams]
			>("boardId", {
				backgroundColor: MediaBoardColors.RED,
			});
		});
	});

	describe("updateLineCollapsed", () => {
		it("should call the api to update the line visibility", async () => {
			await useMediaBoardApi().updateLineCollapsed("lineId", true);

			expect(mediaLineApi.mediaLineControllerCollapseMediaLine).toHaveBeenCalledWith<[string, CollapsableBodyParams]>(
				"lineId",
				{
					collapsed: true,
				}
			);
		});
	});

	describe("updateAvailableLineCollapsed", () => {
		it("should call the api to update the line visibility", async () => {
			await useMediaBoardApi().updateAvailableLineCollapsed("boardId", true);

			expect(mediaBoardApi.mediaBoardControllerCollapseMediaAvailableLine).toHaveBeenCalledWith<
				[string, CollapsableBodyParams]
			>("boardId", {
				collapsed: true,
			});
		});
	});

	describe("deleteLine", () => {
		const setup = () => {
			const lineId = "lineId";

			return {
				lineId,
			};
		};

		it("should call the api to delete a line", async () => {
			const { lineId } = setup();

			await useMediaBoardApi().deleteLine(lineId);

			expect(mediaLineApi.mediaLineControllerDeleteLine).toHaveBeenCalledWith(lineId);
		});
	});

	describe("createElement", () => {
		const setup = () => {
			const lineId = "boardId";
			const schoolExternalToolId = "schoolExternalToolId";
			const mediaElement = mediaExternalToolElementResponseFactory.build();

			mediaElementApi.mediaElementControllerCreateElement.mockResolvedValue(mockApiResponse({ data: mediaElement }));

			return {
				lineId,
				schoolExternalToolId,
				mediaElement,
			};
		};

		it("should call the api to create an element", async () => {
			const { lineId, schoolExternalToolId } = setup();

			await useMediaBoardApi().createElement(lineId, 1, schoolExternalToolId);

			expect(mediaElementApi.mediaElementControllerCreateElement).toHaveBeenCalledWith<[CreateMediaElementBodyParams]>({
				lineId,
				position: 1,
				schoolExternalToolId,
			});
		});

		it("should return an element", async () => {
			const { lineId, schoolExternalToolId, mediaElement } = setup();

			const result = await useMediaBoardApi().createElement(lineId, 0, schoolExternalToolId);

			expect(result).toEqual(mediaElement);
		});
	});

	describe("moveElement", () => {
		const setup = () => {
			const elementId = "elementId";
			const lineId = "lineId";

			return {
				elementId,
				lineId,
			};
		};

		it("should call the api to move an element", async () => {
			const { elementId, lineId } = setup();

			await useMediaBoardApi().moveElement(elementId, lineId, 1);

			expect(mediaElementApi.mediaElementControllerMoveElement).toHaveBeenCalledWith<[string, MoveElementBodyParams]>(
				elementId,
				{
					toLineId: lineId,
					toPosition: 1,
				}
			);
		});
	});

	describe("deleteElement", () => {
		const setup = () => {
			const elementId = "elementId";

			return {
				elementId,
			};
		};

		it("should call the api to delete an element", async () => {
			const { elementId } = setup();

			await useMediaBoardApi().deleteElement(elementId);

			expect(mediaElementApi.mediaElementControllerDeleteElement).toHaveBeenCalledWith(elementId);
		});
	});
});
