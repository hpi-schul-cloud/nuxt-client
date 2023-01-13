import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TitleCardElement from "@components/card-elements/TitleCardElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TitleCardElement, {
		...createComponentMocks({
			i18n: true,
		}),
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
