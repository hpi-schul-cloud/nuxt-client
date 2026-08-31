import RenderHTML from "./RenderHTML.vue";
import { mount } from "@vue/test-utils";

describe("RenderHTML", () => {
	const setup = (props: { html: string; component?: string; config?: "richText" | "richTextNoLinks" }) => {
		const wrapper = mount(RenderHTML, {
			props,
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should render html in tags", () => {
			const { wrapper } = setup({ html: "<b>test value</b>" });
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.find("b").exists()).toBe(true);
		});

		it("should render with div", () => {
			const { wrapper } = setup({ html: "<b>test value</b>" });
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.element.nodeName).toStrictEqual("DIV");
		});

		it("should render with span", () => {
			const { wrapper } = setup({
				html: "<b>test value</b>",
				component: "span",
			});
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.element.nodeName).toStrictEqual("SPAN");
		});

		describe("when richText config is active", () => {
			it("should strip non whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<h1>test value</h1>",
					component: "span",
					config: "richText",
				});
				expect(wrapper.find("h1").exists()).toBe(false);
			});

			it("should allow whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<h5>test value</h5>",
					component: "span",
					config: "richText",
				});
				expect(wrapper.find("h5").exists()).toBe(true);
			});

			it("should strip non whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<span id="someId" style="font-color: green;" class="someclass">test value</span>',
					component: "div",
					config: "richText",
				});
				expect(wrapper.html()).toEqual(
					'<div><span style="font-color: green;" class="someclass">test value</span></div>'
				);
			});

			it("should allow whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<span style="font-color: green;" class="someclass">test value</span>',
					component: "div",
					config: "richText",
				});
				expect(wrapper.html()).toEqual(
					'<div><span style="font-color: green;" class="someclass">test value</span></div>'
				);
			});
		});

		describe("when richTextNoLinks config is active", () => {
			it("should strip anchor tags", () => {
				const { wrapper } = setup({
					html: '<a href="https://example.com">click here</a>',
					config: "richTextNoLinks",
				});
				expect(wrapper.find("a").exists()).toBe(false);
			});

			it("should preserve the anchor text content after stripping", () => {
				const { wrapper } = setup({
					html: '<a href="https://example.com">click here</a>',
					config: "richTextNoLinks",
				});
				expect(wrapper.text()).toContain("click here");
			});

			it("should strip anchors nested inside other allowed tags", () => {
				const { wrapper } = setup({
					html: '<p>See <a href="https://example.com">this link</a> for details.</p>',
					config: "richTextNoLinks",
				});
				expect(wrapper.find("a").exists()).toBe(false);
				expect(wrapper.find("p").exists()).toBe(true);
				expect(wrapper.text()).toContain("this link");
			});

			it("should still allow other whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<strong>bold</strong> and <em>italic</em>",
					config: "richTextNoLinks",
				});
				expect(wrapper.find("strong").exists()).toBe(true);
				expect(wrapper.find("em").exists()).toBe(true);
			});

			it("should strip non-whitelisted tags just like richText", () => {
				const { wrapper } = setup({
					html: "<h1>heading</h1>",
					config: "richTextNoLinks",
				});
				expect(wrapper.find("h1").exists()).toBe(false);
			});
		});
	});
});
