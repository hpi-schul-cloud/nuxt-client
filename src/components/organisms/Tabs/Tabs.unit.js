import Vue from "vue";
import { mount } from "@vue/test-utils";
import TemplateTabs from "./Tabs";
import TemplateTab from "@components/atoms/Tab";
import { render, fireEvent } from "@testing-library/vue";

const tabs = {
	components: { TemplateTabs, TemplateTab },
	template: `
		<TemplateTabs>
			<TemplateTab name="Tab 1" :selected=true>Test</TemplateTab>
			<TemplateTab name="Tab 2">Test2</TemplateTab>
			<TemplateTab name="Tab 3">Test 3 lorum ipsum test with a long line of text</TemplateTab>
			<TemplateTab name="Tab 4">Empty</TemplateTab>
		</TemplateTabs>`,
};

describe("@components/organisms/Tabs/Tabs", () => {
	it(...isValidComponent(TemplateTabs));

	it("Check if all 3 tabs are added", () => {
		const wrapper = mount(tabs);
		expect(wrapper.findAll(".tab-content")).toHaveLength(4);
	});

	it("Test if only first tab contents is being shown", () => {
		const { getAllByTestId } = render(tabs);
		expect(getAllByTestId("tabTest")[0]).toBeVisible();
		expect(getAllByTestId("tabTest")[1]).not.toBeVisible();
		expect(getAllByTestId("tabTest")[2]).not.toBeVisible();
		expect(getAllByTestId("tabTest")[3]).not.toBeVisible();
	});

	it("Select another tab and see if new text is shown", async () => {
		const { getAllByTestId } = render(tabs);
		await Vue.nextTick();
		await fireEvent.click(getAllByTestId("tabButtonTest")[1]);
		expect(getAllByTestId("tabTest")[0]).not.toBeVisible();
		expect(getAllByTestId("tabTest")[1]).toBeVisible();
		expect(getAllByTestId("tabTest")[2]).not.toBeVisible();
		expect(getAllByTestId("tabTest")[3]).not.toBeVisible();
	});
});
