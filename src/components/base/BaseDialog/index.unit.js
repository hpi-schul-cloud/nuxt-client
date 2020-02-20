import { createLocalVue } from "@vue/test-utils";
import BaseDialogPlugin from "./";

const isBaseDialog = (component) => {
	return component.$el.getAttribute("data-testid") === "dialog";
};

const getLocalVue = () => {
	const localVue = createLocalVue();
	window.Vue = localVue;
	localVue.use(BaseDialogPlugin);
	return localVue;
};

describe("@components/BaseDialog", () => {
	it("Vue Instance gets a property $dialog with the function confirm", () => {
		const localVue = getLocalVue();
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");
	});
	it("confirm() should return BaseDialog instance", () => {
		const localVue = getLocalVue();
		expect(isBaseDialog(localVue.prototype.$dialog.confirm())).toBe(true);
	});
	it.todo(
		"should mount BaseDialog on body when Vue.$dialog.confirm() is called"
	);
	it("confirm passes props to BaseDialog instance", () => {
		const localVue = getLocalVue();
		const testProps = {
			message: "testMessage",
			icon: "testIcon",
		};
		const dialog = localVue.prototype.$dialog.confirm(testProps);
		Object.entries(testProps).forEach(([key, value]) => {
			// eslint-disable-next-line no-underscore-dangle
			expect(dialog._props[key]).toBe(value);
		});
	});
});
