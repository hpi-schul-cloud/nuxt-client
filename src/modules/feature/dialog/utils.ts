import { useDebouncedLoading } from "@/composables/debounced-loading.composable";
import { AsyncFunction } from "@/types/async.types";
import { openCancellableDialog } from "@feature-dialog";
import { watch } from "vue";

export const withGlobalLoadingState = <T>(fn: AsyncFunction<T>, loadingMessage: string): Promise<T> => {
	const { loadingState, withLoadingState } = useDebouncedLoading();
	let cancelDialog: (() => void) | undefined;

	const stopWatch = watch(loadingState, (state) => {
		if (state === "loading") {
			const { cancel } = openCancellableDialog("loadingState", { loadingText: loadingMessage });
			cancelDialog = cancel;
		} else if (state === "loaded") {
			cancelDialog?.();
		}
	});

	return withLoadingState(fn).finally(() => stopWatch());
};
