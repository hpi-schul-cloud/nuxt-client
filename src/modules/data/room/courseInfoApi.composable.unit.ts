import { useCourseInfoApi } from "./courseInfoApi.composable";
import * as serverApi from "@/generated/serverApi/v3";
import { CourseInfoListResponse, CourseSortProps, CourseStatus } from "@/generated/serverApi/v3";
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

			await useCourseInfoApi().loadCoursesForSchool(CourseStatus.CURRENT, true, 10, 0, CourseSortProps.NAME, "asc");

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
