import { mount } from "@vue/test-utils";
import H5pEditorPage from "./H5PEditor.page.vue";
import { I18N_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

jest.mock("vue-router", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PEditorPage", () => {
	const parentType = "test-parent-type";
	const parentId = "test-parent-id";

	const i18nMock = new VueI18n({
		locale: "en",
	});

	const createWrapper = (propsData = {}) => {
		return mount(H5pEditorPage, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				parentType,
				parentId,
				...propsData,
			},
			provide: {
				[I18N_KEY as any]: i18nMock,
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
