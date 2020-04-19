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

	it("Check for showing content by events", async () => {
		const wrapper = shallowMount(DropdownMenuMintEc, {
			propsData: {
				title: "Test Dropdown",
			},
		});
		const dropdown = wrapper.find(".dropdown");
		const content = wrapper.find(".content");
		expect(content.contains(".open")).toBe(false);
		dropdown.trigger("mouseenter");
		await wrapper.vm.$nextTick();
		expect(content.contains(".open")).toBe(true);
		dropdown.trigger("mouseleave");
		await wrapper.vm.$nextTick();
		expect(content.contains(".open")).toBe(false);
		dropdown.trigger("focus");
		await wrapper.vm.$nextTick();
		expect(content.contains(".open")).toBe(true);
		dropdown.trigger("blur");
		await wrapper.vm.$nextTick();
		expect(content.contains(".open")).toBe(false);
	});
});
