type PendingRequest = {
	resolve: () => void;
	reject: (error: Error) => void;
};

// TODO Funktionen aus utils.ts nach async-tasks.composable verschieben
// TODO type SafeTaskResult ist redundant und kann ersetzt werden

export const usePendingRequestMap = () => {
	// for now these requests are only used for duplicating cards or columns, so there won't be any id conflicts.
	// but in the future, if more types of requests are added, id conflicts might occur.
	// therefore, it might be necessary to include the type of operation in the id to avoid conflicts.
	const pendingRequests = new Map<string, PendingRequest>();

	const takePendingRequest = (id: string) => {
		const pendingRequest = pendingRequests.get(id);
		pendingRequests.delete(id);
		return pendingRequest;
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

	// TODO vielleicht umbenennen in createAndPotentiallyCancelPrevious aber ich finde das naming create, resolve, reject stimmig
	// und das Verhalten kann mit rejectActiveRequest übersteuert werden
	const create = (id: string, replacementErrorMessage: string, rejectActiveRequest = true): Promise<void> => {
		if (rejectActiveRequest) {
			reject(id, replacementErrorMessage);
		}

		return new Promise<void>((resolve, reject) => {
			pendingRequests.set(id, { resolve, reject });
		});
	};

	return { create, resolve, reject, rejectAll };
};
