export type LoadingStateOptions = {
	delay?: number;
	minDisplayTime?: number;
};

export type DebouncedLoadingState = "idle" | "loading" | "extLoading" | "loaded";
