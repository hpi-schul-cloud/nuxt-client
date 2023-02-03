import EmptyState from "./EmptyState";

describe("@/components/molecules/EmptyState", () => {
	it("renders its classes", () => {
		const wrapper = mount(EmptyState, {
			propsData: {
				image: "content-initial",
				alt: "Alt Text",
			},
		});
		expect(wrapper.find(".base").exists()).toBe(true);
		expect(wrapper.find(".wrapper").exists()).toBe(true);
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});

	it("renders image", () => {
		const wrapper = mount(EmptyState, {
			propsData: {
				image: "content-initial",
				alt: "Alt Text",
			},
		});
		expect(wrapper.find("svg").exists()).toBe(true);
	});

	it(
		...rendersSlotContent(EmptyState, ["description"], {
			propsData: {
				image: "content-initial",
				alt: "Alt Text",
			},
		})
	);
});
