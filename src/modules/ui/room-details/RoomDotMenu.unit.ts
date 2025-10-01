import RoomDotMenu from "./RoomDotMenu.vue";
import { MenuItem } from "./types";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount, shallowMount } from "@vue/test-utils";
import { VBtn, VIcon, VListItem, VMenu } from "vuetify/lib/components/index";

const action = vi.fn();
const testProps: { menuItems: MenuItem[] } = {
	menuItems: [
		{
			icon: "mdiPencilOutline",
			action: action,
			name: "Edit",
			dataTestId: "Edit",
		},
	],
};

const getWrapper = (props: { menuItems: MenuItem[] }, options?: object) =>
	mount(RoomDotMenu, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		props,
		...options,
	});

const getShallowWrapper = (props: { menuItems: MenuItem[] }, options?: object) =>
	shallowMount(RoomDotMenu, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		props,
		...options,
	});

describe("@/components/molecules/RoomDotMenu", () => {
	it("should render with correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper).toBeDefined();
	});

	it("should have item name", async () => {
		const wrapper = getWrapper(testProps);

		const threeDotButton = wrapper.findComponent(VBtn);
		await threeDotButton.trigger("click");

		const menuItemElement = wrapper.findComponent(VListItem);

		expect(menuItemElement.html()).toContain("Edit");
	});

	it("should trigger the action which is passed as a prop", async () => {
		const wrapper = getWrapper(testProps);

		const threeDotButton = wrapper.findComponent(VBtn);
		await threeDotButton.trigger("click");

		const menuItemElement = wrapper.findComponent(VListItem);
		await menuItemElement.trigger("click");

		expect(action).toHaveBeenCalled();
	});

	it("should have the icon which is passed as a prop", async () => {
		const wrapper = getShallowWrapper(testProps);

		const menuItemIcon = wrapper.findComponent(VIcon);
		expect(menuItemIcon.props("icon")).toContain("mdiPencilOutline");
	});

	it("should not have menu if 'menuItems' is empty", async () => {
		const props = {
			menuItems: [],
		};
		const wrapper = getWrapper(props);

		const menu = wrapper.findAllComponents(VMenu);

		expect(menu).toHaveLength(0);
	});
});
