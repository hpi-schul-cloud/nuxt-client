import { ref } from "vue";

/**
 * Result type for awaitable actions.
 * Uses discriminated union for type-safe completion handling.
 */
export type AwaitableResult<T> = { completed: true; data: T } | { completed: false; data: undefined };

/**
 * Creates a manually resolvable promise pattern for async user interactions.
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

	const isActive = ref(false);

	const start = (): Promise<AwaitableResult<T>> => {
		isActive.value = true;
		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const complete = (data: T) => {
		isActive.value = false;
		resolvePromise?.({ completed: true, data });
		resolvePromise = undefined;
	};

	const cancel = () => {
		isActive.value = false;
		resolvePromise?.({ completed: false, data: undefined });
		resolvePromise = undefined;
	};

	return { isActive, start, complete, cancel };
};
