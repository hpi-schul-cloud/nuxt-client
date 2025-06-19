import * as serverApi from "@/serverApi/v3/api";
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
} from "@/serverApi/v3/api";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
	mediaExternalToolElementResponseFactory,
	mediaLineResponseFactory,
	mockApiResponse,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useMediaBoardApi } from "./mediaBoardApi.composable";

describe("mediaBoardApi.composable", () => {
	let mediaBoardApi: DeepMocked<serverApi.MediaBoardApiInterface>;
	let mediaLineApi: DeepMocked<serverApi.MediaLineApiInterface>;
	let mediaElementApi: DeepMocked<serverApi.MediaElementApiInterface>;

	beforeEach(() => {
		mediaBoardApi = createMock<serverApi.MediaBoardApiInterface>();
		mediaLineApi = createMock<serverApi.MediaLineApiInterface>();
		mediaElementApi = createMock<serverApi.MediaElementApiInterface>();

		vi.spyOn(serverApi, "MediaBoardApiFactory").mockReturnValue(mediaBoardApi);
		vi.spyOn(serverApi, "MediaLineApiFactory").mockReturnValue(mediaLineApi);
		vi.spyOn(serverApi, "MediaElementApiFactory").mockReturnValue(
			mediaElementApi
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getMediaBoardForUser", () => {
		const setup = () => {
			const mediaBoard = mediaBoardResponseFactory.build();

			mediaBoardApi.mediaBoardControllerGetMediaBoardForUser.mockResolvedValue(
				mockApiResponse({ data: mediaBoard })
			);

			return {
				mediaBoard,
			};
		};

		it("should call the api for the users media board", async () => {
			setup();

			await useMediaBoardApi().getMediaBoardForUser();

			expect(
				mediaBoardApi.mediaBoardControllerGetMediaBoardForUser
			).toHaveBeenCalled();
		});

		it("should return a media board", async () => {
			const { mediaBoard } = setup();

			const result = await useMediaBoardApi().getMediaBoardForUser();

			expect(result).toEqual(mediaBoard);
		});
	});

	describe("updateBoardLayout", () => {
		it("should call the api to update the media board layout", async () => {
			await useMediaBoardApi().updateBoardLayout("boardId", BoardLayout.List);

			expect(
				mediaBoardApi.mediaBoardControllerSetMediaBoardLayout
			).toHaveBeenCalledWith<[string, LayoutBodyParams]>("boardId", {
				layout: BoardLayout.List,
			});
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

			expect(
				mediaBoardApi.mediaBoardControllerGetMediaAvailableLine
			).toHaveBeenCalledWith(boardId);
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

			mediaBoardApi.mediaBoardControllerCreateLine.mockResolvedValue(
				mockApiResponse({ data: mediaLine })
			);

			return {
				boardId,
				mediaLine,
			};
		};

		it("should call the api to create a line", async () => {
			const { boardId } = setup();

			await useMediaBoardApi().createLine(boardId);

			expect(mediaBoardApi.mediaBoardControllerCreateLine).toHaveBeenCalledWith(
				boardId
			);
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

			expect(mediaLineApi.mediaLineControllerMoveLine).toHaveBeenCalledWith<
				[string, MoveColumnBodyParams]
			>(lineId, {
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

			expect(
				mediaLineApi.mediaLineControllerUpdateLineTitle
			).toHaveBeenCalledWith<[string, RenameBodyParams]>(lineId, {
				title: newTitle,
			});
		});
	});

	describe("updateLineColor", () => {
		it("should call the api to update the line color", async () => {
			await useMediaBoardApi().updateLineColor("lineId", MediaBoardColors.Red);

			expect(
				mediaLineApi.mediaLineControllerUpdateBackgroundColor
			).toHaveBeenCalledWith<[string, ColorBodyParams]>("lineId", {
				backgroundColor: MediaBoardColors.Red,
			});
		});
	});

	describe("updateAvailableLineColor", () => {
		it("should call the api to update the line color", async () => {
			await useMediaBoardApi().updateAvailableLineColor(
				"boardId",
				MediaBoardColors.Red
			);

			expect(
				mediaBoardApi.mediaBoardControllerUpdateMediaAvailableLineColor
			).toHaveBeenCalledWith<[string, ColorBodyParams]>("boardId", {
				backgroundColor: MediaBoardColors.Red,
			});
		});
	});

	describe("updateLineCollapsed", () => {
		it("should call the api to update the line visibility", async () => {
			await useMediaBoardApi().updateLineCollapsed("lineId", true);

			expect(
				mediaLineApi.mediaLineControllerCollapseMediaLine
			).toHaveBeenCalledWith<[string, CollapsableBodyParams]>("lineId", {
				collapsed: true,
			});
		});
	});

	describe("updateAvailableLineCollapsed", () => {
		it("should call the api to update the line visibility", async () => {
			await useMediaBoardApi().updateAvailableLineCollapsed("boardId", true);

			expect(
				mediaBoardApi.mediaBoardControllerCollapseMediaAvailableLine
			).toHaveBeenCalledWith<[string, CollapsableBodyParams]>("boardId", {
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

			expect(mediaLineApi.mediaLineControllerDeleteLine).toHaveBeenCalledWith(
				lineId
			);
		});
	});

	describe("createElement", () => {
		const setup = () => {
			const lineId = "boardId";
			const schoolExternalToolId = "schoolExternalToolId";
			const mediaElement = mediaExternalToolElementResponseFactory.build();

			mediaElementApi.mediaElementControllerCreateElement.mockResolvedValue(
				mockApiResponse({ data: mediaElement })
			);

			return {
				lineId,
				schoolExternalToolId,
				mediaElement,
			};
		};

		it("should call the api to create an element", async () => {
			const { lineId, schoolExternalToolId } = setup();

			await useMediaBoardApi().createElement(lineId, 1, schoolExternalToolId);

			expect(
				mediaElementApi.mediaElementControllerCreateElement
			).toHaveBeenCalledWith<[CreateMediaElementBodyParams]>({
				lineId,
				position: 1,
				schoolExternalToolId,
			});
		});

		it("should return an element", async () => {
			const { lineId, schoolExternalToolId, mediaElement } = setup();

			const result = await useMediaBoardApi().createElement(
				lineId,
				0,
				schoolExternalToolId
			);

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

			expect(
				mediaElementApi.mediaElementControllerMoveElement
			).toHaveBeenCalledWith<[string, MoveElementBodyParams]>(elementId, {
				toLineId: lineId,
				toPosition: 1,
			});
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

			expect(
				mediaElementApi.mediaElementControllerDeleteElement
			).toHaveBeenCalledWith(elementId);
		});
	});
});
