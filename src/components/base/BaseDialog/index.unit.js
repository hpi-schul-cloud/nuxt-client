import { createLocalVue } from "@vue/test-utils";
import BaseDialogPlugin from "./";

describe("@components/BaseDialog", () => {
	it("Vue Instance gets a property $dialog with the function confirm", async () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialogPlugin);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");
	});
	xit("should mount BaseDialog on body when Vue.$dialog.confirm() is called", () => {});
	xit("confirm() should return BaseDialog instance", () => {});
	xit("confirm passes props to BaseDialog instance", () => {});
});
