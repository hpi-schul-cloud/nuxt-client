import ContentCard from "./ContentCard";

describe("@components/ContentCard", () => {
	it(...isValidComponent(ContentCard));

	it("Renders body and footer content", () => {
		const wrapper = shallowMount(ContentCard, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: "Title",
			},
		});
		expect(wrapper.find(".content__title").text()).toBe("Title");
		expect(wrapper.find(".footer__content").exists()).toBe(true);
	});

	it("Renders props when passed in", () => {
		const wrapper = shallowMount(ContentCard, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: "Title",
				thumbnail: "Thumbnail",
				description: "Description",
			},
		});
		expect(wrapper.find(".content__title").text()).toBe("Title");
		expect(wrapper.find(".content__img-thumbnail").attributes().src).toBe(
			"Thumbnail"
		);
		expect(wrapper.find(".content__description").text()).toBe("Description");
	});
});
