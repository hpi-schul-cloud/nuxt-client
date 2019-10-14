import BaseBlockquote from "./BaseBlockquote";

describe("@basecomponents/BaseBlockquote", () => {
	it(...isValidComponent(BaseBlockquote));
	it(...rendersDefaultSlotContent(BaseBlockquote));

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
				cite: "https://schul-cloud.org",
			},
		});
		expect(element.innerHTML).toContain("https://schul-cloud.org");
	});

	it("renders srcText", () => {
		const { element } = shallowMount(BaseBlockquote, {
			propsData: {
				cite: "https://schul-cloud.org",
				srcText: "CustomSourceText",
			},
		});
		expect(element.innerHTML).toContain("CustomSourceText");
	});
});
