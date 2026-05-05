import { ref } from "vue";

/**
 * Result type for awaitable actions.
 * Uses discriminated union for type-safe completion handling.
 */
export type AwaitableResult<T> = { completed: true; data: T } | { completed: false; data: undefined };

/**
 * Creates a manually resolvable promise pattern for async user interactions.
 * Calling start() multiple times while active returns the same promise.
 *
 * @example
 * ```ts
 * // Without data:
 * const confirmation = useAwaitableAction();
 * const { completed } = await confirmation.start();
 * if (!completed) return;
 *
 * // With data:
 * const selectDestination = useAwaitableAction<{ destinationId: string }>();
 * const { completed, data } = await selectDestination.start();
 * if (!completed) return;
 * console.log(data.destinationId);
 * ```
 */
export const useAwaitableAction = <T = boolean>() => {
	let resolvePromise: ((result: AwaitableResult<T>) => void) | undefined;
	let currentPromise: Promise<AwaitableResult<T>> | undefined;

	const isActive = ref(false);

	const start = (): Promise<AwaitableResult<T>> => {
		// If already active, return the existing promise
		if (isActive.value && currentPromise) {
			return currentPromise;
		}

		isActive.value = true;
		currentPromise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		return currentPromise;
	};

	const complete = (data: T) => {
		isActive.value = false;
		resolvePromise?.({ completed: true, data });
		resolvePromise = undefined;
		currentPromise = undefined;
	};

	const cancel = () => {
		isActive.value = false;
		resolvePromise?.({ completed: false, data: undefined });
		resolvePromise = undefined;
		currentPromise = undefined;
	};

	return { isActive, start, complete, cancel };
};
