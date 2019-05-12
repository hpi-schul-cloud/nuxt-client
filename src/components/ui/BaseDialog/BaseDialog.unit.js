import { createLocalVue, shallowMount } from "@vue/test-utils";
import BaseDialogPlugin from "./";
import BaseDialog from "./BaseDialog";

describe("@components/BaseDialog", () => {
	it("is called", () => {
		const wrapper = shallowMount(BaseDialog, {
			attachToDocument: true,
		});
		expect(wrapper.find("base-button-stub")).toBeTruthy();
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	it("has a property $dialog with the function confirm", (done) => {
		const localVue = createLocalVue();
		localVue.use(BaseDialogPlugin);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");

		const wrapper = mount(BaseDialog, {
			attachToDocument: true,
			localVue,
		});

		const dialog = wrapper.vm.$dialog.confirm({
			title: "Deleting account",
			message: "Sure??",
			confirmText: "Delete Account",
			type: "is-danger",
			onConfirm: () => this.$toast.success("Account deleted!"),
		});

		expect(dialog.$el.querySelector("#confirm-button")).toBeTruthy();
		dialog.close();

		setTimeout(() => {
			expect(dialog.$el.querySelector("#confirm-button")).toBeFalsy();
			done();
		}, 200);
	});

	it("should be possible to pass no arguments", () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialogPlugin);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");

		const wrapper = mount(BaseDialog, {
			attachToDocument: true,
			localVue,
		});

		wrapper.vm.$dialog.confirm();
	});
});
