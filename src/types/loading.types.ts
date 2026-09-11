export type LoadingStateOptions = {
	delay?: number;
	minDisplayTime?: number;
	skipErrorNotification?: (error: Error) => boolean;
};

export type DebouncedLoadingState = "idle" | "loading" | "extLoading" | "loaded";
