import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { computed } from "vue";
import { useEditorConfig } from "./EditorConfig.composable";
import BalloonEditor from "./BalloonEditor.vue";

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

jest.mock("./EditorConfig.composable");

describe("@feature-editor/BalloonEditor", () => {
	const setup = (props: CkEditorProps = {}, isEditorEmpty = true) => {
		const config: ReturnType<typeof useEditorConfig> = {
			generalConfig: {
				language: "",
				link: {
					defaultProtocol: "//",
					addTargetToExternalLinks: true,
				},
				wordCount: {
					onUpdate: jest.fn(),
				},
				fontColor: {
					colors: [],
				},
				fontBackgroundColor: {
					colors: [],
				},
			},
			editorIsEmpty: computed(() => isEditorEmpty),
			registerDeletionHandler: jest.fn(),
		};

		const useEditorConfigMock = <jest.Mock>useEditorConfig;
		useEditorConfigMock.mockReturnValue(config);

		const wrapper = mount(BalloonEditor, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					CKEditorVue: { template: "<div />" },
				},
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
		expect(wrapper.findComponent(BalloonEditor).exists()).toBe(true);
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			const { wrapper, editorMock } = setup();
			const ck = wrapper.findComponent({ ref: "ck" });

			await ck.vm.$emit("ready", editorMock);

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
			await ck.vm.$emit("update:modelValue", editorMock);

			expect(wrapper.emitted("update:value")).toHaveLength(1);
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
		@isaul32/ckeditor5-math package doen't support ckeditor new installation methods
		required by ckeditor 42.x and above.
		see GitHub issue: https://github.com/isaul32/ckeditor5-math/issues/147
		*/
		it.todo("should register the deletion handler");

		it.todo("should emit delete on delete event and empty text");

		it.todo("should not emit delete on delete event and non-empty text");
	});
});
