import type { NewsCardItem } from "./news-card.types";
import NewsGrid from "./NewsGrid.vue";
import { newsCardItemFactory } from "@@/tests/test-utils";
import { mount } from "@vue/test-utils";

describe("NewsGrid", () => {
	const newsItems: readonly NewsCardItem[] = newsCardItemFactory.buildList(2);

	const setup = (items: readonly NewsCardItem[]) =>
		mount(NewsGrid, {
			props: {
				newsItems: items,
			},
			global: {
				stubs: {
					NewsCard: {
						name: "NewsCard",
						template: "<div class='news-card-stub' />",
						props: ["newsItem", "index"],
					},
				},
			},
		});

	it("should render the news section container", () => {
		const wrapper = setup(newsItems);

		expect(wrapper.find("[data-testid='news-section']").exists()).toBe(true);
	});

	it("should render one NewsCard per news item", () => {
		const wrapper = setup(newsItems);

		expect(wrapper.findAllComponents({ name: "NewsCard" })).toHaveLength(newsItems.length);
	});

	it("should pass each news item and index to NewsCard", () => {
		const wrapper = setup(newsItems);
		const cards = wrapper.findAllComponents({ name: "NewsCard" });

		expect(cards[0].props("newsItem")).toEqual(newsItems[0]);
		expect(cards[0].props("index")).toBe(0);
		expect(cards[1].props("newsItem")).toEqual(newsItems[1]);
		expect(cards[1].props("index")).toBe(1);
	});

	it("should render no cards when list is empty", () => {
		const wrapper = setup([]);

		expect(wrapper.findAllComponents({ name: "NewsCard" })).toHaveLength(0);
	});
});
