import BoardColumnGhost from "./BoardColumnGhost.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("BoardColumnGhost", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(BoardColumnGhost, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isListBoard: false,
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

			const headerComponent = wrapper.findComponent("[data-testid=add-column]");
			headerComponent.trigger("add-column");

			const emitted = wrapper.emitted();
			expect(emitted["create:column"]).toBeDefined();
		});
	});

	describe("Container component", () => {
		it("should be found in DOM", () => {
			const { wrapper } = setup();
			const containerComponent = wrapper.findComponent({
				name: "Sortable",
			});
			expect(containerComponent.vm).toBeDefined();
		});
	});
});
