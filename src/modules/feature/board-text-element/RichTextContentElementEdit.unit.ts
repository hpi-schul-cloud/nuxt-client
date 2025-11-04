import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { richTextElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useContentElementState } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";

vi.mock("@data-board/ContentElementState.composable");

describe("RichTextContentElementEdit", () => {
	let useContentElementStateMock: DeepMocked<ReturnType<typeof useContentElementState>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useContentElementStateMock = createMock<ReturnType<typeof useContentElementState>>();
		vi.mocked(useContentElementState).mockReturnValue(useContentElementStateMock);
	});

	const setup = ({ autofocus = true }: { autofocus: boolean }) => {
		const element = richTextElementResponseFactory.build();
		const modelValueOfComposable = ref(element.content);
		useContentElementStateMock.modelValue = modelValueOfComposable;

		const wrapper = mount(RichTextContentElementEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_IS_LIST_LAYOUT as symbol]: false,
				},

				stubs: {
					InlineEditor: true,
				},
			},
			props: {
				element,
				isEditMode: true,
				autofocus,
				columnIndex: 0,
			},
		});

		return { wrapper, modelValueOfComposable };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ autofocus: false });
			const content = wrapper.findComponent(RichTextContentElementEdit);
			expect(content.exists()).toBe(true);
		});

		it("should render InlineEditor component", async () => {
			const { wrapper } = setup({ autofocus: true });
			const editor = wrapper.findComponent({ name: "InlineEditor" });
			expect(editor.exists()).toBe(true);
		});

		it("should emit delete:element on CK editor keyboard delete event", async () => {
			const { wrapper } = setup({ autofocus: true });
			const editor = wrapper.findComponent({ name: "InlineEditor" });
			editor.vm.$emit("keyboard:delete");

			const emitted = wrapper.emitted();
			expect(emitted["delete:element"]).toHaveLength(1);
		});

		it("should update modalValue when prop value changes", async () => {
			const { wrapper, modelValueOfComposable } = setup({ autofocus: true });
			const newValue = "new title";

			const inlineEditor = wrapper.getComponent({ name: "InlineEditor" });
			await inlineEditor.vm.$emit("update:value", newValue);
			await flushPromises();

			expect(modelValueOfComposable.value.text).toBe(newValue);
		});
	});
});
