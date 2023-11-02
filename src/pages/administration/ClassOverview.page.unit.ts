import AuthModule from "@/store/auth";
import GroupModule from "@/store/group";
import { ClassInfo, ClassRootType } from "@/store/types/class-info";
import { Pagination } from "@/store/types/commons";
import { SortOrder } from "@/store/types/sort-order.enum";
import {
	AUTH_MODULE_KEY,
	GROUP_MODULE_KEY,
	I18N_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { classInfoFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ClassOverview from "./ClassOverview.page.vue";
import SchoolsModule from "@/store/schools";
import { School, Year } from "@/store/types/schools";

const $router = { replace: jest.fn() };

describe("ClassOverview", () => {
	const getWrapper = (getters: Partial<GroupModule> = {}) => {
		document.body.setAttribute("data-app", "true");

		const groupModule = createModuleMocks(GroupModule, {
			getClasses: [
				classInfoFactory.build(),
				classInfoFactory.build({
					externalSourceName: undefined,
					type: ClassRootType.Class,
					isUpgradable: true,
				}),
			],
			getPagination: {
				limit: 10,
				skip: 0,
				total: 30,
			},
			...getters,
		});

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CLASS_EDIT".toLowerCase()],
		});

		const schoolModule = createModuleMocks(SchoolsModule, {
			getSchool: {
				years: {
					schoolYears: [],
					nextYear: {
						name: "2023/24",
					} as Year,
					activeYear: {
						name: "2023/24",
					} as Year,
					lastYear: {} as Year,
					defaultYear: {} as Year,
				},
			} as unknown as School,
			...getters,
		});

		const wrapper: Wrapper<Vue> = mount(ClassOverview as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[GROUP_MODULE_KEY.valueOf()]: groupModule,
				[SCHOOLS_MODULE_KEY.valueOf()]: schoolModule,
				[AUTH_MODULE_KEY.valueOf()]: authModule,
			},
			mocks: { $router },
		});

		return {
			wrapper,
			groupModule,
			schoolModule,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper({});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1).text()).toEqual(
				"pages.administration.classes.index.title"
			);
		});
	});

	describe("onMounted", () => {
		describe("when loading the page", () => {
			it("should load the classes", async () => {
				const { groupModule } = getWrapper();

				await Vue.nextTick();

				expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
			});
		});
	});

	describe("when there are classes or groups to display", () => {
		const setup = () => {
			const classes: ClassInfo[] = [
				classInfoFactory.build(),
				classInfoFactory.build({
					externalSourceName: undefined,
					type: ClassRootType.Class,
					isUpgradable: true,
				}),
			];

			const { wrapper, groupModule } = getWrapper({
				getClasses: classes,
			});

			return {
				classes,
				wrapper,
				groupModule,
			};
		};

		it("should display the entries in the table", async () => {
			const { classes, wrapper } = setup();

			const table = wrapper.find('[data-testid="admin-class-table"]');

			expect(table.props("items")).toEqual(classes);
		});
	});

	describe("onUpdateSortBy", () => {
		describe("when changing the sortBy", () => {
			const setup = () => {
				const sortBy = "externalSourceName";

				const { wrapper, groupModule } = getWrapper();

				return {
					sortBy,
					wrapper,
					groupModule,
				};
			};

			it("should call store to change sort by", async () => {
				const { sortBy, wrapper, groupModule } = setup();

				wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:sort-by", sortBy);
				await Vue.nextTick();

				expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
				expect(groupModule.setSortBy).toHaveBeenCalledWith(sortBy);
			});
		});
	});

	describe("updateSortOrder", () => {
		describe("when changing the sort order", () => {
			const setup = () => {
				const sortOrder = true;

				const { wrapper, groupModule } = getWrapper();

				return {
					sortOrder,
					wrapper,
					groupModule,
				};
			};

			it("should call store to change sort order", async () => {
				const { sortOrder, wrapper, groupModule } = setup();

				wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:sort-desc", sortOrder);
				await Vue.nextTick();

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

				const { wrapper, groupModule } = getWrapper({
					getPagination: {
						limit: 10,
						skip: 0,
						total: 30,
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

				wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:items-per-page", itemsPerPage);
				await Vue.nextTick();

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

				const { wrapper, groupModule } = getWrapper();

				return {
					page,
					pagination,
					wrapper,
					groupModule,
				};
			};

			it("should call store to update current page", async () => {
				const { page, wrapper, groupModule, pagination } = setup();

				wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:page", page);
				await Vue.nextTick();

				expect(groupModule.loadClassesForSchool).toHaveBeenCalled();
				expect(groupModule.setPage).toHaveBeenCalledWith(page);
				expect(groupModule.setPagination).toHaveBeenCalledWith(pagination);
			});
		});
	});

	describe("action buttons", () => {
		describe("when legacy classes are available", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should render 4 buttons", () => {
				const { wrapper } = setup();

				const manageBtn = wrapper.find(
					'[data-testid="legacy-class-table-manage-btn"]'
				);

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="class-table-delete-btn"]'
				);

				const successorBtn = wrapper.find(
					'[data-testid="class-table-successor-btn"]'
				);

				expect(manageBtn.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeTruthy();
				expect(deleteBtn.exists()).toBeTruthy();
				expect(successorBtn.exists()).toBeTruthy();
			});
		});

		describe("when no classes are available", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					getClasses: [classInfoFactory.build()],
				});

				return {
					wrapper,
				};
			};

			it("should render only manage button which refers to members page", () => {
				const { wrapper } = setup();

				const manageBtn = wrapper.find(
					'[data-testid="class-table-members-manage-btn"]'
				);

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="class-table-delete-btn"]'
				);

				const successorBtn = wrapper.find(
					'[data-testid="class-table-successor-btn"]'
				);

				expect(manageBtn.exists()).toBeTruthy();
				expect(editBtn.exists()).toBeFalsy();
				expect(deleteBtn.exists()).toBeFalsy();
				expect(successorBtn.exists()).toBeFalsy();
			});
		});

		describe("when clicking on the manage class button", () => {
			describe("when group class root type is class", () => {
				const setup = () => {
					const { wrapper, groupModule } = getWrapper();

					const classId: string = groupModule.getClasses[1].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to legacy class manage page", async () => {
					const { wrapper, classId } = setup();

					const manageBtn = wrapper.find(
						'[data-testid="legacy-class-table-manage-btn"]'
					);

					expect(manageBtn.attributes().href).toStrictEqual(
						`/administration/classes/${classId}/manage`
					);
					expect(
						manageBtn.findComponent({ name: "router-link" }).exists()
					).toBeFalsy();
				});
			});

			describe("when class root type is group", () => {
				const setup = () => {
					const { wrapper, groupModule } = getWrapper();

					const classId: string = groupModule.getClasses[0].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to group class members page", async () => {
					const { wrapper } = setup();

					const manageBtn = wrapper.find(
						'[data-testid="class-table-members-manage-btn"]'
					);

					const routerLink = manageBtn.findComponent({ name: "router-link" });

					expect(manageBtn.attributes().href).toBeUndefined();
					expect(routerLink.exists()).toBeTruthy();
				});
			});
		});

		describe("when clicking on the edit class button", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				const classId: string = groupModule.getClasses[1].id;

				return {
					wrapper,
					classId,
				};
			};

			it("should redirect to legacy class edit page", async () => {
				const { wrapper, classId } = setup();

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				expect(editBtn.attributes().href).toStrictEqual(
					`/administration/classes/${classId}/edit`
				);
			});
		});

		describe("when class is upgradable", () => {
			describe("when clicking on the upgrade class button", () => {
				const setup = () => {
					const { wrapper, groupModule } = getWrapper();

					const classId: string = groupModule.getClasses[1].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to legacy class upgrade page", async () => {
					const { wrapper, classId } = setup();

					const successorBtn = wrapper.find(
						'[data-testid="class-table-successor-btn"]'
					);

					expect(successorBtn.attributes().href).toStrictEqual(
						`/administration/classes/${classId}/createSuccessor`
					);
				});
			});
		});

		describe("when class is not upgradable", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					getClasses: [
						classInfoFactory.build({
							externalSourceName: undefined,
							type: ClassRootType.Class,
							isUpgradable: false,
						}),
					],
				});

				return {
					wrapper,
				};
			};

			it("should display the upgrade button as disabled", () => {
				const { wrapper } = setup();

				const successorBtn = wrapper.find(
					'[data-testid="class-table-successor-btn"]'
				);

				expect(successorBtn.props("disabled")).toEqual(true);
			});
		});

		describe("when clicking on the delete class button", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should open the delete dialog", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="class-table-delete-btn"]')
					.trigger("click");

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog.props("isOpen")).toBeTruthy();
			});
		});

		describe("when delete dialog is open", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				return {
					wrapper,
					groupModule,
				};
			};

			describe("when clicking on cancel button", () => {
				it("should not delete class", async () => {
					const { wrapper, groupModule } = setup();

					await wrapper
						.find('[data-testid="class-table-delete-btn"]')
						.trigger("click");

					const dialog = wrapper.find('[data-testid="delete-dialog"]');

					await dialog.find('[data-testid="dialog-cancel"').trigger("click");

					expect(groupModule.deleteClass).not.toHaveBeenCalled();
				});
			});

			describe("when clicking on confirm button", () => {
				it("should delete class", async () => {
					const { wrapper, groupModule } = setup();

					await wrapper
						.find('[data-testid="class-table-delete-btn"]')
						.trigger("click");

					const dialog = wrapper.find('[data-testid="delete-dialog"]');

					await dialog.find('[data-testid="dialog-confirm"').trigger("click");

					expect(groupModule.deleteClass).toHaveBeenCalled();
				});
			});
		});
	});

	describe("tabs", () => {
		describe("when loading page", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show 3 tabs", () => {
				const { wrapper } = setup();

				const nextYearTab = wrapper.find(
					'[data-testid="admin-class-next-year-tab"]'
				);

				const currentYearTab = wrapper.find(
					'[data-testid="admin-class-current-year-tab"]'
				);

				const previousYearTab = wrapper.find(
					'[data-testid="admin-class-previous-years-tab"]'
				);

				expect(nextYearTab.exists()).toBeTruthy();
				expect(currentYearTab.exists()).toBeTruthy();
				expect(previousYearTab.exists()).toBeTruthy();
			});

			it("should have current year tab active", () => {
				const { wrapper } = setup();

				const currentYearTab = wrapper.find(
					'[data-testid="admin-class-current-year-tab"]'
				);

				expect(currentYearTab.classes()).toContain("v-tab--active");
			});
		});

		describe("when clicking on a tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				return {
					wrapper,
					groupModule,
				};
			};

			it("should replace the route to the given tab ", () => {
				const { wrapper } = setup();

				wrapper
					.find('[data-testid="admin-class-next-year-tab"]')
					.trigger("click");

				expect($router.replace).toHaveBeenCalled();
			});
		});

		describe("when clicking on next year tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load classes of next year", () => {
				const { wrapper, groupModule } = setup();

				wrapper
					.find('[data-testid="admin-class-next-year-tab"]')
					.trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith(
					"nextYear"
				);
			});
		});

		describe("when clicking on previous years tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load classes of previous years", () => {
				const { wrapper, groupModule } = setup();

				wrapper
					.find('[data-testid="admin-class-previous-years-tab"]')
					.trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith(
					"previousYears"
				);
			});
		});

		describe("when clicking on current year tab", () => {
			const setup = () => {
				const { wrapper, groupModule } = getWrapper();

				return {
					wrapper,
					groupModule,
				};
			};

			it("should call store to load groups and classes of current year", () => {
				const { wrapper, groupModule } = setup();

				wrapper
					.find('[data-testid="admin-class-next-year-tab"]')
					.trigger("click");

				wrapper
					.find('[data-testid="admin-class-current-year-tab"]')
					.trigger("click");

				expect(groupModule.loadClassesForSchool).toHaveBeenCalledWith(
					"currentYear"
				);
			});
		});
	});

	describe("addClass", () => {
		describe("when clicking on add class buttton", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should redirect to legacy create class page", () => {
				const { wrapper } = setup();

				const addClassBtn = wrapper.find(
					'[data-testid="admin-class-add-button"]'
				);

				expect(addClassBtn.attributes().href).toStrictEqual(
					"/administration/classes/create"
				);
			});
		});
	});
});
