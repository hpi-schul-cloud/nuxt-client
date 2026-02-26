import ClassicEditor from "./ClassicEditor.vue";
import { useEditorConfig } from "./EditorConfig.composable";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Mock } from "vitest";

type CkEditorProps = {
	value?: string;
	placeholder?: string;
	viewportOffsetTop?: number;
	ariaDescribedById?: string;
	autofocus?: boolean;
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

vi.mock("./EditorConfig.composable");

describe("@feature-editor/ClassicEditor", () => {
	const setup = (props: CkEditorProps = {}) => {
		const config: ReturnType<typeof useEditorConfig> = {
			generalConfig: {
				language: "",
				link: {
					defaultProtocol: "//",
					addTargetToExternalLinks: true,
				},
				fontColor: {
					colors: [],
				},
				fontBackgroundColor: {
					colors: [],
				},
			},
			registerDeletionHandler: vi.fn(),
		};

		const useEditorConfigMock = <Mock>useEditorConfig;
		useEditorConfigMock.mockReturnValue(config);

		const wrapper = mount(ClassicEditor, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					CKEditorVue: { template: "<div />" },
				},
			},
			props,
		});

		const setAttribute = vi.fn();
		const focus = vi.fn();
		const editorMock = {
			editing: {
				view: {
					focus,
					change: vi.fn((cb) => cb({ setAttribute })),
					document: { on: vi.fn(), getRoot: vi.fn(() => "root") },
				},
			},
		};

		return { wrapper, editorMock, setAttribute, focus };
	};

	beforeEach(() => {
		window.ResizeObserver = ResizeObserver;
	});

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.findComponent(ClassicEditor).exists()).toBe(true);
	});

	it("calls editorInstance.view.focus when focus is called via defineExpose", async () => {
		const { wrapper, editorMock, focus } = setup();

		const ck = wrapper.findComponent({ ref: "ck" });
		await ck.vm.$emit("ready", editorMock);

		wrapper.vm.focus();

		expect(focus).toHaveBeenCalled();
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			const { wrapper, editorMock } = setup();
			const ck = wrapper.findComponent({ ref: "ck" });

			await ck.vm.$emit("ready", editorMock);

			expect(useEditorConfig().registerDeletionHandler).toHaveBeenCalledWith(editorMock, expect.any(Function));

			expect(wrapper.emitted("ready")).toHaveLength(1);
		});

		it("should focus editor if auto focus prop is set", async () => {
			const { wrapper, editorMock, focus } = setup({ autofocus: true });

			const ck = wrapper.findComponent({ ref: "ck" });
			await ck.vm.$emit("ready", editorMock);

			expect(focus).toHaveBeenCalled();
		});

		it("sets aria-describedby attribute on editor root when ariaDescribedById is provided", async () => {
			const { wrapper, editorMock, setAttribute } = setup({ ariaDescribedById: "desc-id" });

			await wrapper.findComponent({ ref: "ck" }).vm.$emit("ready", editorMock);

			expect(setAttribute).toHaveBeenCalledWith("aria-describedby", "desc-id", "root");
		});

		it("should emit focus on editor focus", async () => {
			const { wrapper } = setup();

			const ck = wrapper.findComponent({ ref: "ck" });
			await ck.trigger("focus");

			expect(wrapper.emitted("focus")).toHaveLength(1);
		});

		it("should emit delayed blur on editor blur", async () => {
			const { wrapper } = setup();

			const ck = wrapper.findComponent({ ref: "ck" });
			await ck.vm.$emit("blur");

			expect(wrapper.emitted("blur")).toHaveLength(1);
		});

		/* 
		TODO We cannot test this because mounting the ckeditor is not possible
		with versions prior to 42.x.
		see CKEditor5 doc: https://ckeditor.com/docs/ckeditor5/latest/getting-started/installation/self-hosted/vuejs-v3.html#jest-testing
		
		Update of ckeditor to 42.x and above is currently not possible because the
		@isaul32/ckeditor5-math package doesn't support ckeditor new installation methods
		required by ckeditor 42.x and above.
		see GitHub issue: https://github.com/isaul32/ckeditor5-math/issues/147
		*/
		it.todo("should register the deletion handler");

		it.todo("should emit delete on delete event and empty text");

		it.todo("should not emit delete on delete event and non-empty text");
	});
});
