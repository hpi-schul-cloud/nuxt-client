import ClassOverview from "./ClassOverview.page.vue";
import { ConfigResponse, Permission, SchulcloudTheme } from "@/serverApi/v3";
import GroupModule from "@/store/group";
import SchoolsModule from "@/store/schools";
import { ClassRootType } from "@/store/types/class-info";
import { Pagination } from "@/store/types/commons";
import { School, Year } from "@/store/types/schools";
import { SortOrder } from "@/store/types/sort-order.enum";
import { GROUP_MODULE_KEY, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import {
	classInfoFactory,
	courseFactory,
	createTestAppStoreWithPermissions,
	createTestEnvStore,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { Router, useRoute, useRouter } from "vue-router";
import { VBtn, VDataTableServer } from "vuetify/lib/components/index";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));
const useRouteMock = <Mock>useRoute;
const useRouterMock = <Mock>useRouter;

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle?: string, parentTitle?: string) =>
				[pageTitle, parentTitle, "dBildungscloud"].filter(Boolean).join(" - "),
		}) as typeof import("@/utils/pageTitle")
);

type Tab = "current" | "next" | "archive";

type CreateWrapperOptions = {
	groupModuleGetters?: Partial<GroupModule>;
	schoolsModuleGetters?: Partial<SchoolsModule>;
	props?: { tab: Tab };
	userPermissions?: Permission[];
	envs?: Partial<ConfigResponse>;
};

const createWrapper = ({
	groupModuleGetters = {},
	schoolsModuleGetters = {},
	props = { tab: "current" as Tab },
	userPermissions,
	envs = {},
}: CreateWrapperOptions) => {
	const route = { query: { tab: "current" } };
	useRouteMock.mockReturnValue(route);
	const router = createMock<Router>();
	useRouterMock.mockReturnValue(router);

	const defaultPermissions = [Permission.ClassEdit, Permission.ClassCreate];

	const groupModule = createModuleMocks(GroupModule, {
		getClasses: [
			classInfoFactory.build(),
			classInfoFactory.build({
				externalSourceName: undefined,
				type: ClassRootType.Class,
				teacherNames: ["Test Teacher"],
				isUpgradable: true,
			}),
		],
		getPagination: {
			limit: 10,
			skip: 0,
			total: 30,
		},
		...groupModuleGetters,
	});

	setActivePinia(createTestingPinia({ stubActions: false }));
	createTestAppStoreWithPermissions(userPermissions ?? defaultPermissions);

	const schoolModule = createModuleMocks(SchoolsModule, {
		getSchool: {
			years: {
				schoolYears: [],
				nextYear: {
					name: "2024/25",
				} as Year,
				activeYear: {
					name: "2023/24",
				} as Year,
				lastYear: {} as Year,
			},
		} as unknown as School,
		...schoolsModuleGetters,
	});

	createTestEnvStore({
		FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
		...envs,
	});

	const wrapper = mount(ClassOverview, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n(), vueDompurifyHTMLPlugin],
			provide: {
				[GROUP_MODULE_KEY.valueOf()]: groupModule,
				[SCHOOLS_MODULE_KEY.valueOf()]: schoolModule,
			},
			stubs: {
				EndCourseSyncDialog: true,
			},
			mocks: {
				t: (key: string, placeholders: Record<string, string> = {}) =>
					`${key}|${Object.values(placeholders || {}).join("|")}`,
			},
		},
		props,
	});

	return {
		wrapper,
		route,
		router,
		groupModule,
		schoolModule,
	};
};

const findTableComponent = (wrapper: VueWrapper) =>
	wrapper.findComponent<typeof VDataTableServer>('[data-testid="admin-class-table"]');

