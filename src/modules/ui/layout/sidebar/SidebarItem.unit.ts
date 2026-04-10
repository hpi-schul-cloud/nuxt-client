import { SidebarSingleItem } from "../types";
import SidebarItem from "./SidebarItem.vue";
import { useSidebarSelection } from "./SidebarSelection.composable";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

const iconItem: SidebarSingleItem = {
	icon: "mdiOpen",
	title: "title",
	testId: "testId",
	to: "/link",
};

const childItem: SidebarSingleItem = {
	title: "title",
	testId: "testId",
	to: "/link",
};

vi.mock("vue-router", () => ({
	useRoute: () => ({ path: "rooms/courses-list" }),
}));

vi.mock("./SidebarSelection.composable");
const mockedUseSidebarSelection = vi.mocked(useSidebarSelection);

describe("@ui-layout/SidebarItem", () => {
	const setup = (sidebarItem: SidebarSingleItem) => {
		mockedUseSidebarSelection.mockReturnValue({ isActive: ref(true) });

		const wrapper = mount(SidebarItem, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				item: sidebarItem,
			},
		});

		return {
			wrapper,
		};
	};

	it("should display icon when present", () => {
		const { wrapper } = setup(iconItem);

		expect(wrapper.findComponent(".v-icon").exists()).toBe(true);
	});

	it("should not display icon when it's not present in item prop", () => {
		const { wrapper } = setup(childItem);

		expect(wrapper.findComponent(".v-icon").exists()).toBe(false);
	});

	it("should highlight item when selection is active", () => {
		const { wrapper } = setup({
			icon: "mdiOpen",
			title: "title",
			testId: "testId",
			to: "/rooms/courses-overview",
		});

		expect(wrapper.classes()).toContain("v-list-item--active");
	});
});
