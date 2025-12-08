import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("BoardColumnInteractionHandler", () => {
	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		const wrapper = shallowMount(BoardColumnInteractionHandler, {
			slots: {
				default: `<button data-testid="button">Menu representative</button>`,
			},
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

		describe("when enter key is pressed", () => {
			describe("when being in edit mode", () => {
				it("should end edit mode", async () => {
					const wrapper = setup({ isEditMode: true });
					const element = wrapper.find("[data-testid=inline-edit-interaction-handler]");

					await element.trigger("keydown.enter");

					const emitted = wrapper.emitted("end-edit-mode");
					expect(emitted?.length).toBe(1);
				});
			});

			describe("when being not in edit mode", () => {
				it("should start edit mode", async () => {
					const wrapper = setup({ isEditMode: false });
					const element = wrapper.find("[data-testid=inline-edit-interaction-handler]");

					await element.trigger("keydown.enter");

					const emitted = wrapper.emitted("start-edit-mode");
					expect(emitted?.length).toBe(1);
				});

				describe("when focus is on a button", () => {
					it("should not start edit mode", async () => {
						const wrapper = setup({ isEditMode: false });
						const element = wrapper.find("[data-testid=button]");
						await element.trigger("keydown.enter");

						const emitted = wrapper.emitted("start-edit-mode");
						expect(emitted).toBeUndefined();
					});
				});
			});
		});

		describe("when tab key is pressed", () => {
			it("should end edit mode", async () => {
				const wrapper = setup({ isEditMode: true });
				const element = wrapper.find("[data-testid=event-handle]");

				await element.trigger("keydown.tab");

				const emitted = wrapper.emitted("end-edit-mode");
				expect(emitted?.length).toBe(1);
			});
		});
	});
});
