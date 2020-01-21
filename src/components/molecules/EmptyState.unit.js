import EmptyState from './EmptyState'

describe('@components/EmptyState', () => {
	it(...isValidComponent(EmptyState));


	it("renders its classes", () => {
		const wrapper = mount(EmptyState,{
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
		});
	  expect(wrapper.find(".base").exists()).toBe(true);
		expect(wrapper.find(".container").exists()).toBe(true);
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});

	it("Renders image", () => {
		const wrapper = shallowMount(EmptyState, {
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
		});
		expect(wrapper.find("img").classes("image")).toBe(true);
	});

	it("Render with slot", () => {
		const wrapper = shallowMount(EmptyState, {
			propsData: {
				image: "@assets/icons/emptystate.svg",
			},
			slots: {
				description: "I'm a description"
			},
		});
		expect(wrapper.find(".description").text()).toBe("I'm a description");
})
})
