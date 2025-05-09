import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

describe("RichTextContentElementEdit", () => {
	const setup = ({ autofocus = true }: { autofocus: boolean }) => {
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
				value: "test value",
				autofocus,
				columnIndex: 0,
			},
		});

		return { wrapper };
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
			const { wrapper } = setup({ autofocus: true });
			const newValue = "new title";
			await wrapper.setProps({ value: newValue });
			await nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["update:value"]).toHaveLength(1);
		});
	});
});
