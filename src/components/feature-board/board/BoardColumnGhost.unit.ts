import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnGhost from "./BoardColumnGhost.vue";
// import {Container} from "vue-smooth-dnd";

describe("BoardColumnGhost", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		wrapper = shallowMount(BoardColumnGhost as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnGhost).exists()).toBe(true);
		});
	});

	describe("when the new column button clicked", () => {
		it("should emit 'add-empty-column'", () => {
			setup();

			const headerComponent = wrapper.findComponent({
				ref: "ghostColumnTitleRef",
			});
			headerComponent.vm.$emit("add-column");

			const emitted = wrapper.emitted();
			expect(emitted["add-empty-column"]).toBeDefined();
		});
	});

	describe("when a card dropped", () => {
		it("should emit 'add-empty-column'", () => {
			setup();

			const containerComponent = wrapper.findComponent({
				name: "Container",
			});
			containerComponent.vm.$emit("drop");

			const emitted = wrapper.emitted();
			expect(emitted["add-column-with-card"]).toBeDefined();
		});
	});
});
