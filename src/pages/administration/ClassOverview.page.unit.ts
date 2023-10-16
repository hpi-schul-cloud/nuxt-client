import GroupModule from "@/store/group";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	classInfoFactory,
	i18nMock,
} from "@@/tests/test-utils";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import ClassOverview from "./ClassOverview.page.vue";
import { GROUP_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { SortOrder } from "@/store/types/sort-order.enum";
import { Pagination } from "@/store/types/commons";
import setupStores from "../../../tests/test-utils/setupStores";
import AuthModule from "../../store/auth";
import { ClassInfo } from "../../store/types/class-info";
import { authModule } from "../../store";

const $router = {
	push: jest.fn(),
};

describe("ClassOverview", () => {
	const getWrapper = (getters: Partial<GroupModule> = {}) => {
		document.body.setAttribute("data-app", "true");

		const groupModule = createModuleMocks(GroupModule, {
			getClasses: [classInfoFactory.build()],
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

	describe("manageClass", () => {
		describe("when clicking on the manage class icon", () => {
			const setup = () => {
				const clazz: ClassInfo = classInfoResponseFactory.build({
					externalSourceName: undefined,
				});

				authModule.addUserPermmission("CLASS_EDIT");

				const { wrapper, groupModule } = getWrapper();

				groupModule.setClasses([clazz]);

				return {
					wrapper,
				};
			};

			it("should redirect to legacy class manage page", async () => {
				const { wrapper } = setup();

				await wrapper
					.find('[data-testid="class-table-manage-icon"]')
					.trigger("click");

				expect($router.push).toHaveBeenCalledWith(
					`/administration/classes/6527efc4535aa75bf803e31b/manage`
				);
			});
		});
	});
});
