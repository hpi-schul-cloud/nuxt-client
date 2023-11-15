import { mount } from "@vue/test-utils";
import H5PEditor from "./H5PEditor.vue";
import { I18N_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { H5PEditorComponent } from "@lumieducation/h5p-webcomponents";

describe("H5PEditor", () => {
	const contentId = "test-content-id";
	const parentType = "test-parent-type";
	const parentId = "test-parent-id";

	const i18nMock = new VueI18n({
		locale: "en",
	});

	const createWrapper = (propsData = {}) => {
		return mount(H5PEditor, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				contentId,
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
		const h5pEditor = wrapper.findComponent({ ref: "h5pEditorRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pEditor).toBeDefined();

		await wrapper.vm.$nextTick();
		const h5pEditorComponent = h5pEditor.element as H5PEditorComponent;
		expect(h5pEditorComponent.loadContentCallback).toBeDefined();
		expect(h5pEditorComponent.saveContentCallback).toBeDefined();
	});
});
