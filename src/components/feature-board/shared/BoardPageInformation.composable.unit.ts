import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock } from "@golevelup/ts-jest";
import * as serverApi from "@/serverApi/v3/api";
import {
	BoardApiInterface,
	BoardExternalReferenceType,
	RoomsApiInterface,
} from "@/serverApi/v3/api";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { i18nMock } from "@@/tests/test-utils";
import * as pageTitleUtil from "@/utils/pageTitle";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

/**
 * hint: this is difficult to test, as we are testing a shared composable (and all mocked return values need to be set before mounting the composable... but the composable is a singleton... due to being a shared composable...)
 */
describe("BoardPageInformation.composable", () => {
	beforeEach(() => {
		jest
			.spyOn(pageTitleUtil, "buildPageTitle")
			.mockImplementation((value) => value ?? "");
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when board context exists", () => {
		const setup = () => {
			const boardApi = createMock<BoardApiInterface>();
			boardApi.boardControllerGetBoardContext.mockResolvedValue(
				mockApiResponse({
					data: {
						id: "courseId",
						type: BoardExternalReferenceType.Course,
					},
				})
			);
			jest.spyOn(serverApi, "BoardApiFactory").mockReturnValueOnce(boardApi);

			const roomApi = createMock<RoomsApiInterface>();
			roomApi.roomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse({
					data: {
						id: "courseId",
						title: "Course #1",
						roomId: "roomId",
						displayColor: "#F0F0F0",
						elements: [],
						isArchived: false,
					},
				})
			);

			jest.spyOn(serverApi, "RoomsApiFactory").mockReturnValueOnce(roomApi);

			const { createPageInformation, breadcrumbs, pageTitle } = mountComposable(
				() => useSharedBoardPageInformation(),
				{
					[I18N_KEY.valueOf()]: i18nMock,
				}
			);

			return { createPageInformation, breadcrumbs, pageTitle };
		};

		it("should return two breadcrumbs: 1. course page and and 2. course-overview page", async () => {
			const { createPageInformation, breadcrumbs } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(breadcrumbs.value).toHaveLength(2);
		});

		it("should set page title", async () => {
			const { createPageInformation, pageTitle } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(pageTitle.value).toContain("Course #1");
		});
	});

	describe("when board context does not exist", () => {
		const setup = () => {
			const boardApi = createMock<BoardApiInterface>();
			boardApi.boardControllerGetBoardContext.mockResolvedValue(
				mockApiResponse({
					status: HttpStatusCode.NoContent,
				})
			);

			jest.spyOn(serverApi, "BoardApiFactory").mockReturnValueOnce(boardApi);

			const { createPageInformation, breadcrumbs, pageTitle } = mountComposable(
				() => useSharedBoardPageInformation(),
				{
					[I18N_KEY.valueOf()]: i18nMock,
				}
			);

			return { createPageInformation, breadcrumbs, pageTitle };
		};

		it("should not return breadcrumbs", async () => {
			const { createPageInformation, breadcrumbs } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(breadcrumbs.value).toEqual([]);
		});

		it("should not add course name to page title", async () => {
			const { createPageInformation, pageTitle } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(pageTitle.value).toEqual("pages.room.boardCard.label.courseBoard");
		});
	});
});
