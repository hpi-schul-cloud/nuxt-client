import LoadingStateModule from "@/store/loading-state";
import { provideComposable } from "@/utils/composable-dependency-injection";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent, provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useLoadingState, USE_LOADING_STATE } from "./loadingState";

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

describe("loadingState composable", () => {
	it("should call loadingStateModule.open()", () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		const { openLoadingDialog } = mountComposable(useLoadingState, {
			provider: () => {
				provide("loadingStateModule", loadingStateModuleMock);
				provideComposable(USE_LOADING_STATE, useLoadingState);
			},
		});

		const loadingMessage = "test message";

		openLoadingDialog(loadingMessage);

		expect(loadingStateModuleMock.open).toBeCalled();
		expect(loadingStateModuleMock.open).toHaveBeenCalledWith({
			text: loadingMessage,
		});
	});

	it("should call loadingStateModule.close()", () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		const { closeLoadingDialog } = mountComposable(useLoadingState, {
			provider: () => {
				provide("loadingStateModule", loadingStateModuleMock);
			},
		});

		closeLoadingDialog();

		expect(loadingStateModuleMock.close).toBeCalled();
	});
});
