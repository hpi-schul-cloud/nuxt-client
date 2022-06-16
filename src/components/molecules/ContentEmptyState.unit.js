import ContentEmptyState from "./ContentEmptyState";

describe("@components/molecules/ContentEmptyState", () => {
	const wrapper = mount(ContentEmptyState, {
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(ContentEmptyState));

	it("Renders an image", () => {
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".title").exists()).toBe(true);
		expect(wrapper.find(".title").text()).toBe(
			wrapper.vm.$i18n.t("pages.content.empty_state.error.title")
		);
	});
	it("Provides proper message", () => {
		expect(wrapper.find(".description").exists()).toBe(true);
	});
});
