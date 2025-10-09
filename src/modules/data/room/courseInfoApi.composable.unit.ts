import { useCourseInfoApi } from "./courseInfoApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { CourseInfoListResponse, CourseSortProps, CourseStatus } from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { mockApiResponse } from "@@/tests/test-utils";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory/courseInfoDataResponseFactory";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { AxiosInstance } from "axios";

describe("courseInfoApi.composable", () => {
	let courseInfoApi: DeepMocked<serverApi.CourseInfoApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		courseInfoApi = createMock<serverApi.CourseInfoApiInterface>();
		axiosMock = createMock<AxiosInstance>();

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
