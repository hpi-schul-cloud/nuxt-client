import NewsCard from "./NewsCard";

describe("@components/NewsCard", () => {
	it(...isValidComponent(NewsCard));

	it("Renders default content", () => {
		const wrapper = mount(NewsCard, {
			...createComponentMocks({ router: true }),
			propsData: {
				id: "1",
				category: "Bio",
				title: "Bio Bio",
				content: "It's important!",
				createdAt: "2018-08-08",
				createdBy: "Me",
			},
		});
		expect(wrapper.find(".header").isEmpty()).toBe(false);
		expect(wrapper.find(".footer").exists()).toBe(false);
	});

	it("Renders without picture and date", () => {
		const wrapper = mount(NewsCard, {
			...createComponentMocks({ router: true }),
			propsData: {
				id: "1",
				category: "News Biologie",
				title: "Darwin lebt",
				content: "It's important!",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: "#412363",
			},
		});
		expect(wrapper.find(".content__picture").exists()).toBe(false);
		expect(wrapper.find(".footer").exists()).toBe(false);
		expect(wrapper.find(".content__text").isEmpty()).toBe(false);
	});

	it("Renders landscape mode classes when isLandscape", () => {
		const wrapper = mount(NewsCard, {
			...createComponentMocks({
				router: true,
			}),
			propsData: {
				isLandscape: true,
				id: "1",
				category: "News Biologie",
				title: "Darwin lebt",
				content: "It's important!",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: "#412363",
				picture: "https://source.unsplash.com/daily",
				eventDate: "2019-02-22 19:00",
			},
		});
		expect(wrapper.find(".landscape-mode").exists()).toBe(true);
		expect(wrapper.find(".landscape-mode__tab").exists()).toBe(true);
		expect(wrapper.find(".landscape-mode__content").exists()).toBe(true);
		expect(wrapper.find(".landscape-mode__content-picture").exists()).toBe(
			true
		);
		expect(wrapper.find(".landscape-mode__content-text").exists()).toBe(true);
	});

	it("Does not Render landscape mode classes when !isLandscape", () => {
		const wrapper = mount(NewsCard, {
			...createComponentMocks({
				router: true,
			}),
			propsData: {
				isLandscape: false,
				id: "1",
				category: "News Biologie",
				title: "Darwin lebt",
				content: "It's important!",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: "#c63e80",
				picture: "https://source.unsplash.com/daily",
				eventDate: "2019-02-22 19:00",
			},
		});
		expect(wrapper.find(".landscape-mode").exists()).toBe(false);
		expect(wrapper.find(".landscape-mode__tab").exists()).toBe(false);
		expect(wrapper.find(".landscape-mode__content").exists()).toBe(false);
		expect(wrapper.find(".landscape-mode__content-picture").exists()).toBe(
			false
		);
		expect(wrapper.find(".landscape-mode__content-text").exists()).toBe(false);
	});
});
