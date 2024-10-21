import { shallowMount } from "@vue/test-utils";
import CkEditor from "./CKEditor.vue";
import {
	boardToolbarSimple,
	boardToolbarRegular,
	newsToolbar,
	boardPlugins,
	newsPlugins,
} from "./config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

type CkEditorProps = {
	value?: string;
	placeholder?: string;
	type?: string;
	mode?: string;
	disabled?: boolean;
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

describe("CKEditor", () => {
	const setup = (props: CkEditorProps = {}) => {
		const wrapper = shallowMount(CkEditor, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		const editorMock = { editing: { view: { document: { on: vi.fn() } } } };

		return { wrapper, editorMock };
	};

	beforeEach(() => {
		window.ResizeObserver = ResizeObserver;
	});

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.findComponent(CkEditor).exists()).toBe(true);
	});

	it("should not render with invalid mode property", () => {
		try {
			setup({ mode: "wrong_mode" });
		} catch (e) {
			expect((e as Error).message.includes("Invalid prop")).toBeTruthy();
		}
	});

	it("should have reduced board toolbar items in simple mode", () => {
		const { wrapper } = setup({ mode: "simple" });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(
			boardToolbarSimple.length
		);
	});

	it("should have all board plugins available in simple mode", () => {
		const { wrapper } = setup({ mode: "simple" });
		expect(wrapper.vm.config.plugins).toHaveLength(boardPlugins.length);
	});

	it("should have all boards toolbar items in regular mode", () => {
		const { wrapper } = setup({ mode: "regular" });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(
			boardToolbarRegular.length
		);
	});

	it("should have all board plugins available in regular mode", () => {
		const { wrapper } = setup({ mode: "regular" });
		expect(wrapper.vm.config.plugins).toHaveLength(boardPlugins.length);
	});

	it("should have all news toolbar items in news mode", () => {
		const { wrapper } = setup({ mode: "news" });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(newsToolbar.length);
	});

	it("should have all news plugins available in news mode", () => {
		const { wrapper } = setup({ mode: "news" });
		expect(wrapper.vm.config.plugins).toHaveLength(newsPlugins.length);
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			const { wrapper, editorMock } = setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});

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
