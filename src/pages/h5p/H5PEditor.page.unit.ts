import { mount } from "@vue/test-utils";
import H5pEditorPage from "./H5PEditor.page.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";

jest.mock("vue-router", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PEditorPage", () => {
	const parentType = "test-parent-type";
	const parentId = "test-parent-id";

	const createWrapper = (props = {}) => {
		return mount(H5pEditorPage, {
			global: {
				plugins: [createTestingI18n()],
			},
			props: {
				parentType,
				parentId,
				...props,
			},
		});
	};

	it("renders without errors with standard props", async () => {
		const wrapper = createWrapper();
		const h5pEditor = wrapper.findComponent({ ref: "editorRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pEditor).toBeDefined();
	});
});
