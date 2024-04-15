import { Action } from "@/types/board/ActionFactory";

export const useBoardSocketApi = (dispatch: (action: Action) => void) => {
	// implement socket.io here

	const emitOnSocket = (action: string, data: any) => {
		console.log("dispatching", dispatch);
		console.log({ action, data });
	};

	return {
		emitOnSocket,
	};
};
