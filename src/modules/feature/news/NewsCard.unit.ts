import type { NewsCardItem } from "./news-card.types";
import NewsCard from "./NewsCard.vue";
import * as dateTimeUtils from "@/utils/date-time.utils";
import { newsCardItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsTargetModel } from "@api-server";
import { mount } from "@vue/test-utils";

describe("NewsCard", () => {
	const baseNewsItem: NewsCardItem = newsCardItemFactory.build();

	const setup = (options?: { index?: number; newsItem?: NewsCardItem }) =>
		mount(NewsCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					RouterLink: true,
					RenderHTML: {
						name: "RenderHTML",
						template: "<div data-testid='render-html' />",
						props: ["html", "config"],
					},
				},
			},
			props: {
				index: options?.index ?? 0,
				newsItem: options?.newsItem ?? baseNewsItem,
			},
		});

	beforeEach(() => {
		vi.spyOn(dateTimeUtils, "fromNowUtc").mockReturnValue("2 days ago");
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should render title, relative date and detail link", () => {
		const wrapper = setup();

		expect(wrapper.find("[data-testid='news-card-item-0']").exists()).toBe(true);
		expect(wrapper.find("[data-testid='news-title-0']").text()).toBe(baseNewsItem.title);
		expect(wrapper.text()).toContain("2 days ago");
		expect(dateTimeUtils.fromNowUtc).toHaveBeenCalledWith(baseNewsItem.displayAt);
		expect(wrapper.findComponent({ name: "VCard" }).props("to")).toBe("/news/news-1");
	});

	it("should pass content and config to RenderHTML", () => {
		const wrapper = setup();
		const renderHtml = wrapper.findComponent({ name: "RenderHTML" });

		expect(renderHtml.exists()).toBe(true);
		expect(renderHtml.props("html")).toBe(baseNewsItem.content);
		expect(renderHtml.props("config")).toBe("richTextNoLinks");
	});

	it("should show team chip when target model is teams", () => {
		const wrapper = setup({
			newsItem: {
				...baseNewsItem,
				targetModel: NewsTargetModel.TEAMS,
				target: { name: "Class Team" },
			},
		});

		expect(wrapper.findComponent({ name: "VChip" }).exists()).toBe(true);
		expect(wrapper.findComponent({ name: "VChip" }).text()).toContain("Class Team");
	});

	it("should not show team chip for non-team target models", () => {
		const wrapper = setup({
			newsItem: {
				...baseNewsItem,
				targetModel: NewsTargetModel.COURSES,
				target: { name: "Course A" },
			},
		});

		expect(wrapper.findComponent({ name: "VChip" }).exists()).toBe(false);
	});
});
