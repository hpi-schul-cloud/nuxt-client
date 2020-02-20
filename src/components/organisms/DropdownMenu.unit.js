import DropdownMenu from "./DropdownMenu";

describe("@components/organisms/DropdownMenu", () => {
	it(...isValidComponent(DropdownMenu));

	it(
		...rendersSlotContent(DropdownMenu, ["header"], {
			propsData: {
				title: "test title",
			},
		})
	);

	it("renders default content for its header slot", () => {
		const wrapper = shallowMount(DropdownMenu, {
			propsData: {
				title: "Test Dropdown",
			},
		});
		expect(wrapper.find("base-button-stub").text()).toContain("Test Dropdown");
	});

	it("Check for showing content by events", async () => {
		const wrapper = shallowMount(DropdownMenu, {
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

	it("shows a list of options", () => {
		const wrapper = mount(DropdownMenu, {
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
		const wrapper = mount(DropdownMenu, {
			propsData: {
				title: "Test Dropdown",
				items: [item],
			},
		});
		wrapper.find("li").trigger("click");
		expect(wrapper.emitted().input).toStrictEqual([[item]]);
	});
});
