import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHeader from "./CardHeader.vue";

describe("CardHeader Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHeader as MountOptions<Vue>, {
			...createComponentMocks({}),
			slots: {
				title: "<div>Title Slot Text</div>",
				menu: "<ul><li>Menu Element</li></ul>",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should have correct slot elements", () => {
			setup();
			const htmlElement = wrapper.element.innerHTML;

			expect(htmlElement).toContain("<div>Title Slot Text</div>");
			expect(htmlElement).toContain("<ul><li>Menu Element</li></ul>");
		});
	});
});
