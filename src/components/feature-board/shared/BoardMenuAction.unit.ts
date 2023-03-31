import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuAction Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardMenuAction as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should emit if is clicked", () => {
			setup();
			const listItemComponent = wrapper.findComponent({ name: "VListItem" });

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted();

			expect(emitted.click).toBeDefined();
		});
	});
});
