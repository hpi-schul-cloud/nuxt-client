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
		minDisplayTime = 300
	): Promise<T> => {
		setLoadingState(true, loadingMessage);
		const result = await fn();
		await new Promise((resolve) => setTimeout(resolve, minDisplayTime));
		setLoadingState(false);
		return result;
	};

	return {
		loadingText,
		isLoading,
		setLoadingState,
		withLoadingState,
	};
});
