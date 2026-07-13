import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";
import { InlineEditInteractionHandled } from "@/types/board/InlineEditInteractionHandled.symbol";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick, Ref, ref } from "vue";
import { VTextarea } from "vuetify/components";

vi.mock("@util-board");

const defaultProps = {
	value: "props value",
	isEditMode: true,
	scope: "card",
	emptyValueFallback: "",
	isFocused: false,
};

describe("BoardAnyTitleInput", () => {
	const setup = (
		props: {
			isEditMode: boolean;
			scope: "card" | "column" | "board";
			emptyValueFallback?: string;
			isFocused?: boolean;
			maxLength?: number;
			focusTitleOnEditStart?: boolean;
		},
		options?: {
			interactionEvent?: Ref<{ x: number; y: number } | undefined>;
			interactionHandled?: Ref<boolean>;
		}
	) => {
		const wrapper = mount(BoardAnyTitleInput, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				provide: {
					...(options?.interactionEvent ? { [InlineEditInteractionEvent]: options.interactionEvent } : {}),
					...(options?.interactionHandled ? { [InlineEditInteractionHandled]: options.interactionHandled } : {}),
				},
			},
			propsData: {
				...defaultProps,
				...props,
			},
		});

		return { wrapper };
	};

	it("should be found in dom", () => {
		const { wrapper } = setup({ isEditMode: false, scope: "card" });
		expect(wrapper.exists()).toBe(true);
	});

	describe("when component is in edit mode", () => {
		it("should display textarea", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const textAreaComponent = wrapper.findComponent(VTextarea);

			expect(textAreaComponent.exists()).toBe(true);
		});

		it("should not display heading", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const heading = wrapper.find("h1");

			expect(heading.exists()).toBe(false);
		});

		it("should forward maxLength prop to VTextarea", () => {
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
				maxLength: 10,
			});

			const textAreaComponent = wrapper.findComponent(VTextarea);
			const textarea = textAreaComponent.find("textarea");
			const maxLength = textarea.attributes("maxlength");

			expect(maxLength).toBe("10");
		});

		it("should emit enter on hitting 'enter' key in card title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const textAreaComponent = wrapper.findComponent(VTextarea);
			await textAreaComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("should emit enter on hitting 'enter' key in column title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "column" });
			const textAreaComponent = wrapper.findComponent(VTextarea);
			await textAreaComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("should emit enter on hitting 'enter' key in board title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("updates modalValue when prop value changes", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			await wrapper.setProps({ value: newValue });
			await nextTick();

			expect((wrapper.vm as unknown as typeof BoardAnyTitleInput).modelValue).toBe(newValue);
		});
	});

	describe("when component is not in edit mode", () => {
		it("should display h1 with board title class when scope is board", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "board" });
			const heading = wrapper.find("h1");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("board-title");
		});

		it("should display VTextarea when scope is column", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "column" });
			const heading = wrapper.find("h2");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("other-title");
		});

		it("should display h2 when scope is card", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "card" });
			const heading = wrapper.find("h3");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("other-title");
		});

		it("should display correct title when textarea value changes", async () => {
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
			});
			const newTitle = "New Title";

			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.setValue(newTitle);

			await wrapper.setProps({ isEditMode: false });
			await wrapper.setProps({ value: newTitle }); // simulate prop update after edit mode
			const heading = wrapper.find("h1");

			expect(heading.text()).toBe(newTitle);
		});

		it("should display fallback title when textarea value is empty", async () => {
			const emptyValueFallback = "Fallback Title";
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
				emptyValueFallback,
			});

			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.setValue("");

			await wrapper.setProps({ isEditMode: false });
			await wrapper.setProps({ value: "" }); // simulate prop update after edit mode
			const heading = wrapper.find("h1");

			expect(heading.text()).toBe(emptyValueFallback);
		});
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		describe("when scope is board", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "board" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				await flushPromises();

				expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
				expect(textAreaComponent.classes()).toContain("error-message-width");
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "board" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});

		describe("when scope is card", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");

				await flushPromises();
				expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
				expect(textAreaComponent.classes()).toContain("error-message-width");
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});

		describe("when scope is column", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "column" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");

				await flushPromises();
				expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
				expect(textAreaComponent.classes()).toContain("error-message-width");
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "column" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});

		describe("applyFallbackRuleOnEmptyValue", () => {
			describe("when title is empty", () => {
				it("should set value to fallback", async () => {
					const emptyValueFallback = "Fallback Title";
					const { wrapper } = setup({
						isEditMode: false,
						scope: "board",
						emptyValueFallback,
					});

					await wrapper.setProps({ value: "", isEditMode: true });

					expect((wrapper.vm as unknown as typeof BoardAnyTitleInput).modelValue).toBe(emptyValueFallback);
				});
			});

			describe("when title is non-empty", () => {
				it("should not set value to fallback", async () => {
					const emptyValueFallback = "Fallback Title";
					const title = "Some Title";
					const { wrapper } = setup({
						isEditMode: false,
						scope: "board",
						emptyValueFallback,
					});

					await wrapper.setProps({ value: title, isEditMode: true });

					expect((wrapper.vm as unknown as typeof BoardAnyTitleInput).modelValue).toBe(title);
				});
			});
		});
	});

	describe("when entering edit mode with card scope", () => {
		describe("when isFocused is true and no interaction event is injected", () => {
			it("should auto-focus the textarea", async () => {
				const { wrapper } = setup({ isEditMode: false, scope: "card", isFocused: true });

				await wrapper.setProps({ isEditMode: true });
				await nextTick();
				await nextTick();

				const textAreaComponent = wrapper.findComponent(VTextarea);
				expect(textAreaComponent.props("autofocus")).toBe(true);
			});
		});

		describe("when isFocused is true and an interaction event is injected", () => {
			it("should not auto-focus the textarea (defers focus to the interaction handler)", async () => {
				const interactionEvent = ref<{ x: number; y: number } | undefined>({ x: 100, y: 100 });
				const { wrapper } = setup({ isEditMode: false, scope: "card", isFocused: true }, { interactionEvent });

				await wrapper.setProps({ isEditMode: true });
				await nextTick();
				await nextTick();

				const textAreaComponent = wrapper.findComponent(VTextarea);
				expect(textAreaComponent.props("autofocus")).toBe(false);
			});
		});

		describe("when focusTitleOnEditStart is true and no interaction event is injected", () => {
			it("should auto-focus the textarea", async () => {
				const { wrapper } = setup({ isEditMode: false, scope: "card", isFocused: false, focusTitleOnEditStart: true });

				await wrapper.setProps({ isEditMode: true });
				await nextTick();
				await nextTick();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(true);
			});
		});

		describe("when an interaction event is injected and interactionHandled is true", () => {
			it("should not auto-focus the textarea (a content element claimed the interaction)", async () => {
				const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);
				const interactionHandled = ref(true);
				const { wrapper } = setup({ isEditMode: false, scope: "card" }, { interactionEvent, interactionHandled });

				interactionEvent.value = { x: 999, y: 999 };
				await wrapper.setProps({ isEditMode: true });
				await flushPromises();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(false);
			});
		});
	});

	describe("when an interaction event fires while already in edit mode (double-click on empty card area)", () => {
		it("should auto-focus the title as fallback when no content element claims the interaction (non-empty title, already mounted)", async () => {
			const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);
			// Non-empty title: component is mounted in view mode; watch(interactionEvent) handles it
			const { wrapper } = setup({ isEditMode: false, scope: "card" }, { interactionEvent });

			interactionEvent.value = { x: 999, y: 999 };
			await wrapper.setProps({ isEditMode: true });
			await flushPromises();

			expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(true);
		});

		it("should auto-focus the title as fallback when component mounts during double-click (empty title hidden in view mode)", async () => {
			const interactionEvent = ref<{ x: number; y: number } | undefined>({ x: 999, y: 999 });
			// Empty title: component mounts WITH isEditMode=true and interactionEvent already set.
			// onMounted handles this path (watch cannot catch the already-set value).
			const { wrapper } = setup({ isEditMode: true, scope: "card" }, { interactionEvent });
			await flushPromises();

			expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(true);
		});
	});

	describe("when mounted with isEditMode already true (e.g. empty title freshly rendered in edit mode)", () => {
		describe("when isFocused is true and no interaction event", () => {
			it("should auto-focus the textarea on mount", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card", isFocused: true });
				await nextTick();
				await nextTick();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(true);
			});
		});

		describe("when isFocused is true and an interaction event is active", () => {
			it("should not auto-focus the textarea on mount (interaction handler takes over)", async () => {
				const interactionEvent = ref<{ x: number; y: number } | undefined>({ x: 100, y: 100 });
				// Provide interactionHandled=true to correctly model a content element claiming the interaction.
				const interactionHandled = ref(true);
				const { wrapper } = setup(
					{ isEditMode: true, scope: "card", isFocused: true },
					{ interactionEvent, interactionHandled }
				);
				await flushPromises();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(false);
			});
		});

		describe("when focusTitleOnEditStart is true and no interaction event", () => {
			it("should auto-focus the textarea on mount", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card", isFocused: false, focusTitleOnEditStart: true });
				await nextTick();
				await nextTick();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(true);
			});
		});

		describe("when neither isFocused nor focusTitleOnEditStart", () => {
			it("should not auto-focus the textarea on mount", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card", isFocused: false });
				await nextTick();
				await nextTick();

				expect(wrapper.findComponent(VTextarea).props("autofocus")).toBe(false);
			});
		});
	});
});
