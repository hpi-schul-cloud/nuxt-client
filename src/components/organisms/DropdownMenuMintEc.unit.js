import DropdownMenuMintEc from "./DropdownMenuMintEc";

describe("@components/organisms/DropDownMenuMintEc", () => {
	it(...isValidComponent(DropdownMenuMintEc));

	it(
		...rendersSlotContent(DropdownMenuMintEc, ["default"], {
			propsData: {
				title: "test title",
			},
		})
	);

	it("Check for showing content by events", () => {
		const wrapper = shallowMount(DropdownMenuMintEc, {
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
