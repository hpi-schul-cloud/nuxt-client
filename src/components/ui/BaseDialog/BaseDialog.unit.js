import { createLocalVue, shallowMount } from "@vue/test-utils";
import BaseDialogPlugin from "./";
import BaseDialog from "./BaseDialog";

const modal = {
	data: () => ({ active: false }),
	template: `
	<div>
	</div>
	`,
};

describe("@components/BaseDialog", () => {
	it("has a property $dialog with the function confirm", () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialogPlugin);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");
	});

	it("is called", () => {
		const wrapper = shallowMount(BaseDialog, {
			attachToDocument: true,
		});
		expect(wrapper.name()).toBe("BaseDialog");
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
