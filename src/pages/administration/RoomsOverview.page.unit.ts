import { groupModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { SortOrder } from "@/store/types/sort-order.enum";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	courseInfoDataResponseFactory,
	envsFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useCourseApi, useCourseList } from "@data-room";
import {
	EndCourseSyncDialog,
	StartExistingCourseSyncDialog,
} from "@feature-course-sync";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { VDataTableServer } from "vuetify/lib/components/index";
import RoomsOverview from "./RoomsOverview.page.vue";
import { Mock } from "vitest";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

vi.mock("@data-room", () => {
	return {
		useCourseList: vi.fn(),
		useCourseApi: vi.fn(),
	};
});

const useRouteMock = <Mock>useRoute;
const useRouterMock = <Mock>useRouter;

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

describe("RoomsOverview", () => {
	let useCourseListMock: DeepMocked<ReturnType<typeof useCourseList>>;
	let useCourseApiMock: DeepMocked<ReturnType<typeof useCourseApi>>;

	const createWrapper = (
		tab: "current" | "archive" = "current",
		envModuleGetters: Partial<EnvConfigModule> = {}
	) => {
		const route = { query: { tab } };
		useRouteMock.mockReturnValue(route);
		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["COURSE_ADMINISTRATION".toLowerCase()],
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
				FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED: true,
			}),
			...envModuleGetters,
		});

		const wrapper = mount(RoomsOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
				stubs: {
					StartExistingCourseSyncDialog: true,
					EndCourseSyncDialog: true,
				},
			},
			props: {
				tab,
			},
		});
		return {
			wrapper,
			route,
			router,
			envConfigModule,
		};
	};

	const findTableComponent = (wrapper: VueWrapper) => {
		return wrapper.findComponent<typeof VDataTableServer>(
			'[data-testid="admin-rooms-table"]'
		);
	};

	beforeEach(() => {
		useCourseListMock = createMock<ReturnType<typeof useCourseList>>({
			isLoading: ref(),
			pagination: ref({
				limit: 10,
				skip: 0,
				total: 10,
			}),
			page: ref(),
			courses: ref(),
		});

		useCourseApiMock = createMock<ReturnType<typeof useCourseApi>>({
			startSynchronization: vi.fn(),
			stopSynchronization: vi.fn(),
		});

		vi.mocked(useCourseList).mockReturnValue(useCourseListMock);
		vi.mocked(useCourseApi).mockReturnValue(useCourseApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("general", () => {
		const setup = () => createWrapper();

		it("should mount", () => {
			const { wrapper } = setup();
			expect(wrapper.exists()).toBe(true);
		});

		describe("breadcrumbs", () => {
			it("should render static breadcrumbs", () => {
				const { wrapper } = setup();

				const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

				expect(breadcrumbs.at(0)?.text()).toEqual(
					"pages.administration.index.title"
				);
				expect(breadcrumbs.at(1)?.text()).toEqual(
					"pages.administration.rooms.index.title"
				);
			});
		});

		describe("onMounted", () => {
			describe("when loading the page", () => {
				it("should load the courses", async () => {
					setup();

					await nextTick();

					expect(useCourseList).toHaveBeenCalled();
				});
			});
		});
	});

	describe("when there are courses to display", () => {
		describe("courses", () => {
			const setup = () => {
				useCourseListMock.courses.value =
					courseInfoDataResponseFactory.buildList(10, {
						syncedGroup: "group",
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					});

				useCourseListMock.page.value = 1;

				useCourseListMock.pagination.value = {
					total: 10,
					skip: 0,
					limit: 10,
				};

				const { wrapper } = createWrapper();

				return { wrapper, useCourseListMock };
			};

			it("should display the entries in the table", async () => {
				const { useCourseListMock, wrapper } = setup();

				const table = wrapper.findComponent<typeof VDataTableServer>(
					'[data-testid="admin-rooms-table"]'
				);

				expect(table.props("items")).toEqual(useCourseListMock.courses.value);
			});
		});

		describe("onUpdateSortBy", () => {
			describe("when changing the sortBy", () => {
				const setup = () => {
					const sortBy = { key: "name" };

					const { wrapper } = createWrapper();

					return {
						sortBy,
						wrapper,
					};
				};

				it("should call composable to change sort by", async () => {
					const { sortBy, wrapper } = setup();

					findTableComponent(wrapper).vm.$emit("update:sortBy", [sortBy]);
					await nextTick();

					expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
					expect(useCourseListMock.setSortBy).toHaveBeenCalledWith(sortBy.key);
				});
			});
		});

		describe("updateSortOrder", () => {
			describe("when changing the sort order", () => {
				const setup = () => {
					const sortBy = { key: "name", order: "desc" };

					const { wrapper } = createWrapper();

					return {
						sortBy,
						wrapper,
						groupModule,
					};
				};

				it("should call composable to change sort order", async () => {
					const { sortBy, wrapper } = setup();

					findTableComponent(wrapper).vm.$emit("update:sortBy", [sortBy]);
					await nextTick();

					expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
					expect(useCourseListMock.setSortOrder).toHaveBeenCalledWith(
						SortOrder.DESC
					);
				});
			});
		});

		describe("onUpdateItemsPerPage", () => {
			describe("when changing the number of items per page", () => {
				const setup = () => {
					const { wrapper } = createWrapper();
					const itemsPerPage = 20;

					useCourseListMock.pagination.value = {
						limit: 10,
						skip: 0,
						total: 30,
					};

					return {
						itemsPerPage,
						useCourseListMock,
						wrapper,
					};
				};

				it("should call composable to change the limit in pagination", async () => {
					const { itemsPerPage, wrapper, useCourseListMock } = setup();

					findTableComponent(wrapper).vm.$emit(
						"update:itemsPerPage",
						itemsPerPage
					);
					await nextTick();

					expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
					expect(useCourseListMock.setPagination).toHaveBeenCalledWith({
						...useCourseListMock.pagination.value,
						limit: itemsPerPage,
					});
				});
			});
		});

		describe("onUpdateCurrentPage", () => {
			describe("when changing the table page", () => {
				const setup = () => {
					const page = 2;
					useCourseListMock.pagination.value = {
						limit: 10,
						skip: 0,
						total: 30,
					};

					const { wrapper } = createWrapper();

					return {
						page,
						useCourseListMock,
						wrapper,
					};
				};

				it("should call composable to update current page", async () => {
					const { page, wrapper, useCourseListMock } = setup();

					findTableComponent(wrapper).vm.$emit("update:page", page);
					await nextTick();

					expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
					expect(useCourseListMock.setPage).toHaveBeenCalledWith(page);
					expect(useCourseListMock.setPagination).toHaveBeenCalledWith({
						...useCourseListMock.pagination.value,
						skip: 10,
					});
				});
			});
		});
	});

	describe("action buttons", () => {
		describe("when courses are available", () => {
			const setup = () => {
				useCourseListMock.courses.value =
					courseInfoDataResponseFactory.buildList(10, {
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					});

				const envConfigModule = createModuleMocks(EnvConfigModule, {
					getEnv: envsFactory.build({
						FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
						FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED: true,
					}),
				});

				const { wrapper } = createWrapper("current", envConfigModule);

				return {
					wrapper,
				};
			};

			it("should render the edit, delete and start sync buttons", () => {
				const { wrapper } = setup();

				const editBtn = wrapper.find('[data-testid="course-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="course-table-delete-btn"]'
				);

				const startSyncButton = wrapper.find(
					'[data-testid="course-table-start-course-sync-btn"]'
				);

				const endSyncButton = wrapper.find(
					'[data-testid="course-table-end-course-sync-btn"]'
				);

				expect(startSyncButton.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeTruthy();
				expect(deleteBtn.exists()).toBeTruthy();
				expect(endSyncButton.exists()).toBeFalsy();
			});
		});

		describe("when synchronized courses are available", () => {
			const setup = () => {
				useCourseListMock.courses.value =
					courseInfoDataResponseFactory.buildList(10, {
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
						syncedGroup: "GroupName",
					});

				const envConfigModule = createModuleMocks(EnvConfigModule, {
					getEnv: envsFactory.build({
						FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
						FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED: true,
					}),
				});

				const { wrapper } = createWrapper("current", envConfigModule);

				return {
					wrapper,
				};
			};

			it("should render the edit, delete and end sync buttons", () => {
				const { wrapper } = setup();

				const editBtn = wrapper.find('[data-testid="course-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="course-table-delete-btn"]'
				);

				const endSyncButton = wrapper.find(
					'[data-testid="course-table-end-course-sync-btn"]'
				);

				const startSyncButton = wrapper.find(
					'[data-testid="course-table-start-course-sync-btn"]'
				);

				expect(endSyncButton.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeTruthy();
				expect(deleteBtn.exists()).toBeTruthy();
				expect(startSyncButton.exists()).toBeFalsy();
			});
		});

		describe("when no courses are available", () => {
			const setup = () => createWrapper("archive");

			it("should render no buttons", () => {
				const { wrapper } = setup();

				const editBtn = wrapper.find('[data-testid="course-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="course-table-delete-btn"]'
				);

				const startSyncButton = wrapper.find(
					'[data-testid="course-table-start-course-sync-btn"]'
				);

				expect(editBtn.exists()).toBeFalsy();
				expect(deleteBtn.exists()).toBeFalsy();
				expect(startSyncButton.exists()).toBeFalsy();
			});
		});

		describe("when feature Schulconnex Sync is disabled", () => {
			const setup = () => {
				useCourseListMock.courses.value =
					courseInfoDataResponseFactory.buildList(10, {
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					});

				const envConfigModule = createModuleMocks(EnvConfigModule, {
					getEnv: envsFactory.build({
						FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: false,
						FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED: true,
					}),
				});

				const { wrapper } = createWrapper("current", envConfigModule);

				return {
					wrapper,
				};
			};

			it("should render 2 buttons", () => {
				const { wrapper } = setup();

				const editBtn = wrapper.find('[data-testid="course-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="course-table-delete-btn"]'
				);

				const startSyncButton = wrapper.find(
					'[data-testid="course-table-start-course-sync-btn"]'
				);

				const endSyncButton = wrapper.find(
					'[data-testid="course-table-end-course-sync-btn"]'
				);

				expect(startSyncButton.element.id).toBeFalsy();
				expect(endSyncButton.exists()).toBeFalsy();
				expect(editBtn.exists()).toBeTruthy();
				expect(deleteBtn.exists()).toBeTruthy();
			});
		});

		describe("when clicking on the edit course button", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					}),
				];

				const { wrapper } = createWrapper("archive");

				const courseId: string = useCourseListMock.courses.value[0].id;

				return {
					wrapper,
					courseId,
				};
			};

			it("should redirect to legacy course edit page", async () => {
				const { wrapper, courseId } = setup();

				const editBtn = wrapper.find('[data-testid="course-table-edit-btn"]');

				expect(editBtn.attributes().href).toStrictEqual(
					`/courses/${courseId}/edit?redirectUrl=/administration/rooms/new`
				);
			});
		});

		describe("when clicking on the delete course button", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					}),
				];

				const { wrapper } = createWrapper();

				return {
					wrapper,
				};
			};

			it("should open the delete dialog", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="course-table-delete-btn"]')
					.trigger("click");
				await nextTick();

				const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
				expect(dialog.vm.isOpen).toBe(true);
			});
		});

		describe("when clicking on the sync course button", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					}),
				];

				const { wrapper } = createWrapper("archive");

				const courseId: string = useCourseListMock.courses.value[0].id;

				return {
					wrapper,
					courseId,
				};
			};

			it("should open the StartExistingCourseSyncDialog ", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="course-table-start-course-sync-btn"]')
					.trigger("click");
				await nextTick();

				const dialog = wrapper.findComponent({
					name: "StartExistingCourseSyncDialog",
				});

				expect(dialog.vm.isOpen).toBe(true);
			});
		});

		describe("when clicking on the end sync course button", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
						syncedGroup: "GroupName",
					}),
				];

				const { wrapper } = createWrapper("archive");

				const courseId: string = useCourseListMock.courses.value[0].id;

				return {
					wrapper,
					courseId,
				};
			};

			it("should open the EndCourseSyncDialog ", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="course-table-end-course-sync-btn"]')
					.trigger("click");
				await nextTick();

				const dialog = wrapper.findComponent({
					name: "EndCourseSyncDialog",
				});

				expect(dialog.vm.isOpen).toBe(true);
			});
		});

		describe("when delete dialog is open", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					}),
				];

				const { wrapper } = createWrapper();

				return {
					wrapper,
					useCourseListMock,
				};
			};

			describe("when clicking on cancel button", () => {
				it("should not delete course", async () => {
					const { wrapper } = setup();

					await wrapper
						.find('[data-testid="course-table-delete-btn"]')
						.trigger("click");

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });

					await dialog
						.findComponent('[data-testid="dialog-cancel"')
						.trigger("click");

					expect(useCourseListMock.deleteCourse).not.toHaveBeenCalled();
				});
			});

			describe("when clicking on confirm button", () => {
				it("should delete course", async () => {
					const { wrapper, useCourseListMock } = setup();

					await wrapper
						.find('[data-testid="course-table-delete-btn"]')
						.trigger("click");

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });

					await dialog
						.findComponent('[data-testid="dialog-confirm"')
						.trigger("click");

					expect(useCourseListMock.deleteCourse).toHaveBeenCalled();
				});
			});
		});

		describe("when start sync dialog emit succeed", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
					}),
				];

				const { wrapper } = createWrapper();

				return {
					wrapper,
					useCourseListMock,
				};
			};

			it("should fetch courses", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="course-table-start-course-sync-btn"]')
					.trigger("click");
				await nextTick();

				wrapper.getComponent(StartExistingCourseSyncDialog).emitted("success");
				await nextTick();

				expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
			});
		});

		describe("when end sync dialog emit succeed", () => {
			const setup = () => {
				useCourseListMock.courses.value = [
					courseInfoDataResponseFactory.build({
						classNames: ["1A, 1B, 1C"],
						teacherNames: ["Lehrer", "Vertretung", "Lehrer Mock"],
						syncedGroup: "GroupName",
					}),
				];

				const { wrapper } = createWrapper();

				return {
					wrapper,
					useCourseListMock,
				};
			};

			it("should fetch courses", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="course-table-end-course-sync-btn"]')
					.trigger("click");
				await nextTick();

				wrapper.getComponent(EndCourseSyncDialog).emitted("success");
				await nextTick();

				expect(useCourseListMock.fetchCourses).toHaveBeenCalled();
			});
		});
	});

	describe("tabs", () => {
		describe("when loading page", () => {
			const setup = () => {
				const { wrapper } = createWrapper();

				return {
					wrapper,
				};
			};

			it("should show 2 tabs", () => {
				const { wrapper } = setup();

				const currentTab = wrapper.find(
					'[data-testid="admin-course-current-tab"]'
				);

				const archiveTab = wrapper.find(
					'[data-testid="admin-course-archive-tab"]'
				);

				expect(currentTab.exists()).toBeTruthy();
				expect(archiveTab.exists()).toBeTruthy();
			});

			it("should have current tab active", () => {
				const { wrapper } = setup();

				const currentTab = wrapper.find(
					'[data-testid="admin-course-current-tab"]'
				);

				expect(currentTab.classes()).toContain("v-tab--selected");
			});
		});

		describe("when clicking on a tab", () => {
			const setup = () => {
				const { wrapper, route, router } = createWrapper();

				return {
					wrapper,
					route,
					router,
					useCourseListMock,
				};
			};

			it("should replace the route to the given tab ", async () => {
				const { wrapper, router } = setup();

				await wrapper
					.find('[data-testid="admin-course-current-tab"]')
					.trigger("click");

				expect(router.replace).toHaveBeenCalledWith({
					query: { tab: "current" },
				});
			});
		});

		describe("when clicking on archive tab", () => {
			const setup = () => {
				const { wrapper, router } = createWrapper("archive");
				useCourseListMock.fetchCourses.mockResolvedValue();

				return {
					wrapper,
					router,
				};
			};

			it("should call composable to fetch courses for archive tab", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="admin-course-archive-tab"]')
					.trigger("click");
				await nextTick();

				expect(useCourseListMock.fetchCourses).toHaveBeenCalledWith("archive");
			});
		});

		describe("when clicking on current year tab", () => {
			const setup = () => {
				const { wrapper } = createWrapper();

				return {
					wrapper,
				};
			};

			it("should call composable to fetch courses of current tab", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="admin-course-archive-tab"]')
					.trigger("click");

				await wrapper
					.find('[data-testid="admin-course-current-tab"]')
					.trigger("click");

				expect(useCourseListMock.fetchCourses).toHaveBeenCalledWith("current");
			});
		});
	});

	describe("addCourse", () => {
		describe("when clicking on add course buttton", () => {
			const setup = () => {
				const { wrapper } = createWrapper();

				return {
					wrapper,
				};
			};

			it("should redirect to legacy create course page", () => {
				const { wrapper } = setup();

				const addClassBtn = wrapper.find(
					'[data-testid="admin-courses-add-button"]'
				);

				expect(addClassBtn.attributes().href).toStrictEqual(
					"/courses/add?redirectUrl=/administration/rooms/new"
				);
			});
		});
	});
});
