import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardAddCardButton from "./BoardAddCardButton.vue";

describe("BoardAddCardButton Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardAddCardButton as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should have proper class name to detect column end", async () => {
			setup();
			const stickyElement = wrapper.findComponent({ ref: "columnend" });

			expect(stickyElement.element.className).toContain("columnend");
		});
	});
});
