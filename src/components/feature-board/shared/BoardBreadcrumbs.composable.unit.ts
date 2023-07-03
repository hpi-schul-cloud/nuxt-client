import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock } from "@golevelup/ts-jest";
import * as serverApi from "@/serverApi/v3/api";
import {
	BoardApiInterface,
	BoardExternalReferenceType,
	CoursesApiInterface,
} from "@/serverApi/v3/api";
import { useSharedBoardBreadcrumbs } from "./BoardBreadcrumbs.composable";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";

/**
 * hint: this is difficult to test, as we are testing a shared composable (and all mocked return values need to be set before mounting the composable... but the composable is a singleton... due to being a shared composable...)
 */
describe("BoardBreadcrumbs.composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
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

			const coursesApi = createMock<CoursesApiInterface>();
			coursesApi.courseControllerGetCourse.mockResolvedValue(
				mockApiResponse({
					data: {
						id: "courseId",
						title: "Course #1",
					},
				})
			);

			jest
				.spyOn(serverApi, "CoursesApiFactory")
				.mockReturnValueOnce(coursesApi);

			const { createBreadcrumbs, breadcrumbs } = mountComposable(
				() => useSharedBoardBreadcrumbs(),
				{
					[I18N_KEY as symbol]: { t: (key: string) => key },
				}
			);

			return { createBreadcrumbs, breadcrumbs };
		};

		it("should return two breadcrumbs: 1. course page and and 2. course-overview page", async () => {
			const { createBreadcrumbs, breadcrumbs } = setup();

			const fakeId = "abc123";

			await createBreadcrumbs(fakeId);

			expect(breadcrumbs.value).toHaveLength(2);
		});
	});
});
