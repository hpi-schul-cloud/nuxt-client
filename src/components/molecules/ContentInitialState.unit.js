import ContentInitialState from "./ContentInitialState";

describe("@/components/molecules/ContentInitialState", () => {
	const wrapper = mount(ContentInitialState, {
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it("Renders an image", () => {
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".title").exists()).toBe(true);
		expect(wrapper.find(".title").text()).toBe(
			wrapper.vm.$i18n.t("pages.content.init_state.title")
		);
	});
	it("Provides message", () => {
		expect(wrapper.find(".description").exists()).toBe(true);
	});
});
