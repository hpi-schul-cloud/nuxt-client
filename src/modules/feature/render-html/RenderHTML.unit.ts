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

		describe("when ck5 config is active", () => {
			it("should strip non whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<h1>test value</h1>",
					component: "span",
					config: "ck5",
				});
				expect(wrapper.find("h1").exists()).toBe(false);
			});

			it("should allow whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<h5>test value</h5>",
					component: "span",
					config: "ck5",
				});
				expect(wrapper.find("h5").exists()).toBe(true);
			});

			it("should strip non whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<span id="someId" style="font-color: green;" class="someclass">test value</span>',
					component: "div",
					config: "ck5",
				});
				expect(wrapper.html()).toEqual(
					'<div><span class="someclass" style="font-color: green;">test value</span></div>'
				);
			});

			it("should allow whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<span style="font-color: green;" class="someclass">test value</span>',
					component: "div",
					config: "ck5",
				});
				expect(wrapper.html()).toEqual(
					'<div><span class="someclass" style="font-color: green;">test value</span></div>'
				);
			});
		});

		describe("when translations config is active", () => {
			it("should strip non whiteltisted tags", () => {
				const { wrapper } = setup({
					html: "<h5>test value</h5>",
					component: "span",
				});
				expect(wrapper.find("h5").exists()).toBe(false);
			});

			it("should allow whitelisted tags", () => {
				const { wrapper } = setup({
					html: "<div>test value</div>",
					component: "span",
				});
				expect(wrapper.find("div").exists()).toBe(false);
			});

			it("should strip non whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<b id="someId" class="someclass">test value</b>',
					component: "span",
				});
				expect(wrapper.html()).toEqual(
					'<span><b class="someclass">test value</b></span>'
				);
			});

			it("should allow whitelisted attributes", () => {
				const { wrapper } = setup({
					html: '<b class="someclass">test value</b>',
					component: "span",
				});
				expect(wrapper.html()).toEqual(
					'<span><b class="someclass">test value</b></span>'
				);
			});
		});
	});
});
