import { AsyncFunction } from "@/types/async.types";

export type LoadingDelayParams = {
	onStart: () => void;
	onEnd: () => void;
	delay?: number;
	minDisplayTime?: number;
};

// Runs an async function and calls `onStart`/`onEnd` to signal a loading state,
// with two UX-friendly safeguards:
//
// - Delay (default 200ms): `onStart` is only called if the function takes longer
//   than `delay`. Fast operations skip the loading indicator entirely, avoiding flicker.
//
// - Minimum display time (default 500ms): once `onStart` has been called, the loading
//   indicator is shown for at least `minDisplayTime` before `onEnd` is called, even if
//   the function already finished. This prevents the indicator from flashing too briefly.
export const withDebouncedLoading = async <T>(fn: AsyncFunction<T>, params: LoadingDelayParams): Promise<T> => {
	const { onStart, onEnd, delay = 200, minDisplayTime = 500 } = params;

	let isShowingLoading = false;
	let startTime: number | undefined = undefined;

	const timer = setTimeout(() => {
		isShowingLoading = true;
		startTime = Date.now();
		onStart();
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
				// 3. Artificially wait to prevent flickering
				await new Promise((resolve) => setTimeout(resolve, remaining));
			}
			onEnd();
		}
	}
};
