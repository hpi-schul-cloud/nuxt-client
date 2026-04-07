import { useCourseRoomListStore } from "./courseRoomList.store";
import { courseMetadataResponseFactory, courseRoomElementFactory, mockApi, mockApiResponse } from "@@/tests/test-utils";
import {
	CourseMetadataListResponse,
	CoursesApiFactory,
	DashboardApiFactory,
	DashboardGridElementResponse,
	DashboardResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@api-server");

const buildDashboardElement = (overrides: Partial<DashboardGridElementResponse> = {}): DashboardGridElementResponse => {
	const element = courseRoomElementFactory.build(overrides);
	return {
		...element,
		groupId: overrides.groupId ?? "",
		groupElements: overrides.groupElements ?? [],
	} as DashboardGridElementResponse;
};

describe("useCourseRoomListStore", () => {
	const dashboardApiMock = mockApi<ReturnType<typeof DashboardApiFactory>>();
	const coursesApiMock = mockApi<ReturnType<typeof CoursesApiFactory>>();

	const setup = async (
		options: {
			elementCount?: number;
			elements?: Partial<DashboardGridElementResponse>[];
		} = {}
	): Promise<{
		store: ReturnType<typeof useCourseRoomListStore>;
		mockElements: DashboardGridElementResponse[];
	}> => {
		const { elementCount = 1, elements } = options;
		const mockElements = elements
			? elements.map((override) => buildDashboardElement(override))
			: [...Array(elementCount)].map(() => buildDashboardElement());

		dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
			mockApiResponse<DashboardResponse>({
				data: { id: "dashboard-1", gridElements: mockElements },
			})
		);

		const store = useCourseRoomListStore();
		await store.fetchCourses();
		return { store, mockElements };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.mocked(DashboardApiFactory).mockReturnValue(dashboardApiMock);
		vi.mocked(CoursesApiFactory).mockReturnValue(coursesApiMock);
	});

	describe("fetchCourses", () => {
		it("should load courses successfully", async () => {
			const { store } = await setup({ elementCount: 2 });

			expect(store.gridElementsId).toBe("dashboard-1");
			expect(store.roomsData).toHaveLength(2);
			expect(store.hasCurrentRooms).toBe(true);
		});

		it("should process room data and add 'to' property", async () => {
			const { store } = await setup({ elements: [{ id: "course-123" }] });

			expect(store.roomsData[0]).toHaveProperty("to", "/rooms/course-123");
		});

		it("should process groupElements and add 'to' property", async () => {
			const { store } = await setup({
				elements: [
					{
						id: "group-1",
						groupElements: [
							{
								id: "sub-course-1",
								title: "Sub Course",
								shortTitle: "SC",
								displayColor: "#fff",
								isLocked: false,
							},
						],
					},
				],
			});

			expect(store.roomsData[0].groupElements?.[0]).toHaveProperty("to", "/rooms/sub-course-1");
		});

		it("should handle empty grid elements", async () => {
			dashboardApiMock.dashboardControllerFindForUser.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: [] },
				})
			);

			const { store } = await setup({ elements: [] });

			expect(store.roomsData).toEqual([]);
			expect(store.hasCurrentRooms).toBe(false);
		});

		it("should handle element without groupElements", async () => {
			const { store } = await setup({
				elements: [{ id: "course-no-group", groupElements: undefined }],
			});

			expect(store.roomsData[0]).toHaveProperty("to", "/rooms/course-no-group");
		});

		it("should handle groupElement without id", async () => {
			const { store } = await setup({
				elements: [
					{
						id: "group-1",
						groupElements: [
							{
								id: undefined as unknown as string,
								title: "Sub Course",
								shortTitle: "SC",
								displayColor: "#fff",
								isLocked: false,
							},
						],
					},
				],
			});

			expect(store.roomsData[0].groupElements?.[0]).toHaveProperty("to", "");
		});

		it("should handle element without id", async () => {
			const { store } = await setup({ elements: [{ id: undefined }] });

			expect(store.roomsData[0]).toHaveProperty("to", "");
		});

		describe("when API call fails", () => {
			it("should not update state", async () => {
				vi.clearAllMocks();
				dashboardApiMock.dashboardControllerFindForUser.mockRejectedValue(new Error("API Error"));
				const store = useCourseRoomListStore();
				await store.fetchCourses();

				expect(store.gridElementsId).toBe("");
				expect(store.roomsData).toEqual([]);
			});
		});
	});

	describe("alignCourse", () => {
		it("should move element successfully", async () => {
			const { store, mockElements } = await setup({ elementCount: 2 });
			dashboardApiMock.dashboardControllerMoveElement.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: mockElements },
				})
			);

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
			const { store, mockElements } = await setup({
				elements: [{ id: "element-1", xPosition: 0, yPosition: 0 }],
			});
			const updatedElements = [buildDashboardElement({ id: "element-1", xPosition: 2, yPosition: 1 })];
			dashboardApiMock.dashboardControllerMoveElement.mockResolvedValue(
				mockApiResponse<DashboardResponse>({
					data: { id: "dashboard-1", gridElements: updatedElements },
				})
			);

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

		describe("when API call fails", () => {
			it("should not update state", async () => {
				const { store, mockElements } = await setup({
					elements: [{ id: "element-1", xPosition: 0, yPosition: 0 }],
				});
				dashboardApiMock.dashboardControllerMoveElement.mockRejectedValue(new Error("API Error"));

				const payload = {
					from: { x: 0, y: 0 },
					to: { x: 2, y: 1 },
					item: mockElements[0],
				};

				await store.alignCourse(payload);

				const element = store.roomsData.find((item) => item.id === "element-1");
				expect(element?.xPosition).toBe(0);
				expect(element?.yPosition).toBe(0);
			});
		});

		describe("when item to be moved is not found", () => {
			it("should not update state", async () => {
				const { store } = await setup({
					elements: [{ id: "element-1", xPosition: 0, yPosition: 0 }],
				});
				const updatedElements = [buildDashboardElement({ id: "element-1", xPosition: 2, yPosition: 1 })];
				dashboardApiMock.dashboardControllerMoveElement.mockResolvedValue(
					mockApiResponse<DashboardResponse>({
						data: { id: "dashboard-1", gridElements: updatedElements },
					})
				);

				const payload = {
					from: { x: 0, y: 0 },
					to: { x: 2, y: 1 },
					item: { id: "non-existent-id" } as DashboardGridElementResponse,
				};

				await store.alignCourse(payload);

				expect(store.roomsData).toHaveLength(1);
			});
		});
	});

	describe("updateCourse", () => {
		it("should update course title successfully", async () => {
			const { store, mockElements } = await setup({
				elements: [{ xPosition: 0, yPosition: 0, title: "Old" }],
			});

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

		describe("when room is not found", () => {
			it("should not update state", async () => {
				const { store } = await setup({
					elements: [{ xPosition: 0, yPosition: 0, title: "Old" }],
				});

				await store.updateCourse({
					id: "some-id",
					xPosition: 99,
					yPosition: 99,
					title: "New Title",
					shortTitle: "NT",
					displayColor: "#54616e",
					isSynchronized: false,
				});

				expect(store.roomsData[0].title).toBe("Old");
			});
		});

		describe("when API call fails", () => {
			it("should not update state", async () => {
				const { store, mockElements } = await setup({
					elements: [{ xPosition: 0, yPosition: 0, title: "Old" }],
				});
				dashboardApiMock.dashboardControllerPatchGroup.mockRejectedValue(new Error("API Error"));

				await store.updateCourse({
					id: mockElements[0].id,
					xPosition: 0,
					yPosition: 0,
					title: "New Title",
					shortTitle: "NT",
					displayColor: "#54616e",
					isSynchronized: false,
				});

				expect(store.roomsData[0].title).toBe("Old");
			});
		});
	});

	describe("delete", () => {
		it("should remove room from roomsData", async () => {
			const { store, mockElements } = await setup({ elementCount: 3 });

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

		it("should format titleDate with symbol '/'", async () => {
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

		describe("when difference is more than 1 year", () => {
			it("should format titleDate with symbol '-'", async () => {
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
		});

		describe("when startDate equals untilDate year", () => {
			it("should set titleDate to untilDate year", async () => {
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

		it("should handle course without id", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: undefined,
					title: "Course Without Id",
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements[0]).toHaveProperty("to", "");
		});

		it("should handle archived course without startDate", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "archived-no-start",
					startDate: undefined,
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

			expect(store.allElements[0]).toHaveProperty("isArchived", true);
			expect((store.allElements[0] as { titleDate?: string }).titleDate).toBe("-2020");
		});

		it("should handle course without untilDate as not archived", async () => {
			const mockCourses = [
				courseMetadataResponseFactory.build({
					id: "no-until",
					startDate: "2019-09-01",
					untilDate: undefined,
				}),
			];
			coursesApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({
					data: { data: mockCourses, total: 1, skip: 0, limit: 100 },
				})
			);

			const store = useCourseRoomListStore();
			await store.fetchAllElements();

			expect(store.allElements[0]).not.toHaveProperty("titleDate");
		});

		describe("when API call fails", () => {
			it("should not update state", async () => {
				coursesApiMock.courseControllerFindForUser.mockRejectedValue(new Error("API Error"));

				const store = useCourseRoomListStore();
				await store.fetchAllElements();

				expect(store.allElements).toEqual([]);
				expect(store.hasRooms).toBe(false);
			});
		});
	});

	describe("computed properties", () => {
		describe("hasRooms", () => {
			describe("when no elements exist", () => {
				it("should be false", () => {
					const store = useCourseRoomListStore();
					expect(store.hasRooms).toBe(false);
				});
			});

			describe("when elements exist", () => {
				it("should be true", async () => {
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
		});

		describe("hasCurrentRooms", () => {
			describe("when no roomsData exist", () => {
				it("should be false", () => {
					const store = useCourseRoomListStore();
					expect(store.hasCurrentRooms).toBe(false);
				});
			});

			describe("when roomsData exist", () => {
				it("should be true", async () => {
					const { store } = await setup();

					expect(store.hasCurrentRooms).toBe(true);
				});
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
