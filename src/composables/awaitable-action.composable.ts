import { ref } from "vue";

/**
 * Result type for awaitable actions.
 * Uses discriminated union for type-safe completion handling.
 */
export type AwaitableResult<T> = { submitted: true; data: T } | { submitted: false; data: undefined };

/**
 * Creates a manually resolvable promise pattern for async user interactions.
 *
 * @example
 * ```ts
 * // Without data:
 * const confirmation = useAwaitableAction();
 * const { submitted } = await confirmation.start();
 * if (!submitted) return;
 *
 * // With data:
 * const selectDestination = useAwaitableAction<{ destinationId: string }>();
 * const { submitted, data } = await selectDestination.start();
 * if (!submitted) return;
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

	const submit = (data: T) => {
		isActive.value = false;
		resolvePromise?.({ submitted: true, data });
		resolvePromise = undefined;
	};

	const cancel = () => {
		isActive.value = false;
		resolvePromise?.({ submitted: false, data: undefined });
		resolvePromise = undefined;
	};

	return { isActive, start, submit, cancel };
};
