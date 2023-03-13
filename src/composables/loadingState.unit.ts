import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent, provide } from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { useLoadingState } from "./loadingState";
import Vue from "vue";

export interface MountOptions {
	provider?: () => void;
}

let wrapper: Wrapper<Vue>;

const mountComposable = <R>(
	composable: () => R,
	providers: Record<string, unknown>
): R => {
	const ParentComponent = defineComponent({
		setup() {
			for (const [key, mockFn] of Object.entries(providers)) {
				provide(key, mockFn);
			}
		},
	});

	const TestComponent = {
		template: "<div></div>",
	};

	wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
		parentComponent: ParentComponent,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
				loadingStateModule: loadingStateModuleMock,
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
				loadingStateModule: loadingStateModuleMock,
			}
		);

		isLoadingDialogOpen.value = false;
		await wrapper.vm.$nextTick();

		expect(loadingStateModuleMock.close).toBeCalled();
	});
});
