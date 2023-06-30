import { mount, MountOptions } from "@vue/test-utils";
import RoomDotMenu from "./RoomDotMenu.vue";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

const action = jest.fn();
const testProps = {
	menuItems: [
		{
			icon: "mdiPencilOutline",
			action: action,
			name: "Edit",
			ariaLabel: "Edit",
		},
	],
	ariaLabel: "Menu",
};

const getWrapper = (props: object, options?: object) => {
	return mount(RoomDotMenu as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@/components/molecules/RoomDotMenu", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should render with correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper).toBeDefined();
	});

	it("should have item name", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemElement = wrapper.find(".menu-action");

		expect(menuItemElement.element.textContent).toContain("Edit");
	});

	it("should trigger the action which is passed as a prop", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemElement = wrapper.find(".menu-action");
		await menuItemElement.trigger("click");

		expect(action).toHaveBeenCalled();
	});

	it("should have the icon which is passed as a prop", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemIcon = wrapper.find(".menu-action-icon");

		expect(menuItemIcon.element.innerHTML).toContain("mdiPencilOutline");
	});

	it("should not have menu items if 'menuItems' is empty", async () => {
		const props = {
			menuItems: [],
			show: true,
		};
		const wrapper = getWrapper(props);
		const actionLists = wrapper.findAll(".menu-action");

		expect(actionLists).toHaveLength(0);
	});

	it("three-dot menu should not visible when 'show' prop is false", async () => {
		const props = {
			menuItems: [],
			show: false,
		};
		const wrapper = getWrapper(props);
		const threeDotButton = wrapper.find(".three-dot-button");

		expect(threeDotButton.element).toStrictEqual(undefined);
	});
});
