import { useCourseGroups } from "./course-group.composable";
import { V1CourseGroup } from "./types";
import { initializeAxios } from "@/utils/api";
import { axiosErrorFactory, createTestAppStore, expectNotification, mockAxiosInstance } from "@@/tests/test-utils";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { Permission } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("useCourseGroups", () => {
	let axiosMock: Mocked<AxiosInstance>;

	const setupUser = (permissions: Permission[] = []) =>
		createTestAppStore({ me: { user: { id: "user-1" }, school: { id: "school-1" }, permissions } });

	const v1Group = (id: string, memberIds: string[]): V1CourseGroup => ({
		_id: id,
		name: `Group ${id}`,
		courseId: "course-1",
		userIds: memberIds.map((memberId) => ({ _id: memberId, firstName: "First", lastName: memberId })),
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("fetchGroups", () => {
		const groups = [v1Group("mine", ["user-1", "user-2"]), v1Group("other", ["user-3"])];

		it("should request all groups of the course with populated members", async () => {
			setupUser([Permission.COURSE_EDIT]);
			axiosMock.get.mockResolvedValueOnce(mockApiResponse({ data: { data: groups } }));

			await useCourseGroups().fetchGroups("course-1");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/courseGroups", {
				params: { courseId: "course-1", $populate: ["userIds"], $limit: false },
			});
		});

		it("should return all groups for users with COURSE_EDIT", async () => {
			setupUser([Permission.COURSE_EDIT]);
			axiosMock.get.mockResolvedValueOnce(mockApiResponse({ data: { data: groups } }));

			const result = await useCourseGroups().fetchGroups("course-1");

			expect(result.map((group) => group.id)).toEqual(["mine", "other"]);
		});

		it("should only return own groups for users without COURSE_EDIT", async () => {
			setupUser();
			axiosMock.get.mockResolvedValueOnce(mockApiResponse({ data: groups }));

			const result = await useCourseGroups().fetchGroups("course-1");

			expect(result.map((group) => group.id)).toEqual(["mine"]);
		});

		it("should return an empty list and notify on error", async () => {
			setupUser();
			axiosMock.get.mockRejectedValueOnce(axiosErrorFactory.build());

			const result = await useCourseGroups().fetchGroups("course-1");

			expect(result).toEqual([]);
			expectNotification("error");
		});
	});

	describe("fetchGroup", () => {
		it("should return the mapped group", async () => {
			setupUser();
			axiosMock.get.mockResolvedValueOnce(mockApiResponse({ data: v1Group("group-1", ["user-1"]) }));

			const result = await useCourseGroups().fetchGroup("group-1");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/courseGroups/group-1", {
				params: { $populate: ["userIds"] },
			});
			expect(result?.id).toBe("group-1");
		});

		it("should return undefined on error", async () => {
			setupUser();
			axiosMock.get.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroups().fetchGroup("group-1")).toBeUndefined();
		});
	});

	describe("fetchCourse", () => {
		it("should request the course with students and teachers", async () => {
			setupUser();
			axiosMock.get.mockResolvedValueOnce(
				mockApiResponse({ data: { _id: "course-1", name: "Math", userIds: [], teacherIds: [] } })
			);

			const result = await useCourseGroups().fetchCourse("course-1");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/courses/course-1", {
				params: { $populate: ["userIds", "teacherIds"] },
			});
			expect(result?.name).toBe("Math");
		});

		it("should return undefined on error", async () => {
			setupUser();
			axiosMock.get.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroups().fetchCourse("course-1")).toBeUndefined();
		});
	});

	describe("createGroup", () => {
		it("should send the group as given for users with COURSE_EDIT", async () => {
			setupUser([Permission.COURSE_EDIT]);
			axiosMock.post.mockResolvedValueOnce(mockApiResponse({ data: v1Group("new", ["user-2"]) }));

			const result = await useCourseGroups().createGroup("course-1", { name: "Group new", userIds: ["user-2"] });

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/courseGroups", {
				name: "Group new",
				courseId: "course-1",
				schoolId: "school-1",
				userIds: ["user-2"],
			});
			expect(result?.id).toBe("new");
		});

		it("should add the current user for users without COURSE_EDIT", async () => {
			setupUser();
			axiosMock.post.mockResolvedValueOnce(mockApiResponse({ data: v1Group("new", ["user-2", "user-1"]) }));

			await useCourseGroups().createGroup("course-1", { name: "Group new", userIds: ["user-2"] });

			expect(axiosMock.post).toHaveBeenCalledWith(
				"/v1/courseGroups",
				expect.objectContaining({ userIds: ["user-2", "user-1"] })
			);
		});

		it("should not add the current user twice", async () => {
			setupUser();
			axiosMock.post.mockResolvedValueOnce(mockApiResponse({ data: v1Group("new", ["user-1"]) }));

			await useCourseGroups().createGroup("course-1", { name: "Group new", userIds: ["user-1"] });

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/courseGroups", expect.objectContaining({ userIds: ["user-1"] }));
		});

		it("should return undefined and notify on error", async () => {
			setupUser();
			axiosMock.post.mockRejectedValueOnce(axiosErrorFactory.build());

			const result = await useCourseGroups().createGroup("course-1", { name: "Group new", userIds: [] });

			expect(result).toBeUndefined();
			expectNotification("error");
		});
	});

	describe("updateGroup", () => {
		it("should patch the group and add the current user for users without COURSE_EDIT", async () => {
			setupUser();
			axiosMock.patch.mockResolvedValueOnce(mockApiResponse({}));

			const result = await useCourseGroups().updateGroup("group-1", {
				name: "Renamed",
				userIds: ["user-2"],
			});

			expect(axiosMock.patch).toHaveBeenCalledWith("/v1/courseGroups/group-1", {
				name: "Renamed",
				userIds: ["user-2", "user-1"],
			});
			expect(result).toBe(true);
		});

		it("should return false on error", async () => {
			setupUser();
			axiosMock.patch.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroups().updateGroup("group-1", { name: "x", userIds: [] })).toBe(false);
		});
	});

	describe("deleteGroup", () => {
		it("should delete the group", async () => {
			setupUser();
			axiosMock.delete.mockResolvedValueOnce(mockApiResponse({}));

			expect(await useCourseGroups().deleteGroup("group-1")).toBe(true);
			expect(axiosMock.delete).toHaveBeenCalledWith("/v1/courseGroups/group-1");
		});

		it("should return false on error", async () => {
			setupUser();
			axiosMock.delete.mockRejectedValueOnce(axiosErrorFactory.build());

			expect(await useCourseGroups().deleteGroup("group-1")).toBe(false);
		});
	});

	describe("canSeeAllGroups", () => {
		it("should depend on COURSE_EDIT", () => {
			setupUser([Permission.COURSE_EDIT]);

			expect(useCourseGroups().canSeeAllGroups.value).toBe(true);
		});
	});
});
