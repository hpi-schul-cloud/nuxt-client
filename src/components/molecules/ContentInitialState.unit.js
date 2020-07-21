import ContentInitialState from "./ContentInitialState";

describe("@components/molecules/ContentInitialState", () => {
	const testTitle = "test title";
	const testDescription = "test description";

	const wrapper = mount(ContentInitialState, {
		propsData: {
			image: "@assets/icons/emptystate.svg",
			title: testTitle,
			description: testDescription,
		},
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(ContentInitialState));

	// eslint-disable-next-line jest/no-commented-out-tests
	it("Renders an image", () => {
		console.log(wrapper.html());
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".title").exists()).toBe(true);
		expect(wrapper.find(".title").text()).toBe(testTitle);
	});
	it("Provides proper message", () => {
		expect(wrapper.find(".description").exists()).toBe(true);
		expect(wrapper.find(".description").text()).toBe(testDescription);
	});
});
