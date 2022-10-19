import LoadingStateModule from "@/store/loading-state";
import { Ref, unref, watch } from "vue";
import { inject, InjectionKey, ref } from "vue";

export const UseLoadingState = typeof useLoadingState;

export const USE_LOADING_STATE: InjectionKey<typeof useLoadingState> = Symbol();

const isLoadingDialogOpen = ref(false);

export function useLoadingState(loadingText: Ref<string> | string) {
	const loadingStateModule = inject<LoadingStateModule>("loadingStateModule");

	watch(isLoadingDialogOpen, (newValue) => {
		if (loadingStateModule === undefined) return;

		if (newValue === true) {
			loadingStateModule.open({ text: unref(loadingText) });
		} else {
			loadingStateModule.close();
		}
	});

	return {
		isLoadingDialogOpen,
	};
}
