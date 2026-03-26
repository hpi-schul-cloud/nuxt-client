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

	return {
		loadingText,
		isLoading,
		setLoadingState,
	};
});
