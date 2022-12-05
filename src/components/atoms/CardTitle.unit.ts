import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CardTitle from "./CardTitle.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(CardTitle, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("CardTitle", () => {
	beforeEach(() => {
		window.location.pathname = "";
	});

	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(CardTitle).exists()).toBe(true);
	});

	it("should render with valid props", () => {
		const wrapper = getWrapper({
			label: "Title",
			value: "Learn something today",
		});

		// TODO - can't find the label or input element for some reason
		expect(wrapper.props().label).toStrictEqual("Title");
		expect(wrapper.props().value).toStrictEqual("Learn something today");
	});

	it("should render with valid props", async () => {
		const wrapper = getWrapper({
			label: "Title",
			value: "Learn something today",
		});

		// TODO - can't find the label or input element for some reason
		console.log(wrapper.findAll("label").length); // = 0, should be 1
		expect(wrapper.props().value).toStrictEqual("Learn something today");

		wrapper.setProps({
			value: "Learn something tomorrow",
		});
		await wrapper.vm.$nextTick;

		// TODO - wanna test if name.value changes accordingly, but don't know how to access it
		// TODO - don't know what to test in general tbh
		expect(wrapper.props().value).toStrictEqual("Learn something tomorrow");
	});

	it("should not render with invalid props", () => {
		try {
			getWrapper({ value: 123 });
		} catch (e) {
			if (e instanceof Error) {
				expect(e.message).toContain("Invalid prop");
			}
			return;
		}
		fail("No error on invalid prop");
	});
});
