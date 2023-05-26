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
			it("should not render h1", () => {
				setup({ html: "<h1>test value</h1>", component: "span" });
				console.log(wrapper.html());
				expect(wrapper.find("h1").exists()).toBe(false);
			});
		});

		describe("when translations config is active", () => {
			it("should not render div", () => {
				setup({ html: "<div>test value</div>", component: "span" });
				console.log(wrapper.html());
				expect(wrapper.find("div").exists()).toBe(false);
			});
		});
	});
});
