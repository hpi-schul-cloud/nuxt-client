import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("BoardColumnInteractionHandler", () => {
	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		const wrapper = shallowMount(BoardColumnInteractionHandler, {
			global: {
				plugins: [createTestingI18n()],
			},
			propsData: props,
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const wrapper = setup({ isEditMode: true });
			expect(wrapper.findComponent(BoardColumnInteractionHandler).exists()).toBe(true);
		});
	});

	describe("keyboard events", () => {
		// TODO: add more keypress events
		describe("when arrow keys pressed", () => {
			it.each(["left", "right"])(
				"should emit 'move:column-keyboard' event with '%s' key stroke when it is not in edit mode",
				async (key) => {
					const wrapper = setup({ isEditMode: false });
					const element = wrapper.find("[data-testid=event-handle]");

					await element.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted("move:column-keyboard") ?? [[]];
					expect(emitted[0][0]).toBeDefined();
					expect(emitted[0][0]).toBeInstanceOf(KeyboardEvent);
					expect(emitted[0][0].key.toLowerCase()).toStrictEqual(key);
				}
			);
		});
	});
});
