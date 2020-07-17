import ContentEmptyState from "./ContentEmptyState";

describe("@components/molecules/ContentEmptyState", () => {
	const wrapper = mount(ContentEmptyState, {
		propsData: {
			image: "@assets/icons/emptystate.svg",
		},
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(ContentEmptyState));

	// eslint-disable-next-line jest/no-commented-out-tests
	it("Renders an image", () => {
		expect(wrapper.find(".img-container").exists()).toBe(true);
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".title").exists()).toBe(true);
		expect(wrapper.find(".title").text()).toBe("Ooops, keine Ergebnisse!");
	});
	it("Provides proper message", () => {
		expect(wrapper.find(".description").exists()).toBe(true);
		expect(wrapper.find(".description").text()).toBe(
			"Vorschlag:Achte darauf, dass alle Wörter richtig geschrieben sind. Probiere es mit anderen Suchbegriffen.Probiere es mit allgemeineren Suchbegriffen.Probiere es mit weniger Suchbegriffen."
		);
	});
});
