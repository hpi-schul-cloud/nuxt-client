import { withLoadingDelay } from "@/utils/loading-utils";
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

	const withLoadingState = async <T>(
		fn: () => Promise<T>,
		loadingMessage: string,
		minDisplayTime?: number,
		delay?: number
	): Promise<T> => {
		const wrappedTask = withLoadingDelay(fn, {
			delay,
			minDisplayTime,
			onStart: () => setLoadingState(true, loadingMessage),
			onEnd: () => setLoadingState(false),
		});

		return await wrappedTask();
	};

	return {
		loadingText,
		isLoading,
		setLoadingState,
		withLoadingState,
	};
});
