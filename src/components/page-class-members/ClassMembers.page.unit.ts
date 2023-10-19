import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import ClassMembersPage from "@/components/page-class-members/ClassMembers.page.vue";

describe("@pages/ClassMembers.page.vue", () => {
	const routerPush = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (propsData: { groupId: string }) => {
		document.body.setAttribute("data-app", "true");

		const $router = {
			push: routerPush,
		};

		const wrapper = mount(ClassMembersPage as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData: { ...propsData },
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
			mocks: {
				$router,
			},
		});

		return {
			wrapper,
		};
	};

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1).text()).toEqual(
				"pages.administration.classes.index.title"
			);
		});

		it("should render dynamic breadcrumbs", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			// TODO: adjust
			expect(breadcrumbs.at(2).text()).toBeDefined();
		});
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			// TODO: adjust
			expect(wrapper.find("h3").exists()).toBeTruthy();
		});
	});

	describe("onMounted", () => {
		it("should load the group for given groupId", async () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			await Vue.nextTick();

			// TODO: adjust
		});
	});

	describe("datatable", () => {
		it("should render datatable", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			const datatable = wrapper.findComponent({ name: "DataTable" });

			expect(datatable.exists()).toBeTruthy();
		});
	});
});
