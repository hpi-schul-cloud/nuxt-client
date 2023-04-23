import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import RichTextCardElement from "@/components/beta-task/card-elements/RichTextCardElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(RichTextCardElement, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
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
