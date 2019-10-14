import DropdownMenu from "./DropdownMenu";

describe("@components/organisms/DropdownMenu", () => {
	it(...isValidComponent(DropdownMenu));

	it(
		...rendersDefaultSlotContent(DropdownMenu, {
			propsData: {
				title: "test title",
			},
		})
	);

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
});
