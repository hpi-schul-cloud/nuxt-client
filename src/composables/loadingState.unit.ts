import { useLoadingState } from "./loadingState";
import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick } from "vue";

describe("loadingState composable", () => {
	it("should call loadingStateModule.open()", async () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const loadingMessage = "test message";
		const { isLoadingDialogOpen } = mountComposable(() => useLoadingState(loadingMessage), {
			global: { provide: { loadingStateModule: loadingStateModuleMock } },
		});

		isLoadingDialogOpen.value = true;
		await nextTick();

		expect(loadingStateModuleMock.open).toBeCalled();
		expect(loadingStateModuleMock.open).toHaveBeenCalledWith({
			text: loadingMessage,
		});
	});

	it("should call loadingStateModule.close()", async () => {
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		const { isLoadingDialogOpen } = mountComposable(() => useLoadingState("...loading"), {
			global: { provide: { loadingStateModule: loadingStateModuleMock } },
		});

		isLoadingDialogOpen.value = false;
		await nextTick();

		expect(loadingStateModuleMock.close).toBeCalled();
	});
});
