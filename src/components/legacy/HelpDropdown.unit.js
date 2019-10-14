import HelpDropdown from "./HelpDropdown";

const menuItems = [
	{
		label: "Test",
		icon: "question-circle",
		action: "/test",
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

		expect(wrapper.contains("base-link-stub")).toBe(true);
		expect(wrapper.contains("base-icon-stub")).toBe(true);
		expect(wrapper.find("base-link-stub").text()).toBe(menuItems[0].label);
	});
});
