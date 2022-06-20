import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { notifierMixin } from "./notifier";

describe("notifierMixin", () => {
	it("should the '$notifier' method be usable in a vue instance", () => {
		const Component: any = {
			render() {},
			mixins: [notifierMixin],
		};
		mount(Component, {
			...createComponentMocks({
				i18n: true,
			}),
		});

		const notifierFunc = Component.mixins[0].methods.$notifier;
		expect(typeof notifierFunc).toBe("function");
	});
});
