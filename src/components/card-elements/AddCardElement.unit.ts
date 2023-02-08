import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import AddCardElement from "@/components/card-elements/AddCardElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(AddCardElement, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("AddCardElement", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(AddCardElement).exists()).toBe(true);
	});
});
