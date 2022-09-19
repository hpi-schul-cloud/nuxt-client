import LoadingStateModule from "@/store/loading-state";
import { inject } from "@vue/composition-api";

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
