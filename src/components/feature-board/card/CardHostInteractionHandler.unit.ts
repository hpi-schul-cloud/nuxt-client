import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHostInteractionHandlerVue from "./CardHostInteractionHandler.vue";

describe("CardHostInteractionHandler", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHostInteractionHandlerVue as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: { isEditMode: options?.isEditMode },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ isEditMode: false });
			expect(
				wrapper.findComponent(CardHostInteractionHandlerVue).exists()
			).toBe(true);
		});
	});

	describe("interactions", () => {
		describe("when key pressed", () => {
			it.each(["up", "down", "left", "right"])(
				"should emit 'move-card-keyboard' with '%s' key stroke when not editing",
				async (key) => {
					setup({ isEditMode: false });
					const eventHandle = await wrapper.find("[data-testid=event-handle]");
					await eventHandle.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted(
						"move-card-keyboard"
					) || [[]];
					expect(emitted[0][0]).toBeDefined();
					expect(emitted[0][0]).toBeInstanceOf(KeyboardEvent);
					expect(emitted[0][0].key.toLowerCase()).toStrictEqual(key);
				}
			);
			it.each(["up", "down", "left", "right"])(
				"should not emit 'move-card-keyboard' with '%s' key stroke when editing",
				async (key) => {
					setup({ isEditMode: true });
					const eventHandle = await wrapper.find("[data-testid=event-handle]");
					await eventHandle.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted(
						"move-card-keyboard"
					) || [[]];
					expect(emitted[0][0]).toBeFalsy();
				}
			);
		});
	});
});
