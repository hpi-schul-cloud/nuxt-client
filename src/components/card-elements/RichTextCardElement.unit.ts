import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import RichTextCardElement from "@/components/card-elements/RichTextCardElement.vue";
import { I18N_KEY } from "@/utils/inject";

const getWrapper = (props?: object, options?: object) => {
	return mount(RichTextCardElement, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			[I18N_KEY as symbol]: { t: (key: string) => key },
		},
		propsData: props,
		...options,
	});
};

describe("RichTextCardElement", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(RichTextCardElement).exists()).toBe(true);
	});
});
