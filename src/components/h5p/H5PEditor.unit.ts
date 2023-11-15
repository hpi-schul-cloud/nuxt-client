import { mount } from "@vue/test-utils";
import H5PEditor from "./H5PEditor.vue";
import { I18N_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";

describe("H5PEditor", () => {
	const contentId = "test-content-id";
	const parentType = "test-parent-type";
	const parentId = "test-parent-id";

	const i18nMock = new VueI18n({
		locale: "en",
	});

	it("renders without errors", () => {
		const wrapper = mount(H5PEditor, {
			propsData: {
				contentId,
				parentType,
				parentId,
			},
			provide: {
				[I18N_KEY as any]: i18nMock,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
});
