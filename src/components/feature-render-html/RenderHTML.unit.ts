import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RenderHTML from "./RenderHTML.vue";

describe("RenderHTML", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		html: string;
		component?: string;
		config?: string;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(RenderHTML as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should render html in tags", () => {
			setup({ html: "<b>test value</b>" });
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.find("b").exists()).toBe(true);
		});

		it("should render with div", () => {
			setup({ html: "<b>test value</b>" });
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.element.nodeName).toStrictEqual("DIV");
		});

		it("should render with span", () => {
			setup({ html: "<b>test value</b>", component: "span" });
			expect(wrapper.findComponent(RenderHTML).exists()).toBe(true);
			expect(wrapper.element.nodeName).toStrictEqual("SPAN");
		});

		describe("when ck5 config is active", () => {
			it("should strip non whitelisted tags", () => {
				setup({
					html: "<h1>test value</h1>",
					component: "span",
					config: "ck5",
				});
				expect(wrapper.find("h1").exists()).toBe(false);
			});

			it("should allow whitelisted tags", () => {
				setup({
					html: "<h5>test value</h5>",
					component: "span",
					config: "ck5",
				});
				expect(wrapper.find("h5").exists()).toBe(true);
			});

			it("should strip non whitelisted attributes", () => {
				setup({
					html: '<span id="someId" style="font-color: green;" class="someclass">test value</span>',
					component: "div",
					config: "ck5",
				});
				expect(wrapper.html()).toEqual(
					'<div><span class="someclass" style="font-color: green;">test value</span></div>'
				);
			});

			it("should allow whitelisted attributes", () => {
				setup({
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
				setup({ html: "<h5>test value</h5>", component: "span" });
				expect(wrapper.find("h5").exists()).toBe(false);
			});

			it("should allow whitelisted tags", () => {
				setup({ html: "<div>test value</div>", component: "span" });
				expect(wrapper.find("div").exists()).toBe(false);
			});

			it("should strip non whitelisted attributes", () => {
				setup({
					html: '<b id="someId" class="someclass">test value</b>',
					component: "span",
				});
				expect(wrapper.html()).toEqual(
					'<span><b class="someclass">test value</b></span>'
				);
			});

			it("should allow whitelisted attributes", () => {
				setup({
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
