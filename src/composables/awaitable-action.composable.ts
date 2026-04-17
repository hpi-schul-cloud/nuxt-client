import { ref } from "vue";

/**
 * Creates a manually resolvable promise pattern for async user interactions.
 *
 * Useful for awaiting user input from dialogs, confirmations, or any async action
 * where you control when and how the promise resolves.
 *
 * @example
 * ```ts
 * const selectDestination = useAwaitableAction<string>();
 *
 * // In your flow:
 * const destinationId = await selectDestination.start();
 * if (!destinationId) return; // cancelled
 *
 * // In template:
 * <Dialog :is-open="selectDestination.isActive.value" @select="selectDestination.resolve" @cancel="selectDestination.cancel" />
 * ```
 */
export const useAwaitableAction = <T = boolean>() => {
	let resolvePromise: ((result: T | null) => void) | null = null;

	const isActive = ref(false);

	const start = (): Promise<T | null> => {
		isActive.value = true;
		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const resolve = (result: T) => {
		isActive.value = false;
		resolvePromise?.(result);
		resolvePromise = null;
	};

	const cancel = () => {
		isActive.value = false;
		resolvePromise?.(null);
		resolvePromise = null;
	};

	return {
		isActive,
		start,
		resolve,
		cancel,
	};
};
