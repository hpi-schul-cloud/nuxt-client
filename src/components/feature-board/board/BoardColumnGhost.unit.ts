import { shallowMount } from "@vue/test-utils";
import BoardColumnGhost from "./BoardColumnGhost.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("BoardColumnGhost", () => {
	const { dragStart, dragEnd } = useDragAndDrop();

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(BoardColumnGhost, {
			global: {
				plugins: [createTestingVuetify()],
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardColumnGhost).exists()).toBe(true);
		});
	});

	describe("when the new column button clicked", () => {
		it("should emit 'add-empty-column'", () => {
			const { wrapper } = setup();

			const headerComponent = wrapper.findComponent({
				ref: "ghostColumnTitleRef",
			});
			headerComponent.vm.$emit("add-column");

			const emitted = wrapper.emitted();
			expect(emitted["create:column"]).toBeDefined();
		});
	});

	describe("Container component", () => {
		it("should be found in DOM", () => {
			dragStart();
			const { wrapper } = setup();
			const containerComponent = wrapper.findComponent({
				name: "Sortable",
			});
			expect(containerComponent.vm).toBeDefined();
		});

		it("should not be found in DOM", () => {
			dragEnd();
			const { wrapper } = setup();
			const containerComponent = wrapper.findAllComponents({
				name: "Sortable",
			});
			expect(containerComponent.length).toBe(0);
		});
	});
});
