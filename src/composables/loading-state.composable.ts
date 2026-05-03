import { AsyncFunction } from "@/types/async.types";
import { WithLoadingStateOptions } from "@/types/loading.types";
import { withDebouncedLoading } from "@/utils/loading-utils";
import { readonly, ref } from "vue";

export const useLoadingState = (options: WithLoadingStateOptions = {}) => {
	const isLoading = ref(false);
	const { delay, minDisplayTime } = options;

	const withLoadingState = <T>(fn: AsyncFunction<T>, overrides?: WithLoadingStateOptions) =>
		withDebouncedLoading(fn, {
			delay: overrides?.delay ?? delay,
			minDisplayTime: overrides?.minDisplayTime ?? minDisplayTime,
			onStart: () => (isLoading.value = true),
			onEnd: () => (isLoading.value = false),
		});

	return {
		isLoading: readonly(isLoading),
		withLoadingState,
	};
};