describe("ClassOverview", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("general", () => {
		const setup = () => createWrapper({});

		it("should mount", () => {
			const { wrapper } = setup();
			expect(wrapper.exists()).toBe(true);
		});

		describe("onMounted", () => {
			describe("when loading the page", () => {
				it("should load the classes", async () => {
					const { groupModule } = setup();

					await nextTick();

					expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
				});
			});
		});
	});

	describe("when there are classes or groups to display", () => {
		describe("classes", () => {
			const setup = () => {
				const classes = [
					classInfoFactory.build(),
					classInfoFactory.build({
						externalSourceName: undefined,
						type: ClassRootType.Class,
						isUpgradable: true,
					}),
				];

				const { wrapper } = createWrapper({
					groupModuleGetters: {
						getClasses: classes,
					},
				});

				return { wrapper, classes };
			};

			it("should display the entries in the table", () => {
				const { classes, wrapper } = setup();

				const table = wrapper.findComponent<typeof VDataTableServer>('[data-testid="admin-class-table"]');

				expect(table.props("items")).toEqual(classes);
			});
		});

		describe("onUpdateSortBy", () => {
			describe("when changing the sortBy", () => {
				const setup = () => {
					const sortBy = { key: "externalSourceName" };

					const { wrapper, groupModule } = createWrapper({});

					return {
						sortBy,
						wrapper,
						groupModule,
					};
				};

				it("should call store to change sort by", async () => {
					const { sortBy, wrapper, groupModule } = setup();

					findTableComponent(wrapper).vm.$emit("update:sortBy", [sortBy]);
					await nextTick();

					expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
					expect(groupModule.setSortBy).toHaveBeenCalledWith(sortBy.key);
				});
			});
		});

		describe("updateSortOrder", () => {
			describe("when changing the sort order", () => {
				const setup = () => {
					const sortBy = { key: "externalSourceName", order: "desc" };

					const { wrapper, groupModule } = createWrapper({});

					return {
						sortBy,
						wrapper,
						groupModule,
					};
				};

				it("should call store to change sort order", async () => {
					const { sortBy, wrapper, groupModule } = setup();

					findTableComponent(wrapper).vm.$emit("update:sortBy", [sortBy]);
					await nextTick();

					expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
					expect(groupModule.setSortOrder).toHaveBeenCalledWith(SortOrder.DESC);
				});
			});
		});

		describe("onUpdateItemsPerPage", () => {
			describe("when changing the number of items per page", () => {
				const setup = () => {
					const itemsPerPage = 20;

					const pagination: Pagination = {
						limit: 10,
						skip: 0,
						total: 30,
					};

					const { wrapper, groupModule } = createWrapper({
						groupModuleGetters: {
							getPagination: {
								limit: 10,
								skip: 0,
								total: 30,
							},
						},
					});

					return {
						itemsPerPage,
						pagination,
						wrapper,
						groupModule,
					};
				};

				it("should call store to change the limit in pagination", async () => {
					const { itemsPerPage, wrapper, groupModule, pagination } = setup();

					findTableComponent(wrapper).vm.$emit("update:itemsPerPage", itemsPerPage);
					await nextTick();

					expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
					expect(groupModule.setPagination).toHaveBeenCalledWith({
						...pagination,
						limit: itemsPerPage,
					});
				});
			});
		});

		describe("onUpdateCurrentPage", () => {
			describe("when changing the table page", () => {
				const setup = () => {
					const page = 2;
					const pagination: Pagination = {
						limit: 10,
						skip: 0,
						total: 30,
					};

					pagination.skip = (page - 1) * pagination.limit;

					const { wrapper, groupModule } = createWrapper({});

					return {
						page,
						pagination,
						wrapper,
						groupModule,
					};
				};

				it("should call store to update current page", async () => {
					const { page, wrapper, groupModule, pagination } = setup();

					findTableComponent(wrapper).vm.$emit("update:page", page);
					await nextTick();

					expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
					expect(groupModule.setPage).toHaveBeenCalledWith(page);
					expect(groupModule.setPagination).toHaveBeenCalledWith(pagination);
				});
			});
		});
	});

	describe("action buttons", () => {
		describe("when user has no edit permission", () => {
			const setup = () => {
				const { wrapper } = createWrapper({
					props: { tab: "current" },
					userPermissions: [],
				});

				return {
					wrapper,
				};
			};

			it("should not render any button", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="legacy-class-table-manage-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-edit-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-delete-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-successor-btn"]').exists()).toEqual(false);

				return {
					wrapper,
				};
			});
		});

		describe("when legacy classes are available", () => {
			const setup = () => createWrapper({});

			it("should render 4 buttons", () => {
				const { wrapper } = setup();

				const manageBtn = wrapper.find('[data-testid="legacy-class-table-manage-btn"]');

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find('[data-testid="class-table-delete-btn"]');

				const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');

				expect(manageBtn.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeTruthy();
				expect(deleteBtn.exists()).toBeTruthy();
				expect(successorBtn.exists()).toBeTruthy();
			});
		});

		describe("when no classes are available", () => {
			const setup = () =>
				createWrapper({
					groupModuleGetters: { getClasses: [classInfoFactory.build()] },
				});

			it("should render only manage button which refers to members page", () => {
				const { wrapper } = setup();

				const manageBtn = wrapper.find('[data-testid="class-table-members-manage-btn"]');

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find('[data-testid="class-table-delete-btn"]');

				const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');

				expect(manageBtn.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeFalsy();
				expect(deleteBtn.exists()).toBeFalsy();
				expect(successorBtn.exists()).toBeFalsy();
			});
		});

		describe("when clicking on the manage class button", () => {
			describe("when group class root type is class", () => {
				const setup = () => {
					const { wrapper, groupModule } = createWrapper({});

					const classId: string = groupModule.getClasses[1].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to legacy class manage page", () => {
					const { wrapper, classId } = setup();

					const manageBtn = wrapper.find('[data-testid="legacy-class-table-manage-btn"]');

					expect(manageBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/manage`);
					expect(manageBtn.findComponent({ name: "router-link" }).exists()).toBeFalsy();
				});
			});

			describe("when class root type is group", () => {
				const setup = () => {
					const { wrapper, groupModule } = createWrapper({});

					const classId: string = groupModule.getClasses[0].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to group class members page", () => {
					const { wrapper } = setup();

					const manageBtn = wrapper.findComponent<typeof VBtn>('[data-testid="class-table-members-manage-btn"]');

					expect(manageBtn.attributes().href).toBeUndefined();
					expect(manageBtn.props("to")).toBeDefined();
				});
			});
		});

		describe("when clicking on the edit class button", () => {
			const setup = () => {
				const { wrapper, groupModule } = createWrapper({});

				const classId: string = groupModule.getClasses[1].id;

				return {
					wrapper,
					classId,
				};
			};

			it("should redirect to legacy class edit page", () => {
				const { wrapper, classId } = setup();

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				expect(editBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/edit`);
			});
		});

		describe("when class is upgradable", () => {
			describe("when clicking on the upgrade class button", () => {
				const setup = () => {
					const { wrapper, groupModule } = createWrapper({});

					const classId: string = groupModule.getClasses[1].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to legacy class upgrade page", () => {
					const { wrapper, classId } = setup();

					const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');

					expect(successorBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/createSuccessor`);
				});
			});
		});

		describe("when class is not upgradable", () => {
			const setup = () => {
				const { wrapper } = createWrapper({
					groupModuleGetters: {
						getClasses: [
							classInfoFactory.build({
								externalSourceName: undefined,
								type: ClassRootType.Class,
								isUpgradable: false,
							}),
						],
					},
				});

				return {
					wrapper,
				};
			};

			it("should display the upgrade button as disabled", () => {
				const { wrapper } = setup();

				const successorBtn = wrapper.findComponent<typeof VBtn>('[data-testid="class-table-successor-btn"]');

				expect(successorBtn.props("disabled")).toEqual(true);
			});
		});

		describe("when clicking on the delete class button", () => {
			const setup = () => {
				const { wrapper } = createWrapper({});

				return {
					wrapper,
				};
			};

			it("should open the delete dialog", async () => {
				const { wrapper } = setup();

				await wrapper.find('[data-testid="class-table-delete-btn"]').trigger("click");
				await nextTick();

				const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
				expect(dialog.vm.isOpen).toBe(true);
			});
		});

		describe("when delete dialog is open", () => {
			const setup = () => {
				const { wrapper, groupModule } = createWrapper({});

				return {
					wrapper,
					groupModule,
				};
			};

			describe("when clicking on cancel button", () => {
				it("should not delete class", async () => {
					const { wrapper, groupModule } = setup();

					await wrapper.find('[data-testid="class-table-delete-btn"]').trigger("click");

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });

					await dialog.findComponent('[data-testid="dialog-cancel"').trigger("click");

					expect(groupModule.deleteClass).not.toHaveBeenCalled();
				});
			});

			describe("when clicking on confirm button", () => {
				it("should delete class", async () => {
					const { wrapper, groupModule } = setup();

					await wrapper.find('[data-testid="class-table-delete-btn"]').trigger("click");

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });

					await dialog.findComponent('[data-testid="dialog-confirm"').trigger("click");

					expect(groupModule.deleteClass).toHaveBeenCalled();
				});
			});
		});
	});

	describe("tabs", () => {
		describe("when loading page", () => {
			const setup = () => {
				const { wrapper } = createWrapper({});

				return {
					wrapper,
				};
			};

			it("should show 3 tabs", () => {
				const { wrapper } = setup();

				const nextYearTab = wrapper.find('[data-testid="admin-class-next-year-tab"]');

				const currentYearTab = wrapper.find('[data-testid="admin-class-current-year-tab"]');

				const previousYearTab = wrapper.find('[data-testid="admin-class-previous-years-tab"]');

				expect(nextYearTab.exists()).toBeTruthy();
				expect(currentYearTab.exists()).toBeTruthy();
				expect(previousYearTab.exists()).toBeTruthy();
			});

			it("should have current year tab active", () => {
				const { wrapper } = setup();

				const currentYearTab = wrapper.find('[data-testid="admin-class-current-year-tab"]');

				expect(currentYearTab.classes()).toContain("v-tab--selected");
			});
		});

		describe("when clicking on a tab", () => {
			const setup = () => {
				const { wrapper, route, router, groupModule } = createWrapper({});

				return {
					wrapper,
					route,
					router,
					groupModule,
				};
			};

			it("should replace the route to the given tab ", async () => {
				const { wrapper, router } = setup();

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				expect(router.replace).toHaveBeenCalledWith({
					query: { tab: "next" },
				});
			});
		});

		describe("when clicking on next year tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = createWrapper({
					props: { tab: "next" },
				});

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load classes of next year", async () => {
				const { wrapper, groupModule } = setup();

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "nextYear",
				});
			});
		});

		describe("when clicking on previous years tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = createWrapper({
					props: { tab: "archive" },
				});

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load classes of previous years", async () => {
				const { wrapper, groupModule } = setup();

				await wrapper.find('[data-testid="admin-class-previous-years-tab"]').trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "previousYears",
				});
			});
		});

		describe("when clicking on current year tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = createWrapper({});

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load groups and classes of current year", async () => {
				const { wrapper, groupModule } = setup();

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				await wrapper.find('[data-testid="admin-class-current-year-tab"]').trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "currentYear",
				});
			});
		});
	});

	describe("addClass", () => {
		describe("when create permission is present", () => {
			const setup = () => {
				const { wrapper } = createWrapper({
					props: {
						tab: "current",
					},
					userPermissions: [Permission.ClassCreate],
				});

				return {
					wrapper,
				};
			};

			it("should render add class button", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="admin-class-add-button"]').exists()).toEqual(true);
			});

			describe("when clicking on add class buttton", () => {
				const setup = () => {
					const { wrapper } = createWrapper({});

					return {
						wrapper,
					};
				};

				it("should redirect to legacy create class page", () => {
					const { wrapper } = setup();

					const addClassBtn = wrapper.find('[data-testid="admin-class-add-button"]');

					expect(addClassBtn.attributes().href).toStrictEqual("/administration/classes/create");
				});
			});
		});

		describe("when create permission is not present", () => {
			const setup = () => {
				const { wrapper } = createWrapper({
					props: {
						tab: "current",
					},
					userPermissions: [],
				});

				return {
					wrapper,
				};
			};

			it("should not render add class button", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="admin-class-add-button"]').exists()).toEqual(false);
			});

			it("should render info alert", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="admin-class-info-alert"]').exists()).toEqual(true);
			});
		});
	});

	describe("onClickEndSyncIcon", () => {
		const setup = () => {
			const classes = [
				classInfoFactory.build({
					synchronizedCourses: [courseFactory.build()],
				}),
			];

			const { wrapper } = createWrapper({
				groupModuleGetters: {
					getClasses: classes,
				},
			});

			return { wrapper, classes };
		};

		it("should open end course sync dialog", async () => {
			const { wrapper } = setup();

			await wrapper.find('[data-testid="class-table-end-course-sync-btn"]').trigger("click");

			const dialog = wrapper.findComponent({ name: "EndCourseSyncDialog" });
			expect(dialog.vm.isOpen).toBe(true);
		});
	});

	describe("when hint text is shown", () => {
		const setup = (envs: Partial<ConfigResponse>) => {
			const classes = [
				classInfoFactory.build({
					synchronizedCourses: [courseFactory.build()],
				}),
			];

			const { wrapper } = createWrapper({
				groupModuleGetters: {
					getClasses: classes,
				},
				props: { tab: "current" },
				envs,
			});

			return { wrapper, classes };
		};

		it.each([
			[SchulcloudTheme.Default, "Dataport"],
			[SchulcloudTheme.Brb, "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg"],
			[SchulcloudTheme.N21, "Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)"],
		])("uses %s-instance specific text placeholders", async (theme, expected) => {
			const { wrapper } = setup({ SC_THEME: theme });

			await nextTick();

			expect(wrapper.text()).toContain(expected);
		});
	});
});
