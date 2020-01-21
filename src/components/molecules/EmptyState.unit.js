import EmptyState from "./EmptyState";

describe("@components/EmptyState", () => {
	it(...isValidComponent(EmptyState));

	it("renders its classes", () => {
		const wrapper = mount(EmptyState, {
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
		});
		expect(wrapper.find(".base").exists()).toBe(true);
		expect(wrapper.find(".container").exists()).toBe(true);
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});

	it("renders image", () => {
		const wrapper = shallowMount(EmptyState, {
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
		});
		expect(wrapper.find("img").classes("image")).toBe(true);
	});

	it(
		...rendersSlotContent(EmptyState, ["description"], {
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
		})
	);
});
