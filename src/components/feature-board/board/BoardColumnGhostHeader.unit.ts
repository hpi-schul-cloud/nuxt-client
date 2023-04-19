import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";

describe("BoardColumnGhostHeader", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		wrapper = shallowMount(BoardColumnGhostHeader as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				isColumnActive: true,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnGhostHeader).exists()).toBe(true);
			expect(wrapper.findComponent({ name: "VBtn" }).exists()).toBe(true);
		});
	});

	describe("when 'add column' button clicked", () => {
		it("should emit 'add-column'", () => {
			setup();

			const button = wrapper.findComponent({ name: "VBtn" });
			button.vm.$emit("click");
			const emitted = wrapper.emitted();
			expect(wrapper.findComponent(BoardColumnGhostHeader).exists()).toBe(true);
			expect(emitted["add-column"]).toBeDefined();
		});
	});
});
