import GroupModule from "@/store/group";
import { createModuleMocks } from "@/utils/mock-store-module";
import { classInfoFactory, i18nMock } from "@@/tests/test-utils";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import ClassOverview from "./ClassOverview.page.vue";
import { AUTH_MODULE_KEY, GROUP_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { SortOrder } from "@/store/types/sort-order.enum";
import { Pagination } from "@/store/types/commons";
import AuthModule from "@/store/auth";
import { ClassRootType } from "@/store/types/class-info";

describe("ClassOverview", () => {
	const getWrapper = (getters: Partial<GroupModule> = {}) => {
		document.body.setAttribute("data-app", "true");

		const groupModule = createModuleMocks(GroupModule, {
			getClasses: [
				classInfoFactory.build(),
				classInfoFactory.build({
					externalSourceName: "",
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

		const wrapper: Wrapper<Vue> = mount(ClassOverview as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[GROUP_MODULE_KEY.valueOf()]: groupModule,
				[AUTH_MODULE_KEY.valueOf()]: authModule,
			},
		});

		return {
			wrapper,
			groupModule,
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

				await wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:sort-by", sortBy);

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

				await wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:sort-desc", sortOrder);

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

				await wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:items-per-page", itemsPerPage);

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

				await wrapper
					.find('[data-testid="admin-class-table"]')
					.vm.$emit("update:page", page);

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
					'[data-testid="class-table-manage-btn"]'
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

			it("should not render any buttons", () => {
				const { wrapper } = setup();

				const manageBtn = wrapper.find(
					'[data-testid="class-table-manage-btn"]'
				);

				const editBtn = wrapper.find('[data-testid="class-table-edit-btn"]');

				const deleteBtn = wrapper.find(
					'[data-testid="class-table-delete-btn"]'
				);

				const successorBtn = wrapper.find(
					'[data-testid="class-table-successor-btn"]'
				);

				expect(manageBtn.exists()).toBeFalsy();
				expect(editBtn.exists()).toBeFalsy();
				expect(deleteBtn.exists()).toBeFalsy();
				expect(successorBtn.exists()).toBeFalsy();
			});
		});

		describe("when clicking on the manage class button", () => {
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
					'[data-testid="class-table-manage-btn"]'
				);

				expect(manageBtn.attributes().href).toStrictEqual(
					`/administration/classes/${classId}/manage`
				);
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

				expect(successorBtn.attributes().disabled).toBe("disabled");
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

				expect(dialog.props("value")).toBeTruthy();
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
});
