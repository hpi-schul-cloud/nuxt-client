import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardAddCardButton from "./BoardAddCardButton.vue";

describe("BoardAddCardButton Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (isSticky: boolean) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardAddCardButton as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				isSticky,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup(false);
			expect(wrapper).toBeDefined();
		});

		it("should be sticky if sticky is required", async () => {
			setup(true);
			const stickyElement = wrapper.findComponent({ ref: "sticky" });

			expect(stickyElement.element.className).toContain("sticky");
		});

		it("should not be sticky if sticky is not required", async () => {
			setup(false);
			const stickyElement = wrapper.findComponent({ ref: "sticky" });

			expect(stickyElement.element.className).not.toContain("sticky");
		});
	});
});
