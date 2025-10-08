import BoardSectionCreationHeader from "./BoardSectionCreationHeader.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("BoardSectionCreationHeader", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(BoardSectionCreationHeader, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				isColumnActive: true,
				label: "Add column",
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardSectionCreationHeader).exists()).toBe(true);
			expect(wrapper.findComponent({ name: "VBtn" }).exists()).toBe(true);
		});
	});

	describe("when 'add column' button clicked", () => {
		it("should emit 'add-column'", () => {
			const { wrapper } = setup();

			const button = wrapper.findComponent({ name: "VBtn" });
			button.vm.$emit("click");
			const emitted = wrapper.emitted();
			expect(wrapper.findComponent(BoardSectionCreationHeader).exists()).toBe(true);
			expect(emitted["add-column"]).toBeDefined();
		});
	});
});
