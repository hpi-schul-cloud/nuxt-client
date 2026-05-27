import { useAppStore } from "@data-app";

export const clearApplicationErrorGuard = () => {
	const appStore = useAppStore();

	if (appStore.applicationError !== undefined) {
		appStore.clearApplicationError();
	}

	return true;
};
