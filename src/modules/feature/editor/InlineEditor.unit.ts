import InlineEditor from "./InlineEditor.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { logger } from "@util-logger";

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

describe("@feature-editor/InlineEditor", () => {
	const setup = (props: CkEditorProps = {}) => {
		const wrapper = shallowMount(InlineEditor, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
		logger.log(wrapper.html());
		expect(wrapper.findComponent(InlineEditor).exists()).toBe(true);
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			const { wrapper, editorMock } = setup();
			logger.log(wrapper.html());

			const ck = wrapper.findComponent({ ref: "ck" });

			ck.vm.$emit("ready", editorMock);
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(editorMock.editing.view.document.on).toHaveBeenCalled();
			expect(emitted["ready"]).toHaveLength(1);
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

		it("should emit delete on delete event and empty text", async () => {
			const { wrapper } = setup();

			// due to not accessing the editor instance in test setup, we test here with implementation details
			expect(wrapper.vm.charCount).toEqual(0);
			wrapper.vm.handleDelete();
			await wrapper.vm.$nextTick();
			const emitted = wrapper.emitted();
			expect(emitted["keyboard:delete"]).toHaveLength(1);
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
