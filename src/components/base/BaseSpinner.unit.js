import BaseSpinner from "./BaseSpinner";

describe("@components/BaseSpinner", () => {
	it(...isValidComponent(BaseSpinner));

	it("provides an aria-label", () => {
		const { element } = shallowMount(BaseSpinner, {
			propsData: {
				label: "label",
			},
		});
		expect(element.getAttribute("aria-label")).toStrictEqual("label");
	});

	it("can change its size", () => {
		const wrapper = shallowMount(BaseSpinner, {
			propsData: {
				size: "large",
			},
		});
		expect(wrapper.find(".spinner").attributes("height")).toStrictEqual("60");
		expect(wrapper.find(".spinner").attributes("width")).toStrictEqual("60");
		expect(wrapper.find(".circle").attributes("r")).toStrictEqual("14");
		expect(wrapper.find(".circle").attributes("cx")).toStrictEqual("15");
		expect(wrapper.find(".circle").attributes("cy")).toStrictEqual("15");
	});
});
