import InlineEditInteractionHandler from "./InlineEditInteractionHandler.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("InlineEditInteractionHandler", () => {
	const setup = (options?: Partial<{ isEditMode: boolean }>, mountOptions?: { attachTo?: HTMLElement }) => {
		const { isEditMode } = { isEditMode: false, ...options };

		const wrapper = mount(InlineEditInteractionHandler, {
			global: { plugins: [createTestingVuetify()] },
			props: { isEditMode },
			...mountOptions,
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(InlineEditInteractionHandler).exists()).toBe(true);
		});
	});

	describe("when clicked outside", () => {
		it("should emit 'end-edit-mode'", () => {
			const event = document.createEvent("MouseEvent");
			const { wrapper } = setup({ isEditMode: true });

			const outsideHandler = wrapper.findComponent({ name: "OnClickOutside" });
			outsideHandler.vm.$emit("trigger", event);

			const emitted = wrapper.emitted();
			expect(emitted["end-edit-mode"]).toBeDefined();
		});

		describe("when clicked element is in allowedTarget", () => {
			it("should not emit 'end-edit-mode' if the target is LinkElement", () => {
				const event = document.createEvent("MouseEvent");
				const linkElement = document.createElement("a");
				linkElement.setAttribute("href", "https://www.test.url");
				linkElement.setAttribute("data-testid", "board-file-element-edit-menu-download");

				Object.defineProperty(event, "target", {
					value: linkElement,
					writable: false,
				});

				const { wrapper } = setup({ isEditMode: true });

				const outsideHandler = wrapper.findComponent({
					name: "OnClickOutside",
				});
				outsideHandler.vm.$emit("trigger", event);

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeUndefined();
			});

			it("should not emit 'end-edit-mode' if the target is DatePicker", () => {
				const event = document.createEvent("MouseEvent");
				const datePickerElement = document.createElement("div");
				datePickerElement.classList.add("v-date-picker");

				Object.defineProperty(event, "target", {
					value: datePickerElement,
					writable: false,
				});

				const { wrapper } = setup({ isEditMode: true });

				const outsideHandler = wrapper.findComponent({
					name: "OnClickOutside",
				});
				outsideHandler.vm.$emit("trigger", event);

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeUndefined();
			});

			it("should not emit 'end-edit-mode' if the target is ListItem", () => {
				const event = document.createEvent("MouseEvent");
				const listItemElement = document.createElement("div");
				listItemElement.classList.add("v-list-item");

				Object.defineProperty(event, "target", {
					value: listItemElement,
					writable: false,
				});

				const { wrapper } = setup({ isEditMode: true });

				const outsideHandler = wrapper.findComponent({
					name: "OnClickOutside",
				});
				outsideHandler.vm.$emit("trigger", event);

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeUndefined();
			});

			it("should not emit 'end-edit-mode' if the target is button with keep-inline-edit-mode class", () => {
				const event = document.createEvent("MouseEvent");
				const buttonElement = document.createElement("button");
				buttonElement.classList.add("keep-inline-edit-mode");

				Object.defineProperty(event, "target", {
					value: buttonElement,
					writable: false,
				});

				const { wrapper } = setup({ isEditMode: true });

				const outsideHandler = wrapper.findComponent({
					name: "OnClickOutside",
				});
				outsideHandler.vm.$emit("trigger", event);

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeUndefined();
			});

			it("should not emit 'end-edit-mode' if the target is inside a Vuetify dialog", () => {
				const event = document.createEvent("MouseEvent");
				const dialogElement = document.createElement("div");
				dialogElement.classList.add("v-dialog");
				const inputElement = document.createElement("input");
				dialogElement.appendChild(inputElement);

				Object.defineProperty(event, "target", {
					value: inputElement,
					writable: false,
				});

				const { wrapper } = setup({ isEditMode: true });

				const outsideHandler = wrapper.findComponent({
					name: "OnClickOutside",
				});
				outsideHandler.vm.$emit("trigger", event);

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeUndefined();
			});

			it("should emit 'end-edit-mode' when the handler and the click target share the same dialog (CardHostDetailView case)", () => {
				// The handler is mounted inside a .v-dialog (via attachTo).
				// The click is on a different element inside the same dialog.
				// Both share the same dialog → isDialog returns false → edit mode ends.
				const dialogElement = document.createElement("div");
				dialogElement.classList.add("v-dialog");
				document.body.appendChild(dialogElement);

				const { wrapper } = setup({ isEditMode: true }, { attachTo: dialogElement });

				const clickTarget = document.createElement("div");
				dialogElement.appendChild(clickTarget);

				const event = document.createEvent("MouseEvent");
				Object.defineProperty(event, "target", { value: clickTarget, writable: false });

				wrapper.findComponent({ name: "OnClickOutside" }).vm.$emit("trigger", event);

				expect(wrapper.emitted()["end-edit-mode"]).toBeDefined();

				wrapper.unmount();
				document.body.removeChild(dialogElement);
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

		describe("when 'esc' keystroke", () => {
			it("should emit 'end-edit-mode'", () => {
				const { wrapper } = setup({ isEditMode: true });

				const divElement = wrapper.find('[data-testid="event-handle"]');
				divElement.trigger("keydown.escape");

				const emitted = wrapper.emitted();
				expect(emitted["end-edit-mode"]).toBeDefined();
			});
		});
	});
});
