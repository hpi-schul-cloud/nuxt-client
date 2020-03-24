import { mount } from "@vue/test-utils";
import TemplateTabs from "./Tabs";
import TemplateTab from "@components/atoms/Tab";

const tabs = {
	components: { TemplateTabs, TemplateTab },
	template: `
		<TemplateTabs>
			<TemplateTab name="Tab 1" :selected=true>Test</TemplateTab>
			<TemplateTab name="Tab 2">Test2</TemplateTab>
			<TemplateTab name="Tab 3">Test 3 lorum ipsum test with a long line of text</TemplateTab>
		</TemplateTabs>`,
};

describe("@components/organisms/Tabs/Tabs", () => {
	it(...isValidComponent(TemplateTabs));

	it("Check if all 3 tabs are added", () => {
		const wrapper = mount(tabs);
		expect(wrapper.findAll(".tab-content")).toHaveLength(3);
	});

	it("Test if only first tab contents is being shown", () => {
		const wrapper = mount(tabs);
		expect(wrapper.findAll(".tab-content").at(0).isVisible()).toBe(true);
		expect(wrapper.findAll(".tab-content").at(1).isVisible()).toBe(false);
		expect(wrapper.findAll(".tab-content").at(2).isVisible()).toBe(false);
	});

	it("Select another tab and see if new text is shown", async () => {
		const wrapper = mount(tabs);
		await wrapper.vm.$nextTick();
		wrapper.findAll(".tab-button").at(1).trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll(".tab-content").at(0).isVisible()).toBe(false);
		expect(wrapper.findAll(".tab-content").at(1).isVisible()).toBe(true);
		expect(wrapper.findAll(".tab-content").at(2).isVisible()).toBe(false);
	});
});
