import { AsyncFunction } from "@/types/async.types";
import { DebouncedLoadingState, LoadingStateOptions } from "@/types/loading.types";
import { readonly, ref } from "vue";

// Runs an async function and tracks its progress through a reactive `loadingState`,
// with two UX-friendly safeguards:
//
// - Delay (default 200ms): the state only advances to `"loading"` if the function takes
//   longer than `delay`. Fast operations skip the loading indicator entirely, avoiding flicker.
//
// - Minimum display time (default 500ms): once `"loading"` is reached, the indicator is
//   shown for at least `minDisplayTime` (via the `"extLoading"` state) before transitioning
//   to `"loaded"`, even if the function already finished. This prevents the indicator from
//   flashing too briefly.
//
// The state always ends at `"loaded"` regardless of speed or errors.

export const useDebouncedLoading = () => {
	const loadingState = ref<DebouncedLoadingState>("idle");

	const withLoadingState = async <T>(fn: AsyncFunction<T>, params: LoadingStateOptions = {}): Promise<T> => {
		const { delay = 200, minDisplayTime = 500 } = params;

		loadingState.value = "idle";
		let isShowingLoading = false;
		let startTime: number | undefined = undefined;

		const timer = setTimeout(() => {
			isShowingLoading = true;
			startTime = Date.now();
			loadingState.value = "loading";
		}, delay);

		try {
			// 1. Run the async function
			return await fn();
		} finally {
			// 2. Stop the timer (if the request is faster than the delay)
			clearTimeout(timer);

			if (isShowingLoading && startTime) {
				const elapsed = Date.now() - startTime;
				const remaining = minDisplayTime - elapsed;

				if (remaining > 0) {
					loadingState.value = "extLoading";
					// 3. Artificially wait to prevent flickering
					await new Promise((resolve) => setTimeout(resolve, remaining));
				}
			}
			loadingState.value = "loaded";
		}
	};

	return {
		loadingState: readonly(loadingState),
		withLoadingState,
	};
};
