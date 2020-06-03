import TemplateTab from "./Tab";
import { render } from '@testing-library/vue';
import { toBeVisible } from '@testing-library/jest-dom/matchers'

expect.extend({ toBeVisible });

const tabContentShow = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1' :selected='true'>Testing Testing 123</TemplateTab>`,
};

const tabContentHide = {
	components: { TemplateTab },
	template: `<TemplateTab name='Test Tab 1'>Testing Testing 123</TemplateTab>`,
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
});
