import InlineEditor from "./InlineEditor.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { logger } from "@util-logger";
import { computed, ref } from "vue";
import { useEditorConfig } from "./EditorConfig.composable";

type CkEditorProps = {
	value?: string;
	placeholder?: string;
	viewportOffsetTop?: number;
};

class ResizeObserver {
	observe() {
		return;
	}
	unobserve() {
		return;
	}
	disconnect() {
		return;
	}
}

jest.mock("./EditorConfig.composable", () => ({
	useEditorConfig: jest.fn(),
}));

describe("@feature-editor/InlineEditor", () => {
	const setup = (props: CkEditorProps = {}, isEditorEmpty = true) => {
		(useEditorConfig as jest.Mock).mockReturnValue({
			editorIsEmpty: computed(() => isEditorEmpty),
			charCount: ref(isEditorEmpty ? 0 : 1),
			registerDeletionHandler: jest.fn((editor, onDelete) => {
				// Simulate attaching a keydown event listener
				editor.editing.view.document.on = jest.fn((event, data, callback) => {
					if (event === "keydown") {
						// Simulate calling the callback when Backspace or Delete is pressed
						callback(
							{ name: "keydown" }, // Mock event info
							{ domEvent: { key: "Backspace" } } // Mock keydown data
						);
					}
				});
			}),
		});

		const wrapper = shallowMount(InlineEditor, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				// stubs: {
				// 	CKEditorVue: true,
				// },
			},
			props,
		});

		const editorMock = { editing: { view: { document: { on: jest.fn() } } } };

		return { wrapper, editorMock };
	};

	beforeEach(() => {
		window.ResizeObserver = ResizeObserver;
	});

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.findComponent(InlineEditor).exists()).toBe(true);
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			const { wrapper, editorMock } = setup();
			const ck = wrapper.findComponent({ ref: "ck" });

			ck.vm.$emit("ready", editorMock);
			await wrapper.vm.$nextTick();

			expect(useEditorConfig().registerDeletionHandler).toHaveBeenCalledWith(
				editorMock,
				expect.any(Function)
			);
			expect(wrapper.emitted("ready")).toHaveLength(1);
		});

		it("should emit update:value on content changes", async () => {
			const { wrapper, editorMock } = setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("update:modelValue", editorMock);
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["update:value"]).toHaveLength(1);
		});

		it("should emit focus on editor focus", async () => {
			const { wrapper } = setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.trigger("focus");
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["focus"]).toHaveLength(1);
		});

		it("should emit delayed blur on editor blur", async () => {
			jest.useFakeTimers();
			const { wrapper } = setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("blur");
			jest.advanceTimersByTime(200);

			const emitted = wrapper.emitted();
			expect(emitted["blur"]).toHaveLength(1);
		});

		it.only("should emit delete on delete event and empty text", async () => {
			const { wrapper, editorMock } = setup();

			// Find the CKEditor component by its ref
			const ck = wrapper.findComponent({ name: "CKEditorVue" });
			// logger.log("ck", ck);
			ck.vm.$emit("ready", editorMock);
			await wrapper.vm.$nextTick();

			// Simulate the "Backspace" keydown event
			// ck.vm.$emit("keydown", {
			// 	domEvent: {
			// 		key: "Backspace",
			// 	},
			// });
			editorMock.editing.view.document.on.mock.calls[0][1](
				{ name: "keydown" },
				{ domEvent: { key: "Backspace" } }
			);

			await wrapper.vm.$nextTick();
			logger.log("ck emitted", ck.emitted());
			const emitted = wrapper.emitted();
			logger.log("emitted", emitted);
			expect(emitted["keyboard:delete"]).not.toBeUndefined();
		});

		it("should not emit delete on delete event and non-empty text", async () => {
			const { wrapper } = setup();

			wrapper.vm.charCount = 1;
			wrapper.vm.handleDelete();
			await wrapper.vm.$nextTick();
			const emitted = wrapper.emitted();
			expect(emitted["keyboard:delete"]).toBeUndefined();
		});
	});
});
