import EmptyState from "./EmptyState";

describe("@/components/molecules/EmptyState", () => {
	it(...isValidComponent(EmptyState));

	it("renders its classes", () => {
		const wrapper = mount(EmptyState, {
			propsData: {
				image: "@/assets/icons/emptystate.svg",
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
				image: "@/assets/icons/emptystate.svg",
				alt: "Alt Text",
			},
		});
		expect(wrapper.find("img").exists()).toBe(true);
		expect(wrapper.find("img").attributes("src")).toBe(
			"@/assets/icons/emptystate.svg"
		);
	});

	it(
		...rendersSlotContent(EmptyState, ["description"], {
			propsData: {
				image: "@/assets/icons/emptystate.svg",
				alt: "Alt Text",
			},
		})
	);
});
