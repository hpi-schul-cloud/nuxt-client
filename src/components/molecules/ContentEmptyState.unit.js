import ContentEmptyState from "./ContentEmptyState";

describe("@components/molecules/ContentEmptyState", () => {
	it(...isValidComponent(ContentEmptyState));

	// eslint-disable-next-line jest/no-commented-out-tests
	it("Renders svg image", () => {
		const wrapper = shallowMount(ContentEmptyState, {
			...createComponentMocks({ i18n: true }),
			data: () => ({}),
		});
		expect(wrapper.find(".empty-state-container__image").exists()).toBe(true);
	});
});
