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
		const wrapper = mount(DropdownMenuMintEc, {
			propsData: {
				title: "Test DropdownMenuMintEc",
			},
			attachTo: document.body,
		});
		const dropdown = wrapper.find(".dropdown");
		const content = wrapper.find(".dropdown__content");
		expect(content.find(".open").exists()).toBe(false);
		dropdown.trigger("mouseenter");
		await wrapper.vm.$nextTick();
		expect(content.classes("open")).toBe(true);
		dropdown.trigger("mouseleave");
		await wrapper.vm.$nextTick();
		expect(content.classes("open")).toBe(false);
		dropdown.trigger("focus");
		await wrapper.vm.$nextTick();
		expect(content.classes("open")).toBe(true);
		dropdown.trigger("blur");
		await wrapper.vm.$nextTick();
		expect(content.classes("open")).toBe(false);
	});
});
