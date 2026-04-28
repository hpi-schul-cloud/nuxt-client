import ClassOverview from "./ClassOverview.page.vue";
import SchoolsModule from "@/store/schools";
import { School, Year } from "@/store/types/schools";
import { SortOrder } from "@/store/types/sort-order.enum";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import {
	classInfoFactory,
	courseFactory,
	createTestAppStoreWithPermissions,
	createTestEnvStore,
	mockComposable,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, Permission, SchulcloudTheme } from "@api-server";
import { ClassInfo, ClassRootType, useGroupClasses } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { SpeedDialMenu } from "@ui-speed-dial-menu";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VBtn, VDataTableServer } from "vuetify/components";

vi.mock("@data-group/group-classes.composable");

type Tab = "current" | "next" | "archive";

const findTableComponent = (wrapper: VueWrapper) =>
	wrapper.findComponent<typeof VDataTableServer>('[data-testid="admin-class-table"]');

describe("ClassOverview", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			userPermissions: Permission[];
			classes: ClassInfo[];
			tab: Tab;
			envs: Partial<ConfigResponse>;
		}>
	) => {
		const defaultPermissions = [Permission.CLASS_EDIT, Permission.CLASS_CREATE];
		const { userPermissions, tab, classes } = {
			userPermissions: defaultPermissions,
			tab: "current" as Tab,
			classes: [
				classInfoFactory.build(),
				classInfoFactory.build({
					externalSourceName: undefined,
					type: ClassRootType.CLASS,
					teacherNames: ["Test Teacher"],
					isUpgradable: true,
				}),
			],
			...options,
		};
		const { router } = injectRouterMock(createRouterMock());
		const route = router.currentRoute.value;

		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStoreWithPermissions(userPermissions);

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
		});

		createTestEnvStore({
			FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			...options?.envs,
		});

		const useGroupClassMock = mockComposable(useGroupClasses, {
			classes: ref(classes),
			pagination: ref({
				limit: 10,
				skip: 0,
				total: 30,
			}),
			page: ref(1),
			isFetching: computed(() => false),
		});

		vi.mocked(useGroupClasses).mockReturnValue(useGroupClassMock);

		const wrapper = mount(ClassOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
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
			props: {
				tab,
			},
		});

		return {
			useGroupClassMock,
			wrapper,
			route,
			router,
		};
	};

	describe("general", () => {
		it("should mount", () => {
			const { wrapper } = setup();
			expect(wrapper.exists()).toBe(true);
		});

		describe("onMounted", () => {
			it("should load the classes", async () => {
				const { useGroupClassMock } = setup();
				await nextTick();

				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalled();
			});
		});
	});

	describe("when there are classes or groups to display", () => {
		it("should display the entries in the table", () => {
			const { wrapper, useGroupClassMock } = setup({
				classes: [
					classInfoFactory.build(),
					classInfoFactory.build({
						externalSourceName: undefined,
						type: ClassRootType.CLASS,
						isUpgradable: true,
					}),
				],
			});

			const table = wrapper.findComponent<typeof VDataTableServer>('[data-testid="admin-class-table"]');
			expect(table.props("items")).toEqual(useGroupClassMock.classes.value);
		});

		describe("onUpdateSortBy", () => {
			it("should set sortBy, sortOrder and fetch classes again", async () => {
				const sortBy = { key: "externalSourceName", order: "desc" };
				const { useGroupClassMock, wrapper } = setup();

				findTableComponent(wrapper).vm.$emit("update:sortBy", [sortBy]);
				await nextTick();

				expect(useGroupClassMock.sortBy.value).toBe(sortBy.key);
				expect(useGroupClassMock.sortOrder.value).toBe(SortOrder.DESC);
				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalled();
			});
		});

		describe("onUpdateItemsPerPage", () => {
			it("should set new limit and fetch classes again", async () => {
				const itemsPerPage = 20;
				const { wrapper, useGroupClassMock } = setup();

				findTableComponent(wrapper).vm.$emit("update:itemsPerPage", itemsPerPage);
				await nextTick();

				expect(useGroupClassMock.pagination.value.limit).toBe(itemsPerPage);
				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalled();
			});
		});

		describe("onUpdateCurrentPage", () => {
			it("should set current page and fetch classes again", async () => {
				const page = 2;

				const { wrapper, useGroupClassMock } = setup();
				const skip = (page - 1) * useGroupClassMock.pagination.value.limit;

				findTableComponent(wrapper).vm.$emit("update:page", page);
				await nextTick();

				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalled();
				expect(useGroupClassMock.page.value).toBe(page);
				expect(useGroupClassMock.pagination.value.skip).toEqual(skip);
			});
		});
	});

	describe("action buttons", () => {
		describe("when user has no edit permission", () => {
			it("should not render any button", () => {
				const { wrapper } = setup({ userPermissions: [] });

				expect(wrapper.find('[data-testid="legacy-class-table-manage-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-edit-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-delete-btn"]').exists()).toEqual(false);
				expect(wrapper.find('[data-testid="class-table-successor-btn"]').exists()).toEqual(false);
			});
		});

		describe("when legacy classes are available", () => {
			it("should render 4 buttons", () => {
				const { wrapper } = setup({ classes: [classInfoFactory.build({ type: ClassRootType.CLASS })] });

				const manageBtn = wrapper.find('[data-testid="legacy-class-table-manage-btn"]');
				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');
				const deleteBtn = wrapper.find('[data-testid="class-table-delete-btn"]');
				const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');

				expect(manageBtn.exists()).toBe(true);
				expect(editBtn.exists()).toBe(true);
				expect(deleteBtn.exists()).toBe(true);
				expect(successorBtn.exists()).toBe(true);
			});
		});

		describe("when no classes are available", () => {
			it("should render only manage button which refers to members page", () => {
				const { wrapper } = setup({ classes: [classInfoFactory.build({ type: ClassRootType.GROUP })] });

				const manageBtn = wrapper.find('[data-testid="class-table-members-manage-btn"]');

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find('[data-testid="class-table-delete-btn"]');

				const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');

				expect(manageBtn.exists()).toBe(true);
				expect(editBtn.exists()).toBe(false);
				expect(deleteBtn.exists()).toBe(false);
				expect(successorBtn.exists()).toBe(false);
			});
		});

		describe("when clicking on the manage class button", () => {
			describe("when group class root type is class", () => {
				it("should redirect to legacy class manage page", () => {
					const { wrapper, useGroupClassMock } = setup();
					const classId = useGroupClassMock.classes.value[1].id;

					const manageBtn = wrapper.find('[data-testid="legacy-class-table-manage-btn"]');

					expect(manageBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/manage`);
					expect(manageBtn.findComponent({ name: "router-link" }).exists()).toBe(false);
				});
			});

			describe("when class root type is group", () => {
				it("should redirect to group class members page", () => {
					const { wrapper, useGroupClassMock } = setup();
					const classId = useGroupClassMock.classes.value[0].id;

					const manageBtn = wrapper.findComponent<typeof VBtn>('[data-testid="class-table-members-manage-btn"]');

					expect(manageBtn.attributes().href).toBeUndefined();
					expect(manageBtn.props("to")).toStrictEqual({
						name: "administration-groups-classes-members",
						params: { groupId: classId },
					});
				});
			});
		});

		describe("when clicking on the edit class button", () => {
			it("should redirect to legacy class edit page", () => {
				const { wrapper, useGroupClassMock } = setup();
				const classId = useGroupClassMock.classes.value[1].id;

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');
				expect(editBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/edit`);
			});
		});

		describe("when class is upgradable", () => {
			describe("when clicking on the upgrade class button", () => {
				it("should redirect to legacy class upgrade page", () => {
					const { wrapper, useGroupClassMock } = setup();
					const classId = useGroupClassMock.classes.value[1].id;

					const successorBtn = wrapper.find('[data-testid="class-table-successor-btn"]');
					expect(successorBtn.attributes().href).toStrictEqual(`/administration/classes/${classId}/createSuccessor`);
				});
			});
		});

		describe("when class is not upgradable", () => {
			it("should display the upgrade button as disabled", () => {
				const { wrapper } = setup({
					classes: [
						classInfoFactory.build({
							externalSourceName: undefined,
							type: ClassRootType.CLASS,
							isUpgradable: false,
						}),
					],
				});

				const successorBtn = wrapper.findComponent<typeof VBtn>('[data-testid="class-table-successor-btn"]');
				expect(successorBtn.props("disabled")).toEqual(true);
			});
		});

		describe("when clicking on the delete class button", () => {
			it("should call deleteClass when confirmed", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(true);
				const { wrapper, useGroupClassMock } = setup();

				await wrapper.find('[data-testid="class-table-delete-btn"]').trigger("click");

				expect(confirmDialogUtils.askDeletion).toHaveBeenCalledWith(
					"pages.administration.classes.deleteDialog.title",
					"pages.administration.classes.deleteDialog.content"
				);
				expect(useGroupClassMock.deleteClass).toHaveBeenCalled();
			});

			it("should not call deleteClass when cancelled", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(false);
				const { wrapper, useGroupClassMock } = setup();

				await wrapper.find('[data-testid="class-table-delete-btn"]').trigger("click");

				expect(useGroupClassMock.deleteClass).not.toHaveBeenCalled();
			});
		});
	});

	describe("tabs", () => {
		describe("when loading page", () => {
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
			it("should replace the route to the given tab ", async () => {
				const { wrapper, router } = setup();

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				expect(router.replace).toHaveBeenCalledWith({
					query: { tab: "next" },
				});
			});
		});

		describe("when clicking on next year tab", () => {
			it("should call store to load classes of next year", async () => {
				const { wrapper, useGroupClassMock } = setup({ tab: "next" });

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "nextYear",
				});
			});
		});

		describe("when clicking on previous years tab", () => {
			it("should call store to load classes of previous years", async () => {
				const { wrapper, useGroupClassMock } = setup({ tab: "archive" });

				await wrapper.find('[data-testid="admin-class-previous-years-tab"]').trigger("click");

				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "previousYears",
				});
			});
		});

		describe("when clicking on current year tab", () => {
			it("should call store to load groups and classes of current year", async () => {
				const { wrapper, useGroupClassMock } = setup();

				await wrapper.find('[data-testid="admin-class-next-year-tab"]').trigger("click");

				await wrapper.find('[data-testid="admin-class-current-year-tab"]').trigger("click");

				expect(useGroupClassMock.fetchClassesForSchool).toHaveBeenCalledWith({
					schoolYearQuery: "currentYear",
				});
			});
		});
	});

	describe("addClass", () => {
		describe("when create permission is present", () => {
			it("should render add class fab button", () => {
				const { wrapper } = setup({ tab: "current", userPermissions: [Permission.CLASS_CREATE] });
				const fabComponent = wrapper.find(`[data-testid="fab_button_add_class"]`);
				expect(fabComponent.exists()).toBe(true);
			});

			describe("when clicking on add class fab", () => {
				it("should have link to legacy create class page", () => {
					const { wrapper } = setup({ tab: "current", userPermissions: [Permission.CLASS_CREATE] });
					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					expect(fabComponent.vm.actions[0].href).toStrictEqual("/administration/classes/create");
				});
			});
		});

		describe("when create permission is not present", () => {
			it("should not render add class fab button", () => {
				const { wrapper } = setup({ tab: "current", userPermissions: [] });

				expect(wrapper.find('[data-testid="fab_button_add_class"]').exists()).toEqual(false);
			});
		});
	});

	describe("onClickEndSyncIcon", () => {
		it("should open end course sync dialog", async () => {
			const { wrapper } = setup({
				classes: [
					classInfoFactory.build({
						synchronizedCourses: [courseFactory.build()],
					}),
				],
			});

			await wrapper.find('[data-testid="class-table-end-course-sync-btn"]').trigger("click");

			const dialog = wrapper.findComponent({ name: "EndCourseSyncDialog" });
			expect(dialog.vm.isOpen).toBe(true);
		});
	});

	describe("when hint text is shown", () => {
		it.each([
			[SchulcloudTheme.DEFAULT, "Dataport"],
			[SchulcloudTheme.BRB, "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg"],
			[SchulcloudTheme.N21, "Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)"],
		])("uses %s-instance specific text placeholders", async (theme, expected) => {
			const { wrapper } = setup({
				classes: [
					classInfoFactory.build({
						synchronizedCourses: [courseFactory.build()],
					}),
				],
				tab: "current",
				envs: { SC_THEME: theme },
			});

			await nextTick();

			expect(wrapper.text()).toContain(expected);
		});
	});
});
