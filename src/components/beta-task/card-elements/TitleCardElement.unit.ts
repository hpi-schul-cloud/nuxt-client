import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TitleCardElement from "@/components/beta-task/card-elements/TitleCardElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TitleCardElement, {
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

describe("TitleCardElement", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TitleCardElement).exists()).toBe(true);
	});
});
