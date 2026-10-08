import type { TableOfContentsElement, TableOfContentsSection } from "./cardTableOfContents.composable";
import CardTableOfContents from "./CardTableOfContents.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiLink } from "@icons/material";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("CardTableOfContents", () => {
	const setup = (elements?: TableOfContentsElement[], activeElementId?: string) => {
		const router = createRouterMock({ spy: { create: (fn) => vi.fn(fn), reset: (fn) => fn.mockReset() } });
		injectRouterMock(router);

		const sections: TableOfContentsSection[] = [
			{
				columnId: "column-1",
				title: "First column",
				cards: [
					{ cardId: "card-1", title: "Current card", isCurrent: true, route: "/boards/board-1/cards/card-1" },
					{ cardId: "card-2", title: "Other card", isCurrent: false, route: "/boards/board-1/cards/card-2" },
				],
			},
			{
				columnId: "column-2",
				title: "Second column",
				cards: [{ cardId: "card-3", title: "Third card", isCurrent: false, route: "/boards/board-1/cards/card-3" }],
			},
		];

		const wrapper = mount(CardTableOfContents, {
			props: {
				sections,
				activeElementId,
				elements: elements ?? [
					{ id: "element-1", icon: mdiLink, label: "example.org" },
					{ id: "element-2", icon: mdiLink, label: "Second element" },
				],
			},
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return { wrapper };
	};

	it("should render a labelled navigation landmark with a heading", () => {
		const { wrapper } = setup();

		const nav = wrapper.find("nav[data-testid='card-toc']");
		expect(nav.attributes("aria-label")).toBe("components.board.dialog.detail-view.tableOfContents.title");
		expect(nav.find("h2").text()).toBe("components.board.dialog.detail-view.tableOfContents.title");
	});

	it("should render a heading for every column", () => {
		const { wrapper } = setup();

		expect(wrapper.findAll("h3").map((heading) => heading.text())).toEqual(["First column", "Second column"]);
	});

	it("should render every card as a link to its detail view", () => {
		const { wrapper } = setup();

		const card = wrapper.find("[data-testid='card-toc-card-card-2']");
		expect(card.attributes("to")).toBe("/boards/board-1/cards/card-2");
		expect(card.text()).toBe("Other card");
		expect(wrapper.find("[data-testid='card-toc-card-card-3']").text()).toBe("Third card");
	});

	it("should mark only the current card as current page", () => {
		const { wrapper } = setup();

		expect(wrapper.find("[data-testid='card-toc-card-card-1']").attributes("aria-current")).toBe("page");
		expect(wrapper.find("[data-testid='card-toc-card-card-2']").attributes("aria-current")).toBeUndefined();
	});

	it("should render the elements below the current card only", () => {
		const { wrapper } = setup();

		const items = wrapper.findAll("[data-testid^='card-toc-']").map((item) => item.attributes("data-testid"));

		expect(items).toEqual([
			"card-toc-card-card-1",
			"card-toc-element-element-1",
			"card-toc-element-element-2",
			"card-toc-card-card-2",
			"card-toc-card-card-3",
		]);
	});

	it("should render elements as native buttons with their label", () => {
		const { wrapper } = setup();

		const element = wrapper.find("[data-testid='card-toc-element-element-1']");
		expect(element.element.tagName).toBe("BUTTON");
		expect(element.attributes("type")).toBe("button");
		expect(element.text()).toBe("example.org");
		expect(element.attributes("title")).toBe("example.org");
	});

	describe("when an element is active", () => {
		it("should mark only that element as current location", () => {
			const { wrapper } = setup(undefined, "element-2");

			expect(wrapper.find("[data-testid='card-toc-element-element-2']").attributes("aria-current")).toBe("location");
			expect(wrapper.find("[data-testid='card-toc-element-element-1']").attributes("aria-current")).toBeUndefined();
		});
	});

	describe("when the current card has no elements", () => {
		it("should show an empty state", () => {
			const { wrapper } = setup([]);

			expect(wrapper.find("[data-testid='card-toc-empty']").text()).toBe(
				"components.board.dialog.detail-view.tableOfContents.empty"
			);
		});
	});

	describe("when the current card has elements", () => {
		it("should not show an empty state", () => {
			const { wrapper } = setup();

			expect(wrapper.find("[data-testid='card-toc-empty']").exists()).toBe(false);
		});
	});

	describe("when an element is clicked", () => {
		it("should emit select:element with its id", async () => {
			const { wrapper } = setup();

			await wrapper.find("[data-testid='card-toc-element-element-2']").trigger("click");

			expect(wrapper.emitted("select:element")).toEqual([["element-2"]]);
		});
	});

	describe("when a card is clicked", () => {
		it("should emit select:card", async () => {
			const { wrapper } = setup();

			await wrapper.find("[data-testid='card-toc-card-card-2']").trigger("click");

			expect(wrapper.emitted("select:card")).toHaveLength(1);
		});
	});
});
