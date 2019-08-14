import NewsCard from "./NewsCard";
import { RouterLinkStub } from "@vue/test-utils";

describe("@components/NewsCard", () => {
	it(...isValidComponent(NewsCard));

	it("Render default color", () => {
		const wrapper = mount(NewsCard, {
			propsData: {
				id: "1",
				category: "Bio",
				title: "Bio Bio",
				createdAt: "2018-08-08",
				createdBy: "Me",
			},
			stubs: {
				BaseLink: RouterLinkStub,
			},
		});
		expect(wrapper.find(".bottom-container").isEmpty()).toBe(false);
		expect(wrapper.find(".event-date").exists()).toBe(false);
	});

	it("Render without picture and date", () => {
		const wrapper = mount(NewsCard, {
			propsData: {
				id: "1",
				category: "News Biologie",
				title: "Darwin lebt",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: ["#412363", "#c63e80"],
			},
			slots: {
				default: "News news news news",
			},
			stubs: {
				BaseLink: RouterLinkStub,
			},
		});
		expect(wrapper.find(".inner-card").exists()).toBe(false);
		expect(wrapper.find(".event-date").exists()).toBe(false);
		expect(wrapper.find(".bottom-container").isEmpty()).toBe(false);
		expect(wrapper.find(".event-date").exists()).toBe(false);
	});
	it("Render with picture and date", () => {
		const wrapper = mount(NewsCard, {
			propsData: {
				id: "1",
				category: "News Biologie",
				title: "Darwin lebt",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: ["#412363", "#c63e80"],
				picture: "https://source.unsplash.com/daily",
				eventDate: "2019-02-22-19-00",
			},
			slots: {
				default: "News news news news",
			},
			stubs: {
				BaseLink: RouterLinkStub,
			},
		});
		expect(wrapper.find(".inner-card").exists()).toBe(true);
		expect(wrapper.find(".event-date").exists()).toBe(true);
		expect(wrapper.find(".bottom-container").isEmpty()).toBe(false);
	});
});
