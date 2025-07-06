import { mount } from "@vue/test-utils";
import H5PEditor from "./H5PEditor.vue";
import { H5PEditorComponent } from "@lumieducation/h5p-webcomponents";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { nextTick } from "vue";

vi.mock(import("@lumieducation/h5p-webcomponents"), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		defineElements: vi.fn(),
	};
});

describe("H5PEditor", () => {
	const contentId = "test-content-id";
	const parentType = "test-parent-type";
	const parentId = "test-parent-id";

	const createWrapper = (props = {}) => {
		return mount(H5PEditor, {
			global: {
				plugins: [createTestingI18n()],
			},
			props: {
				contentId,
				parentType,
				parentId,
				...props,
			},
		});
	};

	it("renders without errors with standard props", async () => {
		const wrapper = createWrapper();
		const h5pEditor = wrapper.find({ ref: "h5pEditorRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pEditor).toBeDefined();

		await nextTick();
		const h5pEditorComponent = h5pEditor.element as H5PEditorComponent;
		expect(h5pEditorComponent.loadContentCallback).toBeDefined();
		expect(h5pEditorComponent.saveContentCallback).toBeDefined();
	});
});
