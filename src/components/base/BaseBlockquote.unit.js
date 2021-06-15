import BaseBlockquote from "./BaseBlockquote";

describe("@basecomponents/BaseBlockquote", () => {
	it(...isValidComponent(BaseBlockquote));
	it(...rendersSlotContent(BaseBlockquote));

	it("renders no empty source", () => {
		const { element } = shallowMount(BaseBlockquote, {
			propsData: {
				srcText: "CustomSourceText",
			},
		});
		expect(element.innerHTML).not.toContain("CustomSourceText");
	});

	it("renders cite", () => {
		const { element } = shallowMount(BaseBlockquote, {
			propsData: {
				cite: "https://hpi-schul-cloud.de",
			},
		});
		expect(element.innerHTML).toContain("https://hpi-schul-cloud.de");
	});

	it("renders srcText", () => {
		const { element } = shallowMount(BaseBlockquote, {
			propsData: {
				cite: "https://hpi-schul-cloud.de",
				srcText: "CustomSourceText",
			},
		});
		expect(element.innerHTML).toContain("CustomSourceText");
	});
});
