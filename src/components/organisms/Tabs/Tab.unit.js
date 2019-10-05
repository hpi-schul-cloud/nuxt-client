import TemplateTab from "./TemplateTab";

const tabContentShow = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1' :selected='true'>Testing Testing 123</TemplateTab>`,
};

const tabContentHide = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1'>Testing Testing 123</TemplateTab>`,
};

describe("@components/organisms/Tabs/Tab", () => {
	it(...isValidComponent(TemplateTab));

	it("Shows when active", () => {
		const wrapper = mount(tabContentShow);
		expect(wrapper.find(".tab-content").isVisible()).toBe(true);
	});
	it("Doesn't show when tab isn't active", () => {
		const wrapper = mount(tabContentHide);
		expect(wrapper.find(".tab-content").isVisible()).toBe(false);
	});
});
