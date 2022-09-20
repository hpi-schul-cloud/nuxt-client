import LoadingStateModule from "@/store/loading-state";
import { inject, InjectionKey } from "@vue/composition-api";

export const USE_LOADING_STATE: InjectionKey<typeof useLoadingState> = Symbol();

export function useLoadingState() {
	const loadingStateModule = inject<LoadingStateModule>("loadingStateModule");

	const openLoadingDialog = (text: string) => {
		if (loadingStateModule === undefined) return;

		loadingStateModule.open({ text });
	};

	const closeLoadingDialog = () => {
		if (loadingStateModule === undefined) return;

		loadingStateModule.close();
	};

	return {
		openLoadingDialog,
		closeLoadingDialog,
	};
}
