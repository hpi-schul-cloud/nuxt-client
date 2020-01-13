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

	it("renders default content for its header slot", () => {
		const wrapper = shallowMount(DropdownMenuMintEc, {
			propsData: {
				title: "Test Dropdown",
			},
		});
		expect(wrapper.find("base-button-stub").text()).toContain("Test Dropdown");
	});

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

	it("shows a list of options", () => {
		const wrapper = mount(DropdownMenuMintEc, {
			propsData: {
				title: "Test Dropdown",
				items: [{ label: "a" }, { label: "b" }],
			},
		});
		const items = wrapper.findAll("li");
		expect(items.at(0).text()).toBe("a");
		expect(items.at(1).text()).toBe("b");
	});

	it("emits an input event when an item is clicked", () => {
		const item = { label: "a" };
		const wrapper = mount(DropdownMenuMintEc, {
			propsData: {
				title: "Test Dropdown",
				items: [item],
			},
		});
		wrapper.find("li").trigger("click");
		expect(wrapper.emitted().input).toEqual([[item]]);
	});
});
