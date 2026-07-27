import CardHostInteractionHandlerVue from "./CardHostInteractionHandler.vue";
import { shallowMount } from "@vue/test-utils";

describe("CardHostInteractionHandler", () => {
	const setup = (options: { isEditMode: boolean }) => {
		const wrapper = shallowMount(CardHostInteractionHandlerVue, {
			propsData: { isEditMode: options?.isEditMode },
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });
			expect(wrapper.findComponent(CardHostInteractionHandlerVue).exists()).toBe(true);
		});
	});

	describe("interactions", () => {
		describe("when key pressed", () => {
			it.each(["up", "down", "left", "right"])(
				"should emit 'move:card-keyboard' with '%s' key stroke when not editing",
				async (key) => {
					const { wrapper } = setup({ isEditMode: false });
					const eventHandle = await wrapper.find("[data-testid=event-handle]");
					await eventHandle.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted("move:card-keyboard") || [[]];
					expect(emitted[0][0]).toBeDefined();
					expect(emitted[0][0]).toBeInstanceOf(KeyboardEvent);
					expect(emitted[0][0].key.toLowerCase()).toStrictEqual(key);
				}
			);
			it.each(["up", "down", "left", "right"])(
				"should not emit 'move:card-keyboard' with '%s' key stroke when editing",
				async (key) => {
					const { wrapper } = setup({ isEditMode: true });
					const eventHandle = await wrapper.find("[data-testid=event-handle]");
					await eventHandle.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted("move:card-keyboard") || [[]];
					expect(emitted[0][0]).toBeFalsy();
				}
			);
		});

		describe("when enter is pressed", () => {
			const triggerEnterWithTargetClass = (wrapper: ReturnType<typeof mount>, className: string | undefined) => {
				const eventHandle = wrapper.find("[data-testid=event-handle]").element;
				const target = document.createElement("div");
				if (className) target.setAttribute("class", className);

				const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
				Object.defineProperty(event, "target", { value: target, writable: false });

				eventHandle.dispatchEvent(event);

				return event;
			};

			it("should emit 'start-edit-mode' when the target is the card host and not editing", () => {
				const { wrapper } = setup({ isEditMode: false });

				triggerEnterWithTargetClass(wrapper, "card-host");

				expect(wrapper.emitted("start-edit-mode")).toHaveLength(1);
			});

			it("should emit 'start-edit-mode' when the target is the empty element placeholder and not editing", () => {
				const { wrapper } = setup({ isEditMode: false });

				triggerEnterWithTargetClass(wrapper, "board-empty-element");

				expect(wrapper.emitted("start-edit-mode")).toHaveLength(1);
			});

			it("should not emit 'start-edit-mode' when the target is neither the card host nor the empty element", () => {
				const { wrapper } = setup({ isEditMode: false });

				triggerEnterWithTargetClass(wrapper, "some-other-class");

				expect(wrapper.emitted("start-edit-mode")).toBeUndefined();
			});

			it("should not emit 'start-edit-mode' when already editing", () => {
				const { wrapper } = setup({ isEditMode: true });

				triggerEnterWithTargetClass(wrapper, "board-empty-element");

				expect(wrapper.emitted("start-edit-mode")).toBeUndefined();
			});
		});
	});
});
