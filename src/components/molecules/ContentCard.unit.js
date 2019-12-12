import ContentCard from "./ContentCard";

describe("@components/ContentCard", () => {
	it(...isValidComponent(ContentCard));

	it("Renders body and footer content", () => {
		const wrapper = shallowMount(ContentCard, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: "Title",
				providerName: "ProviderName",
			},
		});
		expect(wrapper.find(".content__title").text()).toBe("Title");
		expect(wrapper.find(".footer__info").text()).toBe("via ProviderName");
	});

	it("Renders props when passed in", () => {
		const wrapper = shallowMount(ContentCard, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: "Title",
				providerName: "ProviderName",
				thumbnail: "Thumbnail",
				tags: ["Tag"],
				description: "Description",
			},
		});
		expect(wrapper.find(".content__title").text()).toBe("Title");
		expect(wrapper.find(".footer__info").text()).toBe("via ProviderName");
		expect(wrapper.find(".content__thumbnail").attributes().src).toBe(
			"Thumbnail"
		);
		expect(wrapper.find(".content__tags-tag").text()).toBe("Tag");
		expect(wrapper.find(".content__description").text()).toBe("Description");
	});
});
