import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent, provide } from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import { useLoadingState } from "./loadingState";

export interface MountOptions {
	provider?: () => void;
}

let wrapper: Wrapper<Vue>;

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
	const TestComponent = defineComponent({
		template: `<div></div>`,
	});

	wrapper = mount(TestComponent, {
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
	it("should call loadingStateModule.open()", async () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const loadingMessage = "test message";
		const { isLoadingDialogOpen } = mountComposable(
			() => useLoadingState(loadingMessage),
			{
				provider: () => {
					provide("loadingStateModule", loadingStateModuleMock);
				},
			}
		);

		isLoadingDialogOpen.value = true;
		await wrapper.vm.$nextTick();

		expect(loadingStateModuleMock.open).toBeCalled();
		expect(loadingStateModuleMock.open).toHaveBeenCalledWith({
			text: loadingMessage,
		});
	});

	it("should call loadingStateModule.close()", async () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		const { isLoadingDialogOpen } = mountComposable(
			() => useLoadingState("...loading"),
			{
				provider: () => {
					provide("loadingStateModule", loadingStateModuleMock);
				},
			}
		);

		isLoadingDialogOpen.value = false;
		await wrapper.vm.$nextTick();

		expect(loadingStateModuleMock.close).toBeCalled();
	});
});
