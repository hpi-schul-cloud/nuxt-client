import ContentEmptyState from "./ContentEmptyState";

describe("@components/molecules/ContentEmptyState", () => {
	const wrapper = shallowMount(ContentEmptyState, {
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(ContentEmptyState));

	// eslint-disable-next-line jest/no-commented-out-tests
	it("Renders svg image", () => {
		expect(wrapper.find(".empty-state-container__image").exists()).toBe(true);
		expect(wrapper.find(".empty-state-container__image").attributes("alt")).toBe("empty-state-img");
		expect(wrapper.find(".empty-state-container__image").attributes("src")).toBe("@assets/img/edusharing/SC_Search-Results_Empty-State.svg");
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".empty-state-container__title").exists()).toBe(true);
		expect(wrapper.find(".empty-state-container__title").text()).toBe("Ooops, keine Ergebnisse!");
	});
	it("Provides proper subTitle", () => {
		expect(wrapper.find(".empty-state-container__sub-title").exists()).toBe(true);
		expect(wrapper.find(".empty-state-container__sub-title").text()).toBe("Vorschlag:");
	});
	it("Provides proper message", () => {
		expect(wrapper.find(".empty-state-container__message").exists()).toBe(true);
		expect(wrapper.find(".empty-state-container__message").text()).toBe("Achte darauf, dass alle Wörter richtig geschrieben sind. Probiere es mit anderen Suchbegriffen.Probiere es mit allgemeineren Suchbegriffen.Probiere es mit weniger Suchbegriffen.");
	});
});
