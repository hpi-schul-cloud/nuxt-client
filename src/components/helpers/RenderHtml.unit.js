import RenderHtml from "./RenderHtml";

describe("@components/RenderHtml", () => {
	it(...isValidComponent(RenderHtml));

	it("renders plain html", () => {
		const testHtml = `<p>Hallo</p>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: testHtml,
			},
		});
		expect(wrapper.html()).toBe(testHtml);
	});

	it("renders base components html", () => {
		const testHtml = `<base-button id="button">Button</base-button>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: testHtml,
			},
		});
		expect(wrapper.find("base-button-stub").exists()).toBe(true);
	});

	it("renders again on html changes", () => {
		const initialHtml = `<p>Hallo</p>`;
		const testHtml = `<h1>Test</h1>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: initialHtml,
			},
		});
		expect(wrapper.html()).toBe(initialHtml);
		wrapper.setProps({ html: testHtml });
		expect(wrapper.html()).toBe(testHtml);
	});
});
