import { useCourseApi } from "./courseApi.composable";
import * as serverApi from "@/generated/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import { mockApi, mockApiResponse, mockAxiosInstance } from "@@/tests/test-utils";
import { AxiosInstance } from "axios";
import { Mocked } from "vitest";

describe("courseApi.composable", () => {
	let courseApi: Mocked<serverApi.CoursesApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		courseApi = mockApi<serverApi.CoursesApiInterface>();
		axiosMock = mockAxiosInstance();

		vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("stopSynchronization", () => {
		const setup = () => {
			courseApi.courseControllerStopSynchronization.mockResolvedValueOnce(mockApiResponse({ data: undefined }));
		};

		it("should call the api to stop a course sync", async () => {
			setup();

			await useCourseApi().stopSynchronization("courseId");

			expect(courseApi.courseControllerStopSynchronization).toHaveBeenCalledWith("courseId");
		});
	});

	describe("startSynchronization", () => {
		const setup = () => {
			courseApi.courseControllerStartSynchronization.mockResolvedValueOnce(mockApiResponse({ data: undefined }));
		};

		it("should call the api to start a course sync", async () => {
			setup();

			await useCourseApi().startSynchronization("courseId", "groupId");

			expect(courseApi.courseControllerStartSynchronization).toHaveBeenCalledWith("courseId", { groupId: "groupId" });
		});
	});

	describe("deleteCourseById", () => {
		describe("when calender service is not enabled", () => {
			it("should call the api to delete Course", async () => {
				await useCourseApi().deleteCourseById("id");

				expect(axiosMock.delete).toHaveBeenCalledWith("v1/courses/id");
			});
		});
	});
});
