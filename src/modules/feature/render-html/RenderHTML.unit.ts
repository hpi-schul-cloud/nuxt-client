import { mount } from "@vue/test-utils";
import RenderHTML from "./RenderHTML.vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { default as htmlConfig } from "./config";

describe("RenderHTML", () => {
	const setup = (props: {
		html: string;
		component?: string;
		config?: string;
	}) => {
		const wrapper = mount(RenderHTML, {
			global: {
				plugins: [
					[
						vueDompurifyHTMLPlugin,
						{
							namedConfigurations: htmlConfig,
						},
					],
				],
			},
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
	});
});
