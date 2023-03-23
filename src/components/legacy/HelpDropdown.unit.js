import HelpDropdown from "./HelpDropdown";
import BaseLink from "@/components/base/BaseLink";

const menuItems = [
	{
		label: "Test",
		icon: "question-circle",
		action: "/test",
		target: "_self",
	},
];

describe("@/components/legacy/HelpDropdown", () => {
	it("shows a list of menu items", () => {
		const wrapper = mount(HelpDropdown, {
			...createComponentMocks({ i18n: true }),
			data() {
				return {
					menuItems,
				};
			},
		});

		expect(wrapper.findAll(".menu-item")).toHaveLength(1);
		expect(wrapper.findComponent(BaseLink).exists()).toBe(true);
		expect(wrapper.find("svg").exists()).toBe(true);
		expect(wrapper.findComponent(BaseLink).text()).toBe(menuItems[0].label);
	});
});
