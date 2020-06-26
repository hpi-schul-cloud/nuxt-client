import HelpDropdown from "./HelpDropdown";

const menuItems = [
	{
		label: "Test",
		icon: "question-circle",
		action: "/test",
		source: "fa",
		target: "_self"
	},
];

describe("@components/legacy/HelpDropdown", () => {
	it(...isValidComponent(HelpDropdown));
	it("shows a list of menu items", () => {
		const wrapper = shallowMount(HelpDropdown, {
			propsData: {
				menuItems: menuItems,
			},
		});

		expect(wrapper.find("base-link-stub").exists()).toBe(true);
		expect(wrapper.find("base-icon-stub").exists()).toBe(true);
		expect(wrapper.find("base-link-stub").text()).toBe(menuItems[0].label);
	});
});
