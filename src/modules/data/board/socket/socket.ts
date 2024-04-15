import { io } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { useBoardStore } from "../BoardStore";

export const useBoardSocketApi = (dispatch: (action: Action) => void) => {
	const boardStore = useBoardStore();
	// implement socket.io here
	const socket = io(
		// "https://bc-6683-poc-board-collaboration-server.dbc.dbildungscloud.dev",
		"ws://localhost:4450",
		{
			path: "/collaboration",
			withCredentials: true,
		}

		// { path: "/collaboration", transports: ["polling"] }
	);
	socket.on("connect", function () {
		console.log("connected");
	});
	socket.onAny((event, ...args) => {
		console.log(event, args);
		boardStore.dispatch({ type: event, payload: args[0] });
	});

	socket.on("disconnect", () => {
		// TODO reconnect?
	});

	const emitOnSocket = (action: string, data: any) => {
		socket.emit(action, data);
		console.log("dispatching", dispatch);
		console.log({ action, data });
	};

	return {
		emitOnSocket,
	};
};
