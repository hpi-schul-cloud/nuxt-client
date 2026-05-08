import { AsyncFunction } from "@/types/async.types";
import { LoadingStateOptions } from "@/types/loading.types";
import { withDebouncedLoading } from "@/utils/loading-utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loadingStore", () => {
	const isLoading = ref(false);
	const loadingText = ref("");

	function setLoadingState(value: true, text: string): void;
	function setLoadingState(value: false): void;
	function setLoadingState(value: boolean, text?: string): void {
		if (value) {
			loadingText.value = text ?? "";
		}
		isLoading.value = value;
	}

	const withLoadingState = <T>(
		fn: AsyncFunction<T>,
		loadingMessage: string,
		options: LoadingStateOptions = {}
	): Promise<T> => {
		const { delay, minDisplayTime } = options;

		return withDebouncedLoading(fn, {
			delay,
			minDisplayTime,
			onStart: () => setLoadingState(true, loadingMessage),
			onEnd: () => setLoadingState(false),
		});
	};

	return {
		loadingText,
		isLoading,
		setLoadingState,
		withLoadingState,
	};
});
