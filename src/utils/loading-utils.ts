type LoadingCallbacks = {
	onStart: () => void;
	onEnd: () => void;
	delay?: number;
	minDisplayTime?: number;
};

export const withLoadingDelay =
	<T, Args extends unknown[]>(fn: (...args: Args) => Promise<T>, callbacks: LoadingCallbacks) =>
	async (...args: Args): Promise<T> => {
		const { onStart, onEnd, delay = 200, minDisplayTime = 500 } = callbacks;

		let isShowingLoading = false;
		let startTime: number | undefined = undefined;

		const timer = setTimeout(() => {
			isShowingLoading = true;
			startTime = Date.now();
			onStart();
		}, delay);

		try {
			// 1. Run the async function
			return await fn(...args);
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
