import { useCourseRoomListStore } from "./courseRoomList.store";
import { courseMetadataResponseFactory, mockApi, mockApiResponse } from "@@/tests/test-utils";
import {
	CourseMetadataListResponse,
	CoursesApiFactory,
	DashboardApiFactory,
	DashboardGridElementResponse,
	DashboardResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { Factory } from "fishery";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@api-server");

const dashboardGridElementResponseFactory = Factory.define<DashboardGridElementResponse>(({ sequence }) => ({
	id: `element-${sequence}`,
	title: `Course ${sequence}`,
	shortTitle: `C${sequence}`,
	displayColor: "#54616e",
	xPosition: sequence,
	yPosition: 0,
	groupId: "",
	groupElements: [],
	copyingSince: "",
	isSynchronized: false,
	isLocked: false,
}));

describe("useCourseRoomListStore", () => {
	const dashboardApiMock = mockApi<ReturnType<typeof DashboardApiFactory>>();
	const coursesApiMock = mockApi<ReturnType<typeof CoursesApiFactory>>();

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.mocked(DashboardApiFactory).mockReturnValue(dashboardApiMock);
		vi.mocked(CoursesApiFactory).mockReturnValue(coursesApiMock);
	});

	describe("fetchCourses", () => {
		it("should load courses successfully", async () => {
			const mockElements = dashboardGridElementResponseFactory.buildList(2);
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			expect(store.gridElementsId).toBe("dashboard-1");
			expect(store.roomsData).toHaveLength(2);
			expect(store.hasCurrentRooms).toBe(true);
		});

		it("should process room data and add 'to' property", async () => {
			const mockElements = [dashboardGridElementResponseFactory.build({ id: "course-123" })];
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			expect(store.roomsData[0]).toHaveProperty("to", "/rooms/course-123");
		});

		it("should process groupElements and add 'to' property", async () => {
			const mockElements = [
				dashboardGridElementResponseFactory.build({
					id: "group-1",
					groupElements: [
						{ id: "sub-course-1", title: "Sub Course", shortTitle: "SC", displayColor: "#fff", isLocked: false },
					],
				}),
			];
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			expect(store.roomsData[0].groupElements?.[0]).toHaveProperty("to", "/rooms/sub-course-1");
		});

		it("should handle empty grid elements", async () => {
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: [] },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			expect(store.roomsData).toEqual([]);
			expect(store.hasCurrentRooms).toBe(false);
		});
	});

	describe("alignCourse", () => {
		it("should move element successfully", async () => {
			const mockElements = dashboardGridElementResponseFactory.buildList(2);
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);
			dashboardApiMock.dashboardControllerMoveElement.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			const payload = {
				from: { x: 0, y: 0 },
				to: { x: 1, y: 0 },
				item: mockElements[0],
			};

			await store.alignCourse(payload);

			expect(dashboardApiMock.dashboardControllerMoveElement).toHaveBeenCalledWith("dashboard-1", {
				from: { x: 0, y: 0 },
				to: { x: 1, y: 0 },
			});
		});

		it("should update position of moved element", async () => {
			const mockElements = [dashboardGridElementResponseFactory.build({ id: "element-1", xPosition: 0, yPosition: 0 })];
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);
			const updatedElements = [
				dashboardGridElementResponseFactory.build({ id: "element-1", xPosition: 2, yPosition: 1 }),
			];
			dashboardApiMock.dashboardControllerMoveElement.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: updatedElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			const payload = {
				from: { x: 0, y: 0 },
				to: { x: 2, y: 1 },
				item: mockElements[0],
			};

			await store.alignCourse(payload);

			const movedElement = store.roomsData.find((item) => item.id === "element-1");
			expect(movedElement?.xPosition).toBe(2);
			expect(movedElement?.yPosition).toBe(1);
		});
	});

	describe("updateCourse", () => {
		it("should update course title successfully", async () => {
			const mockElements = [dashboardGridElementResponseFactory.build({ xPosition: 0, yPosition: 0, title: "Old" })];
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);
			dashboardApiMock.dashboardControllerPatchGroup.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			await store.updateCourse({
				id: mockElements[0].id,
				xPosition: 0,
				yPosition: 0,
				title: "New Title",
				shortTitle: "NT",
				displayColor: "#54616e",
				isSynchronized: false,
			});

			expect(dashboardApiMock.dashboardControllerPatchGroup).toHaveBeenCalledWith("dashboard-1", 0, 0, {
				title: "New Title",
			});
			expect(store.roomsData[0].title).toBe("New Title");
		});
	});

	describe("delete", () => {
		it("should remove room from roomsData", async () => {
			const mockElements = dashboardGridElementResponseFactory.buildList(3);
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchCourses();

			expect(store.roomsData).toHaveLength(3);

			store.delete(mockElements[1].id);

			expect(store.roomsData).toHaveLength(2);
			expect(store.roomsData.find((item) => item.id === mockElements[1].id)).toBeUndefined();
		});
	});

	describe("fetchAllElements", () => {
		it("should load all course elements successfully", async () => {
			const mockCourses = courseMetadataResponseFactory.buildList(3);
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 3, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements).toHaveLength(3);
			expect(store.hasRooms).toBe(true);
		});

		it("should add 'to' property to course elements", async () => {
			const mockCourses = [courseMetadataResponseFactory.build({ id: "course-456" })];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements[0]).toHaveProperty("to", "/rooms/course-456");
		});

		it("should mark archived courses with titleDate", async () => {
			const pastDate = new Date("2020-06-01");
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "archived-course",
					startDate: "2019-09-01",
					untilDate: pastDate.toISOString(),
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements[0]).toHaveProperty("isArchived", true);
			expect(store.allElements[0]).toHaveProperty("titleDate");
		});

		it("should not mark current courses as archived", async () => {
			const futureDate = new Date();
			futureDate.setFullYear(futureDate.getFullYear() + 1);
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "current-course",
					untilDate: futureDate.toISOString(),
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements[0]).toHaveProperty("isArchived", false);
		});

		it("should format titleDate with symbol '/' when difference is 1 year", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "one-year-course",
					startDate: "2019-09-01",
					untilDate: "2020-06-30",
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect((store.allElements[0] as { titleDate?: string }).titleDate).toBe("2019/20");
		});

		it("should format titleDate with symbol '-' when difference is more than 1 year", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "multi-year-course",
					startDate: "2018-09-01",
					untilDate: "2020-06-30",
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect((store.allElements[0] as { titleDate?: string }).titleDate).toBe("2018-2020");
		});

		it("should set titleDate to untilDate year when startDate equals untilDate year", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "same-year-course",
					startDate: "2020-01-01",
					untilDate: "2020-06-30",
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect((store.allElements[0] as { titleDate?: string }).titleDate).toBe("2020");
		});
	});

	describe("computed properties", () => {
		describe("hasRooms", () => {
			it("should be false when no elements exist", () => {
				const store = useCourseRoomListStore();
				expect(store.hasRooms).toBe(false);
			});

			it("should be true when elements exist", async () => {
				const mockCourses = courseMetadataResponseFactory.buildList(1);
				coursesApiMock.courseControllerFindForUser.mockResolvedValue(
					mockApiResponse<CourseMetadataListResponse>({
						data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
					})
				);

				const store = useCourseRoomListStore();
				await store.fetchAllElements();

				expect(store.hasRooms).toBe(true);
			});
		});

		describe("hasCurrentRooms", () => {
			it("should be false when no roomsData exist", () => {
				const store = useCourseRoomListStore();
				expect(store.hasCurrentRooms).toBe(false);
			});

			it("should be true when roomsData exist", async () => {
				const mockElements = dashboardGridElementResponseFactory.buildList(1);
				dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
					mockApiResponse<DashboardResponse>({
						data: { id: "dashboard-1", gridElements: mockElements },
					})
				);

				const store = useCourseRoomListStore();
				await store.fetchCourses();

				expect(store.hasCurrentRooms).toBe(true);
			});
		});

		describe("loading", () => {
			it("should be true during fetch", async () => {
				let resolvePromise: (value: unknown) => void;
				const promise = new Promise((resolve) => {
					resolvePromise = resolve;
				});

				dashboardApiMock.dashboardControllerFindForUser.mockReturnValue(promise as never);

				const store = useCourseRoomListStore();
				const fetchPromise = store.fetchCourses();

				expect(store.loading).toBe(true);

				resolvePromise!(
					mockApiResponse<DashboardResponse>({
						data: { id: "dashboard-1", gridElements: [] },
					})
				);

				await fetchPromise;
				expect(store.loading).toBe(false);
			});
		});
	});
});
