import { shallowMount, mount } from "@vue/test-utils";
import DropdownMenu from "./DropdownMenu";

describe("@components/DropdownMenu", () => {
	it("exports a valid component", () => {
		expect(DropdownMenu).toBeAComponent();
	});

	it("Check for showing content by events", () => {
		const wrapper = shallowMount(DropdownMenu, {
			propsData: {
				title: "Test Dropdown",
			},
		});
		const dropdown = wrapper.find(".dropdown");
		const content = wrapper.find(".content");
		expect(content.contains(".open")).toBe(false);
		dropdown.trigger("mouseenter");
		expect(content.contains(".open")).toBe(true);
		dropdown.trigger("mouseleave");
		expect(content.contains(".open")).toBe(false);
		dropdown.trigger("focus");
		expect(content.contains(".open")).toBe(true);
		dropdown.trigger("blur");
		expect(content.contains(".open")).toBe(false);
	});
	it("Check if everything is rendered", () => {
		const titleString = "Test Dropdown";
		const wrapper = shallowMount(DropdownMenu, {
			propsData: {
				title: titleString,
			},
		});
		expect(wrapper.find(".dropdown").isVisible()).toBe(true);
		expect(wrapper.find(".button").isVisible()).toBe(true);
		expect(wrapper.find(".button").text()).toBe(titleString);
	});
});
