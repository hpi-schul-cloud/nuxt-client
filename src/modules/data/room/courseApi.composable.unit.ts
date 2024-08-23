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
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { envConfigModule } from "@/store";

describe("courseApi.composable", () => {
	let courseApi: DeepMocked<serverApi.CoursesApiInterface>;

	const receivedRequests: any[] = [];
	const getRequestReturn: any = {};

	const axiosInitializer = () => {
		return initializeAxios({
			delete: async (path: string) => {
				receivedRequests.push({ path });
				return getRequestReturn;
			},
		} as AxiosInstance);
	};

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
		const setup = () => {
			axiosInitializer();

			setupStores({ envConfigModule: EnvConfigModule });

			const env = envsFactory.build({
				CALENDAR_SERVICE_ENABLED: true,
			});

			envConfigModule.setEnvs(env);
		};

		it("should call the api to deleteCourse", async () => {
			setup();

			await useCourseApi().deleteCourseById("id");

			expect(receivedRequests[0].delete).toHaveBeenCalledWith("id");
		});
	});
});
