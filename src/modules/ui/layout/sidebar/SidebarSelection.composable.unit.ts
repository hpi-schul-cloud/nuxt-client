import { BoardContextType } from "@/types/board/BoardContext";
import { useSharedBoardPageInformation } from "@data-board";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { createMock } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, storeToRefs } from "pinia";
import { computed } from "vue";
import { RouteLocationNormalized, useRoute } from "vue-router";
import { SidebarSingleItem } from "../types";
import { useSidebarSelection } from "./SidebarSelection.composable";

jest.mock("vue-router");
const useRouteMock = <jest.Mock>useRoute;

jest.mock("@data-board/BoardPageInformation.composable");
const mockedUseSharedBoardPageInformation = jest.mocked(
	useSharedBoardPageInformation
);

describe("@ui/layout/sidebar/SidebarSelection.composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useRouteMock.mockReturnValue(
			createMock<RouteLocationNormalized>({
				path: "",
				name: "",
			})
		);

		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: jest.fn(),
			breadcrumbs: computed(() => []),
			contextType: computed(() => undefined),
			pageTitle: computed(() => "page-title"),
			roomId: computed(() => "room-id"),
			resetPageInformation: jest.fn(),
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (routeProps: { path: string; name: string }) => {
		useRouteMock.mockReturnValue(
			createMock<RouteLocationNormalized>(routeProps)
		);
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
			const setupDifferentPath = () => {
				return setup({
					path: "/rooms",
					name: "rooms",
				});
			};

			it("should not be active", () => {
				const { tasksItem } = setupDifferentPath();
				const { isActive } = useSidebarSelection(tasksItem);

				expect(isActive.value).toBe(false);
			});
		});

		describe("when route path is equal to item.to", () => {
			const setupEqualPath = () => {
				return setup({
					path: "/tasks",
					name: "tasks",
				});
			};

			it("should be active", () => {
				const { tasksItem } = setupEqualPath();
				const { isActive } = useSidebarSelection(tasksItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when route path starts with item.to", () => {
			const setupEqualPath = () => {
				return setup({
					path: "/tasks/0000dcfbfb5c7a3f00bf21ba",
					name: "task-id",
				});
			};

			it("should be active", () => {
				const { tasksItem } = setupEqualPath();
				const { isActive } = useSidebarSelection(tasksItem);

				expect(isActive.value).toBe(true);
			});
		});
	});

	describe("rooms item", () => {
		describe("when rooms route is matched", () => {
			const setupRoomsRoute = () => {
				return setup({
					path: "/rooms",
					name: "rooms",
				});
			};

			it("should be active", () => {
				const { roomsItem } = setupRoomsRoute();
				const { isActive } = useSidebarSelection(roomsItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when room details route is matched", () => {
			const setupRoomDetailsRoute = () => {
				return setup({
					path: "/rooms/0000dcfbfb5c7a3f00bf21ab",
					name: "room-details",
				});
			};

			describe("and resource is a room", () => {
				const setupIsRoom = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.ROOM;

					return setupRoomDetailsRoute();
				};

				it("should be active", () => {
					const { roomsItem } = setupIsRoom();
					const { isActive } = useSidebarSelection(roomsItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and resource is something else", () => {
				const setupIsOther = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupRoomDetailsRoute();
				};

				it("should not be active", () => {
					const { roomsItem } = setupIsOther();
					const { isActive } = useSidebarSelection(roomsItem);

					expect(isActive.value).toBe(false);
				});
			});

			describe("when board details path is matched", () => {
				const setupBoardDetailsRoute = () => {
					return setup({
						path: "/boards/0000dcfbfb5c7a3f00bf21ac",
						name: "boards-id",
					});
				};

				describe("when board context is a room", () => {
					const setupIsRoom = () => {
						const { roomVariant } = storeToRefs(useRoomDetailsStore());
						roomVariant.value = RoomVariant.ROOM;

						return setupBoardDetailsRoute();
					};

					it("should be active", () => {
						const { roomsItem } = setupIsRoom();
						const { isActive } = useSidebarSelection(roomsItem);

						expect(isActive.value).toBe(true);
					});
				});

				describe("when board context is something else", () => {
					const setupIsOther = () => {
						const { roomVariant } = storeToRefs(useRoomDetailsStore());
						roomVariant.value = undefined;

						return setupBoardDetailsRoute();
					};

					it("should not be active", () => {
						const { roomsItem } = setupIsOther();
						const { isActive } = useSidebarSelection(roomsItem);

						expect(isActive.value).toBe(false);
					});
				});
			});
		});
	});

	describe("courses item", () => {
		describe("when course-room-overview route is matched", () => {
			const setupOverviewRoute = () => {
				return setup({
					path: "/rooms/courses-overview",
					name: "course-room-list",
				});
			};

			it("should be active", () => {
				const { coursesItem } = setupOverviewRoute();
				const { isActive } = useSidebarSelection(coursesItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when course-room-list route is matched", () => {
			const setupListRoute = () => {
				return setup({
					path: "/rooms/courses-list",
					name: "course-room-list",
				});
			};

			it("should be active", () => {
				const { coursesItem } = setupListRoute();
				const { isActive } = useSidebarSelection(coursesItem);

				expect(isActive.value).toBe(true);
			});
		});

		describe("when room details route is matched", () => {
			const setupRoomDetailsRoute = () => {
				return setup({
					path: "/rooms/0000dcfbfb5c7a3f00bf21ab",
					name: "room-details",
				});
			};

			describe("and resource is a course room", () => {
				const setupIsCourseRoom = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.COURSE_ROOM;

					return setupRoomDetailsRoute();
				};

				it("should be active", () => {
					const { coursesItem } = setupIsCourseRoom();
					const { isActive } = useSidebarSelection(coursesItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("and resource is something else", () => {
				const setupIsOther = () => {
					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupRoomDetailsRoute();
				};

				it("should not be active", () => {
					const { coursesItem } = setupIsOther();
					const { isActive } = useSidebarSelection(coursesItem);

					expect(isActive.value).toBe(false);
				});
			});
		});

		describe("when board details path is matched", () => {
			const setupBoardDetailsRoute = () => {
				return setup({
					path: "/boards/0000dcfbfb5c7a3f00bf21ac",
					name: "boards-id",
				});
			};

			describe("when board context is a course", () => {
				const setupCourseContext = () => {
					mockedUseSharedBoardPageInformation.mockReturnValue({
						createPageInformation: jest.fn(),
						breadcrumbs: computed(() => []),
						contextType: computed(() => BoardContextType.Course),
						pageTitle: computed(() => "page-title"),
						roomId: computed(() => "room-id"),
						resetPageInformation: jest.fn(),
					});

					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = RoomVariant.COURSE_ROOM;

					return setupBoardDetailsRoute();
				};

				it("should be active", () => {
					const { coursesItem } = setupCourseContext();
					const { isActive } = useSidebarSelection(coursesItem);

					expect(isActive.value).toBe(true);
				});
			});

			describe("when board context is a user", () => {
				const setupUserContext = () => {
					mockedUseSharedBoardPageInformation.mockReturnValue({
						createPageInformation: jest.fn(),
						breadcrumbs: computed(() => []),
						contextType: computed(() => BoardContextType.User),
						pageTitle: computed(() => "page-title"),
						roomId: computed(() => "room-id"),
						resetPageInformation: jest.fn(),
					});

					const { roomVariant } = storeToRefs(useRoomDetailsStore());
					roomVariant.value = undefined;

					return setupBoardDetailsRoute();
				};

				it("should not be active", () => {
					const { coursesItem } = setupUserContext();
					const { isActive } = useSidebarSelection(coursesItem);

					expect(isActive.value).toBe(false);
				});
			});
		});
	});
});
