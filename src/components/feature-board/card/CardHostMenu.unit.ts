import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHostMenu from "./CardHostMenu.vue";

describe("CardHostMenu Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHostMenu as MountOptions<Vue>, {
			...createComponentMocks({}),
			slots: {
				default: "<div>Delete Card</div>",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should have correct slot element", () => {
			setup();
			const htmlElement = wrapper.element.innerHTML;

			expect(htmlElement).toContain("<div>Delete Card</div>");
		});
	});
});
