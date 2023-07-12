import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import InlineEditInteractionHandler from "./InlineEditInteractionHandler.vue";

describe("InlineEditInteractionHandler", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		wrapper = shallowMount(InlineEditInteractionHandler as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: { isEditMode: false },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(InlineEditInteractionHandler).exists()).toBe(
				true
			);
		});
	});

	describe("when clicked outside", () => {
		it("should emit 'end-edit-mode'", async () => {
			const event = document.createEvent("MouseEvent");
			setup();
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
			setup();
			const divElement = wrapper.findComponent({ ref: "event-handle" });
			divElement.trigger("dblclick");

			const emitted = wrapper.emitted();
			expect(emitted["start-edit-mode"]).toBeDefined();
		});
	});

	describe("when 'esc' keystoke", () => {
		it("should emit 'end-edit-mode'", async () => {
			setup();
			wrapper.setProps({ isEditMode: true });
			await wrapper.vm.$nextTick();

			const divElement = wrapper.findComponent({ ref: "event-handle" });
			divElement.trigger("keydown.escape");

			const emitted = wrapper.emitted();
			expect(emitted["end-edit-mode"]).toBeDefined();
		});
	});
});
