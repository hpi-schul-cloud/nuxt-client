import * as serverApi from "@/serverApi/v3/api";
import { envsFactory, mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useCourseApi } from "./courseApi.composable";
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

		vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
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

	describe("deleteCourseById", () => {
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
