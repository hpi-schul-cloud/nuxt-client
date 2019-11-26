import { createLocalVue } from "@vue/test-utils";
import BaseDialogPlugin from "./";

describe("@components/BaseDialog", () => {
	it("Vue Instance gets a property $dialog with the function confirm", async () => {
		const localVue = createLocalVue();
		localVue.use(BaseDialogPlugin);
		expect(typeof localVue.prototype.$dialog.confirm).toBe("function");
	});
});
