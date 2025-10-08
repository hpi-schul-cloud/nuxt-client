import CardHostInteractionHandlerVue from "./CardHostInteractionHandler.vue";
import { shallowMount } from "@vue/test-utils";

describe("CardHostInteractionHandler", () => {
	const setup = (options: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
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
	});
});
