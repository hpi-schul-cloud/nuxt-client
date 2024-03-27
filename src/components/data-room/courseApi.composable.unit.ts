import * as serverApi from "@/serverApi/v3/api";
import { mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useCourseApi } from "./courseApi.composable";

describe("courseApi.composable", () => {
	let courseApi: DeepMocked<serverApi.CoursesApiInterface>;

	beforeEach(() => {
		courseApi = createMock<serverApi.CoursesApiInterface>();

		jest.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("stopSynchronization", () => {
		const setup = () => {
			courseApi.courseControllerStopSynchronization.mockResolvedValueOnce(
				mockApiResponse({ data: undefined })
			);
		};

		it("should call the api to stop a course sync", async () => {
			setup();

			await useCourseApi().stopSynchronization("courseId");

			expect(
				courseApi.courseControllerStopSynchronization
			).toHaveBeenCalledWith("courseId");
		});
	});
});
