import * as serverApi from "@/serverApi/v3/api";
import {
	CourseInfoListResponse,
	CourseSortQueryType,
	CourseStatusQueryType,
} from "@/serverApi/v3/api";
import { mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosInstance } from "axios";
import { initializeAxios } from "@/utils/api";
import { useCourseInfoApi } from "./courseInfoApi.composable";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory/courseInfoDataResponseFactory";

describe("courseInfoApi.composable", () => {
	let courseInfoApi: DeepMocked<serverApi.CourseInfoApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		courseInfoApi = createMock<serverApi.CourseInfoApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		jest
			.spyOn(serverApi, "CourseInfoApiFactory")
			.mockReturnValue(courseInfoApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("loadCoursesForSchool", () => {
		const setup = () => {
			const infoResponse: CourseInfoListResponse = {
				data: [courseInfoDataResponseFactory.build()],
				limit: 10,
				skip: 0,
				total: 1,
			};
			courseInfoApi.courseInfoControllerGetCoursesForSchool.mockResolvedValueOnce(
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

			await useCourseInfoApi().loadCoursesForSchool(
				CourseStatusQueryType.Current,
				10,
				0,
				CourseSortQueryType.Name,
				"asc"
			);

			expect(
				courseInfoApi.courseInfoControllerGetCoursesForSchool
			).toHaveBeenCalledWith(0, 10, "asc", "name", "current");
		});
	});
});
