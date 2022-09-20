import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent } from "@vue/composition-api";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useNotifier } from "./notifier";
export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
	const TestComponent = defineComponent({
		template: `<div></div>`,
	});

	const wrapper = mount(TestComponent, {
		setup() {
			options.provider?.();
			const result = composable();
			return { result };
		},
	});

	//@ts-ignore
	return wrapper.vm.result;
};

describe("notifier composable", () => {
	it("should call notifierModule.show()", () => {
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const { showNotifier } = mountComposable(useNotifier, {
			provider: () => {
				provide("notifierModule", notifierModuleMock);
			},
		});

		const notifierMessage = { text: "message", status: "success" };

		showNotifier({ text: "message", status: "success" });

		expect(notifierModuleMock.show).toBeCalled();
		expect(notifierModuleMock.show).toHaveBeenCalledWith(notifierMessage);
	});
});
