import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@/utils/mock-store-module";
import { nextTick } from "vue";
import { useLoadingState } from "./loadingState";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

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
		await nextTick();

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
		await nextTick();

		expect(loadingStateModuleMock.close).toBeCalled();
	});
});
