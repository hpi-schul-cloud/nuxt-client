import GroupModule from "@/store/group";
import { createModuleMocks } from "@/utils/mock-store-module";
import { classInfoFactory, i18nMock } from "@@/tests/test-utils";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import ClassOverview from "./ClassOverview.page.vue";
import { GROUP_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { SortOrder } from "@/store/types/sort-order.enum";
import { Pagination } from "@/store/types/commons";
import setupStores from "../../../tests/test-utils/setupStores";
import AuthModule from "../../store/auth";
import { authModule } from "../../store";

const $router = {
	push: jest.fn(),
};

describe("ClassOverview", () => {
	const getWrapper = (getters: Partial<GroupModule> = {}) => {
		document.body.setAttribute("data-app", "true");

		const groupModule = createModuleMocks(GroupModule, {
			getClasses: [
				classInfoFactory.build(),
				classInfoFactory.build({
					externalSourceName: "",
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

		const wrapper: Wrapper<Vue> = mount(ClassOverview as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[GROUP_MODULE_KEY.valueOf()]: groupModule,
			},
			mocks: { $router },
		});

		return {
			wrapper,
			groupModule,
		};
	};

	beforeEach(() => {
		$router.push.mockReset();
		setupStores({
			authModule: AuthModule,
		});
	});

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

	describe("action icons", () => {
		describe("when classes are available", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should render 4 icons", () => {
				const { wrapper } = setup();

				const manageIcon = wrapper.find(
					'[data-testid="class-table-manage-icon"]'
				);

				const editIcon = wrapper.find('[data-testid="class-table-edit-icon"]');

				const deleteIcon = wrapper.find(
					'[data-testid="class-table-delete-icon"]'
				);

				const successorIcon = wrapper.find(
					'[data-testid="class-table-successor-icon"]'
				);

				expect(manageIcon.exists()).toBeTruthy();
				expect(editIcon.exists()).toBeTruthy();
				expect(deleteIcon.exists()).toBeTruthy();
				expect(successorIcon.exists()).toBeTruthy();
			});
		});

		describe("when no classes are available", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper } = getWrapper({
					getClasses: [classInfoFactory.build()],
				});

				return {
					wrapper,
				};
			};

			it("should not render any icons", () => {
				const { wrapper } = setup();

				const manageIcon = wrapper.find(
					'[data-testid="class-table-manage-icon"]'
				);

				const editIcon = wrapper.find('[data-testid="class-table-edit-icon"]');

				const deleteIcon = wrapper.find(
					'[data-testid="class-table-delete-icon"]'
				);

				const successorIcon = wrapper.find(
					'[data-testid="class-table-successor-icon"]'
				);

				expect(manageIcon.exists()).toBeFalsy();
				expect(editIcon.exists()).toBeFalsy();
				expect(deleteIcon.exists()).toBeFalsy();
				expect(successorIcon.exists()).toBeFalsy();
			});
		});

		describe("when clicking on the manage class icon", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper, groupModule } = getWrapper();

				const classId: string = groupModule.getClasses[1].id;

				return {
					wrapper,
					classId,
				};
			};

			it("should redirect to legacy class manage page", async () => {
				const { wrapper, classId } = setup();

				await wrapper
					.find('[data-testid="class-table-manage-icon"]')
					.trigger("click");

				expect($router.push).toHaveBeenCalledWith({
					path: `/administration/classes/${classId}/manage`,
				});
			});
		});

		describe("when clicking on the edit class icon", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper, groupModule } = getWrapper();

				const classId: string = groupModule.getClasses[1].id;

				return {
					wrapper,
					classId,
				};
			};

			it("should redirect to legacy class edit page", async () => {
				const { wrapper, classId } = setup();

				await wrapper
					.find('[data-testid="class-table-edit-icon"]')
					.trigger("click");

				expect($router.push).toHaveBeenCalledWith({
					path: `/administration/classes/${classId}/edit`,
				});
			});
		});

		describe("when class is upgradable", () => {
			describe("when clicking on the upgrade class icon", () => {
				const setup = () => {
					authModule.addUserPermmission("CLASS_EDIT");

					const { wrapper, groupModule } = getWrapper();

					const classId: string = groupModule.getClasses[1].id;

					return {
						wrapper,
						classId,
					};
				};

				it("should redirect to legacy class upgrade page", async () => {
					const { wrapper, classId } = setup();

					await wrapper
						.find('[data-testid="class-table-successor-icon"]')
						.trigger("click");

					expect($router.push).toHaveBeenCalledWith({
						path: `/administration/classes/${classId}/createSuccessor`,
					});
				});
			});
		});

		describe("when class is not upgradable", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper } = getWrapper({
					getClasses: [
						classInfoFactory.build({
							externalSourceName: undefined,
							isUpgradable: false,
						}),
					],
				});

				return {
					wrapper,
				};
			};

			it("should display the upgrade icon as disabled", () => {
				const { wrapper } = setup();

				const icon = wrapper.find('[data-testid="class-table-successor-icon"]');

				expect(icon.attributes().disabled).toBe("disabled");
			});
		});

		describe("when clicking on the delete class icon", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should open the delete dialog", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="class-table-delete-icon"]')
					.trigger("click");

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog.exists()).toBeTruthy();
			});
		});

		describe("when delete dialog is open", () => {
			const setup = () => {
				authModule.addUserPermmission("CLASS_EDIT");

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
						.find('[data-testid="class-table-delete-icon"]')
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
						.find('[data-testid="class-table-delete-icon"]')
						.trigger("click");

					const dialog = wrapper.find('[data-testid="delete-dialog"]');

					await dialog.find('[data-testid="dialog-confirm"').trigger("click");

					expect(groupModule.deleteClass).toHaveBeenCalled();
				});
			});
		});
	});
});
