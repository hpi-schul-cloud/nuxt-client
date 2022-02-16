import { mount } from "@vue/test-utils";
import MoreItemMenu from "./MoreItemMenu.vue";

declare var createComponentMocks: Function;

const action = jest.fn();
const testProps = {
	menuItems: [
		{
			icon: "mdiPencilOutline",
			action: action,
			name: "Edit",
		},
	],
	show: true,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(MoreItemMenu, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/MoreItemMenu", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper.vm.menuItems).toStrictEqual(testProps.menuItems);
		expect(wrapper.vm.show).toStrictEqual(testProps.show);
	});

	it("should have item name", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemElement = wrapper.find(".task-action");

		expect(menuItemElement.element.textContent).toContain("Edit");
	});

	it("should trigger the action which is passed as a prop", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemElement = wrapper.find(".task-action");
		await menuItemElement.trigger("click");

		expect(action).toHaveBeenCalled();
	});

	it("should have the icon which is passed as a prop", async () => {
		const wrapper = getWrapper(testProps);
		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");
		const menuItemIcon = wrapper.find(".task-action-icon");

		expect(menuItemIcon.element.innerHTML).toContain("mdiPencilOutline");
	});

	it("should not have menu items if 'menuItems' is empty", async () => {
		const props = {
			menuItems: [],
			show: true,
		};
		const wrapper = getWrapper(props);
		const actionLists = wrapper.findAll(".task-action");

		expect(actionLists).toHaveLength(0);
	});

	it("three-dot menu should not visible when 'show' prop is false", async () => {
		const props = {
			menuItems: [],
			show: false,
		};
		const wrapper = getWrapper(props);
		const threeDotButton = wrapper.find(".three-dot-button");

		expect(threeDotButton.element.style.display).toStrictEqual("none");
	});
});
