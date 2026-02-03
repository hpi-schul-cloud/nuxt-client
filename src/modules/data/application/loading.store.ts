import { LoadingStatePayload } from "../../../store/types/loading-state-payload";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loadingStore", () => {
	const defaultPayload: LoadingStatePayload = { hasOverlay: true, text: "", isPersistent: true };
	const loadingState = ref(defaultPayload);
	const isLoading = ref(false);

	function setLoadingState(value: true, payload: LoadingStatePayload): void;
	function setLoadingState(value: false): void;
	function setLoadingState(value: boolean, payload?: LoadingStatePayload): void {
		if (value) {
			const mergedPayload: LoadingStatePayload = { ...defaultPayload, ...payload };
			loadingState.value = mergedPayload;
		}
		isLoading.value = value;
	}

	return {
		loadingState,
		isLoading,
		setLoadingState,
	};
});
