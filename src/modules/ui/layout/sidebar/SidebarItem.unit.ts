import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import SidebarItem from "./SidebarItem.vue";
import { SidebarSingleItem } from "../types";

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

describe("SidebarItem", () => {
	const setup = (sidebarItem: SidebarSingleItem) => {
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
});
