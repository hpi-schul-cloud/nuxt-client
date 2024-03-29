import { shallowMount } from "@vue/test-utils";
import InlineEditInteractionHandler from "./InlineEditInteractionHandler.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("InlineEditInteractionHandler", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(InlineEditInteractionHandler, {
			global: {
				plugins: [createTestingVuetify()],
			},
			propsData: { isEditMode: false },
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(InlineEditInteractionHandler).exists()).toBe(
				true
			);
		});
	});

	describe("when clicked outside", () => {
		it("should emit 'end-edit-mode'", async () => {
			const event = document.createEvent("MouseEvent");
			const { wrapper } = setup();
			wrapper.setProps({ isEditMode: true });
			await wrapper.vm.$nextTick();

			const outsideHandler = wrapper.findComponent({ name: "OnClickOutside" });
			outsideHandler.vm.$emit("trigger", event);

			const emitted = wrapper.emitted();
			expect(emitted["end-edit-mode"]).toBeDefined();
		});
	});

	describe("when double clicked", () => {
		it("should emit 'start-edit-mode'", () => {
			const { wrapper } = setup();
			const divElement = wrapper.find('[data-testid="event-handle"]');
			divElement.trigger("dblclick");

			const emitted = wrapper.emitted();
			expect(emitted["start-edit-mode"]).toBeDefined();
		});
	});

	describe("when 'esc' keystoke", () => {
		it("should emit 'end-edit-mode'", async () => {
			const { wrapper } = setup();
			wrapper.setProps({ isEditMode: true });
			await wrapper.vm.$nextTick();

			const divElement = wrapper.find('[data-testid="event-handle"]');
			divElement.trigger("keydown.escape");

			const emitted = wrapper.emitted();
			expect(emitted["end-edit-mode"]).toBeDefined();
		});
	});
});
