import { useCourseGroupDetails } from "./course-group-details.composable";
import { initializeAxios } from "@/utils/api";
import { axiosErrorFactory, expectNotification, mockApi, mockAxiosInstance } from "@@/tests/test-utils";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import * as serverApi from "@api-server";
import { LessonApiInterface } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("useCourseGroupDetails", () => {
	let axiosMock: Mocked<AxiosInstance>;
	let lessonApiMock: Mocked<LessonApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		lessonApiMock = mockApi<LessonApiInterface>();
		vi.spyOn(serverApi, "LessonApiFactory").mockReturnValue(lessonApiMock);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("fetchTopics", () => {
		it("should load the group's topics sorted by position", async () => {
			axiosMock.get.mockResolvedValueOnce(mockApiResponse({ data: { data: [{ _id: "lesson-1", name: "Topic 1" }] } }));

			const result = await useCourseGroupDetails().fetchTopics("group-1");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/lessons", {
				params: { courseGroupId: "group-1", $sort: "position" },
			});
			expect(result).toEqual([{ id: "lesson-1", name: "Topic 1" }]);
		});

		it("should return an empty list and notify on error", async () => {
			axiosMock.get.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroupDetails().fetchTopics("group-1")).toEqual([]);
			expectNotification("error");
		});
	});

	describe("deleteTopic", () => {
		it("should delete the topic through the v3 api", async () => {
			lessonApiMock.lessonControllerDelete.mockResolvedValueOnce(mockApiResponse({ data: true }));

			expect(await useCourseGroupDetails().deleteTopic("lesson-1")).toBe(true);
			expect(lessonApiMock.lessonControllerDelete).toHaveBeenCalledWith("lesson-1");
		});

		it("should return false on error", async () => {
			lessonApiMock.lessonControllerDelete.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroupDetails().deleteTopic("lesson-1")).toBe(false);
		});
	});

	describe("fetchGroupTasks", () => {
		const homework = (id: string) => ({
			_id: id,
			name: `Task ${id}`,
			description: "",
			dueDate: "2026-12-01T10:00:00Z",
			teamSubmissions: true,
			maxTeamMembers: 4,
		});

		it("should return done and open tasks of the group", async () => {
			axiosMock.get.mockImplementation((url: string) =>
				Promise.resolve(
					url === "/v1/submissions"
						? mockApiResponse({
								data: {
									data: [
										{ _id: "s-1", updatedAt: "2026-11-10T10:00:00Z", homeworkId: homework("done") },
										{ _id: "s-2", homeworkId: null },
									],
								},
							})
						: mockApiResponse({ data: { data: [homework("done"), homework("open")] } })
				)
			);

			const result = await useCourseGroupDetails().fetchGroupTasks("group-1", "course-1", 2);

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/submissions", {
				params: { courseGroupId: "group-1", $populate: ["homeworkId"] },
			});
			expect(axiosMock.get).toHaveBeenCalledWith("/v1/homework", { params: { courseId: "course-1" } });
			expect(result.done.map((task) => task.homeworkId)).toEqual(["done"]);
			expect(result.open.map((task) => task.homeworkId)).toEqual(["open"]);
		});

		it("should return empty lists on error", async () => {
			axiosMock.get.mockRejectedValue(axiosErrorFactory.build());

			expect(await useCourseGroupDetails().fetchGroupTasks("group-1", "course-1", 2)).toEqual({ done: [], open: [] });
		});
	});
});
