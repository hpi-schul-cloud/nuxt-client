import { SidebarSingleItem } from "../types";
import { useSidebarSelection } from "./SidebarSelection.composable";
import { BoardContextType } from "@/types/board/BoardContext";
import { mockComposable, mountComposable } from "@@/tests/test-utils";
import { useSharedBoardPageInformation } from "@data-board";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, storeToRefs } from "pinia";
import { computed } from "vue";
import { createRouterMock, injectRouterMock, RouterMock } from "vue-router-mock";

vi.mock("@data-board/BoardPageInformation.composable");
const mockedUseSharedBoardPageInformation = vi.mocked(useSharedBoardPageInformation);

const mountSidebarSelection = (sidebarItem: SidebarSingleItem) =>
	mountComposable(() => useSidebarSelection(sidebarItem));

const createSharedPageInformationMock = (overrides: Partial<ReturnType<typeof useSharedBoardPageInformation>> = {}) =>
	mockComposable(useSharedBoardPageInformation, {
		breadcrumbs: computed(() => []),
		contextType: computed(() => undefined),
		pageTitle: computed(() => "page-title"),
		roomId: computed(() => "room-id"),
		...overrides,
	});

describe("@ui/layout/sidebar/SidebarSelection.composable", () => {
	let router: RouterMock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		router = createRouterMock();
		injectRouterMock(router);

		mockedUseSharedBoardPageInformation.mockReturnValue(createSharedPageInformationMock());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = async (routeProps: { path: string; name: string }) => {
		router.currentRoute.value = {
			...router.currentRoute.value,
			path: routeProps.path,
			name: routeProps.name,
			fullPath: routeProps.path,
		};

		const coursesItem: SidebarSingleItem = {
			title: "courses",
			testId: "courses-item",
			to: "/rooms/courses-overview",
		};

		const roomsItem: SidebarSingleItem = {
			title: "rooms",
			testId: "rooms-item",
			to: "/rooms",
		};

		const tasksItem: SidebarSingleItem = {
			title: "tasks",
			testId: "tasks-item",
			to: "/tasks",
		};

		return { coursesItem, tasksItem, roomsItem };
	};

	describe("general matching", () => {
		describe("when route path is different from item.to", () => {
			const setupDifferentPath = () =>
				setup({
					path: "/rooms",
					name: "rooms",
				});

			it("should not be active", async () => {
				const { tasksItem } = await setupDifferentPath();
				const { isActive } = mountSidebarSelection(tasksItem);

				expect(isActive.value).toBe(false);
			});
		});

		describe("when route path is equal to item.to", () => {
			const setupEqualPath = () =>
				setup({
					path: "/tasks",
					name: "tasks",
				});

			it("should be active", async () => {
				const { tasksItem } = await setupEqualPath();
				const { isActive } = mountSidebarSelection(tasksItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when route path starts with item.to", () => {
			it("should be active", async () => {
				router.currentRoute.value = {
					...router.currentRoute.value,
					path: "/tasks/0000dcfbfb5c7a3f00bf21ba",
					name: "task-id",
					fullPath: "/tasks/0000dcfbfb5c7a3f00bf21ba",
				};

				const tasksItem: SidebarSingleItem = {
					title: "tasks",
					testId: "tasks-item",
					to: "/tasks",
				};

				const { isActive } = mountSidebarSelection(tasksItem);

				expect(isActive.value).toBe(true);
			});
		});
	});

	describe("rooms item", () => {
		describe("when rooms route is matched", () => {
			const setupRoomsRoute = () =>
				setup({
					path: "/rooms",
					name: "rooms",
				});

			it("should be active", async () => {
				const { roomsItem } = await setupRoomsRoute();
				const { isActive } = mountSidebarSelection(roomsItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when room details route is matched", () => {
			const setupRoomDetailsRoute = () =>
				setup({
					path: "/rooms/0000dcfbfb5c7a3f00bf21ab",
					name: "room-details",
				});

			describe("and resource is a room", () => {
				const setupIsRoom = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.ROOM;

					return setupRoomDetailsRoute();
				};

				it("should be active", async () => {
					const { roomsItem } = await setupIsRoom();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and resource is something else", () => {
				const setupIsOther = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupRoomDetailsRoute();
				};

				it("should not be active", async () => {
					const { roomsItem } = await setupIsOther();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(false);
				});
			});
		});

		describe("when board details path is matched", () => {
			const setupBoardDetailsRoute = () =>
				setup({
					path: "/boards/0000dcfbfb5c7a3f00bf21ac",
					name: "boards-id",
				});

			describe("and board context is a room", () => {
				const setupIsRoom = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.Room),
						})
					);

					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.ROOM;

					return await setupBoardDetailsRoute();
				};

				it("should be active", async () => {
					const { roomsItem } = await setupIsRoom();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and board context is something else", () => {
				const setupIsOther = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupBoardDetailsRoute();
				};

				it("should not be active", async () => {
					const { roomsItem } = await setupIsOther();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(false);
				});
			});
		});

		describe("when folder details path is matched", () => {
			const setupFolderDetailsRoute = () =>
				setup({
					path: "/folder/123",
					name: "folder-id",
				});

			describe("and folder context is a room", () => {
				const setupIsRoom = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.Room),
						})
					);

					return await setupFolderDetailsRoute();
				};

				it("should be active", async () => {
					const { roomsItem } = await setupIsRoom();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and folder context is something else", () => {
				const setupIsOther = () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.Course),
						})
					);

					return setupFolderDetailsRoute();
				};

				it("should not be active", async () => {
					const { roomsItem } = await setupIsOther();
					const { isActive } = mountSidebarSelection(roomsItem);

					expect(isActive.value).toBe(false);
				});
			});
		});
	});

	describe("courses item", () => {
		describe("when course-room-overview route is matched", () => {
			const setupOverviewRoute = () =>
				setup({
					path: "/rooms/courses-overview",
					name: "course-room-overview",
				});

			it("should be active", async () => {
				const { coursesItem } = await setupOverviewRoute();
				const { isActive } = mountSidebarSelection(coursesItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when course-room-list route is matched", () => {
			const setupListRoute = () =>
				setup({
					path: "/rooms/courses-list",
					name: "course-room-list",
				});

			it("should be active", async () => {
				const { coursesItem } = await setupListRoute();
				const { isActive } = mountSidebarSelection(coursesItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when room details route is matched", () => {
			const setupRoomDetailsRoute = () =>
				setup({
					path: "/rooms/0000dcfbfb5c7a3f00bf21ab",
					name: "room-details",
				});

			describe("and resource is a course room", () => {
				const setupIsCourseRoom = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.COURSE_ROOM;

					return setupRoomDetailsRoute();
				};

				it("should be active", async () => {
					const { coursesItem } = await setupIsCourseRoom();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and resource is something else", () => {
				const setupIsOther = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupRoomDetailsRoute();
				};

				it("should not be active", async () => {
					const { coursesItem } = await setupIsOther();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(false);
				});
			});
		});

		describe("when board details path is matched", () => {
			const setupBoardDetailsRoute = () =>
				setup({
					path: "/boards/0000dcfbfb5c7a3f00bf21ac",
					name: "boards-id",
				});

			describe("and board context is a course", () => {
				const setupCourseContext = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.Course),
						})
					);

					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.COURSE_ROOM;

					return await setupBoardDetailsRoute();
				};

				it("should be active", async () => {
					const { coursesItem } = await setupCourseContext();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and board context is a user", () => {
				const setupUserContext = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.User),
						})
					);

					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return await setupBoardDetailsRoute();
				};

				it("should not be active", async () => {
					const { coursesItem } = await setupUserContext();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(false);
				});
			});
		});

		describe("when folder details path is matched", () => {
			const setupFolderDetailsRoute = () =>
				setup({
					path: "/folder/123",
					name: "folder-id",
				});

			describe("and folder context is a course", () => {
				const setupCourseContext = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.Course),
						})
					);

					return await setupFolderDetailsRoute();
				};

				it("should be active", async () => {
					const { coursesItem } = await setupCourseContext();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and folder context is something else", () => {
				const setupIsOther = async () => {
					mockedUseSharedBoardPageInformation.mockReturnValue(
						createSharedPageInformationMock({
							contextType: computed(() => BoardContextType.User),
						})
					);

					return await setupFolderDetailsRoute();
				};

				it("should not be active", async () => {
					const { coursesItem } = await setupIsOther();
					const { isActive } = mountSidebarSelection(coursesItem);

					expect(isActive.value).toBe(false);
				});
			});
		});
	});
});
