import BaseSpinner from "./BaseSpinner";

describe("@components/BaseSpinner", () => {
	it(...isValidComponent(BaseSpinner));

	it("provides an aria-label", () => {
		const { element } = shallowMount(BaseSpinner, {
			propsData: {
				label: "label",
			},
		});
		expect(element.getAttribute("aria-label")).toEqual("label");
	});

	it("can change its size", () => {
		const wrapper = shallowMount(BaseSpinner, {
			propsData: {
				size: "large",
			},
		});
		expect(wrapper.find(".spinner").attributes("height")).toEqual("60");
		expect(wrapper.find(".spinner").attributes("width")).toEqual("60");
		expect(wrapper.find(".circle").attributes("r")).toEqual("14");
		expect(wrapper.find(".circle").attributes("cx")).toEqual("15");
		expect(wrapper.find(".circle").attributes("cy")).toEqual("15");
	});
});
