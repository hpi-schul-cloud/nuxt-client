import { mount, MountOptions } from "@vue/test-utils";
import Vue, { ref } from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import ClassMembersPage from "@/components/page-class-members/ClassMembers.page.vue";
import { useGroupState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import flushPromises from "flush-promises";

jest.mock("@data-group");

// TODO: write tests
describe("@pages/ClassMembers.page.vue", () => {
	let useGroupStateMock: DeepMocked<ReturnType<typeof useGroupState>>;

	const getWrapper = (propsData: { groupId: string }) => {
		document.body.setAttribute("data-app", "true");

		useGroupStateMock.isLoading = ref(false);

		const wrapper = mount(ClassMembersPage as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData: { ...propsData },
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useGroupStateMock = createMock<ReturnType<typeof useGroupState>>();

		jest.mocked(useGroupState).mockReturnValue(useGroupStateMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

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

		it("should render dynamic breadcrumb", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			const breadcrumb = wrapper.findAll(".breadcrumbs-item").at(2);

			expect(breadcrumb.text()).toBeDefined();
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

			flushPromises();

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
