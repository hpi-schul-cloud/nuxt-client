import { AsyncFunction } from "@/types/async.types";
import { withDebouncedLoading } from "@/utils/loading-utils";
import { openCancellableDialog } from "@feature-dialog";

export const withLoadingState = <T>(fn: AsyncFunction<T>, loadingMessage: string): Promise<T> => {
	let cancelDialog: (() => void) | undefined;

	return withDebouncedLoading(fn, {
		onStart: () => {
			const { cancel } = openCancellableDialog("loadingState", { loadingText: loadingMessage });
			cancelDialog = cancel;
		},
		onEnd: () => cancelDialog?.(),
	});
};
