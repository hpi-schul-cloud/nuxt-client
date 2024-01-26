import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import ClassMembersPage from "@/components/page-class-members/ClassMembers.page.vue";
import { Group, useGroupState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { groupFactory } from "@@/tests/test-utils/factory";
import ClassMembersInfoBox from "@/components/page-class-members/ClassMembersInfoBox.vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

jest.mock("@data-group");

describe("@pages/ClassMembers.page.vue", () => {
	let useGroupStateMock: DeepMocked<ReturnType<typeof useGroupState>>;

	const getWrapper = (
		props: { groupId: string },
		group: Group = groupFactory.build()
	) => {
		useGroupStateMock.isLoading = ref(false);
		useGroupStateMock.group = ref(group);

		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(ClassMembersPage, {
			props,
			global: {
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
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

	describe("title", () => {
		const setup = () => {
			const group: Group = groupFactory.build();

			const { wrapper } = getWrapper(
				{
					groupId: "groupId",
				},
				group
			);

			return {
				wrapper,
				group,
			};
		};

		it("should render static title", () => {
			const { wrapper, group } = setup();

			const title = wrapper.find("h1");

			expect(title.text()).toContain(`common.labels.class '${group.name}'`);
		});

		it("should show subtitle that group is from external system", () => {
			const { wrapper } = setup();

			const title = wrapper.find("h1");
			const subtitle = title.find("span");

			expect(subtitle.text()).toEqual("(page-class-members.title.info)");
		});
	});

	describe("breadcrumbs", () => {
		const setup = () => {
			const group: Group = groupFactory.build();

			const { wrapper } = getWrapper(
				{
					groupId: "groupId",
				},
				group
			);

			return {
				wrapper,
				group,
			};
		};

		it("should render static breadcrumbs", () => {
			const { wrapper } = setup();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0)?.text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1)?.text()).toEqual(
				"pages.administration.classes.index.title"
			);
		});

		it("should render dynamic class name breadcrumb", () => {
			const { wrapper, group } = setup();

			const breadcrumb = wrapper.findAll(".breadcrumbs-item").at(2);

			expect(breadcrumb?.text()).toEqual(`common.labels.class '${group.name}'`);
		});
	});

	describe("onMounted", () => {
		it("should load the group for given groupId", async () => {
			getWrapper({
				groupId: "groupId",
			});

			expect(useGroupStateMock.fetchGroup).toHaveBeenCalledWith("groupId");
		});
	});

	describe("datatable", () => {
		const setup = () => {
			const group = groupFactory.build();

			const { wrapper } = getWrapper(
				{
					groupId: "groupId",
				},
				group
			);

			return {
				wrapper,
				group,
			};
		};

		it("should render datatable", () => {
			const { wrapper } = setup();

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.exists()).toBeTruthy();
		});

		it("should render datatable with correct headers", () => {
			const { wrapper } = setup();

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.props("headers")).toEqual([
				{
					text: "common.labels.name",
					value: "lastName",
				},
				{
					text: "common.labels.firstName",
					value: "firstName",
				},
				{
					text: "common.labels.role",
					value: "roleName",
				},
			]);
		});

		it("should render datatable with correct items", () => {
			const { wrapper, group } = setup();

			const datatable = wrapper.findComponent({ name: "v-data-table" });

			expect(datatable.props("items")).toEqual([
				{
					firstName: group.users[0].firstName,
					lastName: group.users[0].lastName,
					roleName: "undefined",
				},
			]);
		});
	});

	describe("ClassMembersInfoBox", () => {
		it("should render ClassMembersInfoBox", () => {
			const { wrapper } = getWrapper({
				groupId: "groupId",
			});

			const infoBox = wrapper.findComponent(ClassMembersInfoBox);

			expect(infoBox.exists()).toBeTruthy();
		});
	});
});
