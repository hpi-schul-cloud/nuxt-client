import { useCourseInfoApi } from "./courseInfoApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { CourseInfoListResponse, CourseSortProps, CourseStatus } from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { mockApi, mockApiResponse, mockAxiosInstance } from "@@/tests/test-utils";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory/courseInfoDataResponseFactory";
import { AxiosInstance } from "axios";
import { Mocked } from "vitest";

describe("courseInfoApi.composable", () => {
	let courseInfoApi: Mocked<serverApi.CourseInfoApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		courseInfoApi = mockApi<serverApi.CourseInfoApiInterface>();
		axiosMock = mockAxiosInstance();

		vi.spyOn(serverApi, "CourseInfoApiFactory").mockReturnValue(courseInfoApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("loadCoursesForSchool", () => {
		const setup = () => {
			const infoResponse: CourseInfoListResponse = {
				data: [courseInfoDataResponseFactory.build()],
				limit: 10,
				skip: 0,
				total: 1,
			};
			courseInfoApi.courseInfoControllerGetCourseInfo.mockResolvedValueOnce(
				mockApiResponse({
					data: infoResponse,
				})
			);

			return {
				infoResponse,
			};
		};

		it("should call the api to find courses by school", async () => {
			setup();

			await useCourseInfoApi().loadCoursesForSchool(CourseStatus.Current, true, 10, 0, CourseSortProps.Name, "asc");

			expect(courseInfoApi.courseInfoControllerGetCourseInfo).toHaveBeenCalledWith(
				0,
				10,
				"asc",
				"name",
				"current",
				true
			);
		});
	});
});
