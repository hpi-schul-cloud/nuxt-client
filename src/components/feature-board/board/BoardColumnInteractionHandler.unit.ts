import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

describe("BoardColumnInteractionHandler", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardColumnInteractionHandler as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup({ isEditMode: true });
			expect(
				wrapper.findComponent(BoardColumnInteractionHandler).exists()
			).toBe(true);
		});
	});

	describe("keyboard events", () => {
		// TODO: add more keypress events
		describe("when arrow keys pressed", () => {
			it.each(["left", "right"])(
				"should emit 'move:column-keyboard' event with '%s' key stroke when it is not in edit mode",
				async (key) => {
					setup({ isEditMode: false });
					const element = wrapper.find("[data-testid=event-handle]");

					await element.trigger(`keydown.${key}`);
					const emitted: KeyboardEvent[][] = wrapper.emitted(
						"move:column-keyboard"
					) ?? [[]];
					expect(emitted[0][0]).toBeDefined();
					expect(emitted[0][0]).toBeInstanceOf(KeyboardEvent);
					expect(emitted[0][0].key.toLowerCase()).toStrictEqual(key);
				}
			);
		});
	});
});
