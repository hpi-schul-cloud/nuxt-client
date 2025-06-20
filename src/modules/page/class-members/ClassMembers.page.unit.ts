import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import ClassMembersPage from "./ClassMembers.page.vue";
import { Group, useGroupState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { groupFactory } from "@@/tests/test-utils/factory";
import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

vi.mock("@data-group", () => {
	return {
		...vi.importActual("@data-group"),
		useGroupState: vi.fn(),
	};
});

describe("@pages/ClassMembers.page.vue", () => {
	let useGroupStateMock: DeepMocked<ReturnType<typeof useGroupState>>;

	const setup = (props: { groupId: string }) => {
		const group: Group = groupFactory.build();

		useGroupStateMock.isLoading = ref(false);
		useGroupStateMock.group = ref(group);

		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(ClassMembersPage, {
			props,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return {
			group,
			wrapper,
		};
	};

	beforeEach(() => {
		useGroupStateMock = createMock<ReturnType<typeof useGroupState>>();

		vi.mocked(useGroupState).mockReturnValue(useGroupStateMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("title", () => {
		it("should render static title", () => {
			const { wrapper, group } = setup({
				groupId: "groupId",
			});

			const title = wrapper.find("h1");

			expect(title.text()).toContain(`common.labels.class '${group.name}'`);
		});

		it("should show subtitle that group is from external system", () => {
			const { wrapper } = setup({
				groupId: "groupId",
			});

			const title = wrapper.find("h1");
			const subtitle = title.find("span");

			expect(subtitle.text()).toEqual("(page-class-members.title.info)");
		});
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = setup({
				groupId: "groupId",
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0)?.text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1)?.text()).toEqual(
				"pages.administration.classes.index.title"
			);
		});

		it("should render dynamic class name breadcrumb", () => {
			const { wrapper, group } = setup({
				groupId: "groupId",
			});

			const breadcrumb = wrapper.findAll(".breadcrumbs-item").at(2);

			expect(breadcrumb?.text()).toEqual(`common.labels.class '${group.name}'`);
		});
	});

	describe("onMounted", () => {
		it("should load the group for given groupId", async () => {
			setup({
				groupId: "groupId",
			});

			expect(useGroupStateMock.fetchGroup).toHaveBeenCalledWith("groupId");
		});
	});

	describe("datatable", () => {
		it("should render datatable", () => {
			const { wrapper } = setup({
				groupId: "groupId",
			});

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.exists()).toBeTruthy();
		});

		it("should render datatable with correct headers", () => {
			const { wrapper } = setup({
				groupId: "groupId",
			});

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.props("headers")).toEqual([
				{
					key: "lastName",
					title: "common.labels.name",
					value: "lastName",
				},
				{
					key: "firstName",
					title: "common.labels.firstName",
					value: "firstName",
				},
				{
					key: "roleName",
					title: "common.labels.role",
					value: "roleName",
				},
			]);
		});

		it("should render datatable with correct items", () => {
			const { wrapper, group } = setup({
				groupId: "groupId",
			});

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.props("items")).toEqual([
				{
					firstName: group.users[0].firstName,
					lastName: group.users[0].lastName,
					roleName: "common.roleName.student",
				},
			]);
		});
	});

	describe("ClassMembersInfoBox", () => {
		it("should render ClassMembersInfoBox", () => {
			const { wrapper } = setup({
				groupId: "groupId",
			});

			const infoBox = wrapper.findComponent(ClassMembersInfoBox);

			expect(infoBox.exists()).toBeTruthy();
		});
	});
});
