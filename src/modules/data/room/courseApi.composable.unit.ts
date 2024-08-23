import * as serverApi from "@/serverApi/v3/api";
import {
	CourseInfoListResponse,
	CourseSortQueryType,
	CourseStatusQueryType,
} from "@/serverApi/v3/api";
import { envsFactory, mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useCourseApi } from "./courseApi.composable";
import { courseInfoResponseFactory } from "@@/tests/test-utils/factory/courseInfoResponseFactory";
import { AxiosInstance } from "axios";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { envConfigModule } from "@/store";
import { initializeAxios } from "@/utils/api";

describe("courseApi.composable", () => {
	let courseApi: DeepMocked<serverApi.CoursesApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		courseApi = createMock<serverApi.CoursesApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		jest.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApi);
		initializeAxios(axiosMock);
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

	describe("startSynchronization", () => {
		const setup = () => {
			courseApi.courseControllerStartSynchronization.mockResolvedValueOnce(
				mockApiResponse({ data: undefined })
			);
		};

		it("should call the api to start a course sync", async () => {
			setup();

			await useCourseApi().startSynchronization("courseId", "groupId");

			expect(
				courseApi.courseControllerStartSynchronization
			).toHaveBeenCalledWith("courseId", { groupId: "groupId" });
		});
	});

	describe("loadCoursesForSchool", () => {
		const setup = () => {
			const infoResponse: CourseInfoListResponse = {
				data: [courseInfoResponseFactory.build()],
				limit: 10,
				skip: 0,
				total: 1,
			};
			courseApi.courseControllerGetAllCourses.mockResolvedValueOnce(
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

			await useCourseApi().loadCoursesForSchool(
				CourseStatusQueryType.Current,
				10,
				0,
				CourseSortQueryType.Name,
				"asc"
			);

			expect(courseApi.courseControllerGetAllCourses).toHaveBeenCalledWith(
				0,
				10,
				"asc",
				"name",
				"current"
			);
		});
	});

	describe("deleteCourseById", () => {
		describe("when calender service is enabled", () => {
			const setup = () => {
				setupStores({ envConfigModule: EnvConfigModule });

				const env = envsFactory.build({
					CALENDAR_SERVICE_ENABLED: true,
				});

				envConfigModule.setEnvs(env);
			};

			it("should call the api to delete calender and Course", async () => {
				setup();

				await useCourseApi().deleteCourseById("id");

				expect(axiosMock.delete).toHaveBeenNthCalledWith(
					1,
					"v1/calendar/courses/id"
				);
				expect(axiosMock.delete).toHaveBeenNthCalledWith(2, "v1/courses/id");
			});
		});

		describe("when calender service is not enabled", () => {
			const setup = () => {
				setupStores({ envConfigModule: EnvConfigModule });

				const env = envsFactory.build({
					CALENDAR_SERVICE_ENABLED: false,
				});

				envConfigModule.setEnvs(env);
			};

			it("should call the api to delete Course", async () => {
				setup();

				await useCourseApi().deleteCourseById("id");

				expect(axiosMock.delete).toHaveBeenCalledWith("v1/courses/id");
			});
		});
	});
});
