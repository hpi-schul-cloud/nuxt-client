import CopyModule from "@/store/copy";
import NotifierModule from "@/store/notifier";
import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent } from "@vue/composition-api";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useCopy } from "./copy";
import { useI18n } from "./i18n";

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

describe("copy composable", () => {
	it("should call copyModule.copy()", () => {
		const copyModuleMock = createModuleMocks(CopyModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		const { copy } = mountComposable(useCopy, {
			provider: () => {
				provide("copyModule", copyModuleMock);
				provide("notifierModule", notifierModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("i18n", useI18n);
			},
		});

		copy({ id: "testId", type: "lesson" }, "someText");

		expect(copyModuleMock.copy).toBeCalled();
		expect(copyModuleMock.copy).toHaveBeenCalledWith({
			id: "testId",
			type: "lesson",
		});
	});
});
