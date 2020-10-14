import TemplateTab from "./Tab";
import { render } from "@testing-library/vue";

const tabContentShow = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1' :selected='true'>Testing Testing 123</TemplateTab>`,
};

const tabContentHide = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1'>Testing Testing 123</TemplateTab>`,
};

const tabContentWithIcon = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab Icon' :selected='true' iconName='fa fa-info'>Tab with Icon</TemplateTab>`,
};

describe("@components/atoms/Tab", () => {
	it(...isValidComponent(TemplateTab));

	it("Shows when active", () => {
		const { getByTestId } = render(tabContentShow);
		expect(getByTestId("tabTest")).toBeVisible();
	});
	it("Doesn't show when tab isn't active", () => {
		const { getByTestId } = render(tabContentHide);
		expect(getByTestId("tabTest")).not.toBeVisible();
	});
	it("Verify if the Icon property is present", () => {
		const { getByTestId } = render(tabContentWithIcon);
		expect(getByTestId("tabTest")).toBeVisible();
		const wrapper = mount(TemplateTab, {
			propsData: {
				name: "Test Tab Icon",
				iconName: "fa fa-info",
			},
		});
		expect(wrapper.props().iconName).toBe("fa fa-info");
	});
});
