type PendingRequest = {
	resolve: () => void;
	reject: (error: Error) => void;
};

export const usePendingRequestMap = () => {
	const pendingRequests = new Map<string, PendingRequest>();

	const takePendingRequest = (id: string) => {
		const pendingRequest = pendingRequests.get(id);
		pendingRequests.delete(id);
		return pendingRequest;
	};

	const create = (id: string, replacementErrorMessage: string): Promise<void> => {
		reject(id, replacementErrorMessage);

		return new Promise<void>((resolve, reject) => {
			pendingRequests.set(id, { resolve, reject });
		});
	};

	const resolve = (id: string) => {
		takePendingRequest(id)?.resolve();
	};

	const reject = (id: string, errorMessage: string) => {
		takePendingRequest(id)?.reject(new Error(errorMessage));
	};

	const rejectAll = (errorMessage: string) => {
		for (const id of pendingRequests.keys()) {
			reject(id, errorMessage);
		}
	};

	return { create, resolve, reject, rejectAll };
};
