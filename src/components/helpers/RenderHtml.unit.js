import RenderHtml from "./RenderHtml";

describe("@components/RenderHtml", () => {
	it(...isValidComponent(RenderHtml));

	it("renders plain html", async () => {
		const testHtml = `<p>Hallo</p>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: testHtml,
			},
		});
		expect(wrapper.html()).toBe(testHtml);
	});

	it("renders base components html", async () => {
		const testHtml = `<base-button id="button">Button</base-button>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: testHtml,
			},
		});
		expect(wrapper.find("base-button-stub").exists()).toBe(true);
	});

	it("renders again on html changes", async () => {
		const initialHtml = `<p>Hallo</p>`;
		const testHtml = `<h1>Test</h1>`;
		const wrapper = shallowMount(RenderHtml, {
			propsData: {
				html: initialHtml,
			},
		});
		expect(wrapper.html()).toBe(initialHtml);
		wrapper.setProps({ html: testHtml });
		await wrapper.vm.$nextTick();
		expect(wrapper.html()).toBe(testHtml);
	});
});
