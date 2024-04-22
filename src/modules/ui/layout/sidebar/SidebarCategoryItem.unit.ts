import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import { SidebarGroupItem } from "./types";

const groupItem: SidebarGroupItem = {
	icon: "mdiOpen",
	title: "title",
	testId: "testId",
	children: [
		{
			title: "title",
			testId: "testId",
			to: "/link",
		},
		{
			title: "title",
			testId: "testId",
			to: "/link",
		},
		{
			title: "title",
			testId: "testId",
			to: "/link",
		},
	],
};

describe("SidebarCategoryItem", () => {
	const setup = (sidebarItem: SidebarGroupItem) => {
		const wrapper = mount(SidebarCategoryItem, {
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

	it("should display right amount of sub items", () => {
		const { wrapper } = setup(groupItem);

		expect(wrapper.findAllComponents({ name: "SidebarItem" }).length).toBe(3);
	});
});
