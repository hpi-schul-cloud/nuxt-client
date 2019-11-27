import { createLocalVue } from "@vue/test-utils";
import BaseDialog from "./BaseDialog";

describe("@components/BaseDialog", () => {
	it(...isValidComponent(BaseDialog));

	it("Renders correctly without arguments and can be closed", () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialog);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");

		const wrapper = mount(BaseDialog, {
			attachToDocument: true,
			localVue,
		});

		const dialogue = wrapper.vm.$dialog.confirm();
		expect(dialogue.isActive).toBe(true);
		expect(dialogue.currentIconColor).toBe("var(--color-primary)");
		dialogue.cancel();
		expect(dialogue.isActive).toBe(false);
	});

	it("Renders correctly with arguments and can be closed", () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialog);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");

		const wrapper = mount(BaseDialog, {
			attachToDocument: true,
			localVue,
		});

		const dialogue = wrapper.vm.$dialog.confirm({
			actionDesign: "danger",
		});
		expect(dialogue.isActive).toBe(true);
		expect(dialogue.currentIconColor).toBe("var(--color-danger)");
		//TODO Validate more parameters
		dialogue.cancel();
		expect(dialogue.isActive).toBe(false);
	});
});
