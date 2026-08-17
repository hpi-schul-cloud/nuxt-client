import { noDebounceLoadingOptions } from "@/composables/async-tasks.composable";
import { useDebouncedLoading } from "@/composables/debounced-loading.composable";
import { AsyncFunction } from "@/types/async.types";
import { LoadingStateOptions } from "@/types/loading.types";
import { openCancellableDialog } from "@feature-dialog";
import { watch } from "vue";

type SafeTaskResult<T> =
	| { success: true; result: T; error?: undefined }
	| { success: false; result?: undefined; error: Error };

type SafeTaskExecute = <T>(
	fn: AsyncFunction<T>,
	onErrorNotifyMessage?: string,
	options?: LoadingStateOptions
) => Promise<SafeTaskResult<T>>;

export const withGlobalLoadingState = <T>(
	fn: AsyncFunction<T>,
	loadingMessage: string,
	options: LoadingStateOptions = {}
): Promise<T> => {
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

	return withLoadingState(fn, options).finally(() => stopWatch());
};

export const executeWithGlobalLoadingState = <T>(
	execute: SafeTaskExecute,
	fn: AsyncFunction<T>,
	onErrorNotifyMessage: string,
	loadingMessage: string,
	loadingOptions: LoadingStateOptions = {}
): Promise<SafeTaskResult<T>> =>
	withGlobalLoadingState(
		() => execute(fn, onErrorNotifyMessage, noDebounceLoadingOptions),
		loadingMessage,
		loadingOptions
	);
